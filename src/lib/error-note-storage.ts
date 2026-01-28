// Error Note Storage Utility
// Manages tracking of incorrect answers and spaced repetition

export interface ErrorWord {
    wordId: string; // format: "phaseId-wordId" e.g., "1-5"
    term: string;
    meaning: string;
    partOfSpeech: string;
    example: string;
    phase: number;

    // Error tracking
    errorCount: number; // Total times answered incorrectly
    lastErrorDate: Date;

    // Spaced repetition tracking
    status: 'unlearned' | 'learning' | 'mastered'; // unlearned = 미암기, mastered = 암기 완료
    correctStreak: number; // Consecutive correct answers (3 = mastered)
    nextReviewDate: Date | null; // Next scheduled review date
    reviewDates: Date[]; // History of review dates (1일, 3일, 7일)
}

const STORAGE_KEY = 'vocabulary_error_notes';

// Get all error notes from localStorage
export function getErrorNotes(): ErrorWord[] {
    if (typeof window === 'undefined') return [];

    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (!stored) return [];

        const parsed = JSON.parse(stored);
        // Convert date strings back to Date objects
        return parsed.map((word: any) => ({
            ...word,
            lastErrorDate: new Date(word.lastErrorDate),
            nextReviewDate: word.nextReviewDate ? new Date(word.nextReviewDate) : null,
            reviewDates: word.reviewDates.map((d: string) => new Date(d))
        }));
    } catch (error) {
        console.error('Error loading error notes:', error);
        return [];
    }
}

// Save error notes to localStorage
export function saveErrorNotes(notes: ErrorWord[]): void {
    if (typeof window === 'undefined') return;

    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
    } catch (error) {
        console.error('Error saving error notes:', error);
    }
}

// Add a word to error notes or increment error count
export function addErrorWord(
    wordId: string,
    term: string,
    meaning: string,
    partOfSpeech: string,
    example: string,
    phase: number
): void {
    const notes = getErrorNotes();
    const existingIndex = notes.findIndex(note => note.wordId === wordId);

    if (existingIndex >= 0) {
        // Update existing error word
        notes[existingIndex].errorCount++;
        notes[existingIndex].lastErrorDate = new Date();
        notes[existingIndex].correctStreak = 0; // Reset streak on error
        notes[existingIndex].status = 'unlearned';
        // Set next review to tomorrow (1 day from now)
        notes[existingIndex].nextReviewDate = getNextReviewDate(0);
        notes[existingIndex].reviewDates = [new Date()];
    } else {
        // Add new error word
        const newErrorWord: ErrorWord = {
            wordId,
            term,
            meaning,
            partOfSpeech,
            example,
            phase,
            errorCount: 1,
            lastErrorDate: new Date(),
            status: 'unlearned',
            correctStreak: 0,
            nextReviewDate: getNextReviewDate(0), // Tomorrow
            reviewDates: [new Date()]
        };
        notes.push(newErrorWord);
    }

    saveErrorNotes(notes);
}

// Mark a word as correctly answered
export function markWordCorrect(wordId: string): void {
    const notes = getErrorNotes();
    const index = notes.findIndex(note => note.wordId === wordId);

    if (index >= 0) {
        notes[index].correctStreak++;

        // Update status based on streak
        if (notes[index].correctStreak >= 3) {
            notes[index].status = 'mastered';
            notes[index].nextReviewDate = null; // No more reviews needed
        } else {
            notes[index].status = 'learning';
            // Calculate next review based on Ebbinghaus forgetting curve
            // Current streak: 0 → 1 day, 1 → 3 days, 2 → 7 days
            const reviewInterval = notes[index].correctStreak;
            notes[index].nextReviewDate = getNextReviewDate(reviewInterval);
            notes[index].reviewDates.push(new Date());
        }

        saveErrorNotes(notes);
    }
}

// Mark a word as incorrect (resets progress)
export function markWordIncorrect(wordId: string): void {
    const notes = getErrorNotes();
    const index = notes.findIndex(note => note.wordId === wordId);

    if (index >= 0) {
        notes[index].errorCount++;
        notes[index].correctStreak = 0;
        notes[index].status = 'unlearned';
        notes[index].lastErrorDate = new Date();
        notes[index].nextReviewDate = getNextReviewDate(0); // Back to 1 day
        notes[index].reviewDates = [new Date()];

        saveErrorNotes(notes);
    }
}

// Calculate next review date based on Ebbinghaus forgetting curve
// interval: 0 = 1 day, 1 = 3 days, 2 = 7 days
function getNextReviewDate(interval: number): Date {
    const date = new Date();

    switch (interval) {
        case 0:
            date.setDate(date.getDate() + 1); // 1 day
            break;
        case 1:
            date.setDate(date.getDate() + 3); // 3 days
            break;
        case 2:
            date.setDate(date.getDate() + 7); // 7 days
            break;
        default:
            date.setDate(date.getDate() + 1);
    }

    return date;
}

// Get words that need review today
export function getWordsNeedingReview(): ErrorWord[] {
    const notes = getErrorNotes();
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset to start of day

    return notes.filter(note => {
        if (note.status === 'mastered') return false;
        if (!note.nextReviewDate) return false;

        const reviewDate = new Date(note.nextReviewDate);
        reviewDate.setHours(0, 0, 0, 0);

        return reviewDate <= today;
    });
}

// Get words by status
export function getWordsByStatus(status: ErrorWord['status']): ErrorWord[] {
    return getErrorNotes().filter(note => note.status === status);
}

// Delete a word from error notes
export function deleteErrorWord(wordId: string): void {
    const notes = getErrorNotes();
    const filtered = notes.filter(note => note.wordId !== wordId);
    saveErrorNotes(filtered);
}

// Get statistics
export interface ErrorNoteStats {
    total: number;
    unlearned: number;
    learning: number;
    mastered: number;
    needReviewToday: number;
}

export function getErrorNoteStats(): ErrorNoteStats {
    const notes = getErrorNotes();
    const needReview = getWordsNeedingReview();

    return {
        total: notes.length,
        unlearned: notes.filter(n => n.status === 'unlearned').length,
        learning: notes.filter(n => n.status === 'learning').length,
        mastered: notes.filter(n => n.status === 'mastered').length,
        needReviewToday: needReview.length
    };
}

// Flashcard Progress Storage Utility
// Manages tracking of known and unknown words in flashcards

export interface FlashcardProgress {
    wordId: string; // format: "phaseId-wordId"
    term: string;
    status: 'known' | 'unknown';
    lastReviewed: Date;
    reviewCount: number;
}

const STORAGE_KEY = 'flashcard_progress';

// Get all flashcard progress from localStorage
export function getFlashcardProgress(): FlashcardProgress[] {
    if (typeof window === 'undefined') return [];

    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (!stored) return [];

        const parsed = JSON.parse(stored);
        return parsed.map((item: any) => ({
            ...item,
            lastReviewed: new Date(item.lastReviewed)
        }));
    } catch (error) {
        console.error('Error loading flashcard progress:', error);
        return [];
    }
}

// Save flashcard progress to localStorage
export function saveFlashcardProgress(progress: FlashcardProgress[]): void {
    if (typeof window === 'undefined') return;

    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (error) {
        console.error('Error saving flashcard progress:', error);
    }
}

// Mark a word as known
export function markWordAsKnown(wordId: string, term: string): void {
    const progress = getFlashcardProgress();
    const existingIndex = progress.findIndex(p => p.wordId === wordId);

    if (existingIndex >= 0) {
        progress[existingIndex].status = 'known';
        progress[existingIndex].lastReviewed = new Date();
        progress[existingIndex].reviewCount++;
    } else {
        progress.push({
            wordId,
            term,
            status: 'known',
            lastReviewed: new Date(),
            reviewCount: 1
        });
    }

    saveFlashcardProgress(progress);
}

// Mark a word as unknown
export function markWordAsUnknown(wordId: string, term: string): void {
    const progress = getFlashcardProgress();
    const existingIndex = progress.findIndex(p => p.wordId === wordId);

    if (existingIndex >= 0) {
        progress[existingIndex].status = 'unknown';
        progress[existingIndex].lastReviewed = new Date();
        progress[existingIndex].reviewCount++;
    } else {
        progress.push({
            wordId,
            term,
            status: 'unknown',
            lastReviewed: new Date(),
            reviewCount: 1
        });
    }

    saveFlashcardProgress(progress);
}

// Get statistics
export interface FlashcardStats {
    total: number;
    known: number;
    unknown: number;
    reviewed: number;
}

export function getFlashcardStats(): FlashcardStats {
    const progress = getFlashcardProgress();

    return {
        total: progress.length,
        known: progress.filter(p => p.status === 'known').length,
        unknown: progress.filter(p => p.status === 'unknown').length,
        reviewed: progress.length
    };
}

// Reset all progress
export function resetFlashcardProgress(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(STORAGE_KEY);
}

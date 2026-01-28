// Bookmark Storage Utility
// Manages folders, tags, and user notes for bookmarked words.

export interface Bookmark {
    wordId: string; // "phaseId-wordId" or just unique ID
    term: string;
    meaning: string;
    example: string;
    partOfSpeech?: string;

    // Categorization
    folderId: string; // 'default' or custom ID
    tags: string[]; // ['#important', '#confusing']

    // Personalization
    userNote?: string;
    userExample?: string;

    // Metadata
    createdAt: Date;
    isMastered: boolean;
}

export interface BookmarkFolder {
    id: string;
    name: string;
    isSystem: boolean; // e.g., 'All', 'Recent', 'Unmastered'
}

const STORAGE_KEY_BOOKMARKS = 'vocab_bookmarks';
const STORAGE_KEY_FOLDERS = 'vocab_bookmark_folders';

// --- DATA ACCESS ---

export function getBookmarks(): Bookmark[] {
    if (typeof window === 'undefined') return [];
    try {
        const stored = localStorage.getItem(STORAGE_KEY_BOOKMARKS);
        if (!stored) return [];
        return JSON.parse(stored).map((b: any) => ({
            ...b,
            createdAt: new Date(b.createdAt)
        }));
    } catch { return []; }
}

export function saveBookmarks(bookmarks: Bookmark[]) {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEY_BOOKMARKS, JSON.stringify(bookmarks));
}

export function getFolders(): BookmarkFolder[] {
    if (typeof window === 'undefined') return [];
    try {
        const stored = localStorage.getItem(STORAGE_KEY_FOLDERS);
        if (stored) return JSON.parse(stored);
    } catch { }

    // Default Folders
    return [
        { id: 'default', name: 'General', isSystem: true },
        { id: 'business', name: 'Business', isSystem: false }
    ];
}

export function saveFolders(folders: BookmarkFolder[]) {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEY_FOLDERS, JSON.stringify(folders));
}

// --- ACTIONS ---

export function addBookmark(word: { id: string, term: string, meaning: string, example: string, partOfSpeech?: string }, folderId: string = 'default') {
    const list = getBookmarks();
    // Prevent duplicates
    if (list.some(b => b.wordId === word.id)) return;

    const newBookmark: Bookmark = {
        wordId: word.id,
        term: word.term,
        meaning: word.meaning,
        example: word.example,
        partOfSpeech: word.partOfSpeech,
        folderId,
        tags: [],
        createdAt: new Date(),
        isMastered: false
    };

    list.unshift(newBookmark);
    saveBookmarks(list);
}

export function removeBookmark(wordId: string) {
    const list = getBookmarks().filter(b => b.wordId !== wordId);
    saveBookmarks(list);
}

export function updateBookmark(wordId: string, updates: Partial<Bookmark>) {
    const list = getBookmarks();
    const idx = list.findIndex(b => b.wordId === wordId);
    if (idx !== -1) {
        list[idx] = { ...list[idx], ...updates };
        saveBookmarks(list);
    }
}

export function createFolder(name: string) {
    const folders = getFolders();
    folders.push({
        id: Date.now().toString(),
        name,
        isSystem: false
    });
    saveFolders(folders);
}

export function ensureFolder(id: string, name: string) {
    const folders = getFolders();
    if (!folders.some(f => f.id === id)) {
        folders.push({
            id,
            name,
            isSystem: true // Treat auto-generated Phase folders as system/permanent
        });
        saveFolders(folders);
    }
}

export function deleteFolder(folderId: string) {
    let folders = getFolders();
    folders = folders.filter(f => f.id !== folderId); // Can't delete system folders check needed in UI
    saveFolders(folders);

    // Move bookmarks in this folder to default
    const bookmarks = getBookmarks();
    bookmarks.forEach(b => {
        if (b.folderId === folderId) b.folderId = 'default';
    });
    saveBookmarks(bookmarks);
}

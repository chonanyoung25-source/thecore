// Streak Storage Utility
// Manages user attendance, streaks, and activity logs.

export interface AttendanceStats {
    currentStreak: number;
    bestStreak: number;
    lastActivityDate: string | null; // YYYY-MM-DD
    streakFreezes: number;
    totalDaysActive: number;
}

export interface ActivityLog {
    date: string; // YYYY-MM-DD
    count: number; // 1-4 scale for heatmap intensity
}

const STORAGE_KEY_STATS = 'vocab_attendance_stats';
const STORAGE_KEY_LOGS = 'vocab_activity_logs';

// --- DATA ACCESS ---

export function getAttendanceStats(): AttendanceStats {
    if (typeof window === 'undefined') return { currentStreak: 0, bestStreak: 0, lastActivityDate: null, streakFreezes: 0, totalDaysActive: 0 };

    try {
        const stored = localStorage.getItem(STORAGE_KEY_STATS);
        if (stored) return JSON.parse(stored);
    } catch { }

    return {
        currentStreak: 0,
        bestStreak: 0,
        lastActivityDate: null,
        streakFreezes: 1, // Start with 1 free freeze
        totalDaysActive: 0
    };
}

export function saveAttendanceStats(stats: AttendanceStats) {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEY_STATS, JSON.stringify(stats));
}

export function getActivityLogs(): ActivityLog[] {
    if (typeof window === 'undefined') return [];
    try {
        const stored = localStorage.getItem(STORAGE_KEY_LOGS);
        if (stored) return JSON.parse(stored);
    } catch { }
    return [];
}

export function saveActivityLogs(logs: ActivityLog[]) {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEY_LOGS, JSON.stringify(logs));
}

// --- ACTIONS ---

export function logActivity() {
    const today = new Date().toISOString().split('T')[0];
    const stats = getAttendanceStats();
    const logs = getActivityLogs();

    // 1. Log Activity Count
    const existingLogIdx = logs.findIndex(l => l.date === today);
    if (existingLogIdx >= 0) {
        logs[existingLogIdx].count = Math.min(logs[existingLogIdx].count + 1, 4); // Max intensity 4
    } else {
        logs.push({ date: today, count: 1 });
    }
    saveActivityLogs(logs);

    // 2. Update Streak
    // Only update streak logic if not already logged today for streak purposes
    // (We could count multiple activities, but streak usually increments once per day)

    if (stats.lastActivityDate === today) return; // Already counted streak for today

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    if (stats.lastActivityDate === yesterdayStr) {
        // Continued streak
        stats.currentStreak++;
    } else if (stats.lastActivityDate) {
        // Gap detected
        // Check for Freeze
        const daysDiff = (new Date(today).getTime() - new Date(stats.lastActivityDate).getTime()) / (1000 * 3600 * 24);

        if (daysDiff > 1) {
            // Missed more than 1 day (i.e., didn't do yesterday)
            // If missed exactly 1 day (yesterday), we can use a freeze
            if (daysDiff <= 2 && stats.streakFreezes > 0) {
                stats.streakFreezes--;
                stats.currentStreak++; // Maintain streak using freeze
                // Maybe insert a "frozen" log for yesterday? For now simplify.
            } else {
                stats.currentStreak = 1; // Reset
            }
        }
    } else {
        // First activity ever
        stats.currentStreak = 1;
    }

    // Update Best
    if (stats.currentStreak > stats.bestStreak) {
        stats.bestStreak = stats.currentStreak;
    }

    stats.lastActivityDate = today;
    stats.totalDaysActive++;
    saveAttendanceStats(stats);
}

export function useFreeze() {
    const stats = getAttendanceStats();
    if (stats.streakFreezes > 0) {
        stats.streakFreezes--;
        saveAttendanceStats(stats);
        return true;
    }
    return false;
}

export function buyFreeze(cost: number) {
    // Logic to spend points would go here
    const stats = getAttendanceStats();
    stats.streakFreezes++;
    saveAttendanceStats(stats);
}

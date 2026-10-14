/**
 * MoodContext — Global state provider for the MindBridge app.
 *
 * Stores user data collected across screens:
 *   - name / studentId  (from Login)
 *   - mood              (from MoodChecker, 0–100)
 *   - journalEntry      (from Journal)
 *
 * Provides setters for each field plus a reset() helper
 * that clears everything back to defaults (called on "Done").
 */
import { createContext, useContext, useState, useCallback } from 'react';

// Create the context (undefined default so useMood can warn if used outside provider)
const MoodContext = createContext(undefined);

/**
 * MoodProvider wraps the entire app and supplies shared state + setters.
 */
export function MoodProvider({ children }) {
  const [name, setName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [mood, setMood] = useState(50); // default midpoint
  const [journalEntry, setJournalEntry] = useState('');

  /** Reset all state back to initial values (called when user taps "Done") */
  const reset = useCallback(() => {
    setName('');
    setStudentId('');
    setMood(50);
    setJournalEntry('');
  }, []);

  const value = {
    // State values
    name,
    studentId,
    mood,
    journalEntry,
    // Setters
    setName,
    setStudentId,
    setMood,
    setJournalEntry,
    // Utility
    reset,
  };

  return (
    <MoodContext.Provider value={value}>
      {children}
    </MoodContext.Provider>
  );
}

/**
 * Custom hook to access MoodContext.
 * Throws if used outside a <MoodProvider> for easier debugging.
 */
export function useMood() {
  const context = useContext(MoodContext);
  if (context === undefined) {
    throw new Error('useMood must be used within a <MoodProvider>');
  }
  return context;
}
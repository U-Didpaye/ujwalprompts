import { DecisionRecord, DecisionInput } from '../types/decision';

const STORAGE_KEYS = {
  HISTORY: 'blindspot_history_v2',
  ACTIVE_DRAFT: 'blindspot_active_draft_v2'
};

export const storageService = {
  // Get all saved decisions
  getHistory(): DecisionRecord[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.HISTORY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error('Error reading history from storage:', e);
      return [];
    }
  },

  // Save or update a decision record
  saveDecisionRecord(record: DecisionRecord): void {
    try {
      const history = this.getHistory();
      const existingIdx = history.findIndex(h => h.input.id === record.input.id);
      
      if (existingIdx >= 0) {
        history[existingIdx] = record;
      } else {
        history.unshift(record);
      }

      localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(history));
    } catch (e) {
      console.error('Error saving decision to storage:', e);
    }
  },

  // Delete a decision record
  deleteDecisionRecord(id: string): void {
    try {
      const history = this.getHistory().filter(h => h.input.id !== id);
      localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(history));
    } catch (e) {
      console.error('Error deleting decision record:', e);
    }
  },

  // Clear history
  clearHistory(): void {
    localStorage.removeItem(STORAGE_KEYS.HISTORY);
  },

  // Get active draft input
  getActiveDraft(): Partial<DecisionInput> | null {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ACTIVE_DRAFT);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      return null;
    }
  },

  // Save active draft
  saveActiveDraft(draft: Partial<DecisionInput>): void {
    try {
      localStorage.setItem(STORAGE_KEYS.ACTIVE_DRAFT, JSON.stringify(draft));
    } catch (e) {
      console.error('Error saving draft:', e);
    }
  }
};

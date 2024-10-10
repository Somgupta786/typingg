import { createSlice } from '@reduxjs/toolkit';

// Helper functions to load and save state from localStorage
const loadStateFromLocalStorage = () => {
  try {
    if (typeof window !== "undefined") {
      const serializedState = localStorage.getItem('practiseTest'); // Corrected variable name
      if (serializedState === null) {
        return {
          id: '',
          progress: 0,
          chapters: [],
        };
      }
      return JSON.parse(serializedState);
    }
  } catch (error) {
    console.error("Error loading state from localStorage:", error);
  }
  
  // Return default state if there's an error or window is undefined
  return {
    id: '',
    progress: 0,
    chapters: [],
  };
};

const saveStateToLocalStorage = (state) => {
  try {
    if (typeof window !== "undefined") {
      const serializedState = JSON.stringify(state);
      localStorage.setItem('practiseTest', serializedState);
    }
  } catch (error) {
    console.error("Error saving state to localStorage:", error);
  }
};

// Initial state, loaded from localStorage if available
const initialState = loadStateFromLocalStorage();

const practiseTestSlice = createSlice({
  name: 'practiseTest',
  initialState,
  reducers: {
    setPractiseTestId(state, action) {
      state.id = action.payload;
      saveStateToLocalStorage(state); // Save to localStorage after updating
    },
    setProgress(state, action) {
      state.progress = action.payload;
      saveStateToLocalStorage(state); // Save to localStorage after updating
    },
    setChapters(state, action) {
      state.chapters = action.payload;
      saveStateToLocalStorage(state); // Save to localStorage after updating
    }
  },
});

// Export actions and reducer
export const { setPractiseTestId, setProgress, setChapters } = practiseTestSlice.actions;
export default practiseTestSlice.reducer;

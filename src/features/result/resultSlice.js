import { createSlice } from "@reduxjs/toolkit";

// Helper functions to load and save state from localStorage
const loadStateFromLocalStorage = () => {
  try {
    if (typeof window !== "undefined") {
      const serializedState = localStorage.getItem("typingTestResults"); // Name updated to reflect result data
      if (serializedState === null) {
        return {
          wpm: 0,
          accuracy: 0,
          totalTime: 0,
          totalCorrectChars: 0,
          totalIncorrectChars: 0,
          totalExtraChars: 0,
          missedChars: 0,
          rawWords: 0,
          keyStats: [],
        };
      }
      return JSON.parse(serializedState);
    }
  } catch (error) {
    console.error("Error loading state from localStorage:", error);
  }

  // Return default state if there's an error or window is undefined
  return {
    wpm: 0,
    accuracy: 0,
    totalTime: 0,
    totalCorrectChars: 0,
    totalIncorrectChars: 0,
    totalExtraChars: 0,
    missedChars: 0,
    rawWords: 0,
    keyStats: [],
  };
};

const saveStateToLocalStorage = (state) => {
  try {
    if (typeof window !== "undefined") {
      const serializedState = JSON.stringify(state);
      localStorage.setItem("typingTestResults", serializedState); // Store the result data
    }
  } catch (error) {
    console.error("Error saving state to localStorage:", error);
  }
};

// Initial state, loaded from localStorage if available
const initialState = loadStateFromLocalStorage();

const typingTestResultsSlice = createSlice({
  name: "typingTestResults",
  initialState,
  reducers: {
    setTypedWpm(state, action) {
      state.wpm = action.payload;
      saveStateToLocalStorage(state); // Save to localStorage after updating
    },
    setAccuracy(state, action) {
      state.accuracy = action.payload;
      saveStateToLocalStorage(state); // Save to localStorage after updating
    },
    setTotalTime(state, action) {
      state.totalTime = action.payload;
      saveStateToLocalStorage(state); // Save to localStorage after updating
    },
    setTypedTotalCorrectChars(state, action) {
      state.totalCorrectChars = action.payload;
      saveStateToLocalStorage(state); // Save to localStorage after updating
    },
    setTypedTotalIncorrectChars(state, action) {
      state.totalIncorrectChars = action.payload;
      saveStateToLocalStorage(state); // Save to localStorage after updating
    },
    setTypedTotalExtraChars(state, action) {
      state.totalExtraChars = action.payload;
      saveStateToLocalStorage(state); // Save to localStorage after updating
    },
    setTypedMissedChars(state, action) {
      state.missedChars = action.payload;
      saveStateToLocalStorage(state); // Save to localStorage after updating
    },
    setTypedRawChars(state, action) {
      state.rawWords = action.payload;
      saveStateToLocalStorage(state); // Save to localStorage after updating
    },
    setKeyStats(state, action) {
      state.keyStats = action.payload;
      saveStateToLocalStorage(state); // Save to localStorage after updating
    },
  },
});

// Export actions and reducer
export const {
  setTypedWpm,
  setAccuracy,
  setTotalTime,
  setTypedTotalCorrectChars,
  setTypedTotalIncorrectChars,
  setTypedTotalExtraChars,
  setTypedMissedChars,
  setTypedRawChars,
  setKeyStats,
} = typingTestResultsSlice.actions;
export default typingTestResultsSlice.reducer;

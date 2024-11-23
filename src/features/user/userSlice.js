import { createSlice } from '@reduxjs/toolkit';

// Helper functions to load and save state from localStorage
const loadStateFromLocalStorage = () => {
  try {
    if (typeof window !== "undefined") {
      const serializedState = localStorage.getItem('userData');
      if (serializedState === null) {
        return {
          user: {
            id: '',
            email: '',
            username: '',
            profileImage: null,
            verified: false,
            matchPlayed: 0,
            matchWon: 0,
            matchLost: 0,
            avgWpm: 0,
            avgAccuracy: 0,
            rank: null,
            createdAt: '',
            updatedAt: '',
            lastTakenTestId: '',
            UserTestResult: []
          },
        };
      }
      return JSON.parse(serializedState);
    }
  } catch (error) {
    console.error("Error loading state from localStorage:", error);
  }
  
  // Return default state if there's an error or window is undefined
  return {
    user: {
      id: '',
      email: '',
      username: '',
      profileImage: null,
      verified: false,
      matchPlayed: 0,
      matchWon: 0,
      matchLost: 0,
      avgWpm: 0,
      avgAccuracy: 0,
      rank: null,
      createdAt: '',
      updatedAt: '',
      lastTakenTestId: '',
      UserTestResult: []
    },
  };
};

const saveStateToLocalStorage = (state) => {
  try {
    if (typeof window !== "undefined") {
      const serializedState = JSON.stringify(state);
      localStorage.setItem('userData', serializedState);
    }
  } catch (error) {
    console.error("Error saving state to localStorage:", error);
  }
};

// Initial state, loaded from localStorage if available
const initialState = loadStateFromLocalStorage();

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
      saveStateToLocalStorage(state); // Save to localStorage after updating
    },
    updateUserField(state, action) {
      const { field, value } = action.payload;
      if (state.user.hasOwnProperty(field)) {
        state.user[field] = value;
        saveStateToLocalStorage(state); // Save to localStorage after updating
      }
    },
    resetUser(state) {
      state.user = initialState.user;
      saveStateToLocalStorage(state); // Save to localStorage after resetting
    },
  },
});

// Export actions and reducer
export const { setUser, updateUserField, resetUser } = userSlice.actions;
export default userSlice.reducer;

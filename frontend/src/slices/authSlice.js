// Import createSlice from Redux Toolkit
// createSlice helps us write reducers + actions easily
import { createSlice } from "@reduxjs/toolkit";

/* ================================
   INITIAL STATE
   ================================ */

// initialState represents the default state of auth
const initialState = {

  // userData stores logged-in user information
  // First, check if userData exists in localStorage
  // If yes, parse it and use it (for auto-login)
  // If not, set userData as null
  userData: localStorage.getItem("userData")
    ? JSON.parse(localStorage.getItem("userData"))
    : null,
};

/* ================================
   AUTH SLICE
   ================================ */

const authSlice = createSlice({
  // Slice name (used internally by Redux)
  name: "auth",

  // Initial state of this slice
  initialState,

  // Reducers contain functions that update the state
  reducers: {

    /* ================================
       SET CREDENTIALS
       ================================ */
    setCredentails: (state, action) => {

      // action.payload contains user data from backend
      // Example: { _id, name, email, token }
      state.userData = action.payload;

      // Save user data in localStorage
      // This helps keep user logged in after page refresh
      localStorage.setItem(
        "userData",
        JSON.stringify(action.payload)
      );
    },

    /* ================================
       LOGOUT USER
       ================================ */
    logout: (state) => {

      // Clear user data from Redux state
      state.userData = null;

      // Clear all data from localStorage
      // This removes login persistence
      localStorage.clear();
    },
  },
});

/* ================================
   EXPORT ACTIONS
   ================================ */

// Export actions so they can be dispatched in components
// Example: dispatch(setCredentails(user))
export const { setCredentails, logout } = authSlice.actions;

/* ================================
   EXPORT REDUCER
   ================================ */

// Export reducer to be added in Redux store
export default authSlice.reducer;

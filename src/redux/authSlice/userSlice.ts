import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  user: any;
}

const initialState: AuthState = {
  user: {},
};

const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    setLogInUser: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
    },

    logOutUser: state => {
      state.user = null;
    },
  },
});

// Export actions
export const { setLogInUser, logOutUser } = authSlice.actions;

// Export the reducer
export default authSlice.reducer;

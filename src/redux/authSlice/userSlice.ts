import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  user: any;
  visited: boolean;
}

const initialState: AuthState = {
  user: null,
  visited: false,
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

    setVisited: (state, action: PayloadAction<boolean>) => {
      state.visited = action.payload;
    },
  },
});

// Export actions
export const { setLogInUser, logOutUser, setVisited } = authSlice.actions;

// Export the reducer
export default authSlice.reducer;

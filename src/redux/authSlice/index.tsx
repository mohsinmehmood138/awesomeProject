import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';

export const fetchData = createAsyncThunk(
  'data/fetchData',
  async (endpoint: string, thunkAPI) => {
    try {
      const response = await fetch(endpoint, {
        method: 'GET',
      });
      const data = await response.json();
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

interface User {
  name: string;
  password: string;
  email: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isAlertOpen: boolean;
  data: any;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isAlertOpen: false,
  data: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    createUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
      state.isAuthenticated = true;
    },

    removeUser(state) {
      state.user = null;
      state.isAuthenticated = false;
    },

    showAlert(state) {
      state.isAlertOpen = true;
    },

    hideAlert(state) {
      state.isAlertOpen = false;
    },

    onDeleteUser(state, action: PayloadAction) {
      state.data.users = state.data.users.filter(
        user => user.userId !== action.payload,
      );
    },

    onUpdateUserName(
      state,
      action: PayloadAction<{userId: string; newName: string}>,
    ) {
      if (state.data?.users) {
        const userIndex = state.data.users.findIndex(
          user => user.userId === action.payload.userId,
        );

        if (userIndex !== -1) {
          state.data.users[userIndex] = {
            ...state.data.users[userIndex],
            realName: action.payload.newName,
          };
        }
      }
    },
  },

  extraReducers: builder => {
    builder
      .addCase(fetchData.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  createUser,
  hideAlert,
  showAlert,
  removeUser,
  onDeleteUser,
  onUpdateUserName,
} = authSlice.actions;
export default authSlice.reducer;

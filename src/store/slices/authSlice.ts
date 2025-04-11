import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: boolean;
  userId: string | null;
  token: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  userId: null,
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.isAuthenticated = true;
      state.userId = action.payload;
      // In real app, you would store the token here
      state.token = 'dummy-token';
    },
    logout: state => {
      state.isAuthenticated = false;
      state.userId = null;
      state.token = null;
    },
  },
});

export const {login, logout} = authSlice.actions;
export default authSlice.reducer;
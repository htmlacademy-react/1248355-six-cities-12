import { createReducer } from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../../../consts/enum';
import { changeAuthStatus, setError, setLoading, setUser } from './api-actions';
import { AuthUser } from '../../../types/comments';

type InitialState = {
  error: string | null;
  isLoading: boolean;
  authorizationStatus: string;
  user: AuthUser;
}

const initialState: InitialState = {
  error: null,
  isLoading: false,
  authorizationStatus: AuthorizationStatus.Unknown,
  user: null
};

const apiReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    })
    .addCase(setLoading, (state, action) => {
      state.isLoading = action.payload;
    })
    .addCase(changeAuthStatus, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setUser, (state, action) => {
      state.user = action.payload;
    });
});

export { apiReducer };

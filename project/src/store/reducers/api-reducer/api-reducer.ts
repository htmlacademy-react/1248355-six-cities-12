import { createReducer } from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../../../consts/enum';
import { changeAuthStatus, setError, setLoading } from './api-actions';

type InitialState = {
  error: string | null;
  isLoading: boolean;
  authorizationStatus: string;
}

const initialState: InitialState = {
  error: null,
  isLoading: false,
  authorizationStatus: AuthorizationStatus.Unknown
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
    });
});

export { apiReducer };

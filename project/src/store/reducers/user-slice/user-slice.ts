import { createSlice } from '@reduxjs/toolkit';
import { AuthorizationStatus, NameSpace } from '../../../consts/enum';
import { authenticateUser, checkAuth, logUserOut } from '../../middlewares/thunk/thunk-actions';
import { AuthUser } from '../../../types/app';

type InitialState = {
  authorizationStatus: AuthorizationStatus;
  user: AuthUser;
}

const initialState: InitialState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  user: null
};

const userSlice = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(checkAuth.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.user = action.payload;
      })
      .addCase(authenticateUser.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.user = action.payload;
      })
      .addCase(authenticateUser.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(logUserOut.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.user = null;
      });
  }
});

export { userSlice };

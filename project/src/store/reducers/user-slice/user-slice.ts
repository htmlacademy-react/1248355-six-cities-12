import { createSlice } from '@reduxjs/toolkit';
import { AuthorizationStatus, NameSpace } from '../../../consts/enum';
import { authenticateUser, checkAuth, logUserOut, updateFavorite } from '../../middlewares/thunk/thunk-actions';
import { AuthUser } from '../../../types/app';
import { Offers } from '../../../types/offers';

type InitialState = {
  authorizationStatus: AuthorizationStatus;
  user: AuthUser | null;
  favorites: Offers;
}

const initialState: InitialState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  user: null,
  favorites: []
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
        state.user = action.payload.user;
        state.favorites = action.payload.favorites;
      })
      .addCase(authenticateUser.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.user = action.payload.user;
        state.favorites = action.payload.favorites;
      })
      .addCase(authenticateUser.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(logUserOut.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.user = null;
      })
      .addCase(updateFavorite.fulfilled, (state, action) => {
        if (action.payload.isFavorite) {
          state.favorites.push(action.payload);
        } else {
          state.favorites = state.favorites.filter((it) => it.id !== action.payload.id);
        }
      });
  }
});

export { userSlice, initialState };

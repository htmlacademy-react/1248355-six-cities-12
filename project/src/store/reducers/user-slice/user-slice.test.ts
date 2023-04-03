import { initialState, userSlice } from './user-slice';
import { authenticateUser, checkAuth, logUserOut, updateFavorite } from '../../middlewares/thunk/thunk-actions';
import { AuthorizationStatus } from '../../../consts/enum';
import { makeFakeOffer, makeFakeUser } from '../../../utils/mocks';

describe('Slice: useSlice', () => {
  const user = makeFakeUser();
  const favorites = [makeFakeOffer({ isFavorite: true }), makeFakeOffer({ isFavorite: true })];

  it('without additional parameters should return initial state', () => {
    expect(userSlice.reducer(initialState, { type: 'UNKNOWN_ACTION' }))
      .toEqual(initialState);
  });

  describe('checkAuth test', () => {
    it('should update authorizationStatus to "AUTH" if checkAuth fulfilled', () => {
      expect(userSlice.reducer(initialState, {
        type: checkAuth.fulfilled.type,
        payload: {
          user,
          favorites
        }
      }))
        .toEqual({
          ...initialState,
          authorizationStatus: AuthorizationStatus.Auth,
          user,
          favorites
        });
    });

    it('should update authorizationStatus to "NO_AUTH" if checkAuth rejected', () => {
      expect(userSlice.reducer(initialState, { type: checkAuth.rejected.type }))
        .toEqual({ ...initialState, authorizationStatus: AuthorizationStatus.NoAuth });
    });
  });

  describe('authentication test', () => {
    it('should update authorizationStatus to "AUTH" if authenticateUser fulfilled', () => {
      expect(userSlice.reducer(initialState, {
        type: authenticateUser.fulfilled.type,
        payload: {
          user,
          favorites
        }
      }))
        .toEqual({
          ...initialState,
          authorizationStatus: AuthorizationStatus.Auth,
          user,
          favorites
        });
    });

    it('should update authorizationStatus to "NO_AUTH" if authenticateUser rejected', () => {
      expect(userSlice.reducer(initialState, { type: authenticateUser.rejected.type }))
        .toEqual({ ...initialState, authorizationStatus: AuthorizationStatus.NoAuth });
    });
  });

  describe('logoutAction test', () => {
    it('should update authorizationStatus to "NO_AUTH" if logUserOut fulfilled', () => {
      expect(userSlice.reducer(initialState, { type: logUserOut.fulfilled.type }))
        .toEqual({ ...initialState, authorizationStatus: AuthorizationStatus.NoAuth, user: null });
    });
  });

  describe('updateFavorite test', () => {
    const favoriteOffer = makeFakeOffer({ isFavorite: true });
    const unFavoriteOffer = { ...favorites[0] };
    unFavoriteOffer.isFavorite = false;

    it('should update favorites if updateFavorite fulfilled', () => {
      expect(userSlice.reducer({ ...initialState, favorites }, {
        type: updateFavorite.fulfilled.type,
        payload: favoriteOffer
      }))
        .toEqual({
          ...initialState,
          favorites: [...favorites, favoriteOffer]
        });
    });

    it('should remove favorite if updateFavorite fulfilled', () => {
      expect(userSlice.reducer({ ...initialState, favorites }, {
        type: updateFavorite.fulfilled.type,
        payload: unFavoriteOffer
      }))
        .toEqual({
          ...initialState,
          favorites: [favorites[1]]
        });
    });
  });
});

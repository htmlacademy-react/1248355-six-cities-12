import { APIRoute, City } from '../consts/enum';
import { Login, UpdateFavorite } from '../types/app';
import { redirectBack } from '../store/middlewares/redirect/actions';
import { AUTH_TOKEN_KEY_NAME } from '../consts/app';
import { makeFakeComment, makeFakeOffer } from '../utils/mocks';
import { NewComment } from '../types/comments';
import { createMockStoreWithAPI } from '../utils/jest';
import {
  authenticateUser,
  checkAuth,
  createComment,
  fetchOffers,
  initOfferActions,
  logUserOut,
  updateFavorite
} from '../store/middlewares/thunk/thunk-actions';

const { fakeStore: store, mockAPI } = createMockStoreWithAPI({});

describe('Async actions', () => {
  it('should authorization status is «auth» and fetch favorites when server return 200', async () => {
    mockAPI
      .onGet(APIRoute.Login)
      .reply(200, []);

    mockAPI
      .onGet(APIRoute.Favorites)
      .reply(200, []);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(checkAuth());

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      checkAuth.pending.type,
      checkAuth.fulfilled.type
    ]);
  });

  it('should dispatch authenticateUser, fetch favorites and redirectBack when POST /login', async () => {
    const fakeUser: Login = { email: 'test@test.ru', password: '123456' };
    const fakeToken = 'secret';

    mockAPI
      .onPost(APIRoute.Login)
      .reply(200, { token: fakeToken });

    mockAPI
      .onGet(APIRoute.Favorites)
      .reply(200, []);

    Storage.prototype.setItem = jest.fn();

    store.clearActions();

    await store.dispatch(authenticateUser(fakeUser));

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      authenticateUser.pending.type,
      redirectBack.type,
      authenticateUser.fulfilled.type
    ]);

    expect(Storage.prototype.setItem).toBeCalledTimes(1);
    expect(Storage.prototype.setItem).toBeCalledWith(AUTH_TOKEN_KEY_NAME, fakeToken);
  });

  it('should dispatch Logout when Delete /logout', async () => {
    mockAPI
      .onDelete(APIRoute.Logout)
      .reply(204);

    store.clearActions();

    Storage.prototype.removeItem = jest.fn();

    await store.dispatch(logUserOut());

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      logUserOut.pending.type,
      logUserOut.fulfilled.type
    ]);

    expect(Storage.prototype.removeItem).toBeCalledTimes(1);
    expect(Storage.prototype.removeItem).toBeCalledWith(AUTH_TOKEN_KEY_NAME);
  });

  it('should dispatch fetchOffers when GET /offers', async () => {
    const mockOffers = [makeFakeOffer({}), makeFakeOffer({})];

    mockAPI
      .onGet(APIRoute.Offers)
      .reply(200, mockOffers);

    store.clearActions();

    await store.dispatch(fetchOffers(City.Paris));

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      fetchOffers.pending.type,
      fetchOffers.fulfilled.type
    ]);
  });

  it('should dispatch updateFavorite when Post /offer/id/0', async () => {
    const fakeOffer = makeFakeOffer({});
    const fakeUpdate: UpdateFavorite = { id: 6, isFavorite: false };

    mockAPI
      .onPost(`${APIRoute.Favorites}/${fakeUpdate.id}/${Number(fakeUpdate.isFavorite)}`)
      .reply(200, fakeOffer);

    store.clearActions();

    await store.dispatch(updateFavorite(fakeUpdate));

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      updateFavorite.pending.type,
      updateFavorite.fulfilled.type
    ]);
  });

  it('should dispatch createComment when Post /comment', async () => {
    const fakeId = 1;
    const fakeComment: NewComment = { comment: 'test', id: fakeId, rating: 1 };

    mockAPI
      .onPost(`${APIRoute.Comments}/${fakeId}`)
      .reply(200, fakeComment);

    store.clearActions();

    await store.dispatch(createComment(fakeComment));

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      createComment.pending.type,
      createComment.fulfilled.type
    ]);
  });

  it('should dispatch initOffer when GET /offer GET /nearOffers GET /comments', async () => {
    const fakeOffers = [makeFakeOffer({}), makeFakeOffer({})];
    const fakeOffer = makeFakeOffer({});
    const fakeComment = makeFakeComment();
    const fakeId = '3';

    mockAPI
      .onGet(`${APIRoute.Offers}/${fakeId}`)
      .reply(200, fakeOffer);

    mockAPI
      .onGet(`${APIRoute.Comments}/${fakeId}`)
      .reply(200, fakeComment);

    mockAPI
      .onGet(`${APIRoute.Offers}/${fakeId}/nearby`)
      .reply(200, fakeOffers);

    store.clearActions();

    await store.dispatch(initOfferActions(fakeId));

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      initOfferActions.pending.type,
      initOfferActions.fulfilled.type
    ]);
  });
});

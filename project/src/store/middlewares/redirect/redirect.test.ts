import { redirect } from './redirect';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { RootState } from '../../../types/store';
import { AnyAction } from '@reduxjs/toolkit';
import { AppRoute } from '../../../consts/enum';
import { redirectBack } from './actions';

type FakeHistory = {
  location: { pathname: string[] };
  push: (path: string) => void;
  back: () => void;
}

const fakeHistory: FakeHistory = {
  location: { pathname: [] },
  push(path) {
    this.location.pathname.push(path);
  },

  back() {
    this.location.pathname.pop();
  }
};

jest.mock('../../../utils/browser-history', () => ({
  __esModule: true,
  browserHistory: fakeHistory,
}));

const middlewares = [redirect];
const mockStore = configureMockStore<RootState, AnyAction>(middlewares);
const store = mockStore();

describe('Middleware: redirect', () => {
  beforeEach(() => {
    fakeHistory.push(AppRoute.Favorites);
  });

  it('should be redirect to /login', () => {
    fakeHistory.push(AppRoute.Root);
    store.dispatch(redirectBack());
    expect(fakeHistory.location.pathname).toContainEqual(AppRoute.Favorites);
  });

  it('should not to be redirect if action not redirect', () => {
    store.dispatch({ type: 'UNKNOWN_ACTION' });
    expect(fakeHistory.location.pathname).toContainEqual(AppRoute.Favorites);
  });
});

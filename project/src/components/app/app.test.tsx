import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import App from './app';
import { AppRoute, AuthorizationStatus, City, NameSpace } from '../../consts/enum';
import HistoryRouter from '../history-router/history-router';
import { RootState } from '../../types/store';
import { createAPI } from '../../services/api';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { makeFakeComment, makeFakeOffer } from '../../utils/mocks';
import { generatePath } from 'react-router-dom';

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];

const mockStore = configureMockStore<
  RootState,
  Action<string>,
  ThunkDispatch<RootState, typeof api, Action<string>>
>(middlewares);

const store = mockStore({
  [NameSpace.User]: {
    authorizationStatus: AuthorizationStatus.Auth,
    favorites: [makeFakeOffer({ city: City.Paris })]
  },
  [NameSpace.Cities]: {
    filteredOffers: [makeFakeOffer({ city: City.Paris })],
    activeOfferId: 1,
    sortedOffers: [makeFakeOffer({ city: City.Paris })],
    sourceOffers: [makeFakeOffer({ city: City.Paris })]
  },
  [NameSpace.DataStatus]: {},
  [NameSpace.Offer]: {
    nearOffers: [makeFakeOffer({ city: City.Paris })],
    comments: [makeFakeComment()],
    offer: makeFakeOffer({ city: City.Paris })
  }
});

const history = createMemoryHistory();

const fakeApp = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <App/>
    </HistoryRouter>
  </Provider>
);

describe('Application Routing', () => {
  it('should render "MainScreen" when user navigate to "/"', () => {
    history.push(AppRoute.Root);

    render(fakeApp);

    expect(screen.getByText(new RegExp(`places to stay in ${City.Paris}`, 'i'))).toBeInTheDocument();
  });

  it('should render "MainScreen" when user navigate to "/city/city"', () => {
    history.push(generatePath(AppRoute.City, { city: City.Paris }));

    render(fakeApp);

    expect(screen.getByText(new RegExp(`places to stay in ${City.Paris}`, 'i'))).toBeInTheDocument();
  });

  it('should render "OfferScreen" when user navigate to "/offer"', () => {
    history.push(generatePath(AppRoute.Offer, { id: '1' }));
    window.scrollTo = jest.fn();

    render(fakeApp);

    expect(screen.getByText(/What's inside/i)).toBeInTheDocument();
    expect(screen.getByText(/Meet the host/i)).toBeInTheDocument();
  });

  it('should render "FavoritesScreen" when user navigate to "/favorites"', () => {
    history.push(AppRoute.Favorites);

    render(fakeApp);

    expect(screen.getByText(/Saved listing/i)).toBeInTheDocument();
    expect(screen.getByText(/Paris/i)).toBeInTheDocument();
  });

  it('should render "LoginScreen" when user navigate to "/login-forms"', () => {
    const state = store.getState();

    state[NameSpace.User] = {
      authorizationStatus: AuthorizationStatus.NoAuth,
      favorites: [makeFakeOffer({ city: City.Paris })]
    };

    history.push(AppRoute.Login);

    render(fakeApp);

    expect(screen.getByLabelText(/E-mail/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
  });

  it('should render "NotFoundScreen" when user navigate to non-existent route', () => {
    history.push('/non-existent-route');

    render(fakeApp);

    expect(screen.getByText('404. Page not found')).toBeInTheDocument();
    expect(screen.getByText('Вернуться на главную')).toBeInTheDocument();
  });
});

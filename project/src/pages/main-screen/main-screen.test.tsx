import {createMockStoreWithAPI, deferred, ProviderWrapper, RoutesWrapper} from '../../utils/jest';
import {render, screen} from '@testing-library/react';
import {DeepPartial} from '@reduxjs/toolkit';
import {RootState} from '../../types/store';
import {APIRoute, AppRoute, AuthorizationStatus, City, NameSpace} from '../../consts/enum';
import {makeFakeOffer, makeFakeUser} from '../../utils/mocks';
import MainScreen from './main-screen';
import {createMemoryHistory} from 'history';
import {generatePath} from 'react-router-dom';
import {act} from 'react-dom/test-utils';

const fakeState: DeepPartial<RootState> = {
  [NameSpace.DataStatus]: {
    isLoading: false,
  },
  [NameSpace.User]: {
    authorizationStatus: AuthorizationStatus.Auth,
    favorites: [makeFakeOffer({})],
    user: makeFakeUser()
  },
  [NameSpace.Cities]:
    {
      filteredOffers: [makeFakeOffer({}), makeFakeOffer({})],
      sortedOffers: [makeFakeOffer({})],
      activeOfferId: 1,
      sourceOffers: [makeFakeOffer({})]
    }
};

const {fakeStore, mockAPI} = createMockStoreWithAPI(fakeState);
const history = createMemoryHistory();

describe('Component: MainScreen', () => {
  it('should render correctly', () => {
    render(
      <ProviderWrapper fakeStore={fakeStore} fakeHistory={history}>
        <RoutesWrapper jsxElement={<MainScreen/>} path={AppRoute.City}/>
      </ProviderWrapper>);


    expect(screen.getByText('2 places to stay in Paris')).toBeInTheDocument();
    expect(screen.getByText('Sort by')).toBeInTheDocument();
    expect(screen.getByRole('link', {name: 'Leaflet'})).toBeInTheDocument();
    expect(screen.getAllByAltText('Marker')).toHaveLength(fakeState[NameSpace.Cities]?.filteredOffers?.length as number);
  });

  it('should render empty list correctly', () => {
    fakeStore.getState()[NameSpace.Cities] = {
      filteredOffers: []
    };

    render(
      <ProviderWrapper fakeStore={fakeStore} fakeHistory={history}>
        <RoutesWrapper jsxElement={<MainScreen/>} path={generatePath(AppRoute.City, {city: City.Paris})}/>
      </ProviderWrapper>);


    expect(screen.getByText('No places to stay available')).toBeInTheDocument();
  });

  it('should render not found screen if no city in path', () => {
    fakeStore.getState()[NameSpace.Cities] = {
      filteredOffers: []
    };

    history.push(generatePath(AppRoute.City, {city: 'test'}));

    render(
      <ProviderWrapper fakeStore={fakeStore} fakeHistory={history}>
        <RoutesWrapper jsxElement={<MainScreen/>} path={AppRoute.City}/>
      </ProviderWrapper>);


    expect(screen.getByText('Вернуться на главную')).toBeInTheDocument();
  });

  it('should render error screen if dispatch rejected', async () => {
    fakeStore.getState()[NameSpace.Cities] = {
      filteredOffers: []
    };

    mockAPI
      .onGet(APIRoute.Offers)
      .reply(400);

    history.push(generatePath(AppRoute.City, {city: City.Paris}));

    render(
      <ProviderWrapper fakeStore={fakeStore} fakeHistory={history}>
        <RoutesWrapper jsxElement={<MainScreen/>} path={AppRoute.City}/>
      </ProviderWrapper>);

    const {resolve, promise} = deferred();

    await act(async () => {
      resolve(null);
      await promise;
    });

    expect(screen.getByText('Error happened while loading data')).toBeInTheDocument();
  });
});

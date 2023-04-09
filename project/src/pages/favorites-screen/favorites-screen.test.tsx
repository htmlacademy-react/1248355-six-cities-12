import { AuthorizationStatus, City, NameSpace } from '../../consts/enum';
import { createMockStoreWithAPI, ProviderWrapper } from '../../utils/jest';
import { render, screen } from '@testing-library/react';
import FavoritesScreen from './favorites-screen';
import { makeFakeOffer } from '../../utils/mocks';

describe('Component: FavoritesScreen', () => {
  it('should render "FavoritesScreen" properly', () => {
    const fakeState = {
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.Auth,
        favorites: [makeFakeOffer({ city: City.Amsterdam })]
      }
    };
    const { fakeStore } = createMockStoreWithAPI(fakeState);

    render(
      <ProviderWrapper fakeStore={fakeStore}>
        <FavoritesScreen/>
      </ProviderWrapper>
    );

    expect(screen.getByText(/Saved listing/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Amsterdam' })).toBeInTheDocument();
  });

  it('should render "FavoritesScreenEmpty" properly', () => {
    const fakeState = {
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.Auth,
        favorites: []
      }
    };
    const { fakeStore } = createMockStoreWithAPI(fakeState);

    render(
      <ProviderWrapper fakeStore={fakeStore}>
        <FavoritesScreen/>
      </ProviderWrapper>
    );

    expect(screen.getByText(/Nothing yet saved/i)).toBeInTheDocument();
  });
});

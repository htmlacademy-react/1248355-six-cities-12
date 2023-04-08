import { AuthorizationStatus, City, NameSpace } from '../../consts/enum';
import { createMockStoreWithAPI, ProviderWrapper } from '../../utils/jest';
import { render, screen } from '@testing-library/react';
import FavoritesScreen from './favorites-screen';
import { makeFakeOffer } from '../../utils/mocks';

const fakeState = {
  [NameSpace.User]: {
    authorizationStatus: AuthorizationStatus.Auth,
    favorites: [makeFakeOffer({ city: City.Paris })]
  }
};
const { fakeStore } = createMockStoreWithAPI(fakeState);

describe('Component: FavoritesScreen', () => {
  it('should render "FavoritesScreen" properly', () => {
    render(
      <ProviderWrapper fakeStore={fakeStore}>
        <FavoritesScreen/>
      </ProviderWrapper>
    );

    expect(screen.getByText(/Saved listing/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Paris' })).toBeInTheDocument();
  });

  it('should render "FavoritesScreenEmpty" properly', () => {
    fakeStore.getState()[NameSpace.User] = {
      favorites: []
    };

    render(
      <ProviderWrapper fakeStore={fakeStore}>
        <FavoritesScreen/>
      </ProviderWrapper>
    );

    expect(screen.getByText(/Nothing yet saved/i)).toBeInTheDocument();
  });
});

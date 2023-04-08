import { render, screen } from '@testing-library/react';
import { createMockStoreWithAPI, ProviderWrapper } from '../../../utils/jest';
import FavoritePlaces from './favorite-places';
import { makeFakeOffer } from '../../../utils/mocks';
import { DeepPartial } from '@reduxjs/toolkit';
import { RootState } from '../../../types/store';
import { AuthorizationStatus, NameSpace } from '../../../consts/enum';

const fakeState: DeepPartial<RootState> = {
  [NameSpace.User]: {
    authorizationStatus: AuthorizationStatus.Auth
  },
};
const { fakeStore } = createMockStoreWithAPI(fakeState);

describe('Component: FavoritePlaces', () => {
  it('should render FavoritesList properly', () => {
    const offers = [makeFakeOffer({})];

    render(
      <ProviderWrapper fakeStore={fakeStore}>
        <FavoritePlaces offers={[makeFakeOffer({})]}/>
      </ProviderWrapper>
    );

    expect(screen.getAllByText(/rating/i)).toHaveLength(offers.length);
  });
});

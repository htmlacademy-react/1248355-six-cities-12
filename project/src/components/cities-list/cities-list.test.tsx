import { DeepPartial } from '@reduxjs/toolkit';
import { RootState } from '../../types/store';
import { AuthorizationStatus, NameSpace } from '../../consts/enum';
import { makeFakeOffer } from '../../utils/mocks';
import { createMockStoreWithAPI, ProviderWrapper } from '../../utils/jest';
import { render, screen } from '@testing-library/react';
import CitiesList from './cities-list';

const fakeState: DeepPartial<RootState> = {
  [NameSpace.User]: {
    authorizationStatus: AuthorizationStatus.Auth
  },
  [NameSpace.Cities]: {
    sortedOffers: [makeFakeOffer({}), makeFakeOffer({})]
  },
};
const { fakeStore } = createMockStoreWithAPI(fakeState);

describe('Component: CitiesList', () => {
  it('should render correctly', () => {
    render(
      <ProviderWrapper fakeStore={fakeStore}>
        <CitiesList/>
      </ProviderWrapper>
    );

    const commentCount = fakeState[NameSpace.Cities]?.sortedOffers?.length as number;

    expect(screen.getAllByText(/rating/i)).toHaveLength(commentCount);
  });
});

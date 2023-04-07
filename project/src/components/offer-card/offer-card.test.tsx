import { DeepPartial } from '@reduxjs/toolkit';
import { RootState } from '../../types/store';
import { AuthorizationStatus, NameSpace, OfferCardVariant } from '../../consts/enum';
import { createMockStoreWithAPI, ProviderWrapper } from '../../utils/jest';
import { render, screen } from '@testing-library/react';
import OfferCard from './offer-card';
import { makeFakeOffer } from '../../utils/mocks';
import userEvent from '@testing-library/user-event';

const fakeState: DeepPartial<RootState> = {
  [NameSpace.User]: {
    authorizationStatus: AuthorizationStatus.NoAuth
  }
};
const { fakeStore } = createMockStoreWithAPI(fakeState);

describe('Component: OfferCard', () => {
  it('should render correctly', () => {
    render(
      <ProviderWrapper fakeStore={fakeStore}>
        <OfferCard variant={OfferCardVariant.Cities} offer={makeFakeOffer({})}/>
      </ProviderWrapper>
    );

    expect(screen.getByAltText(/place/i)).toBeInTheDocument();
    expect(screen.getByText(/rating/i)).toBeInTheDocument();
    expect(screen.getByText(/to bookmarks/i)).toBeInTheDocument();
  });

  it('should dispatch id on mouse over', async () => {
    render(
      <ProviderWrapper fakeStore={fakeStore}>
        <OfferCard variant={OfferCardVariant.Cities} offer={makeFakeOffer({})}/>
      </ProviderWrapper>
    );

    const card = screen.getByTestId('card');

    await userEvent.hover(card);

    expect(fakeStore.getActions()).toHaveLength(1);
  });
});

import { DeepPartial } from '@reduxjs/toolkit';
import { RootState } from '../../types/store';
import { APIRoute, AppRoute, AuthorizationStatus, NameSpace } from '../../consts/enum';
import { makeFakeComment, makeFakeOffer, makeFakeUser } from '../../utils/mocks';
import { createMockStoreWithAPI, deferred, ProviderWrapper, RoutesWrapper } from '../../utils/jest';
import { render, screen } from '@testing-library/react';
import OfferScreen from './offer-screen';
import { createMemoryHistory } from 'history';
import { generatePath } from 'react-router-dom';
import { act } from 'react-dom/test-utils';

const fakeState: DeepPartial<RootState> = {
  [NameSpace.DataStatus]: {
    isLoading: false,
  },
  [NameSpace.User]: {
    authorizationStatus: AuthorizationStatus.Auth,
    favorites: [makeFakeOffer({})],
    user: makeFakeUser()
  },
  [NameSpace.Offer]:
    {
      offer: makeFakeOffer({}),
      comments: [makeFakeComment()],
      nearOffers: [makeFakeOffer({})]
    },
  [NameSpace.Cities]:
    {
      filteredOffers: [makeFakeOffer({}), makeFakeOffer({})],
      sortedOffers: [makeFakeOffer({})],
      activeOfferId: 1,
      sourceOffers: [makeFakeOffer({})]
    }
};

const { fakeStore, mockAPI } = createMockStoreWithAPI(fakeState);
const history = createMemoryHistory();

describe('Component: OfferScreen', () => {
  it('should render correctly', () => {
    window.scrollTo = jest.fn();

    render(
      <ProviderWrapper fakeStore={fakeStore}>
        <OfferScreen/>
      </ProviderWrapper>
    );

    let markerCount = fakeState[NameSpace.Offer]?.nearOffers?.length as number;
    const activeOffer = Number(true);
    markerCount += activeOffer;

    expect(screen.getByText('Meet the host')).toBeInTheDocument();
    expect(screen.getByText(/What's inside/i)).toBeInTheDocument();
    expect(screen.getByLabelText('Your review')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Leaflet' })).toBeInTheDocument();
    expect(screen.getAllByAltText('Marker')).toHaveLength(markerCount);
  });

  it('should render not found screen if no offer', async () => {
    mockAPI
      .onGet(`${APIRoute.Offers}/1`)
      .reply(404);

    history.push(generatePath(AppRoute.Offer, { id: '1' }));

    render(
      <ProviderWrapper fakeStore={fakeStore} fakeHistory={history}>
        <RoutesWrapper jsxElement={<OfferScreen/>} path={AppRoute.Offer} isMain={false}/>
      </ProviderWrapper>);

    const { resolve, promise } = deferred();

    await act(async () => {
      resolve(null);
      await promise;
    });

    expect(screen.getByText('Вернуться на главную')).toBeInTheDocument();
  });

  it('should render spinner correctly', () => {
    fakeState[NameSpace.DataStatus] = {
      isLoading: true
    };

    render(
      <ProviderWrapper fakeStore={fakeStore}>
        <OfferScreen/>
      </ProviderWrapper>
    );

    expect(screen.getByRole('presentation')).toBeInTheDocument();
  });
});

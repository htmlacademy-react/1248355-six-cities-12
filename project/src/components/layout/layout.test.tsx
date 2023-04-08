import { render, screen } from '@testing-library/react';
import { createMockStoreWithAPI, ProviderWrapper } from '../../utils/jest';
import { AppRoute, AuthorizationStatus, LayoutClassName, NameSpace } from '../../consts/enum';
import { DeepPartial } from '@reduxjs/toolkit';
import { RootState } from '../../types/store';
import { makeFakeOffer } from '../../utils/mocks';
import Layout from './layout';
import { createMemoryHistory } from 'history';

const fakeState: DeepPartial<RootState> = {
  [NameSpace.User]: {
    authorizationStatus: AuthorizationStatus.Auth,
    favorites: [makeFakeOffer({})]
  },
};
const { fakeStore } = createMockStoreWithAPI(fakeState);
const history = createMemoryHistory();

describe('Component: Layout', () => {
  it('should render correctly', () => {
    history.push(AppRoute.Login);

    render(
      <ProviderWrapper fakeStore={fakeStore} fakeHistory={history}>
        <Layout/>
      </ProviderWrapper>
    );

    expect(screen.getByTestId('layout')).toHaveClass(LayoutClassName.Login);
  });

  it('should render favorites route  correctly', () => {
    history.push(AppRoute.Favorites);

    fakeState[NameSpace.User] = {
      favorites: []
    };

    render(
      <ProviderWrapper fakeStore={fakeStore} fakeHistory={history}>
        <Layout/>
      </ProviderWrapper>
    );

    expect(screen.getByTestId('layout')).toHaveClass(LayoutClassName.EmptyFavorites);
  });
});

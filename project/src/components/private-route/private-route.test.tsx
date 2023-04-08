import { DeepPartial } from '@reduxjs/toolkit';
import { RootState } from '../../types/store';
import { AppRoute, AuthorizationStatus, NameSpace } from '../../consts/enum';
import { createMockStoreWithAPI, ProviderWrapper, RoutesWrapper } from '../../utils/jest';
import { render, screen } from '@testing-library/react';
import PrivateRoute from './private-route';
import { createMemoryHistory } from 'history';

const fakeState: DeepPartial<RootState> = {
  [NameSpace.User]: {
    authorizationStatus: AuthorizationStatus.Auth
  }
};
const { fakeStore } = createMockStoreWithAPI(fakeState);
const history = createMemoryHistory();

describe('Component: PrivateRoute', () => {
  it('should render children if auth', () => {
    history.push(AppRoute.Favorites);

    render(
      <ProviderWrapper fakeStore={fakeStore} fakeHistory={history}>
        <RoutesWrapper
          isMain={false}
          jsxElement={
            <PrivateRoute>
              <div>Hello world!</div>
            </PrivateRoute>
          } path={AppRoute.Favorites}
        />
      </ProviderWrapper>
    );


    expect(screen.getByText('Hello world!')).toBeInTheDocument();
  });

  it('should redirect if noAuth', () => {
    history.push(AppRoute.Favorites);

    fakeState[NameSpace.User] = {
      authorizationStatus: AuthorizationStatus.NoAuth
    };

    render(
      <ProviderWrapper fakeStore={fakeStore} fakeHistory={history}>
        <RoutesWrapper
          isMain={false}
          jsxElement={
            <PrivateRoute>
              <div>Hello world!</div>
            </PrivateRoute>
          } path={AppRoute.Favorites}
        />
      </ProviderWrapper>
    );

    expect(screen.getByText('not found')).toBeInTheDocument();
  });
});

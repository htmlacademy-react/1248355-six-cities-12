import { render, screen } from '@testing-library/react';
import LoginScreen from './login-screen';
import { AppRoute, AuthorizationStatus, NameSpace } from '../../consts/enum';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { createMockStoreWithAPI, ProviderWrapper, RoutesWrapper } from '../../utils/jest';

const fakeState = { [NameSpace.User]: { authorizationStatus: AuthorizationStatus.NoAuth } };
const { fakeStore } = createMockStoreWithAPI(fakeState);

describe('Component: LoginScreen', () => {
  it('should render "LoginScreen" when user navigate to "login" url', async () => {
    render(
      <ProviderWrapper fakeStore={fakeStore}>
        <LoginScreen/>
      </ProviderWrapper>
    );

    expect(screen.getByLabelText(/E-mail/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();

    await act(async () => await userEvent.type(screen.getByTestId('e-mail'), 'keks'));
    await act(async () => await userEvent.type(screen.getByTestId('password'), 'a123456'));

    expect(screen.getByDisplayValue(/keks/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/a123456/i)).toBeInTheDocument();
  });

  it('shouldn\'t show if authorized', () => {
    const state = fakeStore.getState();

    state[NameSpace.User] = {
      authorizationStatus: AuthorizationStatus.Auth
    };

    render(
      <ProviderWrapper fakeStore={fakeStore}>
        <RoutesWrapper jsxElement={<LoginScreen/>} path={AppRoute.Login} isMain={false}/>
      </ProviderWrapper>
    );

    expect(screen.getByText(/main page/i)).toBeInTheDocument();
  });
});

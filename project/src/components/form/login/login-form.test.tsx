import { render, screen } from '@testing-library/react';
import { createMockStoreWithAPI, ProviderWrapper } from '../../../utils/jest';
import LoginForm from './login-form';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import { APIRoute } from '../../../consts/enum';
import { authenticateUser } from '../../../store/middlewares/thunk/thunk-actions';
import { Login } from '../../../types/app';

const { fakeStore, mockAPI } = createMockStoreWithAPI({});
const fakeToken = 'secret';
let formData: Login;

mockAPI
  .onPost(APIRoute.Login)
  .reply(200, { token: fakeToken });

mockAPI
  .onGet(APIRoute.Favorites)
  .reply(200, []);

describe('Component: LoginForm', () => {
  it('should render correctly', () => {
    render(
      <ProviderWrapper>
        <LoginForm/>
      </ProviderWrapper>
    );

    expect(screen.getByLabelText(/e-mail/i)).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: 'E-mail' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Sign in' })).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  it('should type values into login form and submit it', async () => {
    render(
      <ProviderWrapper fakeStore={fakeStore}>
        <LoginForm/>
      </ProviderWrapper>
    );

    const email = screen.getByRole('textbox', { name: 'E-mail' });
    const password = screen.getByTestId('password');
    const signInBtn = screen.getByRole('button', { name: 'Sign in' });

    await act(async () => await userEvent.type(email, 'keks'));
    await act(async () => await userEvent.type(password, 'a123456'));

    expect(screen.getByDisplayValue(/keks/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/a123456/i)).toBeInTheDocument();

    await act(async () => await userEvent.click(signInBtn));

    const action = fakeStore.getActions()[0];

    if (authenticateUser.pending.match(action)) {
      formData = action.meta.arg;
    }

    expect({ email: 'keks', password: 'a123456' }).toEqual(formData);
  });
});

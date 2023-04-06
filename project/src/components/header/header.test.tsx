import {render, screen} from '@testing-library/react';
import {createMockStoreWithAPI, ProviderWrapper} from '../../utils/jest';
import Header from './header';
import {RootState} from '../../types/store';
import {AuthorizationStatus, NameSpace} from '../../consts/enum';
import {DeepPartial} from '@reduxjs/toolkit';
import {makeFakeUser} from '../../utils/mocks';
import userEvent from '@testing-library/user-event';



describe('Component: Header', () => {
  const fakeState: DeepPartial<RootState> = {
    [NameSpace.User]: {
      authorizationStatus: AuthorizationStatus.Auth,
      user: makeFakeUser(),
      favorites: []
    }
  };

  const {fakeStore} = createMockStoreWithAPI(fakeState);

  it('should render correctly', () => {
    render(
      <ProviderWrapper fakeStore={fakeStore}>
        <Header isLoginRoute={false}/>
      </ProviderWrapper>
    );

    expect(screen.getByAltText('6 cities logo')).toBeInTheDocument();
    expect(screen.getByText(/@/)).toBeInTheDocument();
    expect(screen.getByText('Sign out')).toBeInTheDocument();
  });

  it('should sign out upon pressing sign out link', async () => {
    render(
      <ProviderWrapper fakeStore={fakeStore}>
        <Header isLoginRoute={false}/>
      </ProviderWrapper>
    );

    await userEvent.click(screen.getByText('Sign out'));

    const actions = fakeStore.getActions();

    expect(actions).toHaveLength(2);
  });
});

import { DeepPartial } from '@reduxjs/toolkit';
import { RootState } from '../../types/store';
import { APIRoute, AppRoute, AuthorizationStatus, BookmarkButtonVariant, NameSpace } from '../../consts/enum';
import { createMockStoreWithAPI, ProviderWrapper } from '../../utils/jest';
import { render, screen } from '@testing-library/react';
import BookmarkButton from './bookmark-button';
import { Route, Routes } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

const fakeState: DeepPartial<RootState> = {
  [NameSpace.User]: {
    authorizationStatus: AuthorizationStatus.NoAuth
  }
};
const { fakeStore, mockAPI } = createMockStoreWithAPI(fakeState);
const isFavorite = false;
const id = 1;

mockAPI
  .onPost(`${APIRoute.Favorites}/${id}/${Number(!isFavorite)}`)
  .reply(200);

describe('Component: BookmarkButton', () => {
  it('should render correctly', () => {
    render(
      <ProviderWrapper fakeStore={fakeStore}>
        <BookmarkButton variant={BookmarkButtonVariant.Card} isFavorite={isFavorite} id={id}/>
      </ProviderWrapper>
    );

    expect(screen.getByText('To bookmarks')).toBeInTheDocument();
  });

  it('should redirect if not Auth', async () => {
    render(
      <ProviderWrapper fakeStore={fakeStore}>
        <Routes>
          <Route
            path='/'
            element={
              <BookmarkButton
                variant={BookmarkButtonVariant.Card}
                isFavorite={isFavorite}
                id={id}
              />
            }
          />
          <Route
            path={AppRoute.Login}
            element={
              <h2>Hello world!</h2>
            }
          />
        </Routes>
      </ProviderWrapper>
    );

    await act(async () => await userEvent.click(screen.getByRole('button')));

    expect(screen.getByText('Hello world!')).toBeInTheDocument();
  });

  it('should have !isFavorite if dispatch fulfilled', async () => {
    fakeState[NameSpace.User] = {
      authorizationStatus: AuthorizationStatus.Auth
    };

    render(
      <ProviderWrapper fakeStore={fakeStore}>
        <BookmarkButton variant={BookmarkButtonVariant.Card} isFavorite={isFavorite} id={id}/>
      </ProviderWrapper>
    );

    const button = screen.getByRole('button');

    await act(async () => await userEvent.click(button));

    expect(button).toHaveClass('place-card__bookmark-button--active');
  });
});

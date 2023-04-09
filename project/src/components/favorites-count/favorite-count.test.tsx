import { render, screen } from '@testing-library/react';
import { createMockStoreWithAPI, ProviderWrapper } from '../../utils/jest';
import FavoritesCount from './favorites-count';
import { DeepPartial } from '@reduxjs/toolkit';
import { RootState } from '../../types/store';
import { NameSpace } from '../../consts/enum';

describe('Component: FavoritesCount', () => {
  it('should render correctly', () => {
    const fakeState: DeepPartial<RootState> = {
      [NameSpace.User]: {
        favorites: [{}, {}, {}]
      }
    };

    const { fakeStore } = createMockStoreWithAPI(fakeState);

    render(
      <ProviderWrapper fakeStore={fakeStore}>
        <FavoritesCount/>
      </ProviderWrapper>
    );

    const favoritesLength = fakeState[NameSpace.User]?.favorites?.length as number;

    expect(screen.getByText(`${favoritesLength}`)).toBeInTheDocument();
  });
});

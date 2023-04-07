import { City } from '../../consts/enum';
import { ProviderWrapper } from '../../utils/jest';
import { render, screen } from '@testing-library/react';
import FavoritesList from './favorites-list';

describe('Component: FavoritesList', () => {
  it('should render FavoritesList properly', () => {
    render(
      <ProviderWrapper>
        <FavoritesList favorites={[{ city: City.Amsterdam, cityOffers: [] }]}/>
      </ProviderWrapper>
    );

    expect(screen.getByText(`${City.Amsterdam}`)).toBeInTheDocument();
  });
});

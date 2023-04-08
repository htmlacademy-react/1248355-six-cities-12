import { render, screen } from '@testing-library/react';
import MainEmptyScreen from './main-empty-screen';
import { ProviderWrapper } from '../../utils/jest';

describe('Component: MainEmptyScreen', () => {
  it('should render correctly', () => {
    render(
      <ProviderWrapper>
        <MainEmptyScreen/>
      </ProviderWrapper>
    );

    expect(screen.getByText('No places to stay available')).toBeInTheDocument();
  });
});

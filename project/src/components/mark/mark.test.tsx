import { render, screen } from '@testing-library/react';
import { Block } from '../../consts/enum';
import Mark from './mark';

describe('Component: Mark', () => {
  it('should render correctly', () => {
    render(
      <Mark block={Block.NearPlaces}/>
    );

    expect(screen.getByText('Premium')).toBeInTheDocument();
  });
});

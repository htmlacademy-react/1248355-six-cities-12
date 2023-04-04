import { render, screen } from '@testing-library/react';
import { Block } from '../../consts/enum';
import HistoryRouter from '../history-router/history-router';
import { createMemoryHistory } from 'history';
import Mark from './mark';

describe('Component: Price', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <HistoryRouter history={history}>
        <Mark block={Block.NearPlaces}/>
      </HistoryRouter>
    );

    expect(screen.getByText('Premium')).toBeInTheDocument();
  });
});

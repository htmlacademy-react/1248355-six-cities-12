import { render, screen } from '@testing-library/react';
import { Block } from '../../consts/enum';
import HistoryRouter from '../history-router/history-router';
import { createMemoryHistory } from 'history';
import Price from './price';

describe('Component: Price', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    const fakePrice = 100;

    render(
      <HistoryRouter history={history}>
        <Price block={Block.Cities} price={fakePrice}/>
      </HistoryRouter>
    );

    expect(screen.getByText(/€\d+/)).toBeInTheDocument();
  });
});

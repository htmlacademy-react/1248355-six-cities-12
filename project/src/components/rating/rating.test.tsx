import { Block } from '../../consts/enum';
import HistoryRouter from '../history-router/history-router';
import { createMemoryHistory } from 'history';
import Rating from './rating';
import { render, screen } from '@testing-library/react';

describe('Component: Rating', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    const rating = 2;

    render(
      <HistoryRouter history={history}>
        <Rating block={Block.Cities} rating={rating}/>
      </HistoryRouter>
    );

    expect(screen.getByText('Rating')).toBeInTheDocument();
  });
});

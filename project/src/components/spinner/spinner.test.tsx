import HistoryRouter from '../history-router/history-router';
import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import Spinner from './spinner';

describe('Component: Spinner', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <HistoryRouter history={history}>
        <Spinner isActive/>
      </HistoryRouter>
    );

    expect(screen.getByRole('presentation')).toBeInTheDocument();
  });

  it('shouldn\'t render', () => {
    const history = createMemoryHistory();

    render(
      <HistoryRouter history={history}>
        <Spinner isActive={false}/>
      </HistoryRouter>
    );

    expect(screen.queryByRole('presentation')).not.toBeInTheDocument();
  });
});

import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import HistoryRouter from '../../components/history-router/history-router';
import { HelmetProvider } from 'react-helmet-async';
import FavoritesEmptyScreen from './favorites-empty-screen';

const history = createMemoryHistory();

describe('Component: FavoritesEmptyScreen', () => {
  it('should render correctly', () => {
    render(
      <HistoryRouter history={history}>
        <HelmetProvider>
          <FavoritesEmptyScreen/>
        </HelmetProvider>
      </HistoryRouter>
    );

    expect(screen.getByText('Nothing yet saved.')).toBeInTheDocument();
  });
});

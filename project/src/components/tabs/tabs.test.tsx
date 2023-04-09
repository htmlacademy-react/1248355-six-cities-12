import { render, screen } from '@testing-library/react';
import Tabs from './tabs';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-router/history-router';
import { HelmetProvider } from 'react-helmet-async';
import { City } from '../../consts/enum';

describe('Component Tabs', () => {
  const history = createMemoryHistory();
  const mockStore = configureMockStore();
  const store = mockStore({});

  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <Tabs/>
          </HelmetProvider>
        </HistoryRouter>
      </Provider>
    );

    const amsterdamLink = screen.getByRole('link', { name: City.Amsterdam });
    const parisLink = screen.getByRole('link', { name: City.Paris });

    expect(parisLink).toBeInTheDocument();
    expect(amsterdamLink).toBeInTheDocument();
  });
});

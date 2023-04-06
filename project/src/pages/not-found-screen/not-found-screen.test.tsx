import {HelmetProvider} from 'react-helmet-async';
import HistoryRouter from '../../components/history-router/history-router';
import {createMemoryHistory} from 'history';
import NotFoundScreen from './not-found-screen';
import {fireEvent, render, screen} from '@testing-library/react';

const history = createMemoryHistory();

describe('Component: NotFoundScreen', () => {
  test('should render correctly', () => {
    const resetNotFound = jest.fn();

    render(
      <HistoryRouter history={history}>
        <HelmetProvider>
          <NotFoundScreen resetNotFound={resetNotFound}/>
        </HelmetProvider>
      </HistoryRouter>
    );

    const headerElement = screen.getByText('404. Page not found');
    const linkElement = screen.getByText('Вернуться на главную');

    expect(headerElement).toBeInTheDocument();
    expect(linkElement).toBeInTheDocument();

    fireEvent.click(screen.getByText('Вернуться на главную'));

    expect(resetNotFound).toBeCalled();
  });
});

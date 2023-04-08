import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import ScrollToTop from './scroll-to-top';
import HistoryRouter from '../history-router/history-router';

describe('Component: ScrollToTop', () => {
  it('should work correctly', () => {
    window.scrollTo = jest.fn();
    const history = createMemoryHistory();

    render(
      <HistoryRouter history={history}>
        <ScrollToTop/>
      </HistoryRouter>
    );

    expect(window.scrollTo).toBeCalledTimes(1);
  });
});

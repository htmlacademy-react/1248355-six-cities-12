import { render, screen } from '@testing-library/react';
import { LogoVariant } from '../../consts/enum';
import HistoryRouter from '../history-router/history-router';
import { createMemoryHistory } from 'history';
import Logo from './logo';
import { Route, Routes } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

const history = createMemoryHistory();

describe('Component: Logo', () => {
  it('should render correctly', () => {
    render(
      <HistoryRouter history={history}>
        <Logo variant={LogoVariant.Header}/>
      </HistoryRouter>
    );

    expect(screen.getByAltText('6 cities logo')).toBeInTheDocument();
  });

  it('should redirect to root url when user clicked to link', async () => {
    history.push('/fake');

    render(
      <HistoryRouter history={history}>
        <Routes>
          <Route
            path="/"
            element={<h1>This is main page</h1>}
          />
          <Route
            path="*"
            element={<Logo variant={LogoVariant.Header}/>}
          />
        </Routes>
      </HistoryRouter>);

    expect(screen.queryByText(/This is main page/i)).not.toBeInTheDocument();

    await act(async () => await userEvent.click(screen.getByRole('link')));

    expect(screen.getByText(/This is main pag/i)).toBeInTheDocument();
  });
});

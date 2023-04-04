import { render, screen } from '@testing-library/react';
import { LogoVariant } from '../../consts/enum';
import HistoryRouter from '../history-router/history-router';
import { createMemoryHistory } from 'history';
import Logo from './logo';

describe('Component: Logo', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <HistoryRouter history={history}>
        <Logo variant={LogoVariant.Header}/>
      </HistoryRouter>
    );

    expect(screen.getByAltText('6 cities logo')).toBeInTheDocument();
  });
});

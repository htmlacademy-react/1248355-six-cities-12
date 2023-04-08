import { createMockStoreWithAPI, ProviderWrapper } from '../../../utils/jest';
import { render, screen } from '@testing-library/react';
import Sort from './sort';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

const { fakeStore } = createMockStoreWithAPI({});

describe('Component: Sort', () => {
  it('should render correctly', () => {
    render(
      <ProviderWrapper>
        <Sort/>
      </ProviderWrapper>
    );

    expect(screen.getByText(/sort by/i)).toBeInTheDocument();
    expect(screen.getAllByText(/popular/i)).toHaveLength(2);
    expect(screen.getByText(/Top rated first/i)).toBeInTheDocument();
    expect(screen.getByText(/Price: high to low/i)).toBeInTheDocument();
    expect(screen.getByText(/Price: low to high/i)).toBeInTheDocument();
  });

  it('should pick sort and dispatch it', async () => {
    render(
      <ProviderWrapper fakeStore={fakeStore}>
        <Sort/>
      </ProviderWrapper>
    );

    const sortMenu = screen.getByTestId('sort-menu');
    const sortButtons = screen.getAllByTestId('sort-option');

    await act(async () => await userEvent.click(sortMenu));
    await act(async () => await userEvent.click(sortButtons[1]));

    expect(sortMenu).toHaveTextContent('Price: high to low');

    const actions = fakeStore.getActions();

    expect(actions[actions.length - 1]).toEqual({ type: 'Cities/sortCityOffers', payload: 'high-to-low' });
  });

  it('should pick sort by keyboard and dispatch it', async () => {
    render(
      <ProviderWrapper fakeStore={fakeStore}>
        <Sort/>
      </ProviderWrapper>
    );

    const sortMenu = screen.getByTestId('sort-menu');
    const sortButtons = screen.getAllByTestId('sort-option');

    await act(async () => await userEvent.type(sortMenu, '{enter}'));
    await act(async () => await userEvent.type(sortButtons[0], '{enter}'));

    expect(sortMenu).toHaveTextContent('Price: low to high');

    const actions = fakeStore.getActions();

    expect(actions[actions.length - 1]).toEqual({ type: 'Cities/sortCityOffers', payload: 'low-to-high' });
  });
});

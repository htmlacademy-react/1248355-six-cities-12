import {render, screen} from '@testing-library/react';
import ErrorScreen from './error-screen';
import {createMemoryHistory} from 'history';
import userEvent from '@testing-library/user-event';
import {ProviderWrapper} from '../../utils/jest';

const history = createMemoryHistory();

describe('Component: ErrorScreen', () => {

  test('should render correctly', async () => {
    const onClick = jest.fn();

    render(
      <ProviderWrapper>
        <ErrorScreen onClick={onClick}/>
      </ProviderWrapper>
    );

    expect(screen.getByText('Error happened while loading data')).toBeInTheDocument();

    await userEvent.click(screen.getByText('Try again'));

    expect(onClick).toBeCalled();
  });
});

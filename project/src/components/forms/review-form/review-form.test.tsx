import { createMockStoreWithAPI, ProviderWrapper } from '../../../utils/jest';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ReviewForm from './review-form';
import { act } from 'react-dom/test-utils';
import { createComment } from '../../../store/middlewares/thunk/thunk-actions';
import { NewComment } from '../../../types/comments';
import { toast } from 'react-toastify';
import { APIRoute, MaxElementCountOnScreen } from '../../../consts/enum';

jest.mock('react-toastify');

const { fakeStore, mockAPI } = createMockStoreWithAPI({});
let comment: NewComment;

describe('Component: ReviewForm', () => {
  const id = 1;

  it('should render correctly', () => {
    render(
      <ProviderWrapper>
        <ReviewForm id={id}/>
      </ProviderWrapper>
    );

    expect(screen.getByTestId('textarea')).toBeInTheDocument();
    expect(screen.getAllByTestId('rating')).toHaveLength(MaxElementCountOnScreen.RatingStar);
    expect(screen.getByText(/To submit review please make sure to se/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
  });

  it('should render prompts correctly', async () => {
    render(
      <ProviderWrapper>
        <ReviewForm id={id}/>
      </ProviderWrapper>
    );

    await act(async () => await userEvent.type(screen.getByTestId('textarea'), 'test'));

    expect(screen.getByTestId('prompt')).toBeInTheDocument();
    expect(screen.queryByTestId('alert')).not.toBeInTheDocument();

    fireEvent.change(screen.getByTestId('textarea'), { target: { value: 'test'.repeat(100) } });

    expect(screen.getByTestId('alert')).toBeInTheDocument();
  });

  it('should type values into login form and submit it', async () => {
    render(
      <ProviderWrapper fakeStore={fakeStore}>
        <ReviewForm id={id}/>
      </ProviderWrapper>
    );

    const textarea = screen.getByTestId('textarea');
    const ratingButtons = screen.getAllByTestId('rating');
    const submitButton = screen.getByRole('button', { name: 'Submit' });

    await act(async () => await userEvent.type(textarea, 'Keks'));
    await act(async () => await userEvent.click(ratingButtons[2]));

    expect(submitButton).toHaveAttribute('disabled');

    await act(async () => await userEvent.type(textarea, ' always gets his pawns on cords and like eating fish!'));

    expect(submitButton).not.toHaveAttribute('disabled');

    await act(async () => await userEvent.click(submitButton));

    expect(submitButton).not.toHaveAttribute('disabled');

    const action = fakeStore.getActions()[0];

    if (createComment.pending.match(action)) {
      comment = action.meta.arg;
    }

    expect({
      comment: 'Keks always gets his pawns on cords and like eating fish!',
      rating: 3,
      id,
    }).toEqual(comment);

    expect(toast.error).toBeCalled();
  });

  it('should not toast and should reset form on fulfilled', async () => {
    mockAPI
      .onPost(`${APIRoute.Comments}/1`)
      .reply(200);

    render(
      <ProviderWrapper fakeStore={fakeStore}>
        <ReviewForm id={id}/>
      </ProviderWrapper>
    );

    const textarea = screen.getByTestId('textarea');
    const ratingButtons = screen.getAllByTestId('rating');
    const submitButton = screen.getByRole('button', { name: 'Submit' });

    await act(async () => await userEvent.type(textarea, ' always gets his pawns on cords and like eating fish!'));
    await act(async () => await userEvent.click(ratingButtons[2]));
    await act(async () => await userEvent.click(submitButton));

    expect(submitButton).toHaveAttribute('disabled');

    expect(toast.error).toBeCalledTimes(0);
  });
});

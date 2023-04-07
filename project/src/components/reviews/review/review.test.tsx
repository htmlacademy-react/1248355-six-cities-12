import { makeFakeComment } from '../../../utils/mocks';
import { render, screen } from '@testing-library/react';
import Review from './review';

describe('Component: Review', () => {
  it('should render correctly', () => {
    const comment = makeFakeComment();

    render(
      <Review data={comment}/>
    );

    expect(screen.getByText(comment.comment)).toBeInTheDocument();
    expect(screen.getByText(comment.user.name)).toBeInTheDocument();
    expect(screen.getByText(/rating/i)).toBeInTheDocument();
  });
});

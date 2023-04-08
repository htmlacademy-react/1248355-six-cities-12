import { DeepPartial } from '@reduxjs/toolkit';
import { RootState } from '../../../types/store';
import { NameSpace } from '../../../consts/enum';
import { makeFakeComment } from '../../../utils/mocks';
import { createMockStoreWithAPI, ProviderWrapper } from '../../../utils/jest';
import { render, screen } from '@testing-library/react';
import ReviewsList from './reviews-list';
import { MAX_COMMENTS_COUNT } from '../../../consts/app';

const fakeState: DeepPartial<RootState> = {
  [NameSpace.Offer]: {
    comments: [makeFakeComment()]
  },
};
const { fakeStore } = createMockStoreWithAPI(fakeState);

describe('Component: ReviewsList', () => {
  it('should render correctly', () => {
    const comment = makeFakeComment();
    render(
      <ProviderWrapper fakeStore={fakeStore}>
        <ReviewsList comments={[comment]}/>
      </ProviderWrapper>
    );

    expect(screen.getByText(comment.comment)).toBeInTheDocument();
    expect(screen.getByText(comment.user.name)).toBeInTheDocument();
    expect(screen.getByText(/rating/i)).toBeInTheDocument();
  });

  it('should render no more than 10', () => {
    const comments = Array.from({ length: 20 }, () => makeFakeComment());

    render(
      <ProviderWrapper fakeStore={fakeStore}>
        <ReviewsList comments={comments}/>
      </ProviderWrapper>
    );

    expect(screen.getAllByText(/rating/i)).toHaveLength(MAX_COMMENTS_COUNT);
  });
});

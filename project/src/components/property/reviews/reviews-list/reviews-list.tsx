import React, { useMemo } from 'react';
import { Comments } from '../../../../types/comments';
import Review from './review/review';
import { sortReviewsByDate } from '../../../../utils/sort';

type ReviewsListProps = {
  comments: Comments;
}

const MAX_COMMENTS_COUNT = 10;

const ReviewsList = ({ comments }: ReviewsListProps) => {
  const sortedComments = useMemo(() =>
    [...comments].sort(sortReviewsByDate).slice(0, MAX_COMMENTS_COUNT),
  [comments]);

  return (
    <ul className="reviews__list">
      {sortedComments.map((comment) => <Review key={comment.id.toString()} data={comment}/>)}
    </ul>
  );
};

export default ReviewsList;

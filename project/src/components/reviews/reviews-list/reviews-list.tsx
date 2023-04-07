import React from 'react';
import { Comments } from '../../../types/comments';
import Review from '../review/review';
import { sortReviewsByDate } from '../../../utils/sort';
import { MAX_COMMENTS_COUNT } from '../../../consts/app';

type ReviewsListProps = {
  comments: Comments;
}

const ReviewsList = ({ comments }: ReviewsListProps) => {
  let sortedComments = [...comments].sort(sortReviewsByDate);

  if (sortedComments.length > MAX_COMMENTS_COUNT) {
    sortedComments = sortedComments.slice(0, MAX_COMMENTS_COUNT);
  }

  return (
    <ul className="reviews__list">
      {sortedComments.map((comment) => <Review key={comment.id.toString()} data={comment}/>)}
    </ul>
  );
};

export default ReviewsList;

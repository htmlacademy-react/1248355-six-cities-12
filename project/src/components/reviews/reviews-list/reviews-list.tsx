import React from 'react';
import { Comments } from '../../../types/comments';
import Review from '../review/review';
import { sortReviewsByDate } from '../../../utils/sort';
import { MaxElementCountOnScreen } from '../../../consts/enum';

type ReviewsListProps = {
  comments: Comments;
}

const ReviewsList = ({ comments }: ReviewsListProps) => {
  let sortedComments = [...comments].sort(sortReviewsByDate);

  if (sortedComments.length > MaxElementCountOnScreen.Comment) {
    sortedComments = sortedComments.slice(0, MaxElementCountOnScreen.Comment);
  }

  return (
    <ul className="reviews__list">
      {sortedComments.map((comment) => <Review key={comment.id.toString()} data={comment}/>)}
    </ul>
  );
};

export default ReviewsList;

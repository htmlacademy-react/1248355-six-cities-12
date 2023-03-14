import React from 'react';
import ReviewForm from '../../form/review/review-form';
import { Comments } from '../../../types/comments';
import ReviewsList from './reviews-list/reviews-list';

type ReviewsProps = {
  isAuthorized: boolean;
  comments: Comments;
}

const Reviews = ({ isAuthorized, comments }: ReviewsProps) => (
  <section className="property__reviews reviews">
    <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{comments.length}</span></h2>
    <ReviewsList comments={comments}/>
    {isAuthorized && <ReviewForm/>}
  </section>
);

export default Reviews;

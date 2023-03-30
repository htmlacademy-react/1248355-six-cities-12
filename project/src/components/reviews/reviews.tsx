import React, { ReactNode } from 'react';
import ReviewsList from './reviews-list/reviews-list';
import { useAppSelector } from '../../hooks/store';
import { getComments } from '../../store/reducers/offer-slice/selectors';

type ReviewsProps = {
  children: ReactNode;
}

const Reviews = ({ children }: ReviewsProps) => {
  const comments = useAppSelector(getComments);

  return (
    <section className="property__reviews reviews">
      <h2 className="reviews__title">
        Reviews &middot;
        <span className="reviews__amount">
          {comments.length}
        </span>
      </h2>
      <ReviewsList comments={comments}/>
      {children}
    </section>
  );
};

export default Reviews;

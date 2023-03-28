import React from 'react';
import ReviewsList from './reviews-list/reviews-list';
import { AuthorizationStatus } from '../../consts/enum';
import ReviewForm from '../form/review/review-form';
import { useAppSelector } from '../../hooks/store';
import { Offer } from '../../types/offers';

type ReviewsProps = {
  offer: Offer;
}

const Reviews = ({ offer }: ReviewsProps) => {
  const comments = useAppSelector((state) => state.comments.comments);
  const authorizationStatus = useAppSelector((state) => state.api.authorizationStatus);

  return (
    <section className="property__reviews reviews">
      <h2 className="reviews__title">
        Reviews &middot;
        <span className="reviews__amount">
          {comments.length}
        </span>
      </h2>
      <ReviewsList comments={comments}/>
      {authorizationStatus === AuthorizationStatus.Auth && <ReviewForm id={offer.id}/>}
    </section>
  );
};

export default Reviews;

import React from 'react';
import ReviewsList from './reviews-list/reviews-list';
import { AuthorizationStatus } from '../../consts/enum';
import ReviewForm from '../form/review/review-form';
import { useAppSelector } from '../../hooks/store';
import { Offer } from '../../types/offers';
import { getComments } from '../../store/reducers/offer-slice/selectors';
import { getUserStatus } from '../../store/reducers/user-slice/selectors';

type ReviewsProps = {
  offer: Offer;
}

const Reviews = ({ offer }: ReviewsProps) => {
  const comments = useAppSelector(getComments);
  const authorizationStatus = useAppSelector(getUserStatus);

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

import React from 'react';
import ReviewForm from '../../form/review/review-form';
import { Comments } from '../../../types/comments';
import Rating from '../rating/rating';
import { Block } from '../../../consts/enum';

type ReviewsProps = {
  isAuthorized: boolean;
  comments: Comments;
}

const Reviews = ({ isAuthorized, comments }: ReviewsProps) => (
  <section className="property__reviews reviews">
    <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{comments.length}</span></h2>
    <ul className="reviews__list">
      {comments.map(({ id, user, rating, comment, date }) => (
        <li key={id.toString()} className="reviews__item">
          <div className="reviews__user user">
            <div className="reviews__avatar-wrapper user__avatar-wrapper">
              <img
                className="reviews__avatar user__avatar"
                src="img/avatar-max.jpg"
                width="54"
                height="54"
                alt="Reviews avatar"
              />
            </div>
            <span className="reviews__user-name">
              {user.name}
            </span>
          </div>
          <div className="reviews__info">
            <Rating block={Block.Reviews} rating={rating}/>
            <p className="reviews__text">
              {comment}
            </p>
            <time className="reviews__time" dateTime={date.toString()}>{date.toLocaleString()}</time>
          </div>
        </li>))}
    </ul>
    {isAuthorized && <ReviewForm/>}
  </section>
);

export default Reviews;

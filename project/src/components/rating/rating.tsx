import React from 'react';
import { adaptRatingForRendering } from '../../utils/adapt';
import { Block } from '../../consts/enum';

type RatingProps = {
  block: Block;
  rating: number;
}

const Rating = ({ block, rating }: RatingProps) => (
  <div className={`${block}__rating rating`}>
    <div className={`${block}__stars rating__stars`}>
      <span style={{ width: `${adaptRatingForRendering(rating)}%` }}></span>
      <span className="visually-hidden">Rating</span>
    </div>
  </div>
);

export default Rating;

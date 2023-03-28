import Rating from '../../rating/rating';
import { Block, DaysjsDateFormat } from '../../../consts/enum';
import { Comment } from '../../../types/comments';
import dayjs from 'dayjs';

type ReviewProps = {
  data: Comment;
}

const Review = ({ data }: ReviewProps) => {
  const { comment, user, rating, date } = data;
  const formattedDate = dayjs(date).format(DaysjsDateFormat.Review);
  const machineDate = dayjs(date).format(DaysjsDateFormat.Machine);

  return (
    <li className="reviews__item">
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
        <time className="reviews__time" dateTime={machineDate}>{formattedDate}</time>
      </div>
    </li>
  );
};

export default Review;

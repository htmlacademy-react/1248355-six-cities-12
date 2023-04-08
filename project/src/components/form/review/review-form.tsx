import React, { ChangeEventHandler, FormEvent, useState } from 'react';
import { MAX_COMMENTS_LENGTH, MIN_COMMENTS_LENGTH, RATING_STARS_COUNT, RATING_TITLES } from '../../../consts/app';
import { useAppDispatch } from '../../../hooks/store';
import { createComment } from '../../../store/middlewares/thunk/thunk-actions';
import Spinner from '../../spinner/spinner';
import { toast } from 'react-toastify';

type ReviewFormProps = {
  id: number;
}

const ReviewForm = ({ id }: ReviewFormProps) => {
  const initialFormData = {
    rating: 0,
    comment: '',
    id
  };

  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitting, setSubmitting] = useState(false);

  const isSubmitButtonDisabled =
    formData.rating === 0 ||
    (formData.comment.length < MIN_COMMENTS_LENGTH || formData.comment.length > MAX_COMMENTS_LENGTH);

  const onInputChange: ChangeEventHandler<HTMLInputElement> = (evt) => {
    setFormData({ ...formData, rating: +evt.target.value });
  };

  const onTextAreaChange: ChangeEventHandler<HTMLTextAreaElement> = (evt) => {
    setFormData({ ...formData, comment: evt.target.value });
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    (async () => {
      evt.preventDefault();
      setSubmitting(true);

      const action = await dispatch(createComment(formData));

      if (createComment.fulfilled.match(action)) {
        setFormData(initialFormData);
      } else {
        toast.error(action.error.message, { toastId: action.error.code });
      }

      setSubmitting(false);
    })();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="reviews__form form"
      action="#"
    >
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {Array.from({ length: RATING_STARS_COUNT }, (_, index) => (
          <React.Fragment key={`${index}-input`}>
            <input
              onChange={onInputChange}
              className="form__rating-input visually-hidden"
              name="rating"
              value={RATING_STARS_COUNT - index}
              id={`${RATING_STARS_COUNT - index}-stars`}
              type="radio"
              checked={formData.rating === RATING_STARS_COUNT - index}
              disabled={isSubmitting}
              data-testid='rating'
            />
            <label
              htmlFor={`${RATING_STARS_COUNT - index}-stars`}
              className="reviews__rating-label form__rating-label"
              title={RATING_TITLES[index]}
            >
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>
          </React.Fragment>
        ))}
      </div>
      <textarea
        onChange={onTextAreaChange}
        value={formData.comment}
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        disabled={isSubmitting}
        data-testid='textarea'
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and
          describe your stay with at least <b className="reviews__text-amount">50 characters</b>. &nbsp;
          {(formData.comment && formData.comment.length < MIN_COMMENTS_LENGTH) &&
            <>Remaining to
              type: <b data-testid='prompt'>{MIN_COMMENTS_LENGTH - formData.comment.length}</b>
            </>}
          {formData.comment.length > MAX_COMMENTS_LENGTH &&
            <b data-testid='alert' style={{ color: 'red' }}>Maximum of 300 chars reached.</b>}
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={isSubmitButtonDisabled || isSubmitting}
        >
          {isSubmitting ? <Spinner variant="small" isActive={isSubmitting}/> : 'Submit'}
        </button>
      </div>
    </form>
  );
};

export default ReviewForm;

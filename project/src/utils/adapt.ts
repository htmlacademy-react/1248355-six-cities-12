import { RATING_STARS_COUNT } from '../consts/app';

const adaptRatingForRendering = (rating: number) => rating * 100 / RATING_STARS_COUNT;

export { adaptRatingForRendering };

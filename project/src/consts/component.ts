const cardDefaultImgSize = {
  width: '260',
  height: '200'
};

const PlaceCardVariant = {
  Index:{
    className: 'cities',
    imgSize: cardDefaultImgSize
  },
  Property:{
    className: 'near-places',
    imgSize: cardDefaultImgSize
  },
  Favorites:{
    className: 'favorites',
    imgSize:{
      width: '150',
      height:'110'
    }
  },
} as const;

const LayoutClassName = {
  Main: 'page page--gray page--main',
  EmptyFavorites: 'page page--favorites-empty',
  Login: 'page page--gray page--login',
  Default: 'page'
} as const;

export {PlaceCardVariant, LayoutClassName};

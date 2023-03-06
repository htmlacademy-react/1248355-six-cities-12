enum Setting {
  CardsCount = 5
}

enum AppRoute {
  Root = '/',
  Favorites = '/favorites',
  Login = '/login',
  Offer = '/offer/:id'
}

enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

enum LayoutClassName {
  Main = 'page page--gray page--main',
  EmptyFavorites = 'page page--favorites-empty',
  Login = 'page page--gray page--login',
  Default = 'page'
}

const PlaceCardVariant = {
  Index: {
    className: 'cities',
    imgSize: {
      width: '260',
      height: '200'
    }
  },
  Offer: {
    className: 'near-places',
    imgSize: {
      width: '260',
      height: '200'
    }
  },
  Favorites: {
    className: 'favorites',
    imgSize: {
      width: '150',
      height: '110'
    }
  }
};

export { PlaceCardVariant, LayoutClassName, AppRoute, Setting, AuthorizationStatus };

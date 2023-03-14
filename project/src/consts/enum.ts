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

enum City {
  Paris = 'Paris',
  Cologne = 'Cologne',
  Brussels = 'Brussels',
  Amsterdam = 'Amsterdam',
  Hamburg = 'Hamburg',
  Dusseldorf = 'Dusseldorf'
}

enum Block {
  OfferCard = 'place-card',
  Property = 'property',
  Cities = 'cities',
  NearPlaces = 'near-places',
  Favorites = 'favorites',
  Reviews = 'reviews',
  Header = 'header',
  Footer = 'footer'
}

const LogoVariant = {
  Footer: {
    block: Block.Footer,
    imgSize: {
      width: '64',
      height: '33'
    }
  },
  Header: {
    block: Block.Header,
    imgSize: {
      width: '81',
      height: '41'
    }
  }
};

const BookmarkButtonVariant = {
  Offer: {
    block: Block.Property,
    imgSize: {
      width: '31',
      height: '33'
    }
  },
  Card: {
    block: Block.OfferCard,
    imgSize: {
      width: '18',
      height: '19'
    }
  }
};

const OfferCardVariant = {
  Cities: {
    block: Block.Cities,
    imgSize: {
      width: '260',
      height: '200'
    }
  },
  Offer: {
    block: Block.NearPlaces,
    imgSize: {
      width: '260',
      height: '200'
    }
  },
  Favorites: {
    block: Block.Favorites,
    imgSize: {
      width: '150',
      height: '110'
    }
  }
};

export { OfferCardVariant, AppRoute, AuthorizationStatus, City, BookmarkButtonVariant, Block, LogoVariant };

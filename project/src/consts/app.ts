const CITIES = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];

const Setting = {
  CardsCount: 5
} as const;

const AppRoute = {
  Root: '/',
  Favorites: '/favorites',
  Login: '/login',
  Property: '/offer'
} as const;

export {Setting, AppRoute, CITIES};

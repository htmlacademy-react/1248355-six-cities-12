import PlaceCard from '../../components/place-card/place-card';
import {Helmet} from 'react-helmet-async';
import {PlaceCardVariant} from '../../consts/enum';

const FavoritesScreen = () => (
  <main className="page__main page__main--favorites">
    <Helmet>
      <title>Favorites</title>
    </Helmet>
    <div className="page__favorites-container container">
      <section className="favorites">
        <h1 className="favorites__title">Saved listing</h1>
        <ul className="favorites__list">
          <li className="favorites__locations-items">
            <div className="favorites__locations locations locations--current">
              <div className="locations__item">
                <a className="locations__item-link" href="/">
                  <span>Amsterdam</span>
                </a>
              </div>
            </div>
            <div className="favorites__places">
              <PlaceCard variant={PlaceCardVariant.Favorites}/>
              <PlaceCard variant={PlaceCardVariant.Favorites}/>
            </div>
          </li>
        </ul>
      </section>
    </div>
  </main>
);

export default FavoritesScreen;

import Tabs from '../../components/tabs/tabs';
import { Offers as OffersTypes } from '../../types/offers';
import Offers from '../../components/offer/offers/offers';
import { OfferCardVariant } from '../../consts/enum';
import Sort from '../../components/form/sort/sort';

type MainScreenProps = {
  cardsCount: number;
  offers: OffersTypes;
}

const MainScreen = ({ cardsCount, offers }: MainScreenProps): JSX.Element => (
  <main className="page__main page__main--index">
    <h1 className="visually-hidden">Cities</h1>
    <Tabs/>
    <div className="cities">
      <div className="cities__places-container container">
        <section className="cities__places places">
          <h2 className="visually-hidden">Places</h2>
          <b className="places__found">{cardsCount} places to stay in Amsterdam</b>
          <Sort/>
          <div className="cities__places-list places__list tabs__content">
            <Offers offers={offers} variant={OfferCardVariant.Index}/>
          </div>
        </section>
        <div className="cities__right-section">
          <section className="cities__map map"></section>
        </div>
      </div>
    </div>
  </main>
);

export default MainScreen;

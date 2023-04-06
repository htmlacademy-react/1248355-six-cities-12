import cl from './style.module.css';
import {Helmet} from 'react-helmet-async';

type ErrorScreenProps = {
  onClick: () => void;
}

const ErrorScreen = ({onClick}: ErrorScreenProps) => (
  <main style={{height: '100vh'}} className="page__main page__main--index page__main--index-empty">
    <Helmet>
      <title>Error</title>
    </Helmet>
    <h1 className="visually-hidden">Error</h1>
    <div className="cities">
      <div className="cities__places-container cities__places-container--empty container">
        <section className="cities__no-places">
          <div className="cities__status-wrapper tabs__content">
            <b className="cities__status">Error happened while loading data</b>
            <p className="cities__status-description">
              <button
                className={cl.button}
                onClick={onClick}
              >
                Try again
              </button>
            </p>
          </div>
        </section>
        <div className="cities__right-section"></div>
      </div>
    </div>
  </main>);
export default ErrorScreen;

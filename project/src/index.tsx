import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { offers } from './mocks/offers';
import { comments } from './mocks/commets';

enum Setting {
  CardsCount = 5
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App comments={comments} offers={offers} cardsCount={Setting.CardsCount}/>
  </React.StrictMode>
);

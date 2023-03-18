import Tabs from '../../components/tabs/tabs';
import { Offers as OffersTypes } from '../../types/offers';
import { Block } from '../../consts/enum';
import Cities from '../../components/cities/cities';
import CityPlaces from '../../components/cities/city-places/city-places';
import MapContainer from '../../components/cities/map-container/map-container';
import Map from '../../components/map/map';
import React, { useState } from 'react';
import { locations } from '../../mocks/locations';

type MainScreenProps = {
  offers: OffersTypes;
}

const MainScreen = ({ offers }: MainScreenProps) => {
  const [activeCard, setActiveCard] = useState<number>();

  return (
    <main className="page__main page__main--index">
      <h1 className="visually-hidden">Cities</h1>
      <Tabs/>
      <Cities>
        <CityPlaces onMouseEnter={setActiveCard} offers={offers}/>
        <MapContainer>
          <Map
            activeCard={activeCard}
            city={offers[0].city}
            block={Block.Cities}
            points={locations}
          />
        </MapContainer>
      </Cities>
    </main>
  );
};

export default MainScreen;

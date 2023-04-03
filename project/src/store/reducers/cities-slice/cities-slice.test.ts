import { changeActiveOffer, citiesSlice, filterCityOffers, initialState, sortCityOffers } from './cities-slice';
import { makeFakeOffer } from '../../../utils/mocks';
import { fetchOffers } from '../../middlewares/thunk/thunk-actions';
import { City, SortType } from '../../../consts/enum';

describe('Slice: cities', () => {
  it('without additional parameters should return initial state', () => {
    expect(citiesSlice.reducer(initialState, { type: 'UNKNOWN_ACTION' }))
      .toEqual(initialState);
  });

  it('should update offers upon loading from the server', () => {
    const offers = [makeFakeOffer({ city: City.Paris }), makeFakeOffer({ city: City.Amsterdam })];

    expect(citiesSlice.reducer(initialState, {
      type: fetchOffers.fulfilled.type,
      payload: {
        city: City.Paris,
        offers
      }
    }))
      .toEqual(
        {
          ...initialState,
          sourceOffers: offers,
          filteredOffers: [offers[0]],
          sortedOffers: [offers[0]]
        });
  });

  it('should change active offer by a given value', () => {
    expect(citiesSlice.reducer(initialState, changeActiveOffer(1)))
      .toEqual({ ...initialState, activeOfferId: 1 });
  });

  it('should filters offers by a city name', () => {
    const sourceOffers = [
      makeFakeOffer({ city: City.Cologne }),
      makeFakeOffer({ city: City.Amsterdam }),
      makeFakeOffer({ city: City.Cologne })
    ];
    const prevState = { ...initialState, sourceOffers };

    expect(citiesSlice.reducer(prevState, filterCityOffers(City.Amsterdam)))
      .toEqual({
        ...prevState,
        filteredOffers: [sourceOffers[1]],
        sortedOffers: [sourceOffers[1]]
      });
  });

  it('should sort offers by a filter type', () => {
    const filteredOffers = [
      makeFakeOffer({ price: 100, rating: 1 }),
      makeFakeOffer({ price: 300, rating: 3 }),
      makeFakeOffer({ price: 200, rating: 4 }),
      makeFakeOffer({ price: 400, rating: 2 })
    ];
    const sortedOffers = [...filteredOffers];
    const prevState = { ...initialState, sortedOffers, filteredOffers };

    expect(citiesSlice.reducer(prevState, sortCityOffers(SortType.HighToLow)))
      .toEqual({
        ...prevState,
        sortedOffers: [filteredOffers[3], filteredOffers[1], filteredOffers[2], filteredOffers[0]]
      });

    expect(citiesSlice.reducer(prevState, sortCityOffers(SortType.RatedFirst)))
      .toEqual({
        ...prevState,
        sortedOffers: [filteredOffers[2], filteredOffers[1], filteredOffers[3], filteredOffers[0]]
      });

    expect(citiesSlice.reducer(prevState, sortCityOffers(SortType.Popular)))
      .toEqual({
        ...prevState,
        sortedOffers: filteredOffers
      });
  });
});

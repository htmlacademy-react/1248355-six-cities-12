import { RootState } from '../../../types/store';
import { NameSpace } from '../../../consts/enum';
import { filterOffersByCity } from '../../../utils/filter';
import { createSelector } from '@reduxjs/toolkit';

const getUserStatus = (state: RootState) => state[NameSpace.User].authorizationStatus;
const getUser = (state: RootState) => state[NameSpace.User].user;
const getFavorites = (state: RootState) => state[NameSpace.User].favorites;

const getFilteredFavorites = createSelector(getFavorites, filterOffersByCity);

export { getUserStatus, getUser, getFavorites, getFilteredFavorites };

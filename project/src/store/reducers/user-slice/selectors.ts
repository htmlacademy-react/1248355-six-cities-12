import { RootState } from '../../../types/store';
import { NameSpace } from '../../../consts/enum';

const getUserStatus = (state: RootState) => state[NameSpace.User].authorizationStatus;
const getUser = (state: RootState) => state[NameSpace.User].user;
const getFavorites = (state: RootState) => state[NameSpace.User].favorites;

export { getUserStatus, getUser, getFavorites };

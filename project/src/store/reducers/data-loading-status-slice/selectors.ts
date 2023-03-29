import { RootState } from '../../../types/store';
import { NameSpace } from '../../../consts/enum';

const getLoadingStatus = (state: RootState) => state[NameSpace.DataStatus].isLoading;
const getErrorStatus = (state: RootState) => state[NameSpace.DataStatus].isError;

export { getErrorStatus, getLoadingStatus };

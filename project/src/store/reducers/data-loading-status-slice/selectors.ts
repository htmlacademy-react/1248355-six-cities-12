import { RootState } from '../../../types/store';
import { NameSpace } from '../../../consts/enum';

const getLoadingStatus = (state: RootState) => state[NameSpace.DataStatus].isLoading;

export { getLoadingStatus };

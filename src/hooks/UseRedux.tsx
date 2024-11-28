import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../redux/store';

export const useRedux = () => {
  const dispatch = useDispatch();
  const storeState = useSelector((state: RootState) => state);

  return {storeState, dispatch};
};

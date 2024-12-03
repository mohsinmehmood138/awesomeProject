import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';

export const useRedux = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.authSlice.user);
  const userVisited = useSelector((state: RootState) => state.authSlice.visited);

  return { user, dispatch ,userVisited };
};

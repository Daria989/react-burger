import { Route } from 'react-router-dom';
import { getUserData } from '../../services/actions/auth-actions';
import { useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Redirect} from 'react-router-dom';
import {TProtectedRoute} from '../../utils/types'

function ProtectedRoute({ children, ...rest }: TProtectedRoute) {
    
    const dispatch = useDispatch<any>();
    const getUserName: any = useSelector<any>((store) => store.authReducer.name);
    const getUserRequest: any = useSelector<any>((store) => store.authReducer.getUserRequest);
    const refreshToken = localStorage.getItem('refreshToken');

    useEffect(() => {
        dispatch(getUserData());
    }, [dispatch]);

    if (getUserRequest) {
      return null;
    }

    return (
      <Route
        {...rest}
        render={({ location }) =>
        getUserName && refreshToken ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: location }
              }}
            />
          )
        }
      />
    );
  } 

export default ProtectedRoute;

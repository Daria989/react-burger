import { Route } from 'react-router-dom';
import { getUserData } from '../../services/actions/authActions';
import { useEffect } from 'react';
import { Redirect} from 'react-router-dom';
import { RouteProps } from 'react-router-dom';
import { useDispatch } from '../../utils/hooks';

function ProtectedRoute({ children, ...rest }: RouteProps & {children?: React.ReactNode}) {
    
    const dispatch = useDispatch();
    const hasToken = localStorage.getItem('refreshToken');

    useEffect(() => {
        dispatch(getUserData());
    }, [dispatch]);

    return (
      <Route
        {...rest}
        render={({ location }) =>
        hasToken ? (
          children
            // null
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

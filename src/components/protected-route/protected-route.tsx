import { Route } from 'react-router-dom';
import { getUserData } from '../../services/actions/auth-actions';
import { useEffect} from 'react';
import { Redirect} from 'react-router-dom';
import { RouteProps } from 'react-router-dom';
import { useDispatch, useSelector } from '../../utils/hooks';

function ProtectedRoute({ children, ...rest }: RouteProps & {children?: React.ReactNode}) {
    
    const dispatch = useDispatch();
    const getUserFailed = useSelector((store) => store.authReducer.getUserFailed);

    useEffect(() => {
        dispatch(getUserData());
    }, [dispatch]);

    return (
      <Route
        {...rest}
        render={({ location }) =>
        !getUserFailed ? (
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

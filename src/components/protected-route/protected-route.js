import { Route } from 'react-router-dom';
import { getUserData } from '../../services/actions/auth-actions';
import { useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';

function ProtectedRoute({ children, ...rest }) {
    
    const dispatch = useDispatch();
    const getUserName = useSelector((store) => store.authReducer.name);
    const getUserRequest = useSelector((store) => store.authReducer.getUserRequest);
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

ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
    rest: PropTypes.string.isRequired
}

export default ProtectedRoute;
import { Route, Switch, useHistory, useLocation} from 'react-router-dom';
import appStyles from './app.module.css';
import Home  from '../../pages/home';
import Login from '../../pages/login';
import Register from '../../pages/register';
import ForgotPassword from '../../pages/forgot-password';
import ResetPassword from '../../pages/reset-password';
import Profile from '../../pages/profile';
import ProtectedRoute from '../protected-route/protected-route';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';
import AppHeader from '../app-header/app-header';
import OrderDetails from "../order-details/order-details";
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getData } from '../../services/actions/data-actions';
import {TLocationState} from '../../utils/types'

function App() {
  const history = useHistory();
  const location = useLocation<TLocationState>();
  const dispatch = useDispatch<any>();
  const background = location.state && location.state.background;
  const handleModalClose = () => history.goBack();

  useEffect(() => {
    dispatch(getData()); 
  }, [dispatch])

  return (
    <>
      <AppHeader/>
      <Switch location={background || location}>
        <Route path="/" exact={true}>
          <Home/>
        </Route>
        <Route path="/login" exact={true}>
          <Login/>
        </Route>
        <Route path="/register" exact={true}>
          <Register/>
        </Route>
        <Route path="/forgot-password" exact={true}>
          <ForgotPassword/>
        </Route>
        <Route path="/reset-password" exact={true}>
          <ResetPassword/>
        </Route>
        <Route path="/ingredients/:id" exact={true}>
					<IngredientDetails />
				</Route>
        <ProtectedRoute path="/profile">
					<Profile />
				</ProtectedRoute>
        <Route>
					<div className={appStyles.noPage}>
						<h1 className="text text_type_main-large"> 404 Страница не найдена</h1>
					</div>
				</Route>
      </Switch>

      {background && 
        <Route path='/ingredients/:id' exact={true}>
          <Modal onClose={handleModalClose}>
            <IngredientDetails />
          </Modal>
        </Route>
      }

      {background && 
        <Route  path='/' exact={true}>
          <Modal onClose={handleModalClose}>
            <OrderDetails />
          </Modal>
        </Route>
      }
    </>
  );
}

export default App;

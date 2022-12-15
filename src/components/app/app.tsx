import { Route, Switch, useHistory, useLocation} from 'react-router-dom';
import appStyles from './app.module.css';
import Home  from '../../pages/home';
import Login from '../../pages/login';
import Register from '../../pages/register';
import Feed from '../../pages/feed';
import Order from '../order/order';
import ForgotPassword from '../../pages/forgot-password';
import ResetPassword from '../../pages/reset-password';
import Profile from '../../pages/profile';
import ProtectedRoute from '../protected-route/protected-route';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';
import AppHeader from '../app-header/app-header';
import OrderDetails from "../order-details/order-details";
import { useEffect } from 'react';
import { useDispatch } from '../../utils/hooks';
import { getData } from '../../services/actions/ingredientsAction';
import { TLocationState } from '../../utils/types'
import { clearOrder } from '../../services/actions/sendOrderAction';

function App() {
  const history = useHistory();
  const location = useLocation<TLocationState>();
  const dispatch = useDispatch();
  const background = location.state && location.state.background;
  const handleModalClose = () => history.goBack();
  const handleModalCloseOrder = () => {
    history.goBack();
    dispatch(clearOrder());
  }

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
        <Route path="/feed" exact={true}>
					<Feed />
				</Route>
        <Route path='/feed/:id'>
					<Order />
				</Route>
        <ProtectedRoute path="/profile">
					<Profile />
				</ProtectedRoute>
        <ProtectedRoute path='/profile/orders/:id' exact={true}>
					<Order />
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
          <Modal onClose={handleModalCloseOrder}>
            <OrderDetails />
          </Modal>
        </Route>
      }

      {background && 
        <Route path='/feed/:id' exact={true}>
          <Modal onClose={handleModalClose}>
            <Order />
          </Modal>
        </Route>
      }

      {background && 
        <Route path='/profile/orders/:id' exact={true}>
          <Modal onClose={handleModalClose}>
            <Order />
          </Modal>
        </Route>
      }
    </>
  );
}

export default App;

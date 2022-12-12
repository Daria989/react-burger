import profile from './profile.module.css';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';
import { NavLink, Route, Switch, useHistory } from 'react-router-dom';
import { getLogoutData, getUpdateUserData } from '../services/actions/auth-actions';
import { useCallback } from 'react';
import { GET_UPDATE_USER_SUCCESS } from '../services/actions/auth-actions';
import { useDispatch, useSelector } from '../utils/hooks'
import  ProtectedRoute  from '../components/protected-route/protected-route';
import Orders from '../components/orders/orders';

function Profile() {

    const dispatch = useDispatch();
    let history = useHistory();
    const refreshToken = localStorage.getItem('refreshToken');

    const name = useSelector((store) => store.authReducer.name);
    const email = useSelector((store) => store.authReducer.email);
    const password = useSelector((store) => store.authReducer.password);

    const [nameValue, setNameValue] = useState<string>(name);
    const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNameValue(e.target.value)
    }

    const [emailValue, setEmailValue] = useState<string>(email);
    const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmailValue(e.target.value)
    }

    const [passwordValue, setPasswordValue] = useState<string>(password);
    const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPasswordValue(e.target.value)
    }

    const logout = useCallback(
        (e: React.SyntheticEvent) => {
            e.preventDefault();
            dispatch(getLogoutData(refreshToken));
            history.replace({ pathname: '/login' })
        },
        [refreshToken]
    );

    const cancelButtonClicked = useCallback(
        (e: React.SyntheticEvent) => {
            e.preventDefault();
            setNameValue(name);
            setEmailValue(email);
        }, 
        [name, email]
    );

    const form = {
        "name": nameValue,
        "email": emailValue,
        "password": passwordValue
    }

    const user = { "name": nameValue,
            "email": emailValue}

    const saveButtonClicked = useCallback(
        (e: React.FormEvent) => {
          e.preventDefault();
          dispatch({
            type: GET_UPDATE_USER_SUCCESS,
            data: user
          })
          dispatch(getUpdateUserData(form));
        },
        [form]
      );

return (
    <div className={profile.wrapper}>
        <div className={profile.main}>
            <div className={`mr-15 ${profile.info}`}>
                <NavLink to="/profile" className={`text text_type_main-medium text_color_inactive ${profile.inactiveLink}`} exact activeClassName={`text text_type_main-medium ${profile.activeLink}`}>
                    Профиль
                </NavLink> 
                <NavLink to="/profile/orders" className={`text text_type_main-medium text_color_inactive ${profile.inactiveLink}`} exact activeClassName={`text text_type_main-medium ${profile.activeLink}`}>
                    История заказов
                </NavLink>
                <NavLink to="/profile/exit" onClick = {logout} className={`text text_type_main-medium text_color_inactive ${profile.inactiveLink}`} exact activeClassName={`text text_type_main-medium ${profile.activeLink}`}>
                    Выход
                </NavLink>
                <NavLink to="/profile/other" className={`mt-20 text text_type_main-small text_color_inactive ${profile.inactiveLink}`}>
                    В этом разделе вы можете изменить свои персональные данные
                </NavLink>
            </div>
            <Switch>
                <Route path="/profile" exact={true}>
                    <form onSubmit={saveButtonClicked} className={profile.inputs}>
                        <Input type={'text'} size="default" value={nameValue} placeholder={'Имя'} onChange={onChangeName}/>
                        <Input type={'email'} size="default" value={emailValue} placeholder={'Логин'} onChange={onChangeEmail}/>
                        <Input type={'password'} size="default" value={passwordValue} placeholder={'Пароль'} onChange={onChangePassword}/>
                        <div className={profile.buttons}>
                            <Button type="secondary" size="medium" onClick={cancelButtonClicked}>
                                Отменить
                            </Button>
                            <Button type="primary" size="medium">
                                Сохранить
                            </Button>
                        </div>
                    </form>
                </Route>
                <ProtectedRoute path="/profile/orders" exact={true}>
                  <Orders/>
                </ProtectedRoute>
            </Switch>
        </div>
    </div>
    );
}

export default Profile;

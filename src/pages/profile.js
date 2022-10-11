import profile from './profile.module.css';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';
import { NavLink} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getLogoutData, getUpdateUserData } from '../services/actions/auth-actions';
import { useSelector } from 'react-redux';
import { useCallback } from 'react';
import { GET_UPDATE_USER_SUCCESS } from '../services/actions/auth-actions';

function Profile() {
    const dispatch = useDispatch();
    const refreshToken = localStorage.getItem('refreshToken');

    const name = useSelector((store) => store.authReducer.name);
    const email = useSelector((store) => store.authReducer.email);
    const password = useSelector((store) => store.authReducer.password);

    const [nameValue, setNameValue] = useState(name);
    const onChangeName = e => {
        setNameValue(e.target.value)
    }

    const [emailValue, setEmailValue] = useState(email);
    const onChangeEmail = e => {
        setEmailValue(e.target.value)
    }

    const [passwordValue, setPasswordValue] = useState(password);
    const onChangePassword = e => {
        setPasswordValue(e.target.value)
    }

    const logout = useCallback(
        e => {
            e.preventDefault();
            dispatch(getLogoutData(refreshToken));
        },
        [refreshToken]
    );

    const cancelButtonClicked = useCallback(
        e => {
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
        e => {
          e.preventDefault();
          dispatch({
            type: GET_UPDATE_USER_SUCCESS,
            user: user
          })
          dispatch(getUpdateUserData(form));
        },
        [form]
      );

return (
    <div className={profile.wrapper}>
        <div className={profile.main}>
            <div className={profile.info}>
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
        </div>
    </div>
    );
}

export default Profile;
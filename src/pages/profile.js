import profile from './profile.module.css';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';
import { NavLink} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getLogoutData, getUpdateUserData } from '../services/actions/actions';
import { useSelector } from 'react-redux';
import { useCallback } from 'react';
import { GET_UPDATE_USER_SUCCESS } from '../services/actions/actions';

function Profile() {
    const dispatch = useDispatch();
    const RefreshToken = localStorage.getItem('refreshToken');

    const name = useSelector((store) => store.authReducer.name);
    const email = useSelector((store) => store.authReducer.email);
    const password = useSelector((store) => store.authReducer.password);

    const [NameValue, setNameValue] = useState(name);
    const onChangeName = e => {
        setNameValue(e.target.value)
    }

    const [EmailValue, setEmailValue] = useState(email);
    const onChangeEmail = e => {
        setEmailValue(e.target.value)
    }

    const [PasswordValue, setPasswordValue] = useState(password);
    const onChangePassword = e => {
        setPasswordValue(e.target.value)
    }

    const logout = useCallback(
        e => {
            e.preventDefault();
            dispatch(getLogoutData(RefreshToken));
        },
        [RefreshToken]
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
        "name": NameValue,
        "email": EmailValue,
        "password": PasswordValue
    }

    const user = { "name": NameValue,
            "email": EmailValue}

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
            <form className={profile.inputs}>
                <Input type={'text'} size="default" value={NameValue} placeholder={'Имя'} onChange={onChangeName}/>
                <Input type={'email'} size="default" value={EmailValue} placeholder={'Логин'} onChange={onChangeEmail}/>
                <Input type={'password'} size="default" value={PasswordValue} placeholder={'Пароль'} onChange={onChangePassword}/>
                <div className={profile.buttons}>
                    <Button type="secondary" size="medium" onClick={cancelButtonClicked}>
                        Отменить
                    </Button>
                    <Button type="primary" size="medium" onClick={saveButtonClicked}>
                        Сохранить
                    </Button>
                </div>
            </form>
        </div>
    </div>
    );
}

export default Profile;

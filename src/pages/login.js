import login from './login.module.css';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getLoginData } from '../services/actions/actions';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {getCookie } from '../services/cookie';
import {useLocation} from 'react-router-dom';

function Login() {

    const dispatch = useDispatch();
    const location = useLocation();
    
    const [EmailValue, setEmailValue] = useState('');
    const onChangeEmail = e => {
        setEmailValue(e.target.value)
    }

    const [PasswordValue, setPasswordValue] = useState('')
    const onChangePassword = e => {
        setPasswordValue(e.target.value)
    }

    const form = {
        email: EmailValue, 
        password: PasswordValue
    }

    const userAuthorization = useCallback(
        e => {
          e.preventDefault();
          dispatch(getLoginData(form));
        },
        [form]
      );

    const user = useSelector((store) => store.authReducer.name);
    const accessToken = getCookie('token');
    
    if (user || accessToken) {
        return (
            <Redirect
            to={ location.state?.from?.pathname || '/' }
            />
        );
    }
    
return (
    <div className={login.wrapper}>
        <div className={login.container}>
            <form className={login.form}>
                <p className="text text_type_main-medium">Вход</p>
                <Input type={'email'} size="default" value={EmailValue} placeholder={'Email'} onChange={onChangeEmail}/>
                <PasswordInput onChange={onChangePassword} size="default" value={PasswordValue} name={'password'}/>
                <Button type="primary" size="medium" onClick={userAuthorization}> 
                    Войти
                </Button>
            </form>
            <p className="mt-20 text text_type_main-default">Вы — новый пользователь? 
                <Link to='/register' className={login.link}> Зарегистрироваться</Link>
            </p> 
            <p className="text text_type_main-default" >Забыли пароль? 
                <Link to='/forgot-password' className={login.link}> Восстановить пароль</Link>
            </p>
        </div>
    </div>
    );
}

export default Login;
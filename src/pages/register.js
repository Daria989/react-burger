import register from './register.module.css';
import { PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getRegisterData } from '../services/actions/actions';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';

function Register() {
    const registerSuccess = useSelector(store => store.authReducer.registerSuccess);
    const user = useSelector(store => store.authReducer.user);
    const token = localStorage.getItem('refreshToken');

    const dispatch = useDispatch();

    const [EmailValue, setEmailValue] = useState('');
    const onChangeEmail = e => {
        setEmailValue(e.target.value)
    }

    const [PasswordValue, setPasswordValue] = useState('');
    const onChangePassword = e => {
        setPasswordValue(e.target.value)
    }

    const [nameValue, setNameValue] = useState('');
    const onChangeName = e => {
        setNameValue(e.target.value)
    }

    const registerNewUser = () => {
        dispatch(getRegisterData(nameValue, EmailValue, PasswordValue));
    };

    if (user || token) {
        return (
            <Redirect
                to={{
                    pathname: '/'
                }}
            />
        );
    }

    if (registerSuccess) {
        return (
            <Redirect
                to={{
                    pathname: '/login'
                }}
            />
        );
    }

return (
    <div className={register.wrapper}>
        <div className={register.container}>
            <p className="text text_type_main-medium">Регистрация</p>
            <Input type={'text'} size="default" value={nameValue} placeholder={'Имя'}  onChange={onChangeName}/>
            <Input type={'email'} size="default" value={EmailValue} placeholder={'Email'} onChange={onChangeEmail}/>
            <PasswordInput onChange={onChangePassword} size="default" value={PasswordValue} name={'password'}/>
            <Button type="primary" size="medium" onClick={registerNewUser}>
                Зарегистрироваться
            </Button>
            <p className="mt-20 text text_type_main-default">Уже зарегистрированы? 
            <Link to='/login' className={register.link}> Войти</Link>
            </p>
        </div>
    </div>

    );
}

export default Register;
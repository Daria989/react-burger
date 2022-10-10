import resetPassw from './reset-password.module.css';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getResetPasswordData} from '../services/actions/actions';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

function ResetPassword() {
    const dispatch = useDispatch();

    const [codeValue, setCodeValue] = useState('');
    
    const onChangeEmail = e => {
        setCodeValue(e.target.value);
    }

    const [passwordValue, setPasswordValue] = useState('');

    const onChangePassword = e => {
        setPasswordValue(e.target.value)
    }

    const form = 
        {
            "password": passwordValue,
            "token": codeValue
        }

    const reset = useCallback(
        e => {
          e.preventDefault();
          dispatch(getResetPasswordData(form));
        },
        [form]
    );

    const resetPasswordSuccess = useSelector((store) => store.authReducer.resetPasswordSuccess);
    const user = useSelector((store) => store.authReducer.name);
    const token = localStorage.getItem('refreshToken');
    const forgotPasswordSuccess = useSelector((store) => store.authReducer.forgotPasswordSuccess);

    if (resetPasswordSuccess) {
        return (
            <Redirect
                to={{
                    pathname: '/login'
                }}
            />
        );
    }

    if (user && !forgotPasswordSuccess) {
        return (
          <Redirect
            to={{
              pathname: '/forgot-password'
            }}
          />
        );
      }

    console.log(user);


    if (user || token) {
      return (
          <Redirect
              to={{
                  pathname: '/'
              }}
          />
      );
  }
    
return (
    <div className={resetPassw.wrapper}>
        <div className={resetPassw.container}>
            <p className="text text_type_main-medium">Восстановление пароля</p>
            <Input type={'password'} size="default" value={passwordValue} placeholder={'Введите новый пароль'} onChange={onChangePassword}/>
            <Input type={"text"} size="default" value={codeValue} placeholder={'Введите код из письма'} onChange={onChangeEmail}/>
            <Button type="primary" size="medium" onClick={reset}>
                Сохранить
            </Button>
            <p className="mt-20 text text_type_main-default">Вспомнили пароль? 
            <Link to='/login' className={resetPassw.link}> Войти</Link>
            </p>
        </div>
    </div>

    );
}

export default ResetPassword;
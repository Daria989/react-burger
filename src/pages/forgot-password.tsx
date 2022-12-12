import forgotPassw from './forgot-password.module.css';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState} from 'react';
import { Link } from 'react-router-dom';
import { useCallback } from 'react';
import { Redirect } from 'react-router-dom';
import { getForgotPasswordData } from '../services/actions/auth-actions';
import { useDispatch, useSelector } from '../utils/hooks';

function ForgotPassword() {
    const dispatch = useDispatch();
    
    const [emailValue, setEmailValue] = useState<string>('');
    const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setEmailValue(e.currentTarget.value)
    }

    const restore = useCallback(
        (e: React.FormEvent) => {
          e.preventDefault();
          dispatch(getForgotPasswordData(emailValue));
        },
        [emailValue]
    );

    const forgotPasswordSuccess = useSelector((store) => store.authReducer.forgotPasswordSuccess);
    const user = useSelector((store) => store.authReducer.name);
    const token = localStorage.getItem('refreshToken');

    if (forgotPasswordSuccess) {
        return (
            <Redirect
                to={{
                    pathname: '/reset-password'
                }}
            />
        );
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

return (
    <div className={forgotPassw.wrapper}>
        <div className={forgotPassw.container}>
            <p className="text text_type_main-medium">Восстановление пароля</p>
            <form onSubmit={restore} className={forgotPassw.inputs}>
                <Input type={'email'} size="default" value={emailValue} placeholder={'Email'} onChange={onChangeEmail}/>
                <Button type="primary" size="medium">
                    Восстановить
                </Button>
            </form>
            <p className="mt-20 text text_type_main-default">Вспомнили пароль? 
                <Link to='/login' className={forgotPassw.link}> Войти</Link>
            </p>
        </div>
    </div>
    );
}

export default ForgotPassword;
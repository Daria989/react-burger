import forgotPassw from './forgot-password.module.css';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState} from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useCallback } from 'react';
import { Redirect } from 'react-router-dom';
import { getForgotPasswordData } from '../services/actions/actions';

function ForgotPassword() {
    const dispatch = useDispatch();
    

    const [EmailValue, setEmailValue] = useState('');
    const onChangeEmail = e => {
        setEmailValue(e.target.value)
    }

    const restore = useCallback(
        e => {
          e.preventDefault();
          dispatch(getForgotPasswordData(EmailValue));
        },
        [EmailValue]
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
            <Input type={'email'} size="default" value={EmailValue} placeholder={'Email'} onChange={onChangeEmail}/>
            <Button type="primary" size="medium" onClick={restore}>
                Восстановить
            </Button>
            <p className="mt-20 text text_type_main-default">Вспомнили пароль? 
                <Link to='/login' className={forgotPassw.link}> Войти</Link>
            </p>
        </div>
    </div>
    );
}

export default ForgotPassword;
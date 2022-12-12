import {Logo} from '@ya.praktikum/react-developer-burger-ui-components'
import {BurgerIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import {ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import {ListIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import type {TIconTypes} from '../../utils/types'
import appHeader from './app-header.module.css';
import {useState} from 'react';
import { Link, useLocation  } from 'react-router-dom';
import { useSelector } from '../../utils/hooks';

function AppHeader() {
  const user = useSelector((store) => store.authReducer.name);
  const { pathname } = useLocation();

  const [isBurgerHovering, setBurgerIsHovering] = useState<TIconTypes>("secondary");
  const [isListIconHovering, setListIconIsHovering] = useState<TIconTypes>("secondary");
  const [isProfileIconHovering, setProfileIconIsHovering] = useState<TIconTypes>("secondary");

  const handleMouseBurgerOver = () => {
    setBurgerIsHovering("primary");
  };

  const handleMouseBurgerOut = () => {
    setBurgerIsHovering("secondary");
  };

  const handleMouseListIconOver = () => {
    setListIconIsHovering("primary");
  };

  const handleMouseListIconOut = () => {
    setListIconIsHovering("secondary");
  };

  const handleMouseProfileIconOver = () => {
    setProfileIconIsHovering("primary");
  };

  const handleMouseProfileIconOut = () => {
    setProfileIconIsHovering("secondary");
  };

  return (
    <header className={`${appHeader.header}`}>
      <ul className={appHeader.container}>
        <li className={`${appHeader.burger} pl-5 pr-5 pb-4 pt-4 mr-2`} onMouseOver={handleMouseBurgerOver} onMouseOut={handleMouseBurgerOut}>
          <Link className = {appHeader.link} to="/">
            <BurgerIcon type={pathname === '/' ? "primary" : isBurgerHovering}/>
            <span className={pathname === '/' ? `${appHeader.textActive} pl-2 text text_type_main-default`: `${appHeader.text} pl-2 text text_type_main-default`}>Конструктор</span>
          </Link>
        </li>
    		<li className={`${appHeader.list} pl-5 pr-5 pb-4 pt-4`} onMouseOver={handleMouseListIconOver} onMouseOut={handleMouseListIconOut}>
          <Link className = {appHeader.link} to="/feed">
            <ListIcon type={pathname === '/feed' ? "primary" : isListIconHovering}/>
            <span className={pathname === '/feed' ? `${appHeader.textActive} pl-2 text text_type_main-default`: `${appHeader.text} pl-2 text text_type_main-default`}>Лента заказов</span>
          </Link>
        </li>
        <li className={appHeader.logo}>
          <Link className = {appHeader.link} to="/">
            <Logo />
          </Link>
        </li>
        <li className={`${appHeader.profile} pl-5 pr-5 pb-4 pt-4`} onMouseOver={handleMouseProfileIconOver} onMouseOut={handleMouseProfileIconOut}>
          <Link className = {appHeader.link} to="/profile">
            <ProfileIcon type={pathname === '/profile' ? "primary" : isProfileIconHovering}/>
            {user ?  
              <span className={pathname === '/profile' ? `${appHeader.textActive} pl-2 text text_type_main-default`: `${appHeader.text} pl-2 text text_type_main-default`}>{user}</span>
              :  <span className={pathname === '/profile' ? `${appHeader.textActive} pl-2 text text_type_main-default`: `${appHeader.text} pl-2 text text_type_main-default`}>Личный кабинет</span>
            }
          </Link>
        </li>
      </ul>
   </header>
  );
}

export default AppHeader;

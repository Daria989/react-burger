import {Logo} from '@ya.praktikum/react-developer-burger-ui-components'
import {BurgerIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import {ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import {ListIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import type {TIconTypes} from '../../utils/types'
import appHeader from './app-header.module.css';
import {useState} from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from '../../utils/hooks';

function AppHeader() {
  const user = useSelector((store) => store.authReducer.name);

  const [isBurgerHovering, setBurgerIsHovering] = useState<TIconTypes>("secondary");
  const [isListIconHovering, setListIconIsHovering] = useState<TIconTypes>("secondary");
  const [isProfileIconHovering, setProfileIconIsHovering] = useState<TIconTypes>("secondary");
  const [isBurgerTextHovering, setBurgerTextIsHovering] = useState<string>("pl-2 text text_type_main-default text_color_inactive");
  const [isListIconTextHovering, setListIconTextIsHovering] = useState<string>("pl-2 text text_type_main-default text_color_inactive");
  const [isProfileTextIconHovering, setProfileTextIconIsHovering] = useState<string>("pl-2 text text_type_main-default text_color_inactive");

  const handleMouseBurgerOver = () => {
    setBurgerIsHovering("primary");
    setBurgerTextIsHovering("pl-2 text text_type_main-default")
  };

  const handleMouseBurgerOut = () => {
    setBurgerIsHovering("secondary");
    setBurgerTextIsHovering("pl-2 text text_type_main-default text_color_inactive");
  };

  const handleMouseListIconOver = () => {
    setListIconIsHovering("primary");
    setListIconTextIsHovering("pl-2 text text_type_main-default");
  };

  const handleMouseListIconOut = () => {
    setListIconIsHovering("secondary");
    setListIconTextIsHovering("pl-2 text text_type_main-default text_color_inactive");
  };

  const handleMouseProfileIconOver = () => {
    setProfileIconIsHovering("primary");
    setProfileTextIconIsHovering("pl-2 text text_type_main-default");
  };

  const handleMouseProfileIconOut = () => {
    setProfileIconIsHovering("secondary");
    setProfileTextIconIsHovering("pl-2 text text_type_main-default text_color_inactive");
  };

  return (
    <header className={`${appHeader.header}`}>
      <ul className={appHeader.container}>
        <li className={`${appHeader.burger} pl-5 pr-5 pb-4 pt-4 mr-2`} onMouseOver={handleMouseBurgerOver} onMouseOut={handleMouseBurgerOut}>
          <Link to="/">
            <BurgerIcon type={isBurgerHovering}/>
            <span className={isBurgerTextHovering}>Конструктор</span>
          </Link>
        </li>
    		<li className={`${appHeader.list} pl-5 pr-5 pb-4 pt-4`} onMouseOver={handleMouseListIconOver} onMouseOut={handleMouseListIconOut}>
          <Link to="/feed">
            <ListIcon type={isListIconHovering}/>
            <span className={isListIconTextHovering}>Лента заказов</span>
          </Link>
        </li>
        <li className={appHeader.logo}>
          <Link to="/">
            <Logo />
          </Link>
        </li>
        <li className={`${appHeader.profile} pl-5 pr-5 pb-4 pt-4`} onMouseOver={handleMouseProfileIconOver} onMouseOut={handleMouseProfileIconOut}>
          <Link to="/profile">
            <ProfileIcon type={isProfileIconHovering}/>
            {user ?  
              <span className={isProfileTextIconHovering}>{user}</span>
              :  <span className={isProfileTextIconHovering}>Личный кабинет</span>
            }
          </Link>
        </li>
      </ul>
   </header>
  );
}

export default AppHeader;

import {Logo} from '@ya.praktikum/react-developer-burger-ui-components'
import {BurgerIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import {ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import {ListIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import appHeader from './app-header.module.css';
import {useState} from 'react';

function AppHeader() {

  const [isBurgerHovering, setBurgerIsHovering] = useState("secondary");
  const [isListIconHovering, setListIconIsHovering] = useState("secondary");
  const [isProfileIconHovering, setProfileIconIsHovering] = useState("secondary");
  const [isBurgerTextHovering, setBurgerTextIsHovering] = useState("pl-2 text text_type_main-default text_color_inactive");
  const [isListIconTextHovering, setListIconTextIsHovering] = useState("pl-2 text text_type_main-default text_color_inactive");
  const [isProfileTextIconHovering, setProfileTextIconIsHovering] = useState("pl-2 text text_type_main-default text_color_inactive");

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
          <a href="#">
            <BurgerIcon type={isBurgerHovering}/>
            <span className={isBurgerTextHovering}>Конструктор</span>
          </a>
        </li>
    		<li className={`${appHeader.list} pl-5 pr-5 pb-4 pt-4`} onMouseOver={handleMouseListIconOver} onMouseOut={handleMouseListIconOut}>
          <a href="#">
            <ListIcon type={isListIconHovering}/>
            <span className={isListIconTextHovering}>Лента заказов</span>
          </a>
        </li>
        <li className={appHeader.logo}>
          <a href="#">
            <Logo />
          </a>
        </li>
        <li className={`${appHeader.profile} pl-5 pr-5 pb-4 pt-4`} onMouseOver={handleMouseProfileIconOver} onMouseOut={handleMouseProfileIconOut}>
          <a href="#">
            <ProfileIcon type={isProfileIconHovering}/>
            <span className={isProfileTextIconHovering}>Личный кабинет</span>
          </a>
        </li>
      </ul>
   </header>
  );
}

export default AppHeader;

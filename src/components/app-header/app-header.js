import { Logo } from '@ya.praktikum/react-developer-burger-ui-components'
import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { ListIcon } from '@ya.praktikum/react-developer-burger-ui-components'
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
  	<nav className={`${appHeader.header}`}>
      <ul className={appHeader.container}>
    		<li className={`${appHeader.burger} pl-5 pr-5 pb-4 pt-4 mr-2`} onMouseOver={handleMouseBurgerOver} onMouseOut={handleMouseBurgerOut}>
    			<BurgerIcon type={isBurgerHovering}/>
    			<span className={isBurgerTextHovering}>Конструктор</span>
    		</li>
    		<li className={`${appHeader.list} pl-5 pr-5 pb-4 pt-4`} onMouseOver={handleMouseListIconOver} onMouseOut={handleMouseListIconOut}>
    			<ListIcon type={isListIconHovering}/>
    			<span className={isListIconTextHovering}>Лента заказов</span>
    		</li>
    		<li className={appHeader.logo}><Logo /></li>
    		<li className={`${appHeader.profile} pl-5 pr-5 pb-4 pt-4`} onMouseOver={handleMouseProfileIconOver} onMouseOut={handleMouseProfileIconOut}>
    			<ProfileIcon type={isProfileIconHovering}/>
    			<span className={isProfileTextIconHovering}>Личный кабинет</span>
    		</li>
      </ul>		
	 </nav>
  );
}

export default AppHeader;
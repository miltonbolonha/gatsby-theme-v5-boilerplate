import React from "react";
import { Link } from "gatsby";
import MainMenuList from "../components/MainMenuList";

const MainMenuContainer = ({
  refState,
  isMobile,
  wrapperRef,
  mainMenuItems,
}) => {
  const isVisibleClass = refState ? "visible" : "not-visible";
  const navClasses = isMobile
    ? "main-nav menu-state-" + isVisibleClass
    : "main-nav  main-header main-header-" + isVisibleClass;
  const labelledby = isMobile ? "check-toggle-icon" : null;
  return (
    <nav
      className={navClasses}
      ref={wrapperRef}
      id='site-navigation'
      itemScope='itemScope'
      itemType='https://schema.org/SiteNavigationElement'
    >
      <ul
        className='main-ul'
        id='mainmenu'
        role='menu'
        aria-labelledby={labelledby}
      >
        {mainMenuItems?.map((listMobile, indxMobile) => (
          <MainMenuList
            list={listMobile}
            key={indxMobile}
            isMobile={isMobile}
          />
        ))}
        <li>
          <Link to='/'>English</Link>
        </li>
        <ul className='main-ul-ul hidden'>
          <li>
            <Link to='/'>English</Link>
          </li>
          <li>
            <Link to='/de/'>Deutsch</Link>
          </li>
          <li>
            <Link to='/fr/'>Français</Link>
          </li>
          <li>
            <Link to='/es/'>Español</Link>
          </li>
          <li>
            <Link to='/ne/'>Nederlands</Link>
          </li>
          <li>
            <Link to='/pt/'>Português</Link>
          </li>
          <li>
            <Link to='/ru/'>Русский</Link>
          </li>
        </ul>
      </ul>
    </nav>
  );
};
export default MainMenuContainer;

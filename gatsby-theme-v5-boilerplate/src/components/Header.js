import React from "react";
import { Row } from "@Components/InsertRow";
import { Link } from "gatsby";
import MainMenuContainer from "../containers/MainMenuContainer";
import { GatsbyImage, getImage, getSrc } from "gatsby-plugin-image";

const Header = ({
  refState,
  menuActive,
  wrapperRef,
  bgOne,
  bgTwo,
  mainMenuStatus,
  mainMenuItems,
  mainMenu,
  logo,
  logotype,
  logoImage,
  handleRefState,
  flags,
}) => {
  function getFlag(i18n) {
    switch (i18n) {
      case "pt-BR":
        return "BR";
      case "en-US":
        return "US";
      case "de-DE":
        return "DE";
      case "jp-JP":
        return "JP";
      case "ru-RU":
        return "RU";
      case "fr-FR":
        return "FR";
      case "nl-NL":
        return "NL";
      case "es-ES":
        return "ES";
      default:
        return "BR";
    }
  }
  return (
    <header>
      <Row
        opt={{
          isBoxed: false,
          bgColor: bgOne,
          classes: "main-header",
          numColumns: 2,
        }}
      >
        {logotype}
        {/* mobile menu */}
        {mainMenuStatus === true ? (
          <>
            <div className={"main-header-" + menuActive}>
              <div className='header-columns toggle-menu'>
                <button
                  type='button'
                  id='check-toggle-icon'
                  onClick={handleRefState}
                  aria-haspopup='true'
                  aria-controls='mainmenu'
                  aria-expanded={refState ? "opened" : false}
                  aria-label='Alternar visibilidade do menu'
                  className={`menu-wrapper menu-bar-icon  ${
                    !refState ? "active opened" : "not-active"
                  }`}
                >
                  <svg width='100' height='100' viewBox='0 0 100 100'>
                    <path
                      className='line line1'
                      d='M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058'
                    />
                    <path className='line line2' d='M 20,50 H 80' />
                    <path
                      className='line line3'
                      d='M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942'
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div className='main-menu'>
              <MainMenuContainer
                wrapperRef={wrapperRef}
                refState={refState}
                mainMenuStatus={mainMenuStatus}
                isMobile={false}
                mainMenuItems={mainMenu}
              />
            </div>
          </>
        ) : null}
        {/* desktop menu */}
        {/* available locales menu */}
        {/* <ul className='locales-menu'>
          {flags?.map((e, i) => {
            const x = i === 0;
            const plus = x ? <span className='plus-locales'>+</span> : null;
            return (
              <>
                <li>
                  <Link
                    to={e.slug}
                    className='locales available active'
                    title={e.i18n}
                  >
                    {getFlag(e.i18n)}
                  </Link>
                </li>
                {plus}
              </>
            );
          })}
        </ul> */}
      </Row>
    </header>
  );
};

export default Header;

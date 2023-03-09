import React from "react";
import { Row } from "@Components/InsertRow";
import MainMenuContainer from "../containers/MainMenuContainer";
import { GatsbyImage, getImage, getSrc } from "gatsby-plugin-image";
import ThemeContext from "@Context/ThemeContext";

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
  handleRefState,
}) => {
  return (
    <ThemeContext.Consumer>
      {theme => {
        const logoImage = getImage(
          theme.bigQuery.darkLogo.nodes[0].childImageSharp
        );
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
              {/* mobile menu */}
              {mainMenuStatus === true ? (
                <>
                  <div className={"mobile-only main-header-" + menuActive}>
                    <div className='header-columns toggle-menu'>
                      <button
                        type='button'
                        id='check-toggle-icon'
                        onClick={handleRefState}
                        aria-haspopup='true'
                        aria-controls='mainmenu'
                        aria-expanded={refState}
                        aria-label='Alternar visibilidade do menu'
                        className={`menu-wrapper menu-bar-icon  ${
                          refState ? "active" : "not-active"
                        }`}
                      >
                        ...
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
              <GatsbyImage
                image={logoImage}
                alt={"Logo"}
                placeholder={"NONE"}
                critical='true'
                className={"main-logo"}
                width={250}
                height={50}
              />
            </Row>
          </header>
        );
      }}
    </ThemeContext.Consumer>
  );
};

export default Header;

import React from "react";
import MainMenuData from "@Content/menus/main-menu.json";
import HeaderContainer from "@Containers/HeaderContainer";
const HeaderBlock = ({ logotipoSvg }) => {
  return (
    <>
      <HeaderContainer
        opt={{
          mainMenuStatus: MainMenuData.menu.status,
          logoSvg: logotipoSvg,
          bgOne: "transparent",
          bgTwo: "transparent",
          classes: "header-block",
        }}
        mainMenu={MainMenuData.menu.items}
      />
    </>
  );
};

export default HeaderBlock;

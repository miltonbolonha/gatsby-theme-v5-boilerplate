import React from "react";
import NoSubs from "@Components/NoSubs";
import ThemeContext from "@Context/ThemeContext";
const NoSubsContainer = ({ opt }) => {
  return (
    <ThemeContext.Consumer>
      {theme => {
        const bigQuery = theme.bigQuery;
        const defaultJSON = bigQuery.schemasJSON.nodes.filter(
          el => el.schema[0].card[0].cardLocale === "en-US"
        );
        const card = defaultJSON[0].schema[0].card[0];
        const legend = card.pagesHelper.globals.notAvailableLocale;
        const i18n = card.pagesHelper.globals.notAvailableRedirectLocale;
        const x =
          i18n === "en"
            ? "/" + opt.toDefaultPath
            : "/" + i18n + "/" + opt.toDefaultPath;
        return (
          <NoSubs
            openGerman={card.pagesHelper.globals.openGerman}
            notAvailableLocale={legend}
            toDefaultPath={x}
            classes={opt.classes}
          />
        );
      }}
    </ThemeContext.Consumer>
  );
};

export default NoSubsContainer;

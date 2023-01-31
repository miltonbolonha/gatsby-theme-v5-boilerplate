import React, { useState, useEffect } from "react";
import { graphql, useStaticQuery } from "gatsby";

import schemaOrg from "../../../content/configs/schema-org.json";
import schemaOrgEN from "../../../content/configs/schema-org.en.json";

const card = schemaOrg.schema[0].card[0];
const cardEN = schemaOrgEN.schema[0].card[0];

const defaultState = {
  businessInfo: null,
  getBusinessInfo: () => {},
};
// const cachedValue = cache.get(`defaultLocale`);

const ThemeContext = React.createContext(defaultState);

const ThemeProvider = ({ children }) => {
  const [businessInfo, setBusinessInfo] = useState(null);
  const defaultLocale = card.brandIntl || "pt-BR";
  const [i18nLocale, setI18nLocale] = useState(defaultLocale);

  function localeI18n(s) {
    setI18nLocale(s);
  }

  function localeI18nEn() {
    setI18nLocale("en-US");
  }

  function localeI18nPtCard() {
    setBusinessInfo(card);
  }

  function localeI18nEnCard() {
    setBusinessInfo(cardEN);
  }

  return (
    <ThemeContext.Provider
      value={{
        businessInfo,
        i18nLocale,
        localeI18n: localeI18n,
        localeI18nEn: localeI18nEn,
        localeI18nEnCard: localeI18nEnCard,
        localeI18nPtCard: localeI18nPtCard,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;

export { ThemeProvider };

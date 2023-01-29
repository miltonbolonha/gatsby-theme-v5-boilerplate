import React, { useState, useEffect } from "react";
import { graphql, useStaticQuery } from "gatsby";

import { i18n } from "@lingui/core";

const defaultState = {
  businessInfo: null,
  getBusinessInfo: () => {},
};

const ThemeContext = React.createContext(defaultState);

// Getting businessInfo mode information from OS!
// You need macOS Mojave + Safari Technology Preview Release 68 to test this currently.

const ThemeProvider = ({ children }) => {
  const [businessInfo, setBusinessInfo] = useState(null);
  const defaultLocale = "pt-BR";
  const [i18nLocale, setI18nLocale] = useState(defaultLocale);

  async function dynamicActivate(locale) {
    const { messages } = await import(`../../../content/i18n/${locale}/main`);
    i18n.load(locale, messages);
    i18n.activate(locale);
    console.log(messages);
  }

  const biQuery = useStaticQuery(graphql`
    query bi {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);
  // function bi(s) {
  //   setBusinessInfo(s);
  // }

  useEffect(() => {
    setBusinessInfo(biQuery?.site?.siteMetadata);
  }, [biQuery]);

  function localeI18n(s) {
    setI18nLocale(s);
    dynamicActivate(s);
  }

  function localeI18nEn() {
    setI18nLocale("en-US");
    dynamicActivate("en-US");
  }

  return (
    <ThemeContext.Provider
      value={{
        businessInfo,
        i18nLocale,
        localeI18n: localeI18n,
        localeI18nEn: localeI18nEn,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;

export { ThemeProvider };

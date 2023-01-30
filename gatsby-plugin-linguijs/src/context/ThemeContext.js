import React, { useState, useEffect } from "react";
import { graphql, useStaticQuery } from "gatsby";

import schemaOrg from "../../../content/configs/schema-org.json";

const card = schemaOrg.schema[0].card[0];

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

  const contextQueries = useStaticQuery(graphql`
    query bi {
      site {
        siteMetadata {
          title
        }
      }
      allSchemaJson {
        nodes {
          card {
            brandAppName
            brandAppRepo
            brandAppVersion
            brandCardImage
            brandDescription
            brandEmail
            brandGithub
            brandHexHelperColor
            brandHexMainColor
            brandHighlights
            brandIntl
            brandKeywords {
              key
            }
            brandLinkTree {
              deezer
              facebook
              github
              instagram
              spotify
              itunes
              twitter
              website
              youtube
            }
            brandLogo
            brandLogoTransparent
            brandName
            brandPascalName
            brandPerson
            brandPersonBusinessBio
            brandPersonBusinessHistory
            brandPersonFamilyBio
            brandPhone
            brandPromoEmail
            brandQuestions
            brandSeoDivisor
            brandSlugName
            brandTopologyDivName
            brandTopologyDivSlug
            brandUrl
            brandVideoText
            brandVideoUrl
            cardLocale
            contentPath
            datePublished
            imageBreakPoints
            imageFormats
            imageMaxWidth
            imageQuality
            postPerPage
            staticImagesPath
            technicalOfficer
            themePath
            trailingSlash
          }
        }
      }
    }
  `);
  // function bi(s) {
  //   setBusinessInfo(s);
  // }

  useEffect(() => {
    setBusinessInfo(contextQueries);
  }, [contextQueries]);

  function localeI18n(s) {
    setI18nLocale(s);
  }

  function localeI18nEn() {
    setI18nLocale("en-US");
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

import React, { useState, useEffect } from "react";
import { graphql, useStaticQuery } from "gatsby";

import schemaOrg from "../../../content/configs/schema-org.json";
import schemaOrgEN from "../../../content/configs/schema-org.en.json";

const card = schemaOrg.schema[0].card[0];
const cardEN = schemaOrgEN.schema[0].card[0];

const defaultState = {
  businessInfo: null,
  i18nLocale: null,
  localeI18n: null,
  localeI18nEn: null,
  localeI18nEnCard: null,
  localeI18nPtCard: null,
  queryState: null,
  bigQuery: null,
};
// const cachedValue = cache.get(`defaultLocale`);

const ThemeContext = React.createContext(defaultState);

const ThemeProvider = ({ children }) => {
  const [businessInfo, setBusinessInfo] = useState(null);
  const [queryState, setQueryState] = useState(null);
  const defaultLocale = card.brandIntl || "pt-BR";
  const [i18nLocale, setI18nLocale] = useState(defaultLocale);

  const bigQuery = useStaticQuery(graphql`
    query {
      treatmentImages: allFile(
        filter: { sourceInstanceName: { eq: "treatmentImages" } }
      ) {
        nodes {
          relativePath
          publicURL
          childImageSharp {
            gatsbyImageData(width: 890, height: 790, quality: 90)
          }
        }
      }

      brandImages: allFile(
        filter: { sourceInstanceName: { eq: "brandImages" } }
      ) {
        nodes {
          relativePath
          publicURL
          childImageSharp {
            gatsbyImageData(quality: 100)
          }
        }
      }

      generalImages: allFile(
        filter: { sourceInstanceName: { eq: "generalImages" } }
      ) {
        nodes {
          relativePath
          publicURL
          childImageSharp {
            gatsbyImageData(quality: 90)
          }
        }
      }

      heroImages: allFile(
        filter: { sourceInstanceName: { eq: "heroImages" } }
      ) {
        nodes {
          relativePath
          publicURL
          childImageSharp {
            gatsbyImageData(
              width: 1240
              height: 430
              quality: 100
              layout: FULL_WIDTH
            )
          }
        }
      }

      pressImages: allFile(
        filter: { sourceInstanceName: { eq: "pressImages" } }
      ) {
        nodes {
          relativePath
          publicURL
          childImageSharp {
            gatsbyImageData(quality: 90)
          }
        }
      }

      partnerImages: allFile(
        filter: { sourceInstanceName: { eq: "partnerImages" } }
      ) {
        nodes {
          relativePath
          publicURL
          childImageSharp {
            gatsbyImageData(width: 100, quality: 80)
          }
        }
      }

      darkLogo: allFile(
        filter: {
          sourceInstanceName: { eq: "brandImages" }
          relativePath: { eq: "F_Logo_Dark.png" }
        }
      ) {
        nodes {
          relativePath
          publicURL
          childImageSharp {
            gatsbyImageData(width: 250, height: 50, quality: 100)
          }
        }
      }

      whiteLogoMark: allFile(
        filter: {
          sourceInstanceName: { eq: "brandImages" }
          relativePath: { eq: "F_Logo_White.png" }
        }
      ) {
        nodes {
          relativePath
          publicURL
          childImageSharp {
            gatsbyImageData(width: 90, height: 90, quality: 100)
          }
        }
      }
    }
  `);
  console.log("bigQuery");
  // console.log(bigQuery);
  // setQueryState(bigQuery);

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
        queryState: queryState,
        bigQuery: bigQuery,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;

export { ThemeProvider };

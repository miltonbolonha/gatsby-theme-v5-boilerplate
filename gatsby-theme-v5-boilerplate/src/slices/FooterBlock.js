import React from "react";
import { Row } from "@Components/InsertRow";
import { Link } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import ThemeContext from "@Context/ThemeContext";

import HeadingBlock from "@Slices/HeadingBlock";
const FooterBlock = ({ logo, globalSubs }) => {
  return (
    <ThemeContext.Consumer>
      {theme => {
        const brandNodes = theme.bigQuery.brandImages.nodes;
        const whiteFooterLogo = brandNodes.filter(
          el => el.relativePath === "F_Logo_White.png"
        )[0].childImageSharp;
        const whiteFooterMark = brandNodes.filter(
          el => el.relativePath === "FR_Logo_Mark-White.png"
        )[0].childImageSharp;

        return (
          <>
            <Row
              opt={{
                isBoxed: false,
                classes: "section-row bg-primary-dark main-footer-wrapper",
              }}
            >
              <GatsbyImage
                image={getImage(whiteFooterLogo)}
                alt={"Farming Revolutions Partners Logo"}
                placeholder={"NONE"}
                critical='true'
                objectFit='fixed'
                className={"footer-logo-img"}
                width={100}
              />
              <Row
                opt={{
                  classes: "section-row bg-primary-light footer-rounded",
                  isBoxed: true,
                  numColumns: 2,
                }}
              >
                <section className='footer-contacts contacts'>
                  <h3>{globalSubs?.contactUs}</h3>
                  <h1>FARMING REVOLUTION GMBH</h1>
                  <p>Grönerstr. 9</p>
                  <p>71636 Ludwigsburg</p>
                  <a href='mailto:info@farming-revolution.com'>
                    info@farming-revolution.com
                  </a>
                  <a href='tel:+49 714114152301'>+49 714114152301</a>
                </section>
                <div className='footer-languages'>
                  <h3>Languages</h3>
                  <ul>
                    <li>
                      <Link to='/en/'>English</Link>
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
                      <Link to='/nl/'>Nederlands</Link>
                    </li>
                    <li>
                      <Link to='/pt/'>Português</Link>
                    </li>
                    <li>
                      <Link to='/ru/'>Русский</Link>
                    </li>
                  </ul>
                </div>
              </Row>

              <Row
                opt={{
                  classes: "bg-primary-dark footer-copyright",
                  isBoxed: true,
                }}
              >
                <GatsbyImage
                  image={getImage(whiteFooterMark)}
                  alt={"Farming Revolutions Partners Logo"}
                  placeholder={"NONE"}
                  critical='true'
                  objectFit='fixed'
                  className={"copyright-logo-img"}
                  width={80}
                />
                <h3>{globalSubs?.footerLegend}</h3>
                <div className='footer-links'>
                  <a href='/en/privacy-policy'>{globalSubs?.privacyPolicy}</a>
                  <a href='/en/imprint'>{globalSubs?.imprint}</a>
                  <a href='/en/terms'>{globalSubs?.termsConditions}</a>
                </div>
                <p>
                  © {new Date().getFullYear()} - {globalSubs?.copyright}
                </p>
              </Row>
            </Row>
          </>
        );
      }}
    </ThemeContext.Consumer>
  );
};

export default FooterBlock;

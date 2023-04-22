import React from "react";
import { Row } from "@Components/InsertRow";
import { Link } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { useSiteMetadatas } from "../tools/useSiteMetadatas";

const FooterBlock = ({ logo, globalSubs }) => {
  const { whiteLogoMark, flagDeco } = useSiteMetadatas();
  console.log(whiteLogoMark);
  const whiteFooterLogo = whiteLogoMark.nodes[0]?.childImageSharp;
  const whiteFooterMark = flagDeco.nodes[0]?.childImageSharp;
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
          alt={"Milton Bolonhas Partners Logo"}
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
            <div>
              <h3>{globalSubs?.contactUs}</h3>
              <h1>Milton Bolonha</h1>
              <p>DECOLONIZE JÁ!</p>
              <p>@DECOLONIZEJA</p>
              <a href='mailto:info@milton-bolonha.com'>
                contato@miltonbolonha.com.br
              </a>
              <a href='tel:+12 98106-2959'>+12 98106-2959</a>
            </div>
          </section>
          <div className='footer-languages'>
            <h3>Idiomas</h3>
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
                <Link to='/'>Português</Link>
              </li>
              <li>
                <Link to='/ru/'>Русский</Link>
              </li>
            </ul>
          </div>
        </Row>

        <Row
          opt={{
            classes: "footer-copyright",
            isBoxed: true,
          }}
        >
          <GatsbyImage
            image={getImage(whiteFooterMark)}
            alt={"Milton Bolonhas Partners Logo"}
            placeholder={"NONE"}
            critical='true'
            objectFit='fixed'
            className={"copyright-logo-img"}
            width={80}
          />
          <h3>{globalSubs?.footerLegend}</h3>
          <div className='footer-links'>
            <a href='/politica-privacidade'>{globalSubs?.privacyPolicy}</a>
            <a href='/responsavel-tecnico'>{globalSubs?.imprint}</a>
            <a href='/termos'>{globalSubs?.termsConditions}</a>
          </div>
          <p>© 2023 - {globalSubs?.copyright}</p>
        </Row>
      </Row>
    </>
  );
};

export default FooterBlock;

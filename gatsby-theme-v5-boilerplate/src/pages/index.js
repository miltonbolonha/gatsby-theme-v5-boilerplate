import React, { useState } from "react";
import { Link, graphql, useStaticQuery, Slice } from "gatsby";
import { GatsbyImage, getImage, getSrc } from "gatsby-plugin-image";
import { Row } from "@Components/InsertRow";
import HeadingBlock from "@Slices/HeadingBlock";
import MainTemplateWrapper from "@Slices/MainTemplateWrapper";
import Seo from "@Slices/Seo";
import { useSiteMetadatas } from "../tools/useSiteMetadatas";

const IndexPage = ({ pageContext, location }) => {
  const {
    schemasJSON,
    brandImages,
    generalImages,
    pressImages,
    darkLogo,
    whiteLogoMark,
    boilerplateLogo,
    boilerplateLogoSmall,
    profileOficial,
    imgHolder,
    treatmentImages,
    heroImages,
    partnerImages,
  } = useSiteMetadatas();

  const regex = /\/(\w{2})\//;
  const locationUrl = location.pathname.match(regex);
  const logoLocationUrl = locationUrl ? locationUrl[1] : "";
  const flags = [
    {
      i18n: "pt-BR",
      slug: "/",
    },
    {
      i18n: "en-US",
      slug: "/en/",
    },
    {
      i18n: "de-DE",
      slug: "/de/",
    },
    {
      i18n: "fr-FR",
      slug: "/fr/",
    },
    {
      i18n: "es-ES",
      slug: "/es/",
    },
    {
      i18n: "pt-BR",
      slug: "/",
    },
    {
      i18n: "nl-NL",
      slug: "/nl/",
    },
    {
      i18n: "ru-RU",
      slug: "/ru/",
    },
    {
      i18n: "jp-JP",
      slug: "/jp/",
    },
  ];
  const i =
    logoLocationUrl && logoLocationUrl !== undefined && logoLocationUrl !== ""
      ? locationUrl[1]
      : "pt-BR";
  const y = schemasJSON.nodes.filter(sch =>
    sch.schema[0].card[0].cardLocale.includes(i)
  );
  const cardY = y[0].schema[0].card[0];
  const indexSubs = cardY?.pagesHelper?.index;
  const globalSubs = y?.pagesHelper?.globals;
  const whipala = brandImages?.nodes?.filter(
    brandImgs => brandImgs.relativePath === "whipala.png"
  );
  const bgWhipala = whipala
    ? whipala[0]?.childImageSharp?.gatsbyImageData?.images?.fallback?.src
    : null;

  const pattern = brandImages?.nodes?.filter(
    brandImgs => brandImgs.relativePath === "PATTERN-bg.png"
  );
  const bgPattern = pattern
    ? pattern[0]?.childImageSharp?.gatsbyImageData?.images?.fallback?.src
    : null;
  const patternDark = brandImages?.nodes?.filter(
    brandImgs => brandImgs.relativePath === "PATTERN-bg-dark.png"
  );
  const bgPatternDark = patternDark
    ? patternDark[0]?.childImageSharp?.gatsbyImageData?.images?.fallback?.src
    : null;

  const patternFooterGrafism = brandImages?.nodes?.filter(
    brandImgs => brandImgs.relativePath === "PATTERN-bg-2.png"
  );
  const patternFooterGrafismImg = patternFooterGrafism
    ? patternFooterGrafism[0]?.childImageSharp?.gatsbyImageData?.images
        ?.fallback?.src
    : null;

  const patternFooterGrafismDark = brandImages?.nodes?.filter(
    brandImgs => brandImgs.relativePath === "PATTERN-bg-2-dark.png"
  );
  const patternFooterGrafismImgDark = patternFooterGrafismDark
    ? patternFooterGrafismDark[0]?.childImageSharp?.gatsbyImageData
    : null;
  const toproof = generalImages?.nodes?.filter(
    generalImgs => generalImgs?.relativePath === "mb-left-mic-guitar.jpg"
  );
  const treatmentNodes = treatmentImages?.nodes;
  const partnersNodes = partnerImages?.nodes;
  const getSectionOneImg = toproof
    ? toproof[0]?.childImageSharp?.gatsbyImageData
    : null;
  return (
    <>
      <MainTemplateWrapper
        logo={"darkLogo.publicURL"}
        backgroundImage={{
          src: bgPattern,
        }}
        opt={{
          titleSeo: `Milton Bolonha`,
          pageQuestions: "defaultQuestions",
          classes: "blog-list",
          schemaType: "blog",
          topology: "index",
          blogListing: "posts?.slice(0, 9)",
          articleUrl: "props.location.href",
          mainLogo: "imgHolder",
          cardImage:
            "cardImage ? getSrc(cardImage.childrenImageSharp[0]) : null",
          serverUrl: "props.location.href",
          badgesWhats: "badgeWhats",
          badgesQuestion: "badgeQuestion",
          globalSubs: globalSubs,
          topRibbonImg: bgWhipala,
          flags: flags,
          urlLocale: logoLocationUrl,
        }}
      >
        <main className='main-container' id='site-content'>
          <Row
            opt={{
              classes: "section-row",
              isBoxed: false,
            }}
          >
            <section className='section-wrapper'>
              <div className='section-row section-columns section-div img-wrapper'>
                <div className='section-image'>
                  <GatsbyImage
                    image={getSectionOneImg}
                    alt={"Logo"}
                    placeholder={"NONE"}
                    critical='true'
                    className={"first-section-img"}
                    width={890}
                  />
                </div>

                <div className='section-infos'>
                  <HeadingBlock
                    classes='m30auto hack'
                    importance={10}
                    width={350}
                    ribbon={false}
                  >
                    {indexSubs?.sectionOneMainTitle}
                  </HeadingBlock>
                  <div className='inner-infos'>
                    <h2>22/abr</h2>
                    <h3>{indexSubs?.sectionOneTrackLegend}</h3>
                    <p>{indexSubs?.sectionOneTrackParagraph}</p>
                  </div>
                  {/* <Link to='datasheet' className='main-btn'>
                          {globalSubs.datasheet}
                        </Link> */}
                  <br />
                </div>
              </div>
            </section>
          </Row>
          {/* <Row
                  opt={{
                    classes: "section-row",
                    isBoxed: false,
                  }}
                >
                  <section className='section-wrapper'>
                    <div
                      className={
                        "section-row section-columns section-div reverse img-wrapper"
                      }
                    >
                      <div className='section-image'>
                        <div className='treatment-wrapper'>
                          <div className='treatment-inner-wrapper'>
                            {treatmentNodes.map((hero, i) => {
                              return (
                                <GatsbyImage
                                  image={getImage(hero)}
                                  alt={"Milton Bolonhas Image"}
                                  placeholder={"NONE"}
                                  critical='true'
                                  objectFit='cover'
                                  className={"treatment-img"}
                                  width={1240}
                                  height={430}
                                  key={i}
                                />
                              );
                            })}
                          </div>
                        </div>
                      </div>

                      <div className='section-infos'>
                        <HeadingBlock
                          classes='m30auto hack'
                          importance={10}
                          width={350}
                          ribbon={false}
                        >
                          {indexSubs?.sectionTwoTitle}
                        </HeadingBlock>
                        <div className='inner-infos'>
                          <h2>R$--,--</h2>
                          <h3>{indexSubs?.sectionTwoPlantsLegend}</h3>
                          <p>{indexSubs?.sectionTwoPlantsParagraph}</p>
                        </div>
                      </div>
                    </div>
                  </section>
                </Row> */}

          {/* <Row
                  opt={{
                    classes: "section-row dark",
                    isBoxed: false,
                    bgImg: bgPatternDark,
                  }}
                >
                  <section className='section-wrapper'>
                    <div className='section-row section-columns section-div img-wrapper'>
                      <div className='section-image'>
                        <GatsbyImage
                          image={patternFooterGrafismImgDark}
                          alt={""}
                          placeholder={"NONE"}
                          critical='true'
                          className={""}
                          width={890}
                          height={790}
                        />
                      </div>

                      <div className='section-infos'>
                        <HeadingBlock
                          classes='m30auto hack'
                          importance={10}
                          width={350}
                          ribbon={false}
                        >
                          {indexSubs?.sectionThreeTitle}
                        </HeadingBlock>
                        <div className='inner-infos'>
                          <h2>2023</h2>
                          <h3>{indexSubs?.sectionThreeHerbicideLegend}</h3>
                          <p>{indexSubs?.sectionThreeHerbicideParagraph}</p>
                        </div>
                      </div>
                    </div>
                  </section>
                </Row> */}
          {/* 
                <Row
                  opt={{
                    classes: "section-row section-padding",
                    isBoxed: false,
                    bgImg: patternFooterGrafismImg,
                  }}
                >
                  <section className='section-wrapper'>
                    <HeadingBlock
                      classes='m30auto hack inner-section-heading'
                      importance={10}
                      width={350}
                      ribbon={false}
                    >
                      {indexSubs?.collaborations}
                    </HeadingBlock>

                    <Row
                      opt={{
                        classes: "partners",
                        isBoxed: true,
                        numColumns: 8,
                      }}
                    >
                      {partnersNodes.map((hero, i) => {
                        return (
                          <div className='partners-img-wrapper' key={i}>
                            <GatsbyImage
                              image={getImage(hero)}
                              alt={"Milton Bolonhas Partners Logo"}
                              placeholder={"NONE"}
                              critical='true'
                              objectFit='fixed'
                              className={"partners-img"}
                              width={100}
                            />
                          </div>
                        );
                      })}
                    </Row>

                  </section>
                </Row> */}

          <Row
            opt={{
              classes: "section-row bg-primary-light ",
              isBoxed: false,
            }}
          >
            <section className='section-wrapper'>
              <Row
                opt={{
                  classes:
                    "section-row section-columns bg-primary-gray dark bio-section",
                  isBoxed: false,
                  numColumns: 1,
                  bgImg: patternFooterGrafismImgDark?.images?.fallback?.src,
                }}
              >
                <HeadingBlock
                  classes='m30auto hack'
                  importance={10}
                  ribbon={false}
                  width={350}
                >
                  {indexSubs?.joinTeam}
                </HeadingBlock>
                <p>{indexSubs?.foundedHistory}</p>
                <Link to={`decolonialidade`} className='main-btn'>
                  {indexSubs?.openPosition}
                </Link>
                <h2>{indexSubs?.notAvailableLocale}</h2>
                <h3>{indexSubs?.openGerman}</h3>
              </Row>
            </section>
          </Row>
        </main>
      </MainTemplateWrapper>
    </>
  );
};

export default IndexPage;

export const Head = ({ pageContext }) => (
  <Seo data={pageContext.SEO} killSeo={false} />
);

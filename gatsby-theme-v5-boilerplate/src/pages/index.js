import React, { useState } from "react";
import { Link, graphql, useStaticQuery } from "gatsby";
import { GatsbyImage, getImage, getSrc } from "gatsby-plugin-image";
import { Row } from "@Components/InsertRow";
import HeadingBlock from "@Slices/HeadingBlock";
import MainTemplateWrapper from "@Slices/MainTemplateWrapper";

import ThemeContext from "@Context/ThemeContext";

const IndexPage = ({ pageContext }) => {
  const data = useStaticQuery(graphql`
    {
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
    }
  `);
  const indexSubs = pageContext.schemaJSON.pagesHelper.index;
  const globalSubs = pageContext.schemaJSON.pagesHelper.globals;
  return (
    <ThemeContext.Consumer>
      {theme => {
        const treatmentNodes = data.treatmentImages.nodes;
        const partnersNodes = data.partnerImages.nodes;
        const heroNodes = data.heroImages.nodes;
        const genImgsNodes = theme.bigQuery.generalImages.nodes;
        const sectionOneImg = genImgsNodes.filter(
          gImgs => gImgs.relativePath === "FR_Hero_Human_cropped.jpg"
        );
        const getSectionOneImg = getImage(sectionOneImg[0]);
        return (
          <>
            <MainTemplateWrapper
              logo={"darkLogo.publicURL"}
              opt={{
                titleSeo: `Farming Revolution`,
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
              }}
            >
              <Row
                opt={{ classes: "main-slider", isBoxed: true, bgColor: "#fff" }}
              >
                <div className='main-slide-inner'>
                  {heroNodes.map((hero, i) => {
                    return (
                      <GatsbyImage
                        image={getImage(hero)}
                        alt={"Farming Revolutions Image"}
                        placeholder={"NONE"}
                        critical='true'
                        objectFit='cover'
                        className={"main-slider-img"}
                        width={1240}
                        height={430}
                        key={i}
                      />
                    );
                  })}
                </div>
              </Row>
              <main className='main-container' id='site-content' role='list'>
                <Row
                  opt={{
                    classes: "section-row",
                    isBoxed: false,
                    bgColor: "#f0f0f0",
                  }}
                >
                  <section className='section-wrapper'>
                    <div className='section-row section-columns section-div img-wrapper'>
                      <div className='section-image'>
                        <HeadingBlock
                          classes='m30auto hack'
                          importance={10}
                          width={350}
                          ribbon={false}
                        >
                          {indexSubs.sectionOneMainTitle}
                        </HeadingBlock>
                        <GatsbyImage
                          image={getSectionOneImg}
                          alt={"Logo"}
                          placeholder={"NONE"}
                          critical='true'
                          className={"main-logo"}
                          width={890}
                          height={790}
                        />
                      </div>

                      <div className='section-infos'>
                        <div className='inner-infos'>
                          <h2>1,35 - 2,25 M</h2>
                          <h3>{indexSubs.sectionOneTrackLegend}</h3>
                          <p>{indexSubs.sectionOneTrackParagraph}</p>
                        </div>
                        <div className='inner-infos'>
                          <h2>20%</h2>
                          <h3>{indexSubs.sectionOneSlopesLegend}</h3>
                          <p>{indexSubs.sectionOneSlopesParagraph}</p>
                        </div>
                        <div className='inner-infos'>
                          <h2>1,5 KW</h2>
                          <h3>{indexSubs.sectionOneConsumptionLegend}</h3>
                          <p>{indexSubs.sectionOneConsumptionParagraph}</p>
                        </div>
                        <div className='inner-infos'>
                          <h2>24 / 7</h2>
                          <h3>{indexSubs.sectionOneAutonomousLegend}</h3>
                          <p>{indexSubs.sectionOneAutonomousParagraph}</p>
                        </div>
                        <Link to='datasheet' className='main-btn'>
                          {globalSubs.datasheet}
                        </Link>
                        <br />
                      </div>
                    </div>
                  </section>
                </Row>
                <Row
                  opt={{
                    classes: "section-row",
                    isBoxed: false,
                    bgColor: "#fff",
                  }}
                >
                  <section className='section-wrapper'>
                    <div
                      className={
                        "section-row section-columns section-div reverse img-wrapper"
                      }
                    >
                      <div className='section-image'>
                        <HeadingBlock
                          classes='m30auto hack'
                          importance={10}
                          width={350}
                          ribbon={false}
                        >
                          {indexSubs.sectionTwoTitle}
                        </HeadingBlock>
                        <div className='treatment-wrapper'>
                          <div className='treatment-inner-wrapper'>
                            {treatmentNodes.map((hero, i) => {
                              return (
                                <GatsbyImage
                                  image={getImage(hero)}
                                  alt={"Farming Revolutions Image"}
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
                        <div className='inner-infos'>
                          <h2>80</h2>
                          <h3>{indexSubs.sectionTwoPlantsLegend}</h3>
                          <p>{indexSubs.sectionTwoPlantsParagraph}</p>
                        </div>
                        <div className='inner-infos'>
                          <h2>1 CM</h2>
                          <h3>{indexSubs.sectionTwoPlantsTwoLegend}</h3>
                          <p>{indexSubs.sectionTwoPlantsTwoParagraph}</p>
                        </div>
                        <div className='inner-infos'>
                          <h2>99 %</h2>
                          <h3>{indexSubs.sectionTwoReabilityLegend}</h3>
                          <p>{indexSubs.sectionTwoReabilityParagraph}</p>
                        </div>
                      </div>
                    </div>
                  </section>
                </Row>

                <Row opt={{ classes: "section-row", isBoxed: false }}>
                  <section className='section-wrapper'>
                    <HeadingBlock
                      classes='m30auto hack'
                      importance={10}
                      width={350}
                      ribbon={false}
                    >
                      {indexSubs.sectionThreeTitle}
                    </HeadingBlock>

                    <div className='section-row section-columns section-div img-wrapper'>
                      <div className='section-image'>
                        <GatsbyImage
                          image={getSectionOneImg}
                          alt={"Logo"}
                          placeholder={"NONE"}
                          critical='true'
                          className={"main-logo"}
                          width={890}
                          height={790}
                        />
                      </div>

                      <div className='section-infos'>
                        <div className='inner-infos'>
                          <h2>0 %</h2>
                          <h3>{indexSubs.sectionThreeHerbicideLegend}</h3>
                          <p>{indexSubs.sectionThreeHerbicideParagraph}</p>
                        </div>
                        <div className='inner-infos'>
                          <h2>5 MM</h2>
                          <h3>{indexSubs.sectionThreeAccuracyLegend}</h3>
                          <p>{indexSubs.sectionThreeAccuracyParagraph}</p>
                        </div>
                        <div className='inner-infos'>
                          <h2>100 %</h2>
                          <h3>{indexSubs.sectionThreeWeedingLegend}</h3>
                          <p>{indexSubs.sectionThreeWeedingParagraph}</p>
                        </div>
                      </div>
                    </div>
                  </section>
                </Row>

                <Row
                  opt={{
                    classes: "section-row section-padding",
                    isBoxed: false,
                    bgColor: "#fff",
                  }}
                >
                  <section className='section-wrapper'>
                    <HeadingBlock
                      classes='m30auto hack inner-section-heading'
                      importance={10}
                      width={350}
                      ribbon={false}
                    >
                      {indexSubs.collaborations}
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
                              alt={"Farming Revolutions Partners Logo"}
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
                </Row>

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
                          "section-row section-columns bg-primary-gray pre-footer-section",
                        numColumns: 1,
                      }}
                    >
                      <HeadingBlock
                        classes='m30auto hack'
                        importance={10}
                        ribbon={false}
                        width={350}
                      >
                        {indexSubs.joinTeam}
                      </HeadingBlock>
                      <p>{indexSubs.foundedHistory}</p>
                      <Link href={`careers`} className='main-btn'>
                        {indexSubs.openPosition}
                      </Link>
                      <h2>{indexSubs.notAvailableLocale}</h2>
                      <h3>{indexSubs.openGerman}</h3>
                    </Row>
                  </section>
                </Row>
              </main>
            </MainTemplateWrapper>
          </>
        );
      }}
    </ThemeContext.Consumer>
  );
};

export default IndexPage;

export const Head = () => <title>Home Page</title>;

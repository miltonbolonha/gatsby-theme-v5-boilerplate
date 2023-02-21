import React, { useState } from "react";
import { Link } from "gatsby";
import { GatsbyImage, getImage, getSrc } from "gatsby-plugin-image";
import { Row } from "@Components/InsertRow";
import HeadingBlock from "@Slices/HeadingBlock";
import MainTemplateWrapper from "@Slices/MainTemplateWrapper";

import ThemeContext from "@Context/ThemeContext";

const IndexPage = ({ pageContext }) => {
  const indexSubs = pageContext.schemaJSON.pagesHelper.index;
  const schemaBusiness = pageContext.schemaJSON;

  console.log("pageContext");
  console.log(pageContext);
  return (
    <ThemeContext.Consumer>
      {theme => {
        // console.log("theme");
        // console.log(theme);
        console.log("theme");
        const partnersNodes = theme.bigQuery.partnerImages.nodes;
        const heroNodes = theme.bigQuery.heroImages.nodes;
        const genImgsNodes = theme.bigQuery.generalImages.nodes;
        const sectionOneImg = genImgsNodes.filter(
          gImgs => gImgs.relativePath === "FR_Hero_Human_cropped.jpg"
        );

        const getSectionOneImg = getImage(sectionOneImg[0]);
        console.log(getSectionOneImg);
        // const darkLogo = theme.bigQuery.darkLogo.nodes[0];
        // const heroImages = theme.bigQuery.heroImages;
        // const indexImages = theme.bigQuery.indexImages;
        // const generalImages = theme.bigQuery.generalImages;
        // generalImages.filter(ele=>ele.)

        // console.log("generalImages");
        // const mainSectionImg = generalImages.nodes.filter(
        // ele => ele.relativePath === "FR_Hero_Human_cropped.jpg"
        // );
        // const getMainSectionImg = getImage(mainSectionImg[0]);
        // console.log("mainSectionImg");
        // console.log(mainSectionImg[0]);
        return (
          <>
            <MainTemplateWrapper
              logo={"darkLogo.publicURL"}
              opt={{
                titleSeo: `Farmin Revolution - As Casamenteiras`,
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
              }}
            >
              <Row opt={{ classes: "main-slider", isBoxed: true }}>
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
                    />
                  );
                })}
              </Row>
              <main className='main-container' id='site-content' role='list'>
                <Row opt={{ classes: "section-row", isBoxed: false }}>
                  <section className='section-wrapper'>
                    <HeadingBlock
                      classes='m30auto hack'
                      importance={10}
                      width={350}
                      ribbon={false}
                    >
                      Powerful, Energy-efficient And Autonomous
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
                          <h2>1,35 - 2,25 m</h2>
                          <h3>Track width</h3>
                          <p>Easily adaptable to your crops</p>
                        </div>
                        <div className='inner-infos'>
                          <h2>1,35 - 2,25 m</h2>
                          <h3>Track width</h3>
                          <p>Easily adaptable to your crops</p>
                        </div>
                        <div className='inner-infos'>
                          <h2>1,35 - 2,25 m</h2>
                          <h3>Track width</h3>
                          <p>Easily adaptable to your crops</p>
                        </div>
                        <div className='inner-infos'>
                          <h2>1,35 - 2,25 m</h2>
                          <h3>Track width</h3>
                          <p>Easily adaptable to your crops</p>
                        </div>
                      </div>
                    </div>
                  </section>
                </Row>

                {/* <Link to='/causas-apoiadas/'>
            <h3>Empreendedorismo Feminino</h3>
          </Link> */}

                <Row opt={{ classes: "section-row", isBoxed: false }}>
                  <section className='section-wrapper'>
                    <HeadingBlock
                      classes='m30auto hack'
                      importance={10}
                      width={350}
                      ribbon={false}
                    >
                      Precise And Reliable Plant Recognition
                    </HeadingBlock>

                    <div
                      className={
                        "section-row section-columns section-div reverse img-wrapper"
                      }
                    >
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
                          <h2>1,35 - 2,25 m</h2>
                          <h3>Track width</h3>
                          <p>Easily adaptable to your crops</p>
                        </div>
                        <div className='inner-infos'>
                          <h2>1,35 - 2,25 m</h2>
                          <h3>Track width</h3>
                          <p>Easily adaptable to your crops</p>
                        </div>
                        <div className='inner-infos'>
                          <h2>1,35 - 2,25 m</h2>
                          <h3>Track width</h3>
                          <p>Easily adaptable to your crops</p>
                        </div>
                        <div className='inner-infos'>
                          <h2>1,35 - 2,25 m</h2>
                          <h3>Track width</h3>
                          <p>Easily adaptable to your crops</p>
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
                      Robust And Effective Weeding
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
                          <h2>1,35 - 2,25 m</h2>
                          <h3>Track width</h3>
                          <p>Easily adaptable to your crops</p>
                        </div>
                        <div className='inner-infos'>
                          <h2>1,35 - 2,25 m</h2>
                          <h3>Track width</h3>
                          <p>Easily adaptable to your crops</p>
                        </div>
                        <div className='inner-infos'>
                          <h2>1,35 - 2,25 m</h2>
                          <h3>Track width</h3>
                          <p>Easily adaptable to your crops</p>
                        </div>
                        <div className='inner-infos'>
                          <h2>1,35 - 2,25 m</h2>
                          <h3>Track width</h3>
                          <p>Easily adaptable to your crops</p>
                        </div>
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
                    <HeadingBlock
                      classes='m30auto hack'
                      importance={10}
                      width={350}
                      ribbon={false}
                    >
                      Collaborations
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
                          <div className='partners-img-wrapper'>
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

                <Row opt={{ classes: "section-row", isBoxed: false }}>
                  <section className='section-wrapper'>
                    <Row
                      opt={{
                        classes: "section-row section-columns bg-primary-gray",
                        numColumns: 1,
                      }}
                    >
                      <HeadingBlock
                        classes='m30auto hack'
                        importance={10}
                        width={350}
                      >
                        Want To Join Our Team?
                      </HeadingBlock>
                      <p>
                        Founded in 2020, farming revolution has embraced a
                        remote work culture from the very beginning. With
                        flexible working hours and no central office, much of
                        the development work can be done from your home or
                        preferred location, without the hassle and costs of
                        commuting. For everything that cannot be done remotely,
                        we do have a varying number of testing locations in
                        Germany, Spain and other parts of Europe. We are a young
                        team of enthusiasts on a mission to make plant
                        cultivation more sustainable.
                      </p>
                      <a href='#'>See open position</a>
                      <h2>Not all content is available in English.</h2>
                      <h3>Open site in German</h3>
                    </Row>
                  </section>
                </Row>

                <Row
                  opt={{
                    classes: "section-row bg-primary-light",
                    isBoxed: true,
                    numColumns: 2,
                  }}
                >
                  <div className='contacts'>
                    <h3>Contact us</h3>
                    <p>
                      Farming revolution GmbH
                      <br />
                      Grönerstr. 9<br />
                      71636 Ludwigsburg
                      <br />
                      <a href='mailto:info@farming-revolution.com'>
                        info@farming-revolution.com
                      </a>
                      <br />
                      <a href='tel:+49 714114152301'>+49 714114152301</a>
                    </p>
                  </div>
                  <div className='footer-languages'>
                    <h3>Languages</h3>
                    <a href='/en/'>English</a>
                    <a href='/de/'>Deutsch</a>
                    <a href='/fr/'>Français</a>
                    <a href='/es/'>Español</a>
                    <a href='/nl/'>Nederlands</a>
                    <a href='/pt/'>Português</a>
                    <a href='/ru/'>Русский</a>
                  </div>
                </Row>
                <Row opt={{ classes: "bg-primary-dark" }}>
                  logo
                  <h3>
                    Simplify sustainable agriculture and make it affordable for
                    every farmer
                  </h3>
                  <div className='footer-links'>
                    <a href='/en/privacy-policy'>Privacy Policy</a>
                    <a href='/en/imprint'>Imprint</a>
                    <a href='/en/terms'>Terms and conditions</a>
                  </div>
                  <p>Copyright © farming revolution GmbH</p>
                </Row>
              </main>
            </MainTemplateWrapper>
            <main className={"pageStyles"}>{indexSubs.mainTitle}</main>
          </>
        );
      }}
    </ThemeContext.Consumer>
  );
};

export default IndexPage;

export const Head = () => <title>Home Page</title>;

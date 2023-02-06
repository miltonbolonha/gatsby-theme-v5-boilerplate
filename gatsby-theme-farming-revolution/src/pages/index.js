import React, { useState } from "react";
import { Link } from "gatsby";
import { GatsbyImage, getImage, getSrc } from "gatsby-plugin-image";
import { Row } from "@Components/InsertRow";
import HeadingBlock from "@Slices/HeadingBlock";
import MainTemplateWrapper from "@Slices/MainTemplateWrapper";

const IndexPage = ({ pageContext }) => {
  const indexSubs = pageContext.schemaJSON.pagesHelper.index;
  const schemaBusiness = pageContext.schemaJSON;

  console.log("pageContext");
  console.log(pageContext);
  return (
    <>
      <MainTemplateWrapper
        logo={"logo.src"}
        opt={{
          titleSeo: `Cerimonialista de Casamentos - As Casamenteiras`,
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
        <ul>
          {" "}
          <li>logo</li>
          <ul>
            <li> slider IMG</li>
            <li> slider IMG</li>
            <li> slider IMG</li>
          </ul>
        </ul>
        <main className='main-container' id='site-content' role='list'>
          <Row opt={{ classes: "section-row", isBoxed: false }}>
            <section className='section-wrapper'>
              <HeadingBlock classes='m30auto hack' importance={10} width={350}>
                Powerful, Energy-efficient And Autonomous
              </HeadingBlock>

              <Row
                opt={{ classes: "section-row section-columns", numColumns: 2 }}
              >
                <div className='section-image'>IMAGE</div>

                <div className='section-infos'>
                  <div className='inner-infos'>
                    1,35 - 2,25 M Track width Easily adaptable to your crops
                  </div>
                  <div className='inner-infos'>
                    20 % Slopes 4-wheel drive, crab steering in slopes, low
                    weight
                  </div>
                  <div className='inner-infos'>
                    1,5 KW Consumption Fully electrical, light-weight, low CO2
                    footprint, no hydraulics
                  </div>
                  <div className='inner-infos'>
                    24 / 7 Autonomous Fully autonomous, optional remote
                    supervision over internet, 30h autonomy (through range
                    extender)
                  </div>
                </div>
              </Row>
            </section>
          </Row>

          {/* <Link to='/causas-apoiadas/'>
            <h3>Empreendedorismo Feminino</h3>
          </Link> */}

          <Row opt={{ classes: "section-row", isBoxed: false }}>
            <section className='section-wrapper'>
              <HeadingBlock classes='m30auto hack' importance={10} width={350}>
                Precise And Reliable Plant Recognition
              </HeadingBlock>

              <Row
                opt={{ classes: "section-row section-columns", numColumns: 2 }}
              >
                <div className='section-image'>IMAGE</div>

                <div className='section-infos'>
                  <div className='inner-infos'>
                    80 Plants Cabbage, lettuce varieties, onions, corn, sugar
                    beet, pumpkin, field bean, potato, canola, soybean, wheat,
                    ...
                  </div>
                  <div className='inner-infos'>
                    1 CM Plant size Distinguishes small plants (starting from
                    cotyledon stage), day and night
                  </div>
                  <div className='inner-infos'>
                    99 % Reliability Largest annotated plant image database in
                    the world
                  </div>
                </div>
              </Row>
            </section>
          </Row>

          <Row opt={{ classes: "section-row", isBoxed: false }}>
            <section className='section-wrapper'>
              <HeadingBlock classes='m30auto hack' importance={10} width={350}>
                Robust And Effective Weeding
              </HeadingBlock>

              <Row
                opt={{ classes: "section-row section-columns", numColumns: 2 }}
              >
                <div className='section-image'>IMAGE</div>

                <div className='section-infos'>
                  <div className='inner-infos'>
                    0 % Herbicide Fully mechanical treatment with rotating
                    chopper for harshest conditions
                  </div>
                  <div className='inner-infos'>
                    5 MM Accuracy Removal of weeds close to the crop, even when
                    crops and weeds overlap
                  </div>
                  <div className='inner-infos'>
                    100 % Weeding In-row and inter-row weeding, large and small
                    weeds, hard and sandy soils
                  </div>
                </div>
              </Row>
            </section>
          </Row>

          <Row
            opt={{ classes: "section-row", isBoxed: false, bgColor: "#fff" }}
          >
            <section className='section-wrapper'>
              <HeadingBlock classes='m30auto hack' importance={10} width={350}>
                Collaborations
              </HeadingBlock>

              <Row
                opt={{ classes: "section-row section-columns", numColumns: 1 }}
              >
                logos
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
                  Founded in 2020, farming revolution has embraced a remote work
                  culture from the very beginning. With flexible working hours
                  and no central office, much of the development work can be
                  done from your home or preferred location, without the hassle
                  and costs of commuting. For everything that cannot be done
                  remotely, we do have a varying number of testing locations in
                  Germany, Spain and other parts of Europe. We are a young team
                  of enthusiasts on a mission to make plant cultivation more
                  sustainable.
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
            <div class='contacts'>
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
            <div class='footer-languages'>
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
              Simplify sustainable agriculture and make it affordable for every
              farmer
            </h3>
            <div class='footer-links'>
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
};

export default IndexPage;

export const Head = () => <title>Home Page</title>;

import React, { useState, useRef } from "react";
import { Link } from "gatsby";
import { GatsbyImage, getImage, getSrc } from "gatsby-plugin-image";
import { Row } from "@Components/InsertRow";
import HeadingBlock from "@Slices/HeadingBlock";
import MainTemplateWrapper from "@Slices/MainTemplateWrapper";

import ThemeContext from "@Context/ThemeContext";

const Careers = ({ location, pageContext }) => {
  const [jobBox, setJobBox] = useState(null);
  const ref = useRef([]);
  function handleActiveBoxState(e, refS) {
    e.preventDefault();
    setJobBox(refS);
  }
  return (
    <ThemeContext.Consumer>
      {theme => {
        const genImgsNodes = theme.bigQuery.generalImages.nodes;
        const globalSubs = pageContext.schemaJSON.pagesHelper.globals;
        const sectionOneImg = genImgsNodes.filter(
          gImgs => gImgs.relativePath === "FR_Hero_Human_cropped.jpg"
        );
        const getSectionOneImg = getImage(sectionOneImg[0]);
        const jobs = pageContext.allJobs;

        return (
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
            <Row opt={{ isBoxed: false, bgColor: "#fff" }}>
              <Row opt={{ classes: "datasheet-header", isBoxed: true }}>
                <GatsbyImage
                  image={getSectionOneImg}
                  alt={"Logo"}
                  placeholder={"NONE"}
                  critical='true'
                  className={"mx-auto circle round-corners"}
                  width={890}
                  height={790}
                />
              </Row>
            </Row>
            {jobs.map((job, ind) => {
              return (
                <Row
                  opt={{
                    isBoxed: false,
                    bgColor: "#fff",
                    classes: "jobs-wrapper",
                  }}
                  key={ind}
                >
                  <Row
                    opt={{
                      isBoxed: true,
                    }}
                  >
                    <h1>{pageContext.frontmatter.mainTitle}</h1>
                    <p>In other languages: xx</p>
                    {job?.edges?.map((element, index) => {
                      if (element?.node?.Active === "TRUE") {
                        const openIt =
                          jobBox === `job-n${index}` ? true : false;
                        return (
                          <div
                            key={index}
                            className={`something job-n${index}`}
                            onClick={e =>
                              handleActiveBoxState(e, `job-n${index}`)
                            }
                            ref={ref.current[index]}
                          >
                            {element?.node?.Name ? (
                              <h2>
                                {element.node.Name}{" "}
                                {pageContext.frontmatter.genders}
                              </h2>
                            ) : (
                              ""
                            )}
                            <p className='span'>
                              {element?.node?.Type ? (
                                <span> {element.node.Type}</span>
                              ) : (
                                ""
                              )}{" "}
                              {element?.node?.Start_Date ? (
                                <span>🕑 {element.node.Start_Date}</span>
                              ) : (
                                ""
                              )}
                            </p>
                            {element?.node?.Location ? (
                              <p className='location'>
                                {" "}
                                {element.node.Location}{" "}
                              </p>
                            ) : (
                              ""
                            )}
                            {element?.node?.Tags
                              ? element.node.Tags.split(",").map((tag, it) => (
                                  <p key={it} className='tag'>
                                    {tag}
                                  </p>
                                ))
                              : ""}
                            <ul className={`${openIt ? "" : "hidden"} `}>
                              <hr />
                              <h4>Farming Revolution</h4>
                              <p className='inner'>
                                Lorem ipsum dolor sit amet, consectetur
                                adipisicing elit. Doloribus soluta doloremque
                                quam nisi maiores, assumenda ipsa blanditiis
                                incidunt voluptate aperiam reiciendis libero.
                              </p>
                              <h3>{pageContext.frontmatter.tasksTitle}</h3>
                              {element?.node?.Qualifications ? (
                                <li>{element.node.Qualifications}</li>
                              ) : (
                                ""
                              )}
                              <h3>
                                {pageContext.frontmatter.qualificationsTitle}
                              </h3>
                              {element?.node?.Question_1 ? (
                                <li>{element.node.Question_1}</li>
                              ) : (
                                ""
                              )}
                              {element?.node?.Question_2 ? (
                                <li>{element.node.Question_2}</li>
                              ) : (
                                ""
                              )}
                              {element?.node?.Question_3 ? (
                                <li>{element.node.Question_3}</li>
                              ) : (
                                ""
                              )}
                            </ul>
                          </div>
                        );
                      }
                    })}
                  </Row>
                </Row>
              );
            })}
          </MainTemplateWrapper>
        );
      }}
    </ThemeContext.Consumer>
  );
};

export default Careers;

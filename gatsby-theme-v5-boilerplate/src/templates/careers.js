import React, { useState, useRef } from "react";
import { Link } from "gatsby";
import { GatsbyImage, getImage, getSrc } from "gatsby-plugin-image";
import { Row } from "@Components/InsertRow";
import HeadingBlock from "@Slices/HeadingBlock";
import MainTemplateWrapper from "@Slices/MainTemplateWrapper";

import ThemeContext from "@Context/ThemeContext";

const Careers = ({ location, pageContext }) => {
  return (
    <ThemeContext.Consumer>
      {theme => {
        const globalSubs = pageContext?.schemaJSON?.pagesHelper?.globals;
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
              <Row opt={{ classes: "datasheet-header", isBoxed: true }}></Row>
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

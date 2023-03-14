import React, { useState } from "react";
import { Link } from "gatsby";
import { GatsbyImage, getImage, getSrc } from "gatsby-plugin-image";
import { Row } from "@Components/InsertRow";
import HeadingBlock from "@Slices/HeadingBlock";
import MainTemplateWrapper from "@Slices/MainTemplateWrapper";

import ThemeContext from "@Context/ThemeContext";

const OneColumn = ({ location, pageContext }) => {
  console.log(pageContext);
  const { title, description, content } = pageContext;
  return (
    <ThemeContext.Consumer>
      {theme => {
        const pattern = theme?.bigQuery?.brandImages?.nodes?.filter(
          brandImgs => brandImgs.relativePath === "PATTERN-bg.png"
        );
        const bgPattern = pattern
          ? pattern[0]?.childImageSharp?.gatsbyImageData?.images?.fallback?.src
          : null;
        const genImgsNodes = theme?.bigQuery?.generalImages?.nodes;
        const globalSubs = pageContext?.schemaJSON?.pagesHelper?.globals;
        return (
          <MainTemplateWrapper
            logo={"darkLogo.publicURL"}
            backgroundImage={{
              src: bgPattern,
            }}
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
              opt={{
                isBoxed: false,
                classes: "one-column",
                bgColor: "#FFF8EC",
              }}
            >
              <main>
                <h1>{title}</h1>
                <div dangerouslySetInnerHTML={{ __html: content }}></div>
              </main>
            </Row>
          </MainTemplateWrapper>
        );
      }}
    </ThemeContext.Consumer>
  );
};

export default OneColumn;

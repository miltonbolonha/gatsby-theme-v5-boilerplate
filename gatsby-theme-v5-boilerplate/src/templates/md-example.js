import React, { useState, useRef } from "react";
import { Link } from "gatsby";
import { GatsbyImage, getImage, getSrc } from "gatsby-plugin-image";
import { Row } from "@Components/InsertRow";
import HeadingBlock from "@Slices/HeadingBlock";
import MainTemplateWrapper from "@Slices/MainTemplateWrapper";

import ThemeContext from "@Context/ThemeContext";

const MDexample = ({ location, pageContext }) => {
  return (
    <ThemeContext.Consumer>
      {theme => {
        const globalSubs = pageContext?.schemaJSON?.pagesHelper?.globals;
        const pattern = theme?.bigQuery?.brandImages?.nodes?.filter(
          brandImgs => brandImgs?.relativePath === "PATTERN-bg.png"
        );
        const bgPattern = pattern
          ? pattern[0]?.childImageSharp?.gatsbyImageData?.images?.fallback?.src
          : null;
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
            <Row opt={{ isBoxed: false, bgColor: "#fff" }}>
              <Row opt={{ classes: "datasheet-header", isBoxed: true }}></Row>
            </Row>
          </MainTemplateWrapper>
        );
      }}
    </ThemeContext.Consumer>
  );
};

export default MDexample;

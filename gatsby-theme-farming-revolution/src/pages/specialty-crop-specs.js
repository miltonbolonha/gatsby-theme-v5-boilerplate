import React, { useState } from "react";
import { Link } from "gatsby";
import { GatsbyImage, getImage, getSrc } from "gatsby-plugin-image";
import { Row } from "@Components/InsertRow";
import HeadingBlock from "@Slices/HeadingBlock";
import MainTemplateWrapper from "@Slices/MainTemplateWrapper";

import ThemeContext from "@Context/ThemeContext";

const SpecialtyCropSpecsPage = ({ pageContext }) => {
  return (
    <ThemeContext.Consumer>
      {theme => {
        const genImgsNodes = theme.bigQuery.generalImages.nodes;
        const globalSubs = pageContext.schemaJSON.pagesHelper.globals;
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
            <h1>oi</h1>
          </MainTemplateWrapper>
        );
      }}
    </ThemeContext.Consumer>
  );
};

export default SpecialtyCropSpecsPage;

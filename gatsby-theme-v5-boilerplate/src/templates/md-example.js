import React, { useState, useRef } from "react";
import { Link } from "gatsby";
import { GatsbyImage, getImage, getSrc } from "gatsby-plugin-image";
import { Row } from "@Components/InsertRow";
import HeadingBlock from "@Slices/HeadingBlock";
import MainTemplateWrapper from "@Slices/MainTemplateWrapper";

import ThemeContext from "@Context/ThemeContext";

const MDexample = ({ location, pageContext }) => {
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
        const pattern = theme.bigQuery.brandImages.nodes.filter(
          brandImgs => brandImgs.relativePath === "PATTERN-bg.png"
        );
        const bgPattern =
          pattern[0].childImageSharp.gatsbyImageData.images.fallback.src;
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
          </MainTemplateWrapper>
        );
      }}
    </ThemeContext.Consumer>
  );
};

export default MDexample;

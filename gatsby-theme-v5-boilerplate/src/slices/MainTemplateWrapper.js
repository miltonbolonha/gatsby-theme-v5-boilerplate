import React from "react";

import BodyBlock from "@Slices/BodyBlock";
import HeaderBlock from "@Slices/HeaderBlock";
import FooterBlock from "@Slices/FooterBlock";

const MainTemplateWrapper = ({
  children,
  classes = "",
  logo,
  backgroundImage,
  opt,
}) => {
  console.log("opt?.topRibbonImg");
  console.log(opt?.topRibbonImg);
  return (
    <BodyBlock
      opt={{
        classes: classes,
        bgImg: backgroundImage?.src || null,
        topRibbonImg: opt?.topRibbonImg || null,
        options: opt,
      }}
    >
      <HeaderBlock logotipoSvg={logo} />
      {children}
      <FooterBlock logo={logo} globalSubs={opt?.globalSubs || null} />
    </BodyBlock>
  );
};

export default MainTemplateWrapper;

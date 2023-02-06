import React from "react";

import BodyBlock from "@Slices/BodyBlock";
import HeaderBlock from "@Slices/HeaderBlock";
import FooterBlock from "@Slices/FooterBlock";

const MainTemplateWrapper = ({
  children,
  classes,
  logo,
  backgroundImage,
  opt,
}) => {
  return (
    <BodyBlock
      opt={{ classes: classes, bgImg: "backgroundImage.src", options: opt }}
      topology={opt.topology}
    >
      <HeaderBlock logotipoSvg={logo} />
      {children}
      <FooterBlock logo={logo} />
    </BodyBlock>
  );
};

export default MainTemplateWrapper;

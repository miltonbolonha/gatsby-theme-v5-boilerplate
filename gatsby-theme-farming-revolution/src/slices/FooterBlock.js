import React from "react";
import { Row } from "@Components/InsertRow";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

import HeadingBlock from "@Slices/HeadingBlock";
const FooterBlock = ({ logo }) => {
  return (
    <>
      <HeadingBlock classes='m30auto hack' importance={9} width={400}>
        Social
      </HeadingBlock>
      <Row opt={{ isBoxed: true }}>
        <Row
          opt={{
            isBoxed: true,
            alignTo: "center",
            classes: "social-icons",
            numColumns: 5,
          }}
        >
          sss{" "}
        </Row>
        <Row opt={{ isBoxed: true, classes: "logo-bottom-wrapper" }}>
          <div className='footer-logo'>{logo}</div>
          {/* <BoilerplateLogo className='m0auto logo-bottom' /> */}
          <p className='m0auto bottom-paragraph'>
            © 2022 Farm Rev - TODOS OS DIREITOS RESERVADOS
          </p>
        </Row>
      </Row>
    </>
  );
};

export default FooterBlock;

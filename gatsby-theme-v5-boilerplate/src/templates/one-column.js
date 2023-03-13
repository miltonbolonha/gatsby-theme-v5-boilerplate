import React, { useState } from "react";
import { Link } from "gatsby";
import { GatsbyImage, getImage, getSrc } from "gatsby-plugin-image";
import { Row } from "@Components/InsertRow";
import HeadingBlock from "@Slices/HeadingBlock";
import MainTemplateWrapper from "@Slices/MainTemplateWrapper";

import ThemeContext from "@Context/ThemeContext";

const OneColumn = ({ location, pageContext }) => {
  const { title, description, content } = pageContext;
  return (
    <>
      <h1>oi</h1>
    </>
  );
};

export default OneColumn;

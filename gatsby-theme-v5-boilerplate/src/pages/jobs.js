import React, { useState, useRef } from "react";
import { GatsbyImage, getImage, getSrc } from "gatsby-plugin-image";
import { Row } from "@Components/InsertRow";
import MainTemplateWrapper from "@Slices/MainTemplateWrapper";

import ThemeContext from "@Context/ThemeContext";

const zeroPage = ({ pageContext }) => {
  return <h1>zero</h1>;
};

export default zeroPage;

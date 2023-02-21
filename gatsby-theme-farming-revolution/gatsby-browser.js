import "./src/scss/styles.scss";
import React from "react";
import { ThemeProvider } from "@Context/ThemeContext";
import "@fontsource/varela";

export const wrapRootElement = ({ element }) => (
  <ThemeProvider>{element}</ThemeProvider>
);

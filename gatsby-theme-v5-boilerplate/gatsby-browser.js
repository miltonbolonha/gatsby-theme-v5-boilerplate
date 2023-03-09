import "./src/scss/styles.scss";
import React from "react";
import { ThemeProvider } from "@Context/ThemeContext";
import "@fontsource/varela";
import "@fontsource/montserrat";
import "@fontsource/roboto";

export const wrapRootElement = ({ element }) => (
  <ThemeProvider>{element}</ThemeProvider>
);

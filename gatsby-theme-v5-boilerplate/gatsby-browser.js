import "./src/scss/styles.scss";
import React from "react";
import { ThemeProvider } from "@Context/ThemeContext";
import "@fontsource/varela";
import "@fontsource/montserrat";
import "@fontsource/roboto";
import "@fontsource/bungee-spice";

export const wrapRootElement = ({ element }) => (
  <ThemeProvider>{element}</ThemeProvider>
);

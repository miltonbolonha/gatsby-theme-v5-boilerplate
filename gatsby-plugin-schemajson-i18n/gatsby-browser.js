import React from "react";
import { i18n } from "@lingui/core";
import { I18nProvider } from "@lingui/react";
import { ThemeProvider } from "./src/context/ThemeContext";
import { messages as ptMessages } from "../content/i18n/pt-BR/main";
import { messages as enMessages } from "../content/i18n/en-US/main";

i18n.load({
  "pt-BR": ptMessages,
  "en-US": enMessages,
});
i18n.activate("pt-BR");

export const wrapRootElement = ({ element }) => (
  <I18nProvider i18n={i18n}>
    <ThemeProvider>{element}</ThemeProvider>
  </I18nProvider>
);

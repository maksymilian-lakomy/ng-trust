import { setCompodocJson } from "@storybook/addon-docs/angular";
import "!style-loader!css-loader!../projects/ng-trust/src/assets/style.css";
import docJson from "../documentation.json";
setCompodocJson(docJson);

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  darkMode: {
    current: "dark",
  },
  docs: { inlineStories: true },
};

import type { Preview } from '@storybook/react-webpack5'
import { withThemeByClassName } from '@storybook/addon-themes';
import { dark, light } from "./theme";
import "../src/assets/scss/main.scss";
import { SvgSprite } from '../src/assets/SvgSprite';

const preview: Preview = {
  decorators: [
    (Story) => {
      return (
        <>
          <Story />
          <SvgSprite />
        </>
      );
    },
    withThemeByClassName({
      themes: {
        light: "theme-light",
        dimmed: "theme-dimmed",
        dark: "theme-dark",
      },
      defaultTheme: "dark",
    }),
  ],
  parameters: {
    layout: "padded",
    docs: {
      theme: dark,
    },
    html: {
      prettier: {
        tabWidth: 4,
        useTabs: true,
        removeComments: true,
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      storySort: {
        order: [
          "Getting started",
          [
            "Intro",
            "How to use our design system?",
            "Browser support",
          ],
          "Foundation",
          "Page",
          "Layout",
          "UI Kit",
          "Forms",
          "Tables",
          "Typograpy",
          "Example",
          "Utilities",
        ],
        includeNames: true,
      },
    },
    darkMode: {
      classTarget: "html",
      current: "dark",
      stylePreview: true,
      light: { ...light },
      dark: { ...dark },
      lightClass: "theme-light",
      darkClass: "theme-dark",
    },
    pageLayout: {
      desktop: true,
      mobile: false
    }
  },
};


const preview1: Preview = {
  decorators: [
    withThemeByClassName({
      themes: {
        light: "theme-light",
        dimmed: "theme-dimmed",
        dark: "theme-dark",
      },
      defaultTheme: "dark",
    }),
    (Story, { parameters }) => {
      return <Story />;
    }
  ],
  parameters: {
    layout: "padded",
    docs: {
      theme: dark,
    },
    html: {
      prettier: {
        tabWidth: 4,
        useTabs: true,
        removeComments: true,
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      storySort: {
        order: [
          "Getting started",
          [
            "Intro",
            "How to use our design system?",
            "Browser support",
          ],
          "Foundation",
          "Page",
          "Layout",
          "UI Kit",
          "Forms",
          "Tables",
          "Typograpy",
          "Example",
          "Utilities",
        ],
        includeNames: true,
      },
    },
    darkMode: {
      classTarget: "html",
      current: "dark",
      stylePreview: true,
      light: { ...light },
      dark: { ...dark },
      lightClass: "theme-light",
      darkClass: "theme-dark",
    },
  },
};

export default preview;
import type { StorybookConfig } from '@storybook/react-webpack5';

const config: StorybookConfig = {
  "stories": [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-webpack5-compiler-swc",
    "@storybook/addon-docs",
    "@storybook/addon-onboarding",
    "@storybook/addon-themes" ,
    
  ],
  "framework": {
    "name": "@storybook/react-webpack5",
    "options": {}
  },
  webpackFinal: async (config) => {
    // SCSS loader toevoegen
    config.module?.rules?.push({
      test: /\.scss$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: { importLoaders: 1 },
        },
        'sass-loader',
      ],
    });

    return config;
  },
};
export default config;
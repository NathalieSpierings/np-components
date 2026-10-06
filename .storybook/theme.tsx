import { create } from 'storybook/theming';
import logo from "./logo.png";

const shared = {
    brandTitle: "Promeetec",
    brandUrl: "https://www.promeetec.nl",
    brandImage: logo,
    brandTarget: "_self",
    appBorderRadius: 4,
    inputBorderRadius: 4,
    gridCellSize: 9,
};


export const light = create({
    base:
        globalThis.matchMedia &&
        globalThis.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light",
    ...shared,
    colorPrimary: "#5EAFB1" ,
    colorSecondary: "#ff8b5d",
    appBg: "#EBE9E7",
    appContentBg: "#E2DEDB",
    appPreviewBg: "#ebe9e7",
    appBorderColor: "#D3CEC9",

    textColor: "#52504E",
    textInverseColor: "#3F3F3F",
    textMutedColor: "#7C7875",

    barTextColor: "#52504E",
    barHoverColor: "#D3CEC9",
    barSelectedColor: "#F18663",
    barBg: "#E2DEDB",
});

export const dark = create({
    base:
        globalThis.matchMedia &&
        globalThis.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light",
    ...shared,
     colorPrimary: "#5EAFB1" ,
    colorSecondary: "#ff8b5d",
    appBg: "#242427", // Sidebar highlight
    appContentBg: "#29292C", // Controls bg
    appPreviewBg: "#494949", // canvas Preview(not visible because of theme body bg class)
    appBorderColor: "#38383B",

    textColor: "#bbbbbb",
    textInverseColor: "#bbbbbb",
    textMutedColor: "#808080",

    barTextColor: "#bbbbbb",
    barHoverColor: "#3c3c3c",
    barSelectedColor: "#f18a63",
    barBg: "#2D2D30",
});

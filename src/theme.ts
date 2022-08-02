import { atom } from "recoil";
import { DefaultTheme } from "styled-components";

export const theme: DefaultTheme = {
    textColor: "#333333",
    black: "black",
    bgColor:"white",
    darkBorwn: "#545140",
    mainBack: `rgba(255,255,255,0.5)`,
    userName: "#404040",
    dark: "#252422",
    light: "aliceblue",
    back: "white"
};


export const Darktheme: DefaultTheme = {
    textColor: "#333333",
    black: "white",
    bgColor:"rgba(0,0,0,0.5)",
    darkBorwn: "#545140",
    mainBack: `rgba(0,0,0,0.5)`,
    userName: "#404040",
    dark: "#252422",
    light:"rgba(0,0,0,0.8)",
    back: "#5c5c5c"
};




export const isDarkAtom = atom({
    key: "isDark",
    default: false,
})
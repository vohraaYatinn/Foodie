import { Dimensions } from 'react-native'
const { height, width } = Dimensions.get('window')

export const COLORS = {
    primary: "#68177F",
    white: '#FFFFFF',
    secondaryWhite: '#F7F7FC',
    tertiaryWhite: '#fafafa',
    white2: "#F7F8F9",
    white3: '#f4f3f4',
    black: "#32343E",
    secondaryBlack: "#646982",
    tertiaryBlack: "#181C2E",
    blue: "#1E1E2E",
    gray: "#F0F5FA",
    secondaryGray: '#ECF0F4',
    tertiaryGray: "#F6F6F6",
    gray4: "#A0A5BA",
    gray5: "#676767",
    gray6: "#EDEDED",
    gray7: "#F6F8FA",
    yellow: "#FFD27C",
    orange: "#FFEBE4",
    green: "#059C6A",
    red: "#E04444",
    cover_purple: "#68177F"
}

export const SIZES = {
    // Global SIZES
    base: 8,
    font: 14,
    radius: 30,
    padding: 8,
    padding2: 12,
    padding3: 16,

    // FONTS Sizes
    largeTitle: 50,
    h1: 30,
    h2: 22,
    h3: 20,
    h4: 18,
    body1: 30,
    body2: 20,
    body3: 16,
    body4: 14,

    // App Dimensions
    width,
    height,
}

export const FONTS = {
    largeTitle: {
        fontFamily: 'black',
        fontSize: SIZES.largeTitle,
        lineHeight: 55,
    },
    h1: { fontFamily: "Sen Bold", fontSize: SIZES.h1, lineHeight: 36 },
    h2: { fontFamily: "Sen Bold", fontSize: SIZES.h2, lineHeight: 30 },
    h3: { fontFamily: "Sen Bold", fontSize: SIZES.h3, lineHeight: 22 },
    h4: { fontFamily: "Sen Bold", fontSize: SIZES.h4, lineHeight: 20 },
    body1: { fontFamily: "Sen Regular", fontSize: SIZES.body1, lineHeight: 36 },
    body2: { fontFamily: "Sen Regular", fontSize: SIZES.body2, lineHeight: 30 },
    body3: { fontFamily: "Sen Regular", fontSize: SIZES.body3, lineHeight: 22 },
    body4: { fontFamily: "Sen Regular", fontSize: SIZES.body4, lineHeight: 20 },
}

const appTheme = { COLORS, SIZES, FONTS }

export default appTheme
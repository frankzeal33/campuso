/** @type {import('tailwindcss').Config} */
module.exports = {
    // NOTE: Update this to include the paths to all of your component files.
    content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}", "./screens/**/*.{js,jsx,ts,tsx}"],
    presets: [require("nativewind/preset")],
    theme: {
      extend: {
        colors: {
          green: {
            DEFAULT: "#008751",
            light: "#3BA440",
            lighter: "#E8FFE9",
            drawer: "#E4FFE5"
          },
          yellow: {
            DEFAULT: "#FEC844",
            light: "#FFF0CD",
            lighter: "#FFF5DD",
          },
          gray: {
            DEFAULT: "#2F2F2F",
            light: "#F7F7F7",
            100: "#DDDDDD",
            200: "#C3C3C3",
            300: "#787878",
          },
          inputBg: "#F3F3F3"
        },
        fontFamily: {
          mthin: ["Montserrat-Thin", "sans-serif"],
          mlight: ["Montserrat-Light", "sans-serif"],
          mregular: ["Montserrat-Regular", "sans-serif"],
          mmedium: ["Montserrat-Medium", "sans-serif"],
          mbold: ["Montserrat-Bold", "sans-serif"],
          msbold: ["Montserrat-SemiBold", "sans-serif"],
          mblack: ["Montserrat-Black", "sans-serif"],
        },
        animation: {
          'spin-fast': 'spin 0.5s linear infinite',
          none: 'none',
          blink: 'blink 1s ease-in-out infinite',
        },
        keyframes: {
          blink: {
            '0%, 80%, 100%': { opacity: '1' },  // visible most of the time
            '85%, 95%': { opacity: '0' },       // brief hidden moment
          },
        },
      },
    },
    plugins: [],
  }
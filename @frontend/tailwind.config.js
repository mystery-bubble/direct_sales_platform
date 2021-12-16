module.exports = {
  purge: ['./public/**/*.html', './src/**/*.vue'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    divideColor: theme => ({
      ...theme('borderColors'),
      'primary': 'rgba(66, 60, 49, 1)',
      'secondary': 'rgba(120, 111, 92, 1)',
      'danger': 'rgba(199, 84, 82, 1)',
    }),
    extend: {
      colors: {
        custom: {
          black: {
            DEFAULT: "rgba(66, 60, 49, 1)",
            "trn-1": "rgba(66, 60, 49, .7)",
            "trn-2": "rgba(66, 60, 49, .5)",
            "trn-3": "rgba(66, 60, 49, .3)"
          },
          darker: {
            DEFAULT: "rgba(120, 111, 92, 1)",
            "trn-1": "rgba(120, 111, 92, .7)",
            "trn-2": "rgba(120, 111, 92, .5)",
            "trn-3": "rgba(120, 111, 92, .3)"
          },
          dark: {
            DEFAULT: "rgba(174, 155, 113, 1)",
            "trn-1": "rgba(174, 155, 113, .7)",
            "trn-2": "rgba(174, 155, 113, .5)",
            "trn-3": "rgba(174, 155, 113, .3)"
          },
          light: {
            DEFAULT: "rgba(201, 186, 152, 1)",
            "trn-1": "rgba(201, 186, 152, .7)",
            "trn-2": "rgba(201, 186, 152, .5)",
            "trn-3": "rgba(201, 186, 152, .3)"
          },
          lighter: {
            DEFAULT: "rgba(231, 215, 180, 1)",
            "trn-1": "rgba(231, 215, 180, .7)",
            "trn-2": "rgba(231, 215, 180, .5)",
            "trn-3": "rgba(231, 215, 180, .3)"
          },
          white: {
            DEFAULT: "rgba(243, 244, 245, 1)",
            "trn-1": "rgba(243, 244, 245, .7)",
            "trn-2": "rgba(243, 244, 245, .5)",
            "trn-3": "rgba(243, 244, 245, .3)"  
          },
          superbright: "rgba(254, 254, 254, 1)",
          danger: "rgba(199, 84, 82, 1)"
        }
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

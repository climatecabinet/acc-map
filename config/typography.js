import Typography from 'typography'

const theme = {
  baseFontSize: '18px',
  baseLineHeight: 1.4,
  headerFontFamily: ['Cabin', 'sans-serif'], 
  bodyFontFamily: ['Open Sans', 'sans-serif'],
  bodyWeight: 400,
  headerWeight: 700,
  boldWeight: 700,
  googleFonts: [
    {
      name: 'Cabin',
      styles: ['400', '700'],
    },
    {
      name: 'Open Sans',
      styles: ['400', '700'],
    },
  ],
  scaleRatio: 1.4,
  overrideStyles: () => ({
    html: {
      'overflow-y': 'hidden !important',
      height: '100%',
    },
    body: {
      height: '100%',
      width: '100%',
    },
    // Set height on containing notes to 100% so that full screen map layouts work
    '#___gatsby': {
      height: '100%',
    },
    '#___gatsby > *': {
      height: '100%',
    },
    button: {
      outline: 'none',
      cursor: 'pointer',
    },
    // 'a, a:visited': {
    //   color: style.colors.primary[500],
    //   textDecoration: 'none',
    // },
    // 'h1,h2,h3,h4': {
    //   textTransform: 'uppercase',
    // },
  }),
}

const typography = new Typography(theme)

export default typography

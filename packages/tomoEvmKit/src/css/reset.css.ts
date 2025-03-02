import { style, globalFontFace, globalStyle } from '@vanilla-extract/css';

export const base = style({
  border: 0,
  boxSizing: 'border-box',
  fontSize: '100%',
  lineHeight: 'normal',
  margin: 0,
  padding: 0,
  textAlign: 'left',
  verticalAlign: 'baseline',
  WebkitTapHighlightColor: 'transparent',
});

globalFontFace('SwitzerBold', {
  src: `url('https://d13t1x9bdoguib.cloudfront.net/static/fonts/Switzer-Semibold.ttf') format('truetype')`,
});
globalFontFace('SwitzerMedium', {
  src: `url('https://d13t1x9bdoguib.cloudfront.net/static/fonts/Switzer-Medium.ttf') format('truetype')`,
});
globalFontFace('SwitzerLight', {
  src: `url('https://d13t1x9bdoguib.cloudfront.net/static/fonts/Switzer-Light.ttf') format('truetype')`,
});
globalFontFace('Switzer', {
  src: `url('https://d13t1x9bdoguib.cloudfront.net/static/fonts/Switzer-Regular.ttf') format('truetype')`,
});

const list = style({
  listStyle: 'none',
});

const quote = style({
  quotes: 'none',
  selectors: {
    '&:before, &:after': {
      content: "''",
    },
  },
});

const table = style({
  borderCollapse: 'collapse',
  borderSpacing: 0,
});

const appearance = style({
  appearance: 'none',
});

// biome-ignore format: design system keys
const field = style([
  appearance,
  {
    '::placeholder': {
      opacity: 1,
    },
    'outline': 'none',
  },
]);

const mark = style({
  backgroundColor: 'transparent',
  color: 'inherit',
});

// biome-ignore format: design system keys
const select = style([
  field,
  {
    ':disabled': {
      opacity: 1,
    },
    'selectors': {
      '&::-ms-expand': {
        display: 'none',
      },
    },
  },
]);

const input = style([
  field,
  {
    selectors: {
      '&::-ms-clear': {
        display: 'none',
      },
      '&::-webkit-search-cancel-button': {
        WebkitAppearance: 'none',
      },
    },
  },
]);

const button = style({
  background: 'none',
  cursor: 'pointer',
  textAlign: 'left',
});

const a = style({
  color: 'inherit',
  textDecoration: 'none',
});

export const element = {
  a,
  blockquote: quote,
  button,
  input,
  mark,
  ol: list,
  q: quote,
  select,
  table,
  textarea: field,
  ul: list,
};

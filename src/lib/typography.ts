import colors from "tailwindcss/colors";

const round = (num: number) =>
  num
    .toFixed(7)
    .replace(/(\.[0-9]+?)0+$/, "$1")
    .replace(/\.0$/, "");
const rem = (px: number) => `${round(px / 16)}rem`;
const em = (px: number, base: number) => `${round(px / base)}em`;
const hexToRgb = (hex: string) => {
  hex = hex.replace("#", "");
  hex = hex.length === 3 ? hex.replace(/./g, "$&$&") : hex;
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return `${r} ${g} ${b}`;
};

const defaultModifiers = {
  sm: {
    css: [
      {
        fontSize: rem(16),
        lineHeight: round(28 / 16),
        p: {
          marginTop: em(20, 16),
          marginBottom: em(20, 16),
        },
        '[class~="lead"]': {
          fontSize: em(20, 16),
          lineHeight: round(32 / 20),
          marginTop: em(24, 20),
          marginBottom: em(24, 20),
        },
        blockquote: {
          marginTop: em(32, 20),
          marginBottom: em(32, 20),
          paddingInlineStart: em(20, 20),
        },
        h1: {
          fontSize: em(36, 16),
          marginTop: "0",
          marginBottom: em(32, 36),
          lineHeight: round(40 / 36),
          fontWeight: "600",
        },
        h2: {
          fontSize: em(24, 16),
          marginTop: em(48, 24),
          marginBottom: em(24, 24),
          lineHeight: round(32 / 24),
          fontWeight: "600",
        },
        h3: {
          fontSize: em(20, 16),
          marginTop: em(32, 20),
          marginBottom: em(12, 20),
          lineHeight: round(32 / 20),
          fontWeight: "600",
        },
        h4: {
          marginTop: em(24, 16),
          marginBottom: em(8, 16),
          lineHeight: round(24 / 16),
          fontWeight: "600",
        },
        img: {
          marginTop: em(32, 16),
          marginBottom: em(32, 16),
        },
        picture: {
          marginTop: em(32, 16),
          marginBottom: em(32, 16),
        },
        "picture > img": {
          marginTop: "0",
          marginBottom: "0",
        },
        video: {
          marginTop: em(32, 16),
          marginBottom: em(32, 16),
        },
        kbd: {
          fontSize: em(14, 16),
          borderRadius: rem(5),
          paddingTop: em(3, 16),
          paddingInlineEnd: em(6, 16),
          paddingBottom: em(3, 16),
          paddingInlineStart: em(6, 16),
        },
        code: {
          fontSize: em(14, 16),
        },
        "h2 code": {
          fontSize: em(21, 24),
        },
        "h3 code": {
          fontSize: em(18, 20),
        },
        pre: {
          fontSize: em(14, 16),
          lineHeight: round(24 / 14),
          marginTop: em(24, 14),
          marginBottom: em(24, 14),
          borderRadius: rem(6),
          paddingTop: em(12, 14),
          paddingInlineEnd: em(16, 14),
          paddingBottom: em(12, 14),
          paddingInlineStart: em(16, 14),
        },
        ol: {
          marginTop: em(20, 16),
          marginBottom: em(20, 16),
          paddingInlineStart: em(26, 16),
        },
        ul: {
          marginTop: em(20, 16),
          marginBottom: em(20, 16),
          paddingInlineStart: em(26, 16),
        },
        li: {
          marginTop: em(8, 16),
          marginBottom: em(8, 16),
        },
        "ol > li": {
          paddingInlineStart: em(6, 16),
        },
        "ul > li": {
          paddingInlineStart: em(6, 16),
        },
        "> ul > li p": {
          marginTop: em(12, 16),
          marginBottom: em(12, 16),
        },
        "> ul > li > p:first-child": {
          marginTop: em(20, 16),
        },
        "> ul > li > p:last-child": {
          marginBottom: em(20, 16),
        },
        "> ol > li > p:first-child": {
          marginTop: em(20, 16),
        },
        "> ol > li > p:last-child": {
          marginBottom: em(20, 16),
        },
        "ul ul, ul ol, ol ul, ol ol": {
          marginTop: em(12, 16),
          marginBottom: em(12, 16),
        },
        dl: {
          marginTop: em(20, 16),
          marginBottom: em(20, 16),
        },
        dt: {
          marginTop: em(20, 16),
        },
        dd: {
          marginTop: em(8, 16),
          paddingInlineStart: em(26, 16),
        },
        hr: {
          marginTop: em(48, 16),
          marginBottom: em(48, 16),
        },
        "hr + *": {
          marginTop: "0",
        },
        "h2 + *": {
          marginTop: "0",
        },
        "h3 + *": {
          marginTop: "0",
        },
        "h4 + *": {
          marginTop: "0",
        },
        table: {
          fontSize: em(14, 16),
          lineHeight: round(24 / 14),
        },
        "thead th": {
          paddingInlineEnd: em(8, 14),
          paddingBottom: em(8, 14),
          paddingInlineStart: em(8, 14),
        },
        "thead th:first-child": {
          paddingInlineStart: "0",
        },
        "thead th:last-child": {
          paddingInlineEnd: "0",
        },
        "tbody td, tfoot td": {
          paddingTop: em(8, 14),
          paddingInlineEnd: em(8, 14),
          paddingBottom: em(8, 14),
          paddingInlineStart: em(8, 14),
        },
        "tbody td:first-child, tfoot td:first-child": {
          paddingInlineStart: "0",
        },
        "tbody td:last-child, tfoot td:last-child": {
          paddingInlineEnd: "0",
        },
        figure: {
          marginTop: em(32, 16),
          marginBottom: em(32, 16),
        },
        "figure > *": {
          marginTop: "0",
          marginBottom: "0",
        },
        figcaption: {
          fontSize: em(14, 16),
          lineHeight: round(20 / 14),
          marginTop: em(12, 14),
        },
      },
      {
        "> :first-child": {
          marginTop: "0",
        },
        "> :last-child": {
          marginBottom: "0",
        },
      },
    ],
  },
  base: {
    css: [
      {
        fontSize: rem(18),
        lineHeight: round(32 / 18),
        p: {
          marginTop: em(24, 18),
          marginBottom: em(24, 18),
        },
        '[class~="lead"]': {
          fontSize: em(22, 18),
          lineHeight: round(32 / 22),
          marginTop: em(24, 22),
          marginBottom: em(24, 22),
        },
        blockquote: {
          marginTop: em(40, 24),
          marginBottom: em(40, 24),
          paddingInlineStart: em(24, 24),
        },
        h1: {
          fontSize: em(48, 18),
          marginTop: "0",
          marginBottom: em(40, 48),
          lineHeight: round(48 / 48),
          fontWeight: "600",
        },
        h2: {
          fontSize: em(30, 18),
          marginTop: em(56, 30),
          marginBottom: em(32, 30),
          lineHeight: round(40 / 30),
          fontWeight: "600",
        },
        h3: {
          fontSize: em(24, 18),
          marginTop: em(40, 24),
          marginBottom: em(16, 24),
          lineHeight: round(36 / 24),
          fontWeight: "600",
        },
        h4: {
          marginTop: em(32, 18),
          marginBottom: em(8, 18),
          lineHeight: round(28 / 18),
          fontWeight: "600",
        },
        img: {
          marginTop: em(32, 18),
          marginBottom: em(32, 18),
        },
        picture: {
          marginTop: em(32, 18),
          marginBottom: em(32, 18),
        },
        "picture > img": {
          marginTop: "0",
          marginBottom: "0",
        },
        video: {
          marginTop: em(32, 18),
          marginBottom: em(32, 18),
        },
        kbd: {
          fontSize: em(16, 18),
          borderRadius: rem(5),
          paddingTop: em(4, 18),
          paddingInlineEnd: em(8, 18),
          paddingBottom: em(4, 18),
          paddingInlineStart: em(8, 18),
        },
        code: {
          fontSize: em(16, 18),
        },
        "h2 code": {
          fontSize: em(26, 30),
        },
        "h3 code": {
          fontSize: em(21, 24),
        },
        pre: {
          fontSize: em(16, 18),
          lineHeight: round(28 / 16),
          marginTop: em(32, 16),
          marginBottom: em(32, 16),
          borderRadius: rem(6),
          paddingTop: em(16, 16),
          paddingInlineEnd: em(24, 16),
          paddingBottom: em(16, 16),
          paddingInlineStart: em(24, 16),
        },
        ol: {
          marginTop: em(24, 18),
          marginBottom: em(24, 18),
          paddingInlineStart: em(28, 18),
        },
        ul: {
          marginTop: em(24, 18),
          marginBottom: em(24, 18),
          paddingInlineStart: em(28, 18),
        },
        li: {
          marginTop: em(12, 18),
          marginBottom: em(12, 18),
        },
        "ol > li": {
          paddingInlineStart: em(8, 18),
        },
        "ul > li": {
          paddingInlineStart: em(8, 18),
        },
        "> ul > li p": {
          marginTop: em(16, 18),
          marginBottom: em(16, 18),
        },
        "> ul > li > p:first-child": {
          marginTop: em(24, 18),
        },
        "> ul > li > p:last-child": {
          marginBottom: em(24, 18),
        },
        "> ol > li > p:first-child": {
          marginTop: em(24, 18),
        },
        "> ol > li > p:last-child": {
          marginBottom: em(24, 18),
        },
        "ul ul, ul ol, ol ul, ol ol": {
          marginTop: em(16, 18),
          marginBottom: em(16, 18),
        },
        dl: {
          marginTop: em(24, 18),
          marginBottom: em(24, 18),
        },
        dt: {
          marginTop: em(24, 18),
        },
        dd: {
          marginTop: em(12, 18),
          paddingInlineStart: em(28, 18),
        },
        hr: {
          marginTop: em(56, 18),
          marginBottom: em(56, 18),
        },
        "hr + *": {
          marginTop: "0",
        },
        "h2 + *": {
          marginTop: "0",
        },
        "h3 + *": {
          marginTop: "0",
        },
        "h4 + *": {
          marginTop: "0",
        },
        table: {
          fontSize: em(16, 18),
          lineHeight: round(24 / 16),
        },
        "thead th": {
          paddingInlineEnd: em(12, 16),
          paddingBottom: em(12, 16),
          paddingInlineStart: em(12, 16),
        },
        "thead th:first-child": {
          paddingInlineStart: "0",
        },
        "thead th:last-child": {
          paddingInlineEnd: "0",
        },
        "tbody td, tfoot td": {
          paddingTop: em(12, 16),
          paddingInlineEnd: em(12, 16),
          paddingBottom: em(12, 16),
          paddingInlineStart: em(12, 16),
        },
        "tbody td:first-child, tfoot td:first-child": {
          paddingInlineStart: "0",
        },
        "tbody td:last-child, tfoot td:last-child": {
          paddingInlineEnd: "0",
        },
        figure: {
          marginTop: em(32, 18),
          marginBottom: em(32, 18),
        },
        "figure > *": {
          marginTop: "0",
          marginBottom: "0",
        },
        figcaption: {
          fontSize: em(16, 18),
          lineHeight: round(24 / 16),
          marginTop: em(16, 16),
        },
      },
      {
        "> :first-child": {
          marginTop: "0",
        },
        "> :last-child": {
          marginBottom: "0",
        },
      },
    ],
  },

  default: {
    css: {
      "--tw-prose-body": "hsl(var(--grey-dark))",
      "--tw-prose-headings": "hsl(var(--foreground))",
      "--tw-prose-lead": colors.slate[600],
      "--tw-prose-links": "hsl(var(--grey-dark))",
      "--tw-prose-bold": "hsl(var(--foreground))",
      "--tw-prose-counters": "hsl(var(--primary))",
      "--tw-prose-bullets": "hsl(var(--primary))",
      "--tw-prose-hr": "hsl(var(--primary))",
      "--tw-prose-quotes": "hsl(var(--foreground))",
      "--tw-prose-quote-borders": "hsl(var(--primary))",
      "--tw-prose-captions": "hsl(var(--foreground))",
      "--tw-prose-kbd": colors.slate[900],
      "--tw-prose-kbd-shadows": hexToRgb(colors.slate[900]),
      "--tw-prose-code": colors.slate[900],
      "--tw-prose-pre-code": colors.slate[200],
      "--tw-prose-pre-bg": colors.slate[800],
      "--tw-prose-th-borders": colors.slate[300],
      "--tw-prose-td-borders": colors.slate[200],
      "--tw-prose-invert-body": colors.slate[300],
      "--tw-prose-invert-headings": colors.white,
      "--tw-prose-invert-lead": colors.slate[400],
      "--tw-prose-invert-links": colors.white,
      "--tw-prose-invert-bold": colors.white,
      "--tw-prose-invert-counters": colors.slate[400],
      "--tw-prose-invert-bullets": colors.slate[600],
      "--tw-prose-invert-hr": colors.slate[700],
      "--tw-prose-invert-quotes": colors.slate[100],
      "--tw-prose-invert-quote-borders": colors.slate[700],
      "--tw-prose-invert-captions": colors.slate[400],
      "--tw-prose-invert-kbd": colors.white,
      "--tw-prose-invert-kbd-shadows": hexToRgb(colors.white),
      "--tw-prose-invert-code": colors.white,
      "--tw-prose-invert-pre-code": colors.slate[300],
      "--tw-prose-invert-pre-bg": "rgb(0 0 0 / 50%)",
      "--tw-prose-invert-th-borders": colors.slate[600],
      "--tw-prose-invert-td-borders": colors.slate[700],
    },
  },

  // Invert (for dark mode)
  invert: {
    css: {
      "--tw-prose-body": "var(--tw-prose-invert-body)",
      "--tw-prose-headings": "var(--tw-prose-invert-headings)",
      "--tw-prose-lead": "var(--tw-prose-invert-lead)",
      "--tw-prose-links": "var(--tw-prose-invert-links)",
      "--tw-prose-bold": "var(--tw-prose-invert-bold)",
      "--tw-prose-counters": "var(--tw-prose-invert-counters)",
      "--tw-prose-bullets": "var(--tw-prose-invert-bullets)",
      "--tw-prose-hr": "var(--tw-prose-invert-hr)",
      "--tw-prose-quotes": "var(--tw-prose-invert-quotes)",
      "--tw-prose-quote-borders": "var(--tw-prose-invert-quote-borders)",
      "--tw-prose-captions": "var(--tw-prose-invert-captions)",
      "--tw-prose-kbd": "var(--tw-prose-invert-kbd)",
      "--tw-prose-kbd-shadows": "var(--tw-prose-invert-kbd-shadows)",
      "--tw-prose-code": "var(--tw-prose-invert-code)",
      "--tw-prose-pre-code": "var(--tw-prose-invert-pre-code)",
      "--tw-prose-pre-bg": "var(--tw-prose-invert-pre-bg)",
      "--tw-prose-th-borders": "var(--tw-prose-invert-th-borders)",
      "--tw-prose-td-borders": "var(--tw-prose-invert-td-borders)",
    },
  },
};

export const typography = {
  DEFAULT: {
    css: [
      {
        color: "var(--tw-prose-body)",
        textWrap: "balance",
        maxWidth: "65ch",
        p: {}, // Required to maintain correct order when merging
        '[class~="lead"]': {
          color: "var(--tw-prose-lead)",
        },
        a: {
          color: "var(--tw-prose-links)",
          textDecoration: "underline",
          fontWeight: "400",
          textDecorationColor: "hsl(var(--blue))",
        },
        strong: {
          color: "var(--tw-prose-bold)",
          fontWeight: "600",
        },
        "a strong": {
          color: "inherit",
        },
        "blockquote strong": {
          color: "inherit",
        },
        "thead th strong": {
          color: "inherit",
        },
        ol: {
          listStyleType: "decimal",
        },
        'ol[type="A"]': {
          listStyleType: "upper-alpha",
        },
        'ol[type="a"]': {
          listStyleType: "lower-alpha",
        },
        'ol[type="A" s]': {
          listStyleType: "upper-alpha",
        },
        'ol[type="a" s]': {
          listStyleType: "lower-alpha",
        },
        'ol[type="I"]': {
          listStyleType: "upper-roman",
        },
        'ol[type="i"]': {
          listStyleType: "lower-roman",
        },
        'ol[type="I" s]': {
          listStyleType: "upper-roman",
        },
        'ol[type="i" s]': {
          listStyleType: "lower-roman",
        },
        'ol[type="1"]': {
          listStyleType: "decimal",
        },
        ul: {
          listStyleType: "disc",
        },
        "ol > li::marker": {
          fontWeight: "400",
          color: "var(--tw-prose-counters)",
        },
        "ul > li::marker": {
          color: "var(--tw-prose-bullets)",
        },
        dt: {
          color: "var(--tw-prose-headings)",
          fontWeight: "600",
        },
        hr: {
          borderColor: "var(--tw-prose-hr)",
          borderTopWidth: 1,
        },
        blockquote: {
          fontWeight: "500",
          fontStyle: "italic",
          color: "var(--tw-prose-quotes)",
          borderInlineStartWidth: "0.25rem",
          borderInlineStartColor: "var(--tw-prose-quote-borders)",
          quotes: '"\\201C""\\201D""\\2018""\\2019"',
        },
        "blockquote p:first-of-type::before": {
          content: "open-quote",
        },
        "blockquote p:last-of-type::after": {
          content: "close-quote",
        },
        h1: {
          color: "var(--tw-prose-headings)",
          fontWeight: "800",
        },
        "h1 strong": {
          fontWeight: "900",
          color: "inherit",
        },
        h2: {
          color: "var(--tw-prose-headings)",
          fontWeight: "700",
        },
        "h2 strong": {
          fontWeight: "800",
          color: "inherit",
        },
        h3: {
          color: "var(--tw-prose-headings)",
          fontWeight: "600",
        },
        "h3 strong": {
          fontWeight: "700",
          color: "inherit",
        },
        h4: {
          color: "var(--tw-prose-headings)",
          fontWeight: "600",
        },
        "h4 strong": {
          fontWeight: "700",
          color: "inherit",
        },
        img: {}, // Required to maintain correct order when merging
        picture: {
          display: "block",
        },
        video: {}, // Required to maintain correct order when merging
        kbd: {
          fontWeight: "500",
          fontFamily: "inherit",
          color: "var(--tw-prose-kbd)",
          boxShadow:
            "0 0 0 1px rgb(var(--tw-prose-kbd-shadows) / 10%), 0 3px 0 rgb(var(--tw-prose-kbd-shadows) / 10%)",
        },
        code: {
          color: "var(--tw-prose-code)",
          fontWeight: "600",
        },
        "code::before": {
          content: '"`"',
        },
        "code::after": {
          content: '"`"',
        },
        "a code": {
          color: "inherit",
        },
        "h1 code": {
          color: "inherit",
        },
        "h2 code": {
          color: "inherit",
        },
        "h3 code": {
          color: "inherit",
        },
        "h4 code": {
          color: "inherit",
        },
        "blockquote code": {
          color: "inherit",
        },
        "thead th code": {
          color: "inherit",
        },
        pre: {
          color: "var(--tw-prose-pre-code)",
          backgroundColor: "var(--tw-prose-pre-bg)",
          overflowX: "auto",
          fontWeight: "400",
        },
        "pre code": {
          backgroundColor: "transparent",
          borderWidth: "0",
          borderRadius: "0",
          padding: "0",
          fontWeight: "inherit",
          color: "inherit",
          fontSize: "inherit",
          fontFamily: "inherit",
          lineHeight: "inherit",
        },
        "pre code::before": {
          content: "none",
        },
        "pre code::after": {
          content: "none",
        },
        table: {
          width: "100%",
          tableLayout: "auto",
          marginTop: em(32, 16),
          marginBottom: em(32, 16),
        },
        thead: {
          borderBottomWidth: "1px",
          borderBottomColor: "var(--tw-prose-th-borders)",
        },
        "thead th": {
          color: "var(--tw-prose-headings)",
          fontWeight: "600",
          verticalAlign: "bottom",
        },
        "tbody tr": {
          borderBottomWidth: "1px",
          borderBottomColor: "var(--tw-prose-td-borders)",
        },
        "tbody tr:last-child": {
          borderBottomWidth: "0",
        },
        "tbody td": {
          verticalAlign: "baseline",
        },
        tfoot: {
          borderTopWidth: "1px",
          borderTopColor: "var(--tw-prose-th-borders)",
        },
        "tfoot td": {
          verticalAlign: "top",
        },
        "th, td": {
          textAlign: "start",
        },
        "figure > *": {}, // Required to maintain correct order when merging
        figcaption: {
          color: "var(--tw-prose-captions)",
        },
      },
      defaultModifiers.default.css,
      ...defaultModifiers.base.css,
    ],
  },
  ...defaultModifiers,
};

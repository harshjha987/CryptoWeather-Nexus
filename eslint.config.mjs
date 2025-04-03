import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  // import.meta.dirname is available after Node.js v20.11.0
  baseDirectory:  __dirname,
});
// const eslintConfig = [
//   ...compat.config({
//     extends: ["next/core-web-vitals", "next/typescript", "prettier"],
//     plugins: ["prettier"],
//     rules: {
//       "react/no-unescaped-entities": "off",
//       "@next/next/no-page-custom-font": "off",
//       "prettier/prettier": "error",
//     },
//   }),
// ];
const eslintConfig = [
  ...compat.config({
    extends: ['next'],
    rules: {
      'react/no-unescaped-entities': 'off',
      '@next/next/no-page-custom-font': 'off',
    },
  }),
]

export default eslintConfig;

import { defineConfig } from "eslint/config";
import globals from "globals";
import typescript from "@typescript-eslint/parser";

export default defineConfig([
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: typescript,
      globals: {
        ...globals.browser,
        React: true,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
    settings: {
      react: {
        version: "19.1.0",
      },
    },
    rules: {
      "react/react-in-jsx-scope": "off",
    },
  },
]);

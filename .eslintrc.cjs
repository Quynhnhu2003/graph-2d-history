module.exports = {
  root: true,
  env: { browser: true, es2021: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
  ],
  parser: "@typescript-eslint/parser", // If you're using TypeScript
  plugins: ["@typescript-eslint", "react", "react-hooks"],
  rules: {
    // Add react-hooks rules customization
    "react-hooks/rules-of-hooks": "error", // Enforce rules of hooks
    "react-hooks/exhaustive-deps": "warn", // Warn about missing deps in hooks like useEffect
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "no-unused-vars": "off", // Warn for unused variables
    "@typescript-eslint/no-unused-vars": "warn", // Error for unused variables
  },
  settings: {
    react: {
      version: "detect", // Automatically detect the react version
    },
  },
};

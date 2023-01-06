module.exports = {
  extends: ["@react-native-community", "eslint-config-prettier"],
  plugins: ["@typescript-eslint", "react", "prettier"],
  rules: {
    "react/no-unstable-nested-components": "off",
  },
};

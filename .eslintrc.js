module.exports = {
  extends: ["eslint:recommended", "prettier"],
  plugins: ["prettier"],

  env: {
    node: true,
    jest: true,
    es6: true,
  },
  parserOptions: {
    ecmaVersion: 2017,
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
    },
  },
  rules: {
    "linebreak-style": [2, "unix"],
    semi: [2, "always"],
    "no-cond-assign": [2, "always"],
    "no-console": 0,
    eqeqeq: [2, "smart"],
    camelcase: [2, { properties: "never" }],
    "no-unused-expressions": [
      2,
      { allowShortCircuit: false, allowTernary: false },
    ],
    "prettier/prettier": ["error"],
  },
};

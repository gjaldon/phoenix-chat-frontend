module.exports = {
  "extends": "airbnb",
  "parser": "babel-eslint",
  "plugins": [
    "react",
    "jsx-a11y",
    "import"
  ],
  "globals": {
    "window": true,
    "document": true,
    "fetch": true,
    "localStorage": true
  },
  "rules": {
    "comma-dangle": [1, "never"],
    "semi": [2, "never"],
    "arrow-body-style": 0,
    "quotes": ["error", "double"],
    'react/jsx-closing-bracket-location': [1, 'after-props'],
    'no-param-reassign': ["error", { "props": false }],
    "react/jsx-filename-extension": [1, { "extensions": [".js"] }]
  }
}

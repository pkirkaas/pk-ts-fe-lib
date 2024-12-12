export default  [{
  root: true,
  env: {
    node: true,
    jest: true,
  },
  rules: {
    braceStyle: [
      "error",
      "1tbs"
    ],
    maxLen: [
      error,
      {
        code: 120
      }
    ],
    objectPropertyNewline: [
      "error",
      {
        allowAllPropertiesOnSameLine: true
      }
    ],
    objectCurlyNewline: [
      "error",
      {
        "multiline": true,
        "consistent": true
      }
    ],
    arrayBracketNewline: [
      "error",
      "consistent"
    ],
    "array-element-newline": [
      "error",
      "consistent"
    ],
    "operator-linebreak": [
      "error",
      "before"
    ],
    "comma-dangle": [
      "error",
      "always-multiline"
    ]
  },
  ignorePatterns: [".eslintrc.js", "package.json"],
  overrides: [
    {
      files: ["*.ts"],
      parser: "@typescript-eslint/parser",
      parserOptions: {
        //project: ["./tsconfig.json"],
        sourceType: "module",
        extraFileExtensions: [".json"],
        extensions: [".ts", ".js"],
      },
      plugins: ["@typescript-eslint/eslint-plugin"],
      rules: {
        "@typescript-eslint/ban-ts-comment": "off",
        "@typescript-eslint/interface-name-prefix": "off",
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-unused-vars": "off",
      },
    },
  ],
}
];

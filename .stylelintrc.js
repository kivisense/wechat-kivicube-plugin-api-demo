module.exports = {
  customSyntax: "postcss-scss",
  extends: [
    "stylelint-config-standard",
    "stylelint-config-recommended-scss",
    "stylelint-config-idiomatic-order",
    "stylelint-config-prettier",
  ],
  plugins: ["stylelint-order", "stylelint-scss"],
  rules: {
    "color-function-notation": "legacy", // 指定颜色函数使用传统符号隔开
    "alpha-value-notation": "number",
    // 兼容自定义标签名
    "selector-type-no-unknown": [
      true,
      {
        ignoreTypes: ["page", "image", "view", "navigator"],
      },
    ],
    "unit-no-unknown": [
      true,
      {
        ignoreUnits: ["rpx"],
      },
    ],
  },
};

module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-rational-order'],
  plugins: ['stylelint-scss', 'stylelint-order', 'stylelint-config-rational-order/plugin'],
  rules: {
    'order/properties-order': [],
    'plugin/rational-order': [
      true,
      {
        'border-in-box-model': false,
        'empty-line-between-groups': false
      }
    ],
    indentation: 2,
    'string-quotes': 'single',
    'no-duplicate-selectors': true,
    'color-hex-case': 'lower',
    'color-hex-length': 'short',
    'selector-combinator-space-after': 'always',
    'selector-attribute-operator-space-before': 'never',
    'selector-attribute-operator-space-after': 'never',
    'selector-attribute-brackets-space-inside': 'never',
    'declaration-block-trailing-semicolon': 'always',
    'declaration-block-single-line-max-declarations': 1,
    'declaration-colon-space-before': 'never',
    'declaration-colon-space-after': 'always',
    'comment-whitespace-inside': 'always',
    'selector-pseudo-class-parentheses-space-inside': 'never',
    'media-feature-range-operator-space-before': 'always',
    'media-feature-range-operator-space-after': 'always',
    'media-feature-parentheses-space-inside': 'never',
    'media-feature-colon-space-before': 'never',
    'media-feature-colon-space-after': 'always',
    'at-rule-no-unknown': null,
    'scss/at-rule-no-unknown': true,
    'no-descending-specificity': null
  }
}

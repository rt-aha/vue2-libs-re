module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-prettier', 'stylelint-config-sass-guidelines'],
  plugins: ['stylelint-scss'],
  // add your custom config here
  // https://stylelint.io/user-guide/configuration

  rules: {
    'string-quotes': null,
    'property-no-vendor-prefix': null,
    'selector-max-compound-selectors': null,
    'scss/at-import-partial-extension-blacklist': null,
    'value-no-vendor-prefix': null,
    'declaration-empty-line-before': 'never',
    'selector-max-id': null,
    'selector-no-qualifying-type': null,
    'max-nesting-depth': null,
    'function-name-case': null,
    'order/properties-alphabetical-order': null,
    'color-hex-length': null,
    'order/properties-order': [
      'content',
      'display',
      'align-items',
      'justify-content',
      'flex',
      'float',
      'clear',
      'position',
      'top',
      'bottom',
      'right',
      'left',
      'z-index',
      'width',
      'min-width',
      'max-width',
      'height',
      'min-height',
      'max-height',
      'margin',
      'margin-top',
      'margin-right',
      'margin-bogttom',
      'margin-left',
      'padding',
      'padding-top',
      'padding-right',
      'padding-bottom',
      'padding-left',
      'color',
      'background',
      'background-position',
      'background-repeat',
      'background-size',
      'background-color',
      'background-clip',
      'border',
      'border-style',
      'border-width',
      'border-color',
      'border-top-style',
      'border-top-width',
      'border-top-color',
      'border-right-style',
      'border-right-width',
      'border-right-color',
      'border-bottom-style',
      'border-bottom-width',
      'border-bottom-color',
      'border-left-style',
      'border-left-width',
      'border-left-color',
      'border-radius',
      'font-size',
      'font-family',
      'font-weight',
      'text-align',
      'text-justify',
      'text-indent',
      'text-overflow',
      'text-decoration',
      'white-space',
      'overflow',
      'overflow-x',
      'overflow-y',
      'opacity',
      'filter',
      'list-style',
      'outline',
      'visibility',
      'box-shadow',
      'text-shadow',
      'resize',
      'transition',
      'animation',
      'cursor',
    ],
  },
};
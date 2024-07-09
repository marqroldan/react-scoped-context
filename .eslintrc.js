module.exports = {
    root: true,
    rules: {
      'no-unused-vars': [
        'warn',
        {vars: 'all', args: 'after-used', ignoreRestSiblings: true},
      ],
      'arrow-parens': [0, 'as-needed', {requireForBlockBody: true}],
      'global-require': 0,
      'linebreak-style': ['error', 'unix'],
      'no-use-before-define': 'off',
      'no-constant-condition': ['warn'],
      'no-useless-escape': ['warn'],
      '@typescript-eslint/no-use-before-define': ['warn'],
      '@typescript-eslint/no-empty-function': ['warn'],
  
      '@typescript-eslint/interface-name-prefix': ['off'],
      '@typescript-eslint/camelcase': ['off'],
      '@typescript-eslint/class-name-casing': ['off'],
      'react/jsx-curly-brace-presence': 0,
      'react/jsx-boolean-value': [0, 'always'],
    },
  };
  
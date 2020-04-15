module.exports = {
    'env': {
        'browser': true,
        'es6': true
    },
    'extends': [
        'eslint:recommended',
        'plugin:react/recommended'
    ],
    'globals': {
        'Atomics': 'readonly',
        'SharedArrayBuffer': 'readonly'
    },
    'parserOptions': {
        "sourceType": "module",
        'ecmaFeatures': {
            'jsx': true
        },
        'ecmaVersion': 2018
    },
    'plugins': [
        'react'
    ],
    'rules': {
        'eqeqeq': 'error',
        'indent': [
            'error',
            2
        ],
        'no-trailing-spaces': 'error',
        'object-curly-spacing': [
            'error', 'always'
        ],
        'arrow-spacing': [
            'error', { 'before': true, 'after': true }
        ],    
        'linebreak-style': [
            'error',
            'unix'
        ],
        'quotes': [
            'error',
            'single'
        ],
        'semi': [
            'error',
            'never'
        ],
        'no-console': 1,
        "react/prop-types": 0
    }
}
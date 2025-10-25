// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

// Your custom configs here
export default withNuxt({
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'vue/no-unused-components': 'warn',
    'prefer-const': 'error',
    'no-unused-vars': 'warn',
    'no-var': 'error',
    '@typescript-eslint/no-explicit-any': 'off',
  },
})

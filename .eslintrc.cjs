module.exports = {
  extends: [
    '@nuxtjs/eslint-config-typescript',
    '@antfu',
  ],
  rules: {
    'no-console': 'off',
    'vue/no-multiple-template-root': 'off', // still running
  },
  ignorePatterns: [
    'node_modules',
    'dist',
    '.output',
    '.vscode',
    '.vercel',
    '.nuxt',
    '*.webp',
    '*.svg',
    '*.scss',
    '*.css',
  ],
}

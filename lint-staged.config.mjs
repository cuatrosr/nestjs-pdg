const config = {
  '**/*.ts?(x)': () => 'tsc -p tsconfig.prod.json --noEmit',
  '*.{js,jsx,ts,tsx}': [
    'pnpm lint',
    'jest --findRelatedTests --passWithNoTests',
  ],
  '*.{md,json}': 'prettier --write',
};

export default config;

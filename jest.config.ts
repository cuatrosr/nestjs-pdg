import type { Config } from 'jest';

import { pathsToModuleNameMapper } from 'ts-jest';

import { compilerOptions } from './tsconfig.json';

const config: Config = {
  preset: 'ts-jest',
  transform: {
    '^.+\\.(t|j)s$': ['@swc/jest', { configFile: '.swcrc' }],
  },
  testEnvironment: 'node',
  cacheDirectory: '.tmp/jestCache',
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.ts'],
  setupFiles: ['<rootDir>.jest/set-env-vars.ts'],
  clearMocks: true,
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
  modulePaths: [compilerOptions.baseUrl],
};

export default config;

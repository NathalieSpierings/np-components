import type {Config} from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  transform: {
    '^.+\\.(ts|tsx)$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.test.json',//'tsconfig.json',
      },
    ],
  },
  testMatch: ['**/__tests__/**/*.(test|spec).[tj]s?(x)', '**/tests/**/*.(test|spec).[tj]s?(x)'],
  setupFilesAfterEnv: ['<rootDir>/src/tests/jest.setup.ts'],
  reporters: [
    'default',
    ['jest-junit', {outputDirectory: 'reports', outputName: 'report.xml'}],
  ],
  coverageReporters: ['json', 'lcov', 'text', 'cobertura'],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/index.ts',
    '!src/**/__tests__/**',
  ],
};

export default config;
export const testEnvironment = 'node';
export const roots = ['<rootDir>/src'];
export const testMatch = ['**/__tests__/**/*.test.js'];
export const moduleNameMapper = {
    '^@/(.*)$': '<rootDir>/src/$1',
};
export const collectCoverage = true;
export const collectCoverageFrom = ['src/**/*.{js,jsx}'];
  
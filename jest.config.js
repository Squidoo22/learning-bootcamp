/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx', 'json', 'vue'],
  transform: {
    '^.+\\.(js|jsx)?$': 'babel-jest',
    '^.+\\.tsx?$': 'ts-jest',
    '.*\\.(vue)$': 'vue3-jest'
    
  },
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  globals: {
    'ts-jest': {
      useESM: true,
    },
  },
};

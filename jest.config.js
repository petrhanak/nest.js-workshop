module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  moduleDirectories: ['node_modules', 'src', 'test'],
  globals: {
    'ts-jest': {
      diagnostics: false,
    },
  },
  testRegex: '.spec.ts$',
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  moduleNameMapper: {
    '^~/(.*)$': '<rootDir>/src/$1',
  },
  testURL: 'http://localhost',
  coverageDirectory: './coverage',
  testEnvironment: 'node',
}

module.exports = {
    testEnvironment: 'node',
    moduleFileExtensions: ['js', 'ts', 'json', 'node'],
    testPathIgnorePatterns: ['/node_modules/', '/.next/'],
    transform: {
      '^.+\\.ts$': 'ts-jest',
    },
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  };
  
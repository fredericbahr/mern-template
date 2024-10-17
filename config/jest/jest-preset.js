/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  clearMocks: true,
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["<rootDir>/src/__tests__/**/*.spec.[jt]s?(x)"],
  setupFiles: ["dotenv/config"],
  testTimeout: 50000,
  setupFilesAfterEnv: [
    "@testing-library/jest-dom"
  ],
  silent: true,
  coverageReporters: ["clover", "json", "lcov", "text", "text-summary"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
    ".+\\.(css|styl|less|sass|scss)$": "jest-css-modules-transform",
  },
  testSequencer: "./jest.test-sequencer.js",
  coveragePathIgnorePatterns: ["/node_modules/", ".css"],
  maxWorkers: 4,
};

module.exports = {
    testEnvironment: "jsdom",
    setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
    moduleNameMapper: {
      "^@/(.*)$": "<rootDir>/$1",
    },
    transform: {
      "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
      "^.+\\.mjs$": "jest-esm-transformer",
    },
    testPathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/.next/"],
    transformIgnorePatterns: [
      "/node_modules/(?!(strip-ansi|ansi-regex|string-width)/)",
    ],
  };
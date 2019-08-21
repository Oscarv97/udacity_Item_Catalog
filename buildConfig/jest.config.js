const path = require("path");
module.exports = {
  rootDir: path.join(__dirname, "../"),
  testURL: "http://localhost?email=someone@example.com:",

  testEnvironmentOptions: {
    runScripts: "dangerously", resources: "usable"
  },

  moduleDirectories: ["node_modules", "jest", "tests"],
  moduleFileExtensions: ["ts", "tsx", "js", "json"],
  globals: {
    "ts-jest": {
      diagnostics: false,
      babelConfig: false
    }
  },
  testMatch: [
    "<rootDir>/src/tests/**/*.test.+(ts|tsx)",
    "<rootDir>/tests/**/*.test.+(ts|tsx)"
  ],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },
  collectCoverage: true,
  coverageReporters: ["json", "lcov", "text", "cobertura"],
  coverageDirectory: "<rootDir>/coverage",
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy"
  },
  reporters: ["default", "jest-junit",
  ],
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "/tests/",
    "/buildConfig/",
    "/jest/",
    "/coverage/",
    "/package-lock.json",
    "/package.json"
  ],
  coverageThreshold: {
    global: {
      statements: 99,
      branches: 99,
      functions: 99,
      lines: 99
    }
  },
};

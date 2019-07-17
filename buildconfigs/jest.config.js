const path = require("path");
module.exports = {
    rootDir: path.join(__dirname, "../"),
    testEnvironmentOptions: {
        runScripts: "dangerously", resources: "usable"
    },

    moduleDirectories: ["node_modules", "jest", "tests"],
    moduleFileExtesnions: ["ts", "tsx", "js", "json"],
    globals : {
        "ts-jest" : {
            enableTsDiagnostics: false,
            skipBabel: true
        }
    },
    testMatch: {
        "<rootDir>/tests/**/*.test.(ts|tsx)",
    },
    transform : {
        "^.+\\.(ts|tsx)$": "ts-jest"
    },
    modulenameMapper : {
        "\\.(cc|less|scss|sass)$" : "identity-obj-proxy",
    },
    coveragePathIgnorePatterns: [
        "/node_modules",
        "/src/tests",
        "/buildconfigs",
        "/package-lock.json",
        "/package.json"
    ],
}
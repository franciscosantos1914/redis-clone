/** @type {import('jest').Config} */

module.exports = {
    fakeTimers: {
      enableGlobally: true,
      legacyFakeTimers: true,
    },
    testEnvironment: 'node',
    testMatch: ["**.test.mjs"],
    transformIgnorePatterns: ["/node_modules/", "/build/"]
  };
// jest.config.js
/** @type {import('jest').Config} */

export default {
  fakeTimers: {
     enableGlobally: true
  },
  cache: true,
  clearMocks: true,
  testEnvironment: 'node',
  testMatch: ["**.test.js"],
  transformIgnorePatterns: ["/node_modules/", "/build/"],
  coveragePathIgnorePatterns: ["/node_modules/", "/build/"]
 };
 
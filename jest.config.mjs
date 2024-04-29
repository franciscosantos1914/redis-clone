// jest.config.mjs
/** @type {import('jest').Config} */

export default {
  fakeTimers: {
     enableGlobally: true
  },
  clearMocks: true,
  cache: true,
  testEnvironment: 'node',
  testMatch: ["**.test.mjs"],
  transformIgnorePatterns: ["/node_modules/", "/build/"],
  coveragePathIgnorePatterns: ["/node_modules/", "/build/"]
 };
 
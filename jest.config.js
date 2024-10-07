module.exports = {
  setupFilesAfterEnv: ['/Users/cedric/trade-corner/node_modules/@testing-library/jest-dom'],
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|svg)$': '/Users/cedric/trade-corner/fileMock.js',
    '\\.(css|less|scss|sss|styl)$': 'identity-obj-proxy',
  },
}

module.exports = {
  setupFilesAfterEnv: ['/Users/cedric/trade-corner/node_modules/@testing-library/jest-dom'],
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  moduleFileExtensions: ['js', 'jsx', 'json', 'node'],
  moduleDirectories: ['node_modules', 'src'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|svg)$': '/Users/cedric/trade-corner/fileMock.js',
    '\\.(css|less|scss|sss|styl)$': 'identity-obj-proxy',
  },
}

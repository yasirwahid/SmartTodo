module.exports = {
  preset: 'react-native',
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@react-navigation|react-native-screens|react-native-safe-area-context|@react-native-vector-icons)/)',
  ],
  moduleNameMapper: {
    '\\.(ttf|otf)$': '<rootDir>/__mocks__/file-mock.js',
  },
};

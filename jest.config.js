module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest-setup.js'],
  moduleFileExtensions: ['js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
	"^.+\\.mjs$": "babel-jest" // Add this line to handle .mjs files
  },
  transformIgnorePatterns: [
    '/node_modules/(?!(bson|@babel/runtime)/)', // Transform specific modules
  ],
};
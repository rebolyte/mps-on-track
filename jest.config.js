const { pathsToModuleNameMapper } = require('ts-jest/utils');

const { compilerOptions } = require('./tsconfig');

module.exports = {
	roots: ['<rootDir>/packages'],
	preset: 'ts-jest',
	testEnvironment: 'node', // or `jsdom`

	testMatch: ['**/__tests__/**/*.test.*'],

	clearMocks: true,

	moduleNameMapper: {
		...pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' }),

		'\\.css$': 'identity-obj-proxy',

		'^lodash-es$': 'lodash'
	}
};

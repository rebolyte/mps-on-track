const findUp = require('find-up');

/**
 * Take values found in config file and add them to process.env
 */
const getConfig = () => {
	const filename = 'ontrack.config.json';

	const configFile = findUp.sync(filename);

	if (configFile === undefined) {
		throw new Error(`config file ${filename} not found!`);
	}

	const config = require(configFile);

	const configVals = Object.entries(config).reduce((acc, [k, v]) => {
		// prefer preset env vars, otherwise use default env
		acc[k] = process.env[k] || v;
		return acc;
	}, {});

	Object.assign(process.env, configVals);

	return configVals;
};

module.exports = {
	getConfig
};

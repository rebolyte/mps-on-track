const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

const dotenvify = o =>
	Object.entries(o)
		.map(pair => pair.join('='))
		.join('\n');

const writeConfig = () => {
	const envFile = path.join(__dirname, '..', '.env');

	const { parsed: defaultConfig } = dotenv.config({
		path: path.join(__dirname, '..', '.env.default')
	});

	const out = Object.entries(defaultConfig).reduce((acc, [k, v]) => {
		// prefer preset env vars, otherwise use default env
		acc[k] = process.env[k] || v;
		return acc;
	}, {});

	fs.writeFileSync(envFile, dotenvify(out));
};

exports.writeConfig = writeConfig;

writeConfig();

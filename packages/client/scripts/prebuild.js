const { writeConfig } = require('../../../scripts/copyEnv');

console.log('prebuild: write config file from current environment, falling back to .env.default');

writeConfig();

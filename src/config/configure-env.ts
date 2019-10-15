import dotenvExtended from 'dotenv-extended';
import { resolve } from 'path';

const envName = process.env.NODE_ENV ? process.env.NODE_ENV.toLowerCase() : '';
const isTest = envName === 'test';
const path = resolve(__dirname, `../../.env.${envName}`);

dotenvExtended.load({
  path,
  silent: true,
  defaults: resolve(__dirname, '../../.env'),
  schema: resolve(__dirname, '../../.env.sample'),
  errorOnMissing: !isTest,
  errorOnExtra: false,
  errorOnRegex: false,
  includeProcessEnv: true,
  overrideProcessEnv: true,
});

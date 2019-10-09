/**
* A simple wrapper for console
*/
export const logger = console;

/**
* Gets the value of an environment variable.
*
* @param {string} key - Environment variable key
* variable exists for the given key
* @returns {string|number|boolean} The env config value
*/
export const env = (key: string) => {
    const value = process.env[key];

    if (value === 'true') return true;
    if (value === 'false') return false;
    if (value === '(empty)') return '';

    return value || null;
};

const { globSync } = require('glob');

/**
 * Get all subdirectory paths for a given source
 * @param {string} src - The source to search from for subdirectories
 * @returns {string[]} - An array of all subdirectory paths
 */
const getAllSubdirectoryPaths = src => globSync(`${src}/**/`);

module.exports = {
    getAllSubdirectoryPaths
};

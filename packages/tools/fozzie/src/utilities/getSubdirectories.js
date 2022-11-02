const glob = require('glob');

/**
 * Get all subdirectory paths for a given source
 * @param {string} src - The source to search from for subdirectories
 * @returns {string[]} - An array of all subdirectory paths
 */
const getAllSubdirectoryPaths = src => glob.sync(`${src}/**/`);

module.exports = {
    getAllSubdirectoryPaths
};

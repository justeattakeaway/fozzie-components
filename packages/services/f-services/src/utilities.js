/**
 * Returns a deep object by traversing following the provided path.
 *
 * @param {Object} obj The object to traverse.
 * @param {Array} path The path used to traverse the object.
 * @return {Object} The object at the end of the path.
 */
const getDeepObjectByPath = (obj, path) => path.reduce((o, key) => (o && o[key] ? o[key] : null), obj);

export default {
    getDeepObjectByPath
};

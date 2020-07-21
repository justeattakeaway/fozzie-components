/**
 * Proxy to reflect the 'logical' classname back out for test purposes
 */
const objectInternals = [
    'constructor',
    'hasOwnProperty',
    'isPrototypeOf',
    'propertyIsEnumerable',
    'toLocaleString',
    'toString',
    'valueOf'
];

export default new Proxy({}, {
    get: (target, name) => (objectInternals.includes(name) || typeof name !== 'string'
        ? target[name]
        : name)
});

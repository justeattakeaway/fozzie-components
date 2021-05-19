/**
 * Curry function that allows piping function calls so they are called one after another
 * @param fns
 * @returns {function(*=): *}
 */
const pipe = (...fns) => x => fns.reduceRight((y, f) => f(y), x);
export default pipe;

const pipe = (...fns) => x => fns.reduceRight((y, f) => f(y), x);
export default pipe;

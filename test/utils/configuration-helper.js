const CIRCLE_CI = process.env.CIRCLECI;
const TEST_TYPE = process.env.TEST_TYPE;

exports.local = () => ({
    bail: 0,
    maxinstances: 1,
    loglevel: 'info'
});

exports.ci = () => ({
    bail: 1,
    maxinstances: 2,
    loglevel: 'info'
});

exports.a11y = () => ({
    specs: ['./test/specs/accessibility/axe-accessibility.spec.js']
});

exports.component = () => ({
    specs: ['./test/specs/component/*.component.spec.js']
});

exports.setTestEnvironment = () => (CIRCLE_CI ? exports.ci() : exports.local());
exports.setTestType = () => (TEST_TYPE === 'component' ? exports.component() : exports.a11y());

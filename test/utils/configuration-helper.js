const CIRCLE_CI = process.env.CIRCLECI;


exports.localPaths = () => {
    if (process.env.ROOT_DIRECTORY) {
        return {
            specs: [
                './packages/components/atoms/**/test/specs/component/*.component.spec.js',
                './packages/components/molecules/**/test/specs/component/*.component.spec.js',
                './packages/components/organisms/**/test/specs/component/*.component.spec.js',
                './packages/components/atoms/**/test/specs/accessibility/axe-accessibility.spec.js',
                './packages/components/molecules/**/test/specs/accessibility/axe-accessibility.spec.js',
                './packages/components/organisms/**/test/specs/accessibility/axe-accessibility.spec.js'
            ],
            allureOutputFolder: './allure-results'
        };
    }

    return {
        specs: [
            './test/specs/component/*.spec.js',
            './test/specs/accessibility/*.spec.js'
        ],
        allureOutputFolder: '../../../../allure-results'
    };
};

exports.local = () => {
    const localPaths = exports.localPaths();

    return {
        specs: localPaths.specs,
        bail: 0,
        allureOutputFolder: localPaths.allureOutputFolder,
        maxinstances: 1,
        loglevel: 'info'
    };
};

exports.ci = () => ({
    specs: [
        './packages/components/atoms/**/test/specs/component/*.component.spec.js',
        './packages/components/molecules/**/test/specs/component/*.component.spec.js',
        './packages/components/organisms/**/test/specs/component/*.component.spec.js',
        './packages/components/atoms/**/test/specs/accessibility/axe-accessibility.spec.js',
        './packages/components/molecules/**/test/specs/accessibility/axe-accessibility.spec.js',
        './packages/components/organisms/**/test/specs/accessibility/axe-accessibility.spec.js'
    ],
    bail: 1,
    allureOutputFolder: './allure-results',
    maxinstances: 2,
    loglevel: 'silent'
});

exports.setTestType = () => (CIRCLE_CI ? exports.ci() : exports.local());

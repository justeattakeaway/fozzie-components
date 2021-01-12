const CIRCLE_CI = process.env.CIRCLECI;

exports.local = () => ({
    specs: [
        './test/specs/component/*.spec.js',
        './test/specs/accessibility/*.spec.js'
    ],
    bail: 0,
    reporters: [
        [video, {
            saveAllVideos: false, // If true, also saves videos for successful test cases
            videoSlowdownMultiplier: 3 // Higher to get slower videos, lower for faster videos [Value 1-100]
        }],
        ['allure', {
            outputDir: '../../../../allure-results',
            disableWebdriverStepsReporting: false,
            disableWebdriverScreenshotsReporting: false
        }]
    ]
});

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
    reporters: null
});

exports.setTestType = () => (CIRCLE_CI ? exports.ci() : exports.local());

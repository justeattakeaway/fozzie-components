const { CIRCLECI, TEST_TYPE } = process.env;

exports.setTestSettings = () => {

    const testSettings = CIRCLECI ? require('../configuration/ci.test-settings').default()
                                    : require('../configuration/local.test-settings').default()

    return testSettings;
}

exports.a11y = () => ({
    specs: [`${global.baseDir}/test/specs/accessibility/axe-accessibility.spec.js`]
});

exports.component = () => ({
    specs: [`${global.baseDir}/test/specs/component/*.component.spec.js`]
});

exports.setTestType = () => (TEST_TYPE === 'component' ? exports.component() : exports.a11y());

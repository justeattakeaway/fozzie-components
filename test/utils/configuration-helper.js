const { CIRCLECI, TEST_TYPE } = process.env;

exports.setTestSettings = () => {

    const testSettings = CIRCLECI ? require('../configuration/ci.test-settings').default()
                                    : require('../configuration/local.test-settings').default()

    return testSettings;
}
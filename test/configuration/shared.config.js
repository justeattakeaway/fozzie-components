const TEST_TYPE = process.env.TEST_TYPE.toLowerCase();

const { SPEC_FILE, VS_DEBUGGER } = process.env;

exports.testType = {
    ...(TEST_TYPE === 'component' ? {
        name: 'component',
        services: ['chromedriver'],
        specs: VS_DEBUGGER ? [SPEC_FILE] : [
            'test/component/*.component.spec.js'
        ]
    } : []),
    ...(TEST_TYPE === 'a11y' ? {
        name: 'accessibility',
        services: ['chromedriver', 'percy'],
        specs: VS_DEBUGGER ? [SPEC_FILE] : [
            'test/accessibility/axe-accessibility.spec.js']
    } : {}),
    ...(TEST_TYPE === 'visual' ? {
        name: 'visual',
        services: ['chromedriver', 'percy'],
        specs: ['test/visual/*.visual.*.spec.js']
    } : {})
};

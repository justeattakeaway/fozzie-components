const TEST_TYPE = process.env.TEST_TYPE.toLowerCase();

const { SPEC_FILE, VS_DEBUGGER } = process.env;

const isMobile = () => SPEC_FILE.endsWith('mobile.spec.js');
const isDesktop = () => SPEC_FILE.endsWith('desktop.spec.js');

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
    ...(TEST_TYPE === 'visual' && isDesktop ? {
        name: 'visual',
        services: ['chromedriver', 'percy'],
        specs: ['test/visual/*.visual.desktop.spec.js']
    } : {}),
    ...(TEST_TYPE === 'visual' && isMobile ? {
        name: 'visual',
        services: ['chromedriver', 'percy'],
        specs: ['test/visual/*.visual.mobile.spec.js']
    } : {})
};

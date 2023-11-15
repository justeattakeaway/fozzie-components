const TEST_TYPE = process.env.TEST_TYPE.toLowerCase();
const path = require('path');

const { SPEC_FILE, VS_DEBUGGER } = process.env;
const currentDirectory = process.cwd();

exports.testType = {
    ...(TEST_TYPE === 'component' ? {
        name: 'component',
        services: ['chromedriver'],
        specs: VS_DEBUGGER ? [SPEC_FILE] : [
            [path.join(process.cwd(), './test/component/*.component.spec.js')]
        ]
    } : {}),
    ...(TEST_TYPE === 'a11y' ? {
        name: 'accessibility',
        services: ['chromedriver', 'percy'],
        specs: VS_DEBUGGER ? [SPEC_FILE] : [
            [path.join(currentDirectory, 'test/accessibility/axe-accessibility.spec.js')]
        ],
        violationCSVDirectory: `${global.baseDir}/test/results/axe-violations`
    } : {}),
    ...(TEST_TYPE === 'visual' ? {
        name: 'visual',
        services: ['chromedriver', 'percy'],
        specs: [
            [path.join(currentDirectory, '/test/visual/*.visual.*.spec.js'),
                path.join(currentDirectory, './test/visual/*.visual.spec.js')]
        ]
    } : {})
};

let browserstackName = `Local - ${process.env.BROWSERSTACK_USERNAME} ${new Date().toLocaleTimeString()}`;

const settings = () => ({
    capabilities: [
        {  
            os: 'android',
            osVersion: '11.0',
            browserName: 'chrome',
            device: 'Google Pixel 4',
            browserVersion: '',
            project: 'Fozzie-Components',
            build: browserstackName,
            'browserstack.networkLogs': true,
            specs: [
                `test/specs/component/*.component.mobile.spec.js`,
                `test/specs/component/*.component.shared.spec.js`,
            ]
        },
        {
            os: 'ios',
            osVersion: '14.0',
            browserName: 'safari',
            device: 'iPhone 12',
            browserVersion: '',
            project: 'Fozzie-Components',
            build: browserstackName,
            'browserstack.networkLogs': true,
            specs: [
                `test/specs/component/*.component.mobile.spec.js`,
                `test/specs/component/*.component.shared.spec.js`,
            ]
        },
        {
            os: 'OS X',
            osVersion: 'Big sur',
            browserName: 'safari',
            browserVersion: '14',
            project: 'Fozzie-Components',
            build: browserstackName,
            'browserstack.networkLogs': true,
            specs: [
                `test/specs/component/*.component.desktop.spec.js`,
                `test/specs/component/*.component.shared.spec.js`,
            ]
        }
    ],
    services: [['browserstack', {
        browserstackLocal: true
    }]]
});

exports.default = settings;

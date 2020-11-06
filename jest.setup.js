var { registerAllure } = require('jest-allure2')
var resultsDir = '../../allure-results'

registerAllure(resultsDir)

// "use strict";
// Object.defineProperty(exports, "__esModule", { value: true });
// exports.registerAllure = void 0;
// const reporter_1 = require("jest-allure2/dist/reporter");
// const registerAllure = (resultsDir = '../../allure-results', projectDir = process.cwd(), environmentInfo = {}, testMapper) => {
//     const reporter = new reporter_1.JasmineAllureReporter({
//         resultsDir,
//         testMapper,
//         projectDir
//     });
//     jasmine.getEnv().addReporter(reporter);
//     global.allure = reporter.getInterface();
//     if (environmentInfo) {
//         global.allure.writeEnvironmentInfo(environmentInfo);
//     }
//     return reporter;
// };
// exports.registerAllure = registerAllure;
// //# sourceMappingURL=setup.js.map
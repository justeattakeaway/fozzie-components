const { registerAllure } = require('jest-allure2');

const resultsDir = '../../../../test/results/allure';

registerAllure(resultsDir);

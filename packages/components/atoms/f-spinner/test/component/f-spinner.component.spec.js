/* eslint-disable class-methods-use-this */
const Spinner = require('../../test-utils/component-objects/f-spinner.component');

let spinner;

describe('f-spinner component tests', () => {
    beforeEach(async () => {
        spinner = new Spinner();

        await spinner.load();
    });

    it('should display the f-spinner component', async () => {
        // Assert
        await expect(await spinner.isComponentDisplayed()).toBe(true);
    });
});

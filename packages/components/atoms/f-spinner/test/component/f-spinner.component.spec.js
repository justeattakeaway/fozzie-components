/* eslint-disable class-methods-use-this */
const Spinner = require('../../test-utils/component-objects/f-spinner.component');

let spinner;

describe('f-spinner component tests', () => {
    beforeEach(() => {
        spinner = new Spinner();

        spinner.load();
    });

    it('should display the f-spinner component', () => {
        // Assert
        expect(spinner.isComponentDisplayed()).toBe(true);
    });
});

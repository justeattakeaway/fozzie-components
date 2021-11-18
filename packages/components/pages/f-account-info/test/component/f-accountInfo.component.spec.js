const AccountInfo = require('../../test-utils/component-objects/f-accountInfo.component');

const accountInfo = new AccountInfo();

describe('f-accountInfo component tests', () => {
    beforeEach(() => {
        accountInfo.load();
    });

    it('should display the f-accountInfo component', () => {
        // Assert
        expect(accountInfo.isComponentDisplayed()).toBe(true);
    });
});

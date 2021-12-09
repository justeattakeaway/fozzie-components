const AccountInfo = require('../../test-utils/component-objects/f-accountInfo.component');

let accountInfo;

describe('f-accountInfo component tests', () => {
    beforeEach(() => {
        accountInfo = new AccountInfo();

        accountInfo.load();

        accountInfo.waitForComponent();
    });

    it('should display the f-accountInfo component', () => {
        // Assert
        expect(accountInfo.isComponentDisplayed()).toBe(true);
    });
});

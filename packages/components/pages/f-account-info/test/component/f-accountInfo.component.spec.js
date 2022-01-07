const AccountInfo = require('../../test-utils/component-objects/f-accountInfo.component');

let accountInfo;

describe('f-account-info component tests', () => {
    beforeEach(() => {
        accountInfo = new AccountInfo();

        accountInfo.load();

        accountInfo.waitForComponent();
    });

    it('should display the f-account-info component', () => {
        // Assert
        expect(accountInfo.isComponentDisplayed()).toBe(true);
    });
});

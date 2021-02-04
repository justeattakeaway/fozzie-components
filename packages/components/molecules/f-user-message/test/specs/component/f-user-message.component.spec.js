const UserMessage = require ('../../../test-utils/component-objects/f-user-message.component');
const userMessage = new UserMessage();

describe('f-user-message component tests', () => {
    before(() => {
        userMessage.open();
        userMessage.waitForComponent();
    });
    
    it('should display the user message component', field => {
        // Assert
        expect(userMessage.isComponentDisplayed()).toBe(true);
    });
});

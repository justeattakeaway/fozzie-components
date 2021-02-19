const UserMessage = require ('../../../test-utils/component-objects/f-user-message.component');
const userMessage = new UserMessage();

describe('f-user-message component tests', () => {
    before(() => {
        userMessage.open();
        userMessage.waitForComponent();
    });

    it('should display the user message component', () => {
        // Assert
        expect(userMessage.isComponentDisplayed()).toBe(true);
    });

    it('should display the user message content', () => {
        // Assert
        expect(userMessage.isContentDisplayed()).toBe(true);
    });
});

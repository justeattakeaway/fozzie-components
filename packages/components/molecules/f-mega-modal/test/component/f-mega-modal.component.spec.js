import MegaModal from '../../test-utils/component-objects/f-mega-modal.component';

describe('f-mega-modal component tests', () => {
    beforeEach(async () => {
        await MegaModal.load();
    });

    it('should display f-mega-modal component', async () => {
        // Assert
        await expect(await MegaModal.isComponentDisplayed()).toBe(true);
    });

    it('should display the title', async () => {
        // Assert
        await expect(await MegaModal.isTitleDisplayed()).toBe(true);
    });

    it('should display the content', async () => {
        // Assert
        await expect(await MegaModal.isContentDisplayed()).toBe(true);
    });
});

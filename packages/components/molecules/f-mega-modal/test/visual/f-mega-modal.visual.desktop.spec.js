const forEach = require('mocha-each');
const MegaModal = require('../../test-utils/component-objects/f-mega-modal.component');

forEach([
    'desktop',
    'mobile'
])
.describe('f-mega-modal - %s - visual tests', device => {
    let megaModal;

    beforeEach(() => {
        // Arrange
        if (device === 'mobile') {
            browser.setWindowSize(414, 731);
        }

        megaModal = new MegaModal();
    });

    it('should display the f-mega-modal in the default state', async () => {
        // Act
        await megaModal.load();

        // Assert
        await browser.percyScreenshot('f-mega-modal - Base State', device);
    });

    forEach([
        'isNarrow',
        'isWide',
        'isFlush',
        'isPositionedBottom',
        'isFullHeight',
        'isTextAlignedCenter'
    ])
    .it('should display the f-mega-modal when `%s=true`', async arg => {
        // Act
        await megaModal.load({ [arg]: true });

        // Assert
        await browser.percyScreenshot(`f-mega-modal - '${arg}=true'`, device);
    });

    forEach([
        'isOpen',
        'hasOverlay',
        'hasCloseButton'
    ])
    .it('should display the f-mega-modal when `%s=false`', async arg => {
        // Act
        await megaModal.load({ [arg]: false });

        // Assert
        await browser.percyScreenshot(`f-mega-modal - '${arg}=false'`, device);
    });

    it('should display the f-mega-modal `titleCopy`', async () => {
        // Act
        await megaModal.load({ titleCopy: 'This is a title' });

        // Assert
        await browser.percyScreenshot('f-mega-modal - Title copy', device);
    });

    forEach([
        'h1',
        'h2',
        'h3',
        'h4'
    ])
    .it('should display the f-mega-modal title with html tag `%s`', async titleHtmlTag => {
        // Act
        await megaModal.load({ titleHtmlTag });

        // Assert
        await browser.percyScreenshot(`f-mega-modal - title with html tag is ${titleHtmlTag}`, device);
    });
});

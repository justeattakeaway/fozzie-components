const forEach = require('mocha-each');
const MegaModal = require('../../test-utils/component-objects/f-mega-modal.component');

describe('f-mega-modal - visual tests', () => {
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
            'isOpen',
            'isNarrow',
            'isWide',
            'isFlush',
            'isPositionedBottom',
            'isTextAlignedCenter'
        ])
        .it('should display the f-mega-modal with `%s=true` state', async arg => {
            // Act
            await megaModal.load({ [arg]: true });

            // Assert
            await browser.percyScreenshot(`f-mega-modal - '${arg}=true'`, device);
        });

        forEach([
            'hasOverlay',
            'hasCloseButton'
        ])
        .it('should display the f-mega-modal with `%s=false` state', async arg => {
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

    it('should display the f-mega-modal when `isFullHeight=true`', async () => {
        // Arrange
        browser.setWindowSize(414, 731);
        const megaModal = new MegaModal();

        // Act
        await megaModal.load({ isFullHeight: true });

        // Assert
        await browser.percyScreenshot('f-mega-modal - `isFullHeight=true`', 'mobile');
    });
});

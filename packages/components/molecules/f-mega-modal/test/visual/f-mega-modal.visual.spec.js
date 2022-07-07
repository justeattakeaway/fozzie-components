import MegaModal from '../../test-utils/component-objects/f-mega-modal.component';

let args;
const devices = [
    'desktop',
    'mobile'
];

devices.forEach(device => {
    describe(`f-mega-modal - ${device} - visual tests`, () => {
        beforeEach(async () => {
            // Arrange
            if (device === 'mobile') {
                await browser.setWindowSize(414, 731);
            }
        });

        it('should display the f-mega-modal in the default state', async () => {
            // Act
            await MegaModal.load();

            // Assert
            await browser.percyScreenshot('f-mega-modal - Base State', device);
        });

        args = [
            'isNarrow',
            'isWide',
            'isFlush',
            'isPositionedBottom',
            'isFullHeight',
            'isTextAlignedCenter'
        ];

        args.forEach(arg => {
            it('should display the f-mega-modal when `%s=true`', async () => {
                // Act
                await MegaModal.load({ [arg]: true });

                // Assert
                await browser.percyScreenshot(`f-mega-modal - '${arg}=true'`, device);
            });
        });

        args = [
            'isOpen',
            'hasOverlay',
            'hasCloseButton'
        ];

        args.forEach(arg => {
            it('should display the f-mega-modal when `%s=false`', async () => {
                // Act
                await MegaModal.load({ [arg]: false });

                // Assert
                await browser.percyScreenshot(`f-mega-modal - '${arg}=false'`, device);
            });
        });

        it('should display the f-mega-modal `titleCopy`', async () => {
            // Act
            await MegaModal.load({ titleCopy: 'This is a title' });

            // Assert
            await browser.percyScreenshot('f-mega-modal - Title copy', device);
        });

        args = [
            'h1',
            'h2',
            'h3',
            'h4'
        ];

        args.forEach(titleHtmlTag => {
            it('should display the f-mega-modal title with html tag `%s`', async () => {
                // Act
                await MegaModal.load({ titleHtmlTag });

                // Assert
                await browser.percyScreenshot(`f-mega-modal - title with html tag is ${titleHtmlTag}`, device);
            });
        });
    });
});

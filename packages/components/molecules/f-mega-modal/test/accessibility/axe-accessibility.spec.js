const { buildUrl } = require('@justeat/f-wdio-utils/src/storybook-extensions.js');
const { getAccessibilityTestResults } = require('../../../../../../test/utils/axe-helper');

const MegaModal = require('../../test-utils/component-objects/f-mega-modal.component');

const megaModal = new MegaModal('molecule', 'mega-modal-component');

describe('Accessibility tests', () => {
    beforeEach(() => {
        const pageUrl = buildUrl(megaModal.componentType, megaModal.componentName, megaModal.path);
        megaModal.open(pageUrl);
        megaModal.waitForComponent();
    });

    it('a11y - should test f-mega-modal component WCAG compliance', () => {
        // Act
        const axeResults = getAccessibilityTestResults('f-mega-modal');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });
});

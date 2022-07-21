import { getAxeResults } from '../../../../../../test/utils/axe-helper'; // eslint-disable-line import/no-relative-packages

const Mfa = require('../../test-utils/component-objects/f-mfa.component');

describe('f-mfa - Accessibility tests', () => {
    let mfa;

    beforeEach(() => {
        mfa = new Mfa();
    });

    it('a11y - should test f-mfa component WCAG compliance', () => {
        // Act
        mfa.load();

        // Assert
        const axeResults = getAxeResults('f-mfa');
        expect(axeResults.violations.length).toBe(0);
    });
});

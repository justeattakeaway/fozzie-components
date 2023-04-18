import { validateOptions } from '../validators';

describe('optionsValidator', () => {
    describe('validateOptions', () => {
        test('should return false when there are less than 2 options', () => {
            const options = [{ label: 'Option 1' }];
            expect(validateOptions(options)).toBe(false);
        });

        test('should return false when there are more than 4 options', () => {
            const options = [
                { label: 'Option 1' },
                { label: 'Option 2' },
                { label: 'Option 3' },
                { label: 'Option 4' },
                { label: 'Option 5' }
            ];
            expect(validateOptions(options)).toBe(false);
        });

        test('should return false when an option is not an object', () => {
            const options = ['Option 1', { label: 'Option 2' }];
            expect(validateOptions(options)).toBe(false);
        });

        test('should return false when an option label is not a string or empty', () => {
            const options = [
                { label: 123 },
                { label: 'Option 2' }
            ];
            expect(validateOptions(options)).toBe(false);
        });

        test('should return false when an option iconName is not a string', () => {
            const options = [
                { label: 'Option 1', iconName: 123 },
                { label: 'Option 2' }
            ];
            expect(validateOptions(options)).toBe(false);
        });

        test('should return false when an option disabled is not a boolean', () => {
            const options = [
                { label: 'Option 1', disabled: 'true' },
                { label: 'Option 2' }
            ];
            expect(validateOptions(options)).toBe(false);
        });

        test('should return false when more than one option is selected', () => {
            const options = [
                { label: 'Option 1', selected: true },
                { label: 'Option 2', selected: true }
            ];
            expect(validateOptions(options)).toBe(false);
        });

        test('should return false when an option selected is not a boolean', () => {
            const options = [
                { label: 'Option 1', selected: 'true' },
                { label: 'Option 2' }
            ];
            expect(validateOptions(options)).toBe(false);
        });

        test('should return true when all options are valid', () => {
            const options = [
                {
                    label: 'Option 1', iconName: 'icon-1', disabled: true, selected: true
                },
                { label: 'Option 2', iconName: 'icon-2', disabled: false },
                { label: 'Option 3', iconName: 'icon-3' }
            ];
            expect(validateOptions(options)).toBe(true);
        });
    });
});

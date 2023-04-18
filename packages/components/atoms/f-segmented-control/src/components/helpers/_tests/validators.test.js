import { validateOptions } from '../validators';

describe('optionsValidator', () => {
    describe('validateOptions', () => {
        it('should return false when there are less than 2 options', () => {
            // arrange
            const options = [{ label: 'Option 1' }];

            // act
            const result = validateOptions(options);

            // assert
            expect(result).toBe(false);
        });

        it('should return false when there are more than 4 options', () => {
            // arrange
            const options = [{ label: 'Option 1' }, { label: 'Option 2' }, { label: 'Option 3' }, { label: 'Option 4' }, { label: 'Option 5' }];

            // act
            const result = validateOptions(options);

            // assert
            expect(result).toBe(false);
        });

        it('should return false when an option is not an object', () => {
            // arrange
            const options = ['Option 1', { label: 'Option 2' }];

            // act
            const result = validateOptions(options);

            // assert
            expect(result).toBe(false);
        });

        it('should return false when an option label is not a string or empty', () => {
            // arrange
            const options = [{ label: 123 }, { label: 'Option 2' }];

            // act
            const result = validateOptions(options);

            // assert
            expect(result).toBe(false);
        });

        it('should return false when an option iconName is not a string', () => {
            // arrange
            const options = [{ label: 'Option 1', iconName: 123 }, { label: 'Option 2' }];

            // act
            const result = validateOptions(options);

            // assert
            expect(result).toBe(false);
        });

        it('should return false when an option disabled is not a boolean', () => {
            // arrange
            const options = [{ label: 'Option 1', disabled: 'true' }, { label: 'Option 2' }];

            // act
            const result = validateOptions(options);

            // assert
            expect(result).toBe(false);
        });

        it('should return false when more than one option is selected', () => {
            // arrange
            const options = [{ label: 'Option 1', selected: true }, { label: 'Option 2', selected: true }];

            // act
            const result = validateOptions(options);

            // assert
            expect(result).toBe(false);
        });

        it('should return false when an option selected is not a boolean', () => {
            // arrange
            const options = [{ label: 'Option 1', selected: 'true' }, { label: 'Option 2' }];

            // act
            const result = validateOptions(options);

            // assert
            expect(result).toBe(false);
        });

        it('should return true when all options are valid', () => {
            // arrange
            const options = [{
                label: 'Option 1', iconName: 'icon-1', disabled: true, selected: true
            }, { label: 'Option 2', iconName: 'icon-2', disabled: false }, { label: 'Option 3', iconName: 'icon-3' }];

            // act
            const result = validateOptions(options);

            // assert
            expect(result).toBe(true);
        });
    });
});

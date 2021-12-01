import { shallowMount } from '@vue/test-utils';
import AccountInfoValidationMixin from '../AccountInfoValidationMixin.vue';

describe('AccountInfoValidationMixin', () => {
    describe('methods', () => {
        describe('isValidName', () => {
            it('should return true when provided just latin character set letters', async () => {
                // Arrange
                const testValue = 'Roger';
                const expectedResult = true;

                const Component = {
                    render () {},
                    mixins: [AccountInfoValidationMixin]
                };

                // Act
                const wrapper = shallowMount(Component);
                const result = wrapper.vm.isValidName(testValue);

                // Assert
                expect(result).toBe(expectedResult);
            });

            it('should return false when provided numbers', async () => {
                // Arrange
                const testValue = '12345';
                const expectedResult = false;

                const Component = {
                    render () {},
                    mixins: [AccountInfoValidationMixin]
                };

                // Act
                const wrapper = shallowMount(Component);
                const result = wrapper.vm.isValidName(testValue);

                // Assert
                expect(result).toBe(expectedResult);
            });

            it('should return false when provided a value with symbols', async () => {
                // Arrange
                const testValue = 'Roger@Black.com';
                const expectedResult = false;

                const Component = {
                    render () {},
                    mixins: [AccountInfoValidationMixin]
                };

                // Act
                const wrapper = shallowMount(Component);
                const result = wrapper.vm.isValidName(testValue);

                // Assert
                expect(result).toBe(expectedResult);
            });

            it('should return true when provided non latin character set values', async () => {
                // Arrange
                const testValue = 'Léopold';
                const expectedResult = true;

                const Component = {
                    render () {},
                    mixins: [AccountInfoValidationMixin]
                };

                // Act
                const wrapper = shallowMount(Component);
                const result = wrapper.vm.isValidName(testValue);

                // Assert
                expect(result).toBe(expectedResult);
            });

            it('should return true when provided a name with apostrophes', async () => {
                // Arrange
                const testValue = "R'oger";
                const expectedResult = true;

                const Component = {
                    render () {},
                    mixins: [AccountInfoValidationMixin]
                };

                // Act
                const wrapper = shallowMount(Component);
                const result = wrapper.vm.isValidName(testValue);

                // Assert
                expect(result).toBe(expectedResult);
            });
        });
    });
});

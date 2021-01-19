import { shallowMount } from '@vue/test-utils';
import checkoutValidations from '../validations.mixin';
import { VALIDATIONS } from '../../constants';

const $v = {
    addressValidations: {
        city: {
            $dirty: false,
            required: true
        },
        line1: {
            $dirty: false,
            required: false
        },
        postcode: {
            $dirty: false,
            required: true,
            isValidPostcode: false
        }
    }
};

describe('Checkout Methods', () => {
    describe('isFieldEmpty', () => {
        const type = VALIDATIONS.address;
        const field = 'line1';
        let wrapper;

        beforeEach(() => {
            wrapper = shallowMount(checkoutValidations, {
                render () {},
                mocks: {
                    $v
                }
            });
        });

        it('should return `false` if `field` has not been touched and input is required', () => {
            // Arrange
            $v.addressValidations[field].$dirty = false;
            $v.addressValidations[field].required = true;

            // Assert
            expect(wrapper.vm.isFieldEmpty(type, field)).toEqual(false);
        });

        it('should return `true` if `field` has been touched and input is required', () => {
            // Act
            $v.addressValidations[field].$dirty = true;
            $v.addressValidations[field].required = false;

            // Assert
            expect(wrapper.vm.isFieldEmpty(type, field)).toEqual(true);
        });

        it('should return `false` if `field` has been touched and input is not required`', () => {
            // Act
            $v.addressValidations[field].$dirty = true;
            $v.addressValidations[field].required = true;

            // Assert
            expect(wrapper.vm.isFieldEmpty(type, field)).toEqual(false);
        });
    });
});

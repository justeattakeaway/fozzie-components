import { shallowMount } from '@vue/test-utils';
import checkoutValidations from '../validations.mixin';
import { VALIDATIONS } from '../../constants';

const $v = {
    [VALIDATIONS.address]: {
        locality: {
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
            $v[VALIDATIONS.address][field].$dirty = false;
            $v[VALIDATIONS.address][field].required = true;

            // Assert
            expect(wrapper.vm.isFieldEmpty(type, field)).toEqual(false);
        });

        it('should return `true` if `field` has been touched and input is required', () => {
            // Act
            $v[VALIDATIONS.address][field].$dirty = true;
            $v[VALIDATIONS.address][field].required = false;

            // Assert
            expect(wrapper.vm.isFieldEmpty(type, field)).toEqual(true);
        });

        it('should return `false` if `field` has been touched and input is not required`', () => {
            // Act
            $v[VALIDATIONS.address][field].$dirty = true;
            $v[VALIDATIONS.address][field].required = true;

            // Assert
            expect(wrapper.vm.isFieldEmpty(type, field)).toEqual(false);
        });
    });
});

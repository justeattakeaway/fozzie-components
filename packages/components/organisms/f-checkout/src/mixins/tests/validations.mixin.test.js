import { shallowMount, createLocalVue } from '@vue/test-utils';
import checkoutValidations from '../validations.mixin';

const localVue = createLocalVue();

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
        const component = 'address';
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
            expect(wrapper.vm.isFieldEmpty(component, field)).toEqual(false);
        });

        it('should return `true` if `field` has been touched and input is required', () => {
            // Act
            $v.addressValidations[field].$dirty = true;
            $v.addressValidations[field].required = false;

            // Assert
            expect(wrapper.vm.isFieldEmpty(component, field)).toEqual(true);
        });

        it('should return `false` if `field` has been touched and input is not required`', () => {
            // Act
            $v.addressValidations[field].$dirty = true;
            $v.addressValidations[field].required = true;

            // Assert
            expect(wrapper.vm.isFieldEmpty(component, field)).toEqual(false);
        });
    });

    describe('updateFulfilmentDetails ::', () => {
        let wrapper;
        const dispatch = jest.fn();

        beforeEach(() => {
            wrapper = shallowMount(checkoutValidations, {
                render () {},
                localVue,
                mocks: {
                    $store: {
                        dispatch
                    }
                }
            });
        });

        afterEach(() => {
            jest.clearAllMocks();
        });

        it.each([
            ['Guest', 'firstName', 'Jim'],
            ['Address', 'city', 'London']
        ])('should be dispatch appropriate action with the correct payload', (component, field, newValue) => {
            // Arrange
            const action = `checkout/update${component}Details`;
            const payload = { [field]: newValue };

            // Act
            wrapper.vm.updateFulfilmentDetails(component, field, newValue);

            // Assert
            expect(dispatch).toHaveBeenCalledWith(action, payload);
        });
    });
});

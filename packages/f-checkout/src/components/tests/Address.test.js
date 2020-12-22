import Vuex from 'vuex';
import { VueI18n } from '@justeat/f-globalisation';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import Address from '../Address.vue';
import { i18n, createStore } from './helpers/checkoutHelpers';

const localVue = createLocalVue();

localVue.use(VueI18n);
localVue.use(Vuex);

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

describe('Address', () => {
    allure.feature('Checkout-Address');

    const propsData = {};

    it('should be defined', () => {
        // Arrange
        const wrapper = shallowMount(Address, {
            i18n,
            store: createStore(),
            localVue,
            propsData,
            provide: () => ({
                $v
            })
        });

        // Assert
        expect(wrapper.exists()).toBe(true);
    });

    describe('computed ::', () => {
        const isFieldEmptySpy = jest.spyOn(Address.methods, 'isFieldEmpty');
        let wrapper;

        it.each([
            ['isAddressLine1Empty', 'line1'],
            ['isAddressCityEmpty', 'city'],
            ['isAddressPostcodeEmpty', 'postcode']
        ])('%s :: should call `isFieldEmpty` with argument %s', (property, field) => {
            wrapper = shallowMount(Address, {
                i18n,
                store: createStore(),
                localVue,
                propsData,
                provide: () => ({
                    $v
                })
            });

            // Assert
            expect(isFieldEmptySpy).toHaveBeenCalledWith(field);
        });

        describe('isAddressPostcodeValid ::', () => {
            it.each([
                [false, true, false, false],
                [true, true, true, false],
                [false, true, false, true]
            ])('should return %s if postcode.$dirty = %s, postcode.isValidPostCode = %s and isAddressPostcodeEmpty = %s', (expected, isDirty, isValid, isEmpty) => {
                // Arrange && Act
                $v.addressValidations.postcode.$dirty = isDirty;
                $v.addressValidations.postcode.isValidPostcode = isValid;

                wrapper = shallowMount(Address, {
                    i18n,
                    store: createStore(),
                    localVue,
                    propsData,
                    provide: () => ({
                        $v
                    }),
                    computed: {
                        isAddressPostcodeEmpty: () => isEmpty
                    }
                });

                // Assert
                expect(wrapper.vm.isAddressPostcodeValid).toEqual(expected);
            });
        });
    });

    describe('methods ::', () => {
        describe('isFieldEmpty ::', () => {
            const field = 'line1';

            let wrapper;

            beforeEach(() => {
                wrapper = shallowMount(Address, {
                    i18n,
                    store: createStore(),
                    localVue,
                    propsData,
                    provide: () => ({
                        $v
                    })
                });
            });

            it('should return `false` if `field` has not been touched and input is required', () => {
                // Act
                $v.addressValidations[field].$dirty = false;
                $v.addressValidations[field].required = true;

                // Assert
                expect(wrapper.vm.isFieldEmpty(field)).toEqual(false);
            });

            it('should return `true` if `field` has been touched and input is required', () => {
                // Act
                $v.addressValidations[field].$dirty = true;
                $v.addressValidations[field].required = false;

                // Assert
                expect(wrapper.vm.isFieldEmpty(field)).toEqual(true);
            });

            it('should return `false` if `field` has been touched and input is not required`', () => {
                // Act
                $v.addressValidations[field].$dirty = true;
                $v.addressValidations[field].required = true;

                // Assert
                expect(wrapper.vm.isFieldEmpty(field)).toEqual(false);
            });
        });
    });
});

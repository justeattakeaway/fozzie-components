import Vuex from 'vuex';
import { VueI18n } from '@justeat/f-globalisation';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import Address from '../Address.vue';
import { i18n, createStore } from './helpers/setup';
import checkoutValidationsMixin from '../../mixins/validations.mixin';

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
        const isFieldEmptySpy = jest.spyOn(checkoutValidationsMixin.methods, 'isFieldEmpty');
        let wrapper;
        const component = 'address';

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

        it.each([
            ['isAddressLine1Empty', 'line1'],
            ['isAddressCityEmpty', 'city'],
            ['isAddressPostcodeEmpty', 'postcode']
        ])('%s :: should call `isFieldEmpty` with argument %s', (property, field) => {
            // Act
            // wrapper.vm[property];

            // Assert
            expect(isFieldEmptySpy).toHaveBeenCalledWith(component, field);
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
});

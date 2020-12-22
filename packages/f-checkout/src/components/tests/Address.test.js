import Vuex from 'vuex';
import { VueI18n } from '@justeat/f-globalisation';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import { CHECKOUT_METHOD_DELIVERY } from '../../constants';
import Address from '../Address.vue';
import tenantConfigs from '../../tenants';

const localVue = createLocalVue();

localVue.use(VueI18n);
localVue.use(Vuex);

const fulfilmentTimes = [
    {
        from: '2020-01-01T00:00+00:00',
        label: {
            text: 'time 1'
        },
        selected: false,
        to: '2020-01-01T00:00+00:00'
    }
];

const defaultState = {
    id: '',
    serviceType: CHECKOUT_METHOD_DELIVERY,
    customer: {
        firstName: 'John',
        mobileNumber: '+447111111111'
    },
    fulfilment: {
        times: fulfilmentTimes,
        address: {
            line1: '1 Bristol Road',
            line2: 'Flat 1',
            city: 'Bristol',
            postcode: 'BS1 1AA'
        }
    },
    notes: [],
    isFulfillable: true,
    notices: [],
    messages: []
};

const defaultActions = {
    getCheckout: jest.fn(),
    postCheckout: jest.fn()
};

const i18n = {
    locale: 'en-GB',
    messages: tenantConfigs['en-GB']
};

const createStore = (state = defaultState, actions = defaultActions) => new Vuex.Store({
    modules: {
        checkout: {
            namespaced: true,
            state,
            actions
        }
    },
    hasModule: jest.fn(() => true)
});

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

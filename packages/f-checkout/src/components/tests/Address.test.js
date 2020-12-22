import Vuex from 'vuex';
import { VueI18n } from '@justeat/f-globalisation';
import { shallowMount, createLocalVue, mount } from '@vue/test-utils';
import { CHECKOUT_METHOD_DELIVERY, CHECKOUT_METHOD_COLLECTION } from '../../constants';
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
        const wrapper = mount(Address, {
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

        describe('isAddressLine1Empty ::', () => {
            it('should call `isFieldEmpty` with argument `line1`', async () => {
                // Act
                const wrapper = mount(Address, {
                    i18n,
                    store: createStore(),
                    localVue,
                    propsData,
                    provide: () => ({
                        $v
                    })
                });

                // Assert
                expect(isFieldEmptySpy).toHaveBeenCalledWith('line1');
            });
        });

        describe('isAddressCityEmpty ::', () => {
            it('should call `isFieldEmpty` with argument `city`', async () => {
                 // Arrange & Act
                const wrapper = mount(Address, {
                    i18n,
                    store: createStore(),
                    localVue,
                    propsData,
                    provide: () => ({
                        $v
                    })
                });

                // Assert
                expect(isFieldEmptySpy).toHaveBeenCalledWith('city');
            });
        });

        describe('isAddressPostcodeEmpty ::', () => {
            it('should call `isFieldEmpty` with argument `postcode`', async () => {
                 // Arrange & Act
                const wrapper = mount(Address, {
                    i18n,
                    store: createStore(),
                    localVue,
                    propsData,
                    provide: () => ({
                        $v
                    })
                });

                // Assert
                expect(isFieldEmptySpy).toHaveBeenCalledWith('postcode');
            });
        });

        describe('isAddressPostcodeValid ::', () => {
            it('should return false if postcode field has been touched, is not Valid and is not empty', async () => {
                // Arrange && Act
                $v.addressValidations.postcode.$dirty = true
                $v.addressValidations.postcode.isValidPostcode = false;

                const wrapper = mount(Address, {
                    i18n,
                    store: createStore(),
                    localVue,
                    propsData,
                    provide: () => ({
                        $v
                    }),
                    computed: {
                        isAddressPostcodeEmpty () {
                            return false
                        }
                    }
                });

                // Assert
                expect(wrapper.vm.isAddressPostcodeValid).toEqual(false);
            });

            it('should return true if postcode field has been touched, is Valid and is not empty', async () => {
                // Arrange && Act
                $v.addressValidations.postcode.$dirty = true
                $v.addressValidations.postcode.isValidPostcode = true;

                const wrapper = mount(Address, {
                    i18n,
                    store: createStore(),
                    localVue,
                    propsData,
                    provide: () => ({
                        $v
                    }),
                    computed: {
                        isAddressPostcodeEmpty () {
                            return false
                        }
                    }
                });

                // Assert
                expect(wrapper.vm.isAddressPostcodeValid).toEqual(true);
            });

            it('should return false if postcode field has been touched, is not Valid and is empty', async () => {
                // Arrange && Act
                $v.addressValidations.postcode.$dirty = true
                $v.addressValidations.postcode.isValidPostcode = false;

                const wrapper = mount(Address, {
                    i18n,
                    store: createStore(),
                    localVue,
                    propsData,
                    provide: () => ({
                        $v
                    }),
                    computed: {
                        isAddressPostcodeEmpty () {
                            return true
                        }
                    }
                });

                // Assert
                expect(wrapper.vm.isAddressPostcodeValid).toEqual(false);
            });
        });
    });

    describe('methods ::', () => {
        describe('isFieldEmpty ::', () => {
            const field = 'line1';

            const wrapper = mount(Address, {
                i18n,
                store: createStore(),
                localVue,
                propsData,
                provide: () => ({
                    $v
                })
            });

            it('should return `false` if `field` has not been touched and input is required', async () => {
                // Act
                $v.addressValidations[field].$dirty = false;
                $v.addressValidations[field].required = true;

                // Assert
                expect(wrapper.vm.isFieldEmpty('line1')).toEqual(false);
            });

            it('should return `true` if `field` has been touched and input is required', async () => {
                // Act
                $v.addressValidations[field].$dirty = true;
                $v.addressValidations[field].required = false;

                // Assert
                expect(wrapper.vm.isFieldEmpty('line1')).toEqual(true);
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

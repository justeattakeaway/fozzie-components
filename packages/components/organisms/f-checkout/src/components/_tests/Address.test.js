import Vuex from 'vuex';
import { VueI18n } from '@justeat/f-globalisation';
import { shallowMount, createLocalVue, mount } from '@vue/test-utils';
import Address from '../Address.vue';
import { i18n, createStore } from './helpers/setup';
import checkoutValidationsMixin from '../../mixins/validations.mixin';
import { VALIDATIONS } from '../../constants';

const localVue = createLocalVue();

localVue.use(VueI18n);
localVue.use(Vuex);

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
        administrativeArea: {
            $dirty: false,
            required: true
        },
        postcode: {
            $dirty: false,
            required: true,
            isValidPostcode: false
        }
    }
};

describe('Address', () => {
    const propsData = {
        shouldShowAdministrativeArea: true
    };

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
        const type = VALIDATIONS.address;

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

        afterEach(() => {
            jest.clearAllMocks();
        });

        it.each([
            ['isAddressLine1Empty', 'line1'],
            ['isAddressLocalityEmpty', 'locality'],
            ['isAddressAdministrativeAreaEmpty', 'administrativeArea'],
            ['isAddressPostcodeEmpty', 'postcode']
        ])('%s :: should call `isFieldEmpty` with argument %s', (property, field) => {
            // Assert
            expect(isFieldEmptySpy).toHaveBeenCalledWith(type, field);
        });

        describe('isAddressPostcodeValid ::', () => {
            it.each([
                [false, true, false, false],
                [true, true, true, false],
                [false, true, false, true]
            ])('should return %s if postcode.$dirty = %s, postcode.isValidPostCode = %s and isAddressPostcodeEmpty = %s', (expected, isDirty, isValid, isEmpty) => {
                // Arrange && Act
                $v[VALIDATIONS.address].postcode.$dirty = isDirty;
                $v[VALIDATIONS.address].postcode.isValidPostcode = isValid;

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
        describe('updateAddressDetails ::', () => {
            let wrapper;
            let updateAddressDetailsSpy;

            beforeEach(() => {
                updateAddressDetailsSpy = jest.spyOn(Address.methods, 'updateAddressDetails');

                wrapper = mount(Address, {
                    store: createStore(),
                    i18n,
                    localVue,
                    propsData,
                    provide: () => ({
                        $v
                    })
                });
            });

            afterEach(() => {
                jest.clearAllMocks();
            });

            it('should be called with new input value when called on address field 1', async () => {
                // Arrange
                const newLine1Value = 'New Street';

                // Act
                await wrapper.find('[data-test-id="formfield-address-line-1-input"]').setValue(newLine1Value);
                await wrapper.vm.$nextTick();

                // Assert
                expect(updateAddressDetailsSpy).toHaveBeenCalledWith({ line1: newLine1Value });
            });

            it('should be called with new input value when called on address field 2', async () => {
                // Arrange
                const newLine2Value = 'New Street';

                // Act
                await wrapper.find('[data-test-id="formfield-address-line-2-input"]').setValue(newLine2Value);
                await wrapper.vm.$nextTick();

                // Assert
                expect(updateAddressDetailsSpy).toHaveBeenCalledWith({ line2: newLine2Value });
            });

            it('should be called with new input value when called on address locality field', async () => {
                // Arrange
                const newLocalityValue = 'New Locality';

                // Act
                await wrapper.find('[data-test-id="formfield-address-locality-input"]').setValue(newLocalityValue);
                await wrapper.vm.$nextTick();

                // Assert
                expect(updateAddressDetailsSpy).toHaveBeenCalledWith({ locality: newLocalityValue });
            });

            it('should be called with new input value when called on address postcode field', async () => {
                // Arrange
                const newPostcodeValue = 'New Postcode';

                // Act
                await wrapper.find('[data-test-id="formfield-address-postcode-input"]').setValue(newPostcodeValue);
                await wrapper.vm.$nextTick();

                // Assert
                expect(updateAddressDetailsSpy).toHaveBeenCalledWith({ postcode: newPostcodeValue });
            });
        });
    });
});

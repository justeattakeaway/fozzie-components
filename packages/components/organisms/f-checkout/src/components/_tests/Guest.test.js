import Vuex from 'vuex';
import { VueI18n } from '@justeat/f-globalisation';
import { shallowMount, createLocalVue, mount } from '@vue/test-utils';
import Guest from '../Guest.vue';
import { i18n, createStore } from './helpers/setup';
import checkoutValidationsMixin from '../../mixins/validations.mixin';
import { VALIDATIONS } from '../../constants';

const localVue = createLocalVue();

localVue.use(VueI18n);
localVue.use(Vuex);

const $v = {
    [VALIDATIONS.guest]: {
        firstName: {
            $dirty: false
        },
        lastName: {
            $dirty: false
        },
        email: {
            $dirty: false,
            email: false
        }
    }
};

describe('Guest', () => {
    const propsData = {};

    it('should be defined', () => {
        // Arrange
        const wrapper = shallowMount(Guest, {
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
        const type = VALIDATIONS.guest;

        let wrapper;

        beforeEach(() => {
            wrapper = mount(Guest, {
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
            ['isFirstNameEmpty', 'firstName'],
            ['isLastNameEmpty', 'lastName'],
            ['isEmailValid', 'email']
        ])('%s :: should call `isFieldEmpty` with argument %s', (property, field) => {
            // Assert
            expect(isFieldEmptySpy).toHaveBeenCalledWith(type, field);
        });

        describe('isEmailValid ::', () => {
            it.each([
                [false, true, true, true],
                [true, true, true, false],
                [true, true, false, false],
                [true, false, false, false],
                [false, false, false, true],
                [false, false, true, true],
                [false, true, false, true],
                [false, false, true, false]
            ])('should return %s if `email.email` = %s or `$dirty` = %s and `isFieldEmpty` = %s for email field', (expected, email, dirty, isEmpty) => {
                // Arrange
                $v[VALIDATIONS.guest].email.email = email;
                $v[VALIDATIONS.guest].email.$dirty = dirty;
                isFieldEmptySpy.mockReturnValue(isEmpty);

                // Act
                wrapper = shallowMount(Guest, {
                    i18n,
                    store: createStore(),
                    localVue,
                    propsData,
                    provide: () => ({
                        $v
                    })
                });

                // Assert
                expect(wrapper.vm.isEmailValid).toEqual(expected);
            });
        });
    });

    describe('methods ::', () => {
        describe('updateCustomerDetails ::', () => {
            let wrapper;
            let updateCustomerDetailsSpy;

            beforeEach(() => {
                updateCustomerDetailsSpy = jest.spyOn(Guest.methods, 'updateCustomerDetails');

                wrapper = mount(Guest, {
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

            it('should be called with new input value when called on firstName field', async () => {
                // Arrange
                const newFirstNameValue = 'John';

                // Act
                await wrapper.find('[data-test-id="formfield-guest-first-name-input"]').setValue(newFirstNameValue);
                await wrapper.vm.$nextTick();

                // Assert
                expect(updateCustomerDetailsSpy).toHaveBeenCalledWith({ firstName: newFirstNameValue });
            });

            it('should be called with new input value when called on lastName field', async () => {
                // Arrange
                const newLastNameValue = 'Johnson';

                // Act
                await wrapper.find('[data-test-id="formfield-guest-last-name-input"]').setValue(newLastNameValue);
                await wrapper.vm.$nextTick();

                // Assert
                expect(updateCustomerDetailsSpy).toHaveBeenCalledWith({ lastName: newLastNameValue });
            });

            it('should be called with new input value when called on guest email field', async () => {
                // Arrange
                const newEmailValue = 'test@test.com';

                // Act
                await wrapper.find('[data-test-id="formfield-guest-email-input"]').setValue(newEmailValue);
                await wrapper.vm.$nextTick();

                // Assert
                expect(updateCustomerDetailsSpy).toHaveBeenCalledWith({ email: newEmailValue });
            });
        });
    });
});

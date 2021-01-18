import Vuex from 'vuex';
import { VueI18n } from '@justeat/f-globalisation';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import Guest from '../Guest.vue';
import { i18n, createStore } from './helpers/setup';
import checkoutValidationsMixin from '../../mixins/validations.mixin';

const localVue = createLocalVue();

localVue.use(VueI18n);
localVue.use(Vuex);

const $v = {
    guestValidations: {
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
    allure.feature('Checkout-Guest');

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
        const component = 'guest';

        let wrapper;

        beforeEach(() => {
            wrapper = shallowMount(Guest, {
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
            // Act
            wrapper.vm[property];

            // Assert
            expect(isFieldEmptySpy).toHaveBeenCalledWith(component, field);
        });

        describe('isEmailValid ::', () => {
            it.each([
                [true, true, false],
                [false, true, true],
                [false, false, false],
                [false, false, true]
            ])('should return %s if email.email = %s and `isFieldEmpty` returns %s for email field', (expected, email, isEmpty) => {
                // Arrange
                $v.guestValidations.email.email = email;
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
});

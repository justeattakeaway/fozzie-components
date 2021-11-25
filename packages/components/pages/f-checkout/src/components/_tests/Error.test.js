import { VueI18n } from '@justeat/f-globalisation';
import { mount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import Error from '../Error.vue';
import {
    i18n,
    $cookies,
    $logger,
    createStore,
    defaultCheckoutState
} from './helpers/setup';
import { CHECKOUT_ERROR_FORM_TYPE } from '../../constants';

const localVue = createLocalVue();

localVue.use(VueI18n);
localVue.use(Vuex);

describe('Error', () => {
    let wrapper;

    beforeEach(() => {
        // Arrange & Act

        wrapper = mount(Error, {
            i18n,
            localVue,
            store: createStore({
                ...defaultCheckoutState,
                restaurant: {
                    id: '301389'
                }
            }),
            propsData: {
                errorFormType: CHECKOUT_ERROR_FORM_TYPE.default,
                redirectUrl: 'menu-jason-1',
                serviceType: 'delivery'
            },
            mocks: {
                $cookies,
                $logger
            }
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });


    it('should be defined', () => {
        // Assert
        expect(wrapper.exists()).toBe(true);
    });

    it('should show the heading', () => {
        // Act
        const heading = wrapper.find('[data-test-id="cardWithContent-heading"]');

        // Assert
        expect(heading.text()).toMatchSnapshot();
    });

    it('should show the description', () => {
        // Act
        const description = wrapper.find('[data-test-id="cardWithContent-description"]');

        // Assert
        expect(description.text()).toMatchSnapshot();
    });

    describe('methods', () => {
        describe('`redirectFromErrorPage` ::', () => {
            const oldWindowLocation = window.location;

            beforeAll(() => {
                delete window.location;

                window.location = Object.defineProperties(
                    {},
                    {
                        ...Object.getOwnPropertyDescriptors(oldWindowLocation),
                        assign: {
                            configurable: true,
                            value: jest.fn()
                        }
                    }
                );
            });

            afterAll(() => {
                window.location = oldWindowLocation;
            });

            describe('when invoked', () => {
                it('should redirect the customer from the error page to the url specified in `redirectUrl` prop', () => {
                    // Act
                    wrapper.vm.redirectFromErrorPage();

                    // Assert
                    expect(window.location.assign).toHaveBeenCalledWith(wrapper.vm.redirectUrl);
                });
                describe('AND errorFormType is accessForbiddenError', () => {
                    beforeEach(async () => {
                        await wrapper.setProps({ errorFormType: CHECKOUT_ERROR_FORM_TYPE.accessForbidden });
                    });
                    describe('AND a menu basket cookie does not exist', () => {
                        it('should not delete the cookie', () => {
                            // Arrange
                            const cookieRemoveSpy = jest.spyOn(wrapper.vm.$cookies, 'remove');

                            // Act
                            wrapper.vm.redirectFromErrorPage();

                            // Assert
                            expect(cookieRemoveSpy).not.toHaveBeenCalled();
                        });
                    });

                    describe('AND a menu basket cookie already exists', () => {
                        it('should delete the cookie', () => {
                            // Arrange
                            jest.spyOn(wrapper.vm.$cookies, 'get').mockReturnValue(() => 'je-mw-basket');
                            const cookieRemoveSpy = jest.spyOn(wrapper.vm.$cookies, 'remove');

                            // Act
                            wrapper.vm.redirectFromErrorPage();

                            // Assert
                            expect(cookieRemoveSpy).toHaveBeenCalledWith('je-mw-basket-301389');
                        });
                    });
                });
            });
        });
    });
});

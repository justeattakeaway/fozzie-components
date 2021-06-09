import { shallowMount, mount } from '@vue/test-utils';
import FButton from '../Button.vue';

describe('Button', () => {
    const actionType = 'button';
    const link = 'http://www.just-eat.co.uk';

    it('should be defined', () => {
        const propsData = { };
        const wrapper = shallowMount(FButton, { propsData });
        expect(wrapper.exists()).toBe(true);
    });

    describe('template :: ', () => {
        describe('component :: ', () => {
            describe('`aria-live` :: ', () => {
                it('should be set using the `getAriaLive` computed property', () => {
                    // Arrange & Act
                    const wrapper = shallowMount(FButton, {
                        computed: {
                            getAriaLive () {
                                return 'ariaLiveTest';
                            }
                        }
                    });

                    const button = wrapper.find('[data-test-id="action-button-component"]');

                    // Assert
                    expect(button.attributes('aria-live')).toMatchSnapshot();
                });
            });

            describe('`aria-busy` :: ', () => {
                describe('when `isLoading` is `true` :: ', () => {
                    it('should be `true`', () => {
                        // Arrange
                        const propsData = {
                            isLoading: true
                        };

                        // Act
                        const wrapper = shallowMount(FButton, { propsData });

                        const button = wrapper.find('[data-test-id="action-button-component"]');

                        // Assert
                        expect(button.attributes('aria-busy')).toBeTruthy();
                    });
                });

                describe('when `isLoading` is `false` :: ', () => {
                    it('should be `false`', () => {
                        // Arrange
                        const propsData = {
                            isLoading: false
                        };

                        // Act
                        const wrapper = shallowMount(FButton, { propsData });

                        const button = wrapper.find('[data-test-id="action-button-component"]');

                        // Assert
                        expect(button.attributes('aria-busy')).toBeFalsy();
                    });
                });
            });

            describe('events :: ', () => {
                afterEach(() => {
                    jest.clearAllMocks();
                });

                describe('click :: ', () => {
                    describe('when `isLoading` is `true` :: ', () => {
                        it('should not be triggered', () => {
                            // Arrange
                            const propsData = {
                                isLoading: true
                            };

                            const onClick = jest.fn();
                            const wrapper = mount(FButton, { listeners: { click: onClick }, propsData });
                            const button = wrapper.find('[data-test-id="action-button-component"]');

                            // Act
                            button.trigger('click');

                            // Assert
                            expect(onClick).not.toHaveBeenCalled();
                        });
                    });

                    describe('when `isLoading` is `false` :: ', () => {
                        it('should be triggered', () => {
                            // Arrange
                            const propsData = {
                                isLoading: false
                            };

                            const onClick = jest.fn();
                            const wrapper = mount(FButton, { listeners: { click: onClick }, propsData });
                            const button = wrapper.find('[data-test-id="action-button-component"]');

                            // Act
                            button.trigger('click');

                            // Assert
                            expect(onClick).toHaveBeenCalled();
                        });
                    });
                });
            });
        });
    });

    describe('computed :: ', () => {
        describe('buttonSizeClassname :: ', () => {
            it('should capitalise to first letter of `buttonSize` prop :: ', () => {
                // Arrange
                const propsData = {
                    buttonSize: 'medium',
                    actionType
                };

                // Act
                const wrapper = shallowMount(FButton, { propsData });

                // Assert
                expect(wrapper.vm.buttonSizeClassname).toEqual('Medium');
            });

            it('should capitalise to first two letters of `buttonSize` prop if `xsmall` :: ', () => {
                // Arrange
                const propsData = {
                    buttonSize: 'xsmall',
                    actionType
                };

                // Act
                const wrapper = shallowMount(FButton, { propsData });

                // Assert
                expect(wrapper.vm.buttonSizeClassname).toEqual('XSmall');
            });
        });

        describe('componentType :: ', () => {
            let propsData;

            describe('when `href` prop is empty :: ', () => {
                beforeEach(() => {
                    propsData = {
                        href: null,
                        actionType
                    };
                });

                it('should return `componentType` of `action-button`', () => {
                    // Act
                    const wrapper = shallowMount(FButton, { propsData });

                    // Assert
                    expect(wrapper.vm.componentType).toEqual('action-button');
                });

                it('should render `Action` component', () => {
                    // Act
                    const wrapper = mount(FButton, { propsData });

                    // Assert
                    expect(wrapper.find('[data-test-id="action-button-component"]').exists()).toBeTruthy();
                });
            });

            describe('when `href` prop is not an empty string :: ', () => {
                beforeEach(() => {
                    propsData = { href: link };
                });

                it('should return `componentType` of `link-button`', () => {
                    // Act
                    const wrapper = shallowMount(FButton, { propsData });

                    // Assert
                    expect(wrapper.vm.componentType).toEqual('link-button');
                });

                it('should render `Link` component', () => {
                    // Act
                    const wrapper = mount(FButton, { propsData });

                    // Assert
                    expect(wrapper.find('[data-test-id="link-button-component"]').exists()).toBeTruthy();
                });

                it('should apply `href` attribute', () => {
                    // Act
                    const wrapper = mount(FButton, { propsData });

                    // Assert
                    expect(wrapper.attributes('href')).toEqual(link);
                });
            });
        });

        describe('buttonActionType :: ', () => {
            describe('when `href` prop is empty :: ', () => {
                it('should add `type` attribute', () => {
                    // Arrange
                    const propsData = {
                        href: null,
                        actionType
                    };

                    // Act
                    const wrapper = mount(FButton, { propsData });

                    // Assert
                    expect(wrapper.attributes('type')).toEqual(actionType);
                });
            });

            describe('when `href` prop is not an empty string :: ', () => {
                it('should not add `type` attribute', () => {
                    // Arrange
                    const propsData = {
                        href: link,
                        actionType
                    };

                    // Act
                    const wrapper = mount(FButton, { propsData });

                    // Assert
                    expect(wrapper.attributes('type')).toBeUndefined();
                });
            });
        });

        describe('getAriaLive :: ', () => {
            describe('when `isLoading` prop is `true` :: ', () => {
                it('should return "polite"', () => {
                    // Arrange
                    const propsData = {
                        isLoading: true
                    };

                    // Act
                    const wrapper = shallowMount(FButton, { propsData });

                    // Assert
                    expect(wrapper.vm.getAriaLive).toEqual('polite');
                });
            });

            describe('when `isLoading` prop is `false` :: ', () => {
                it('should return "off"', () => {
                    // Arrange
                    const propsData = {
                        isLoading: false
                    };

                    // Act
                    const wrapper = shallowMount(FButton, { propsData });

                    // Assert
                    expect(wrapper.vm.getAriaLive).toEqual('off');
                });
            });
        });
    });
});

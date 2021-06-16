import { shallowMount, mount } from '@vue/test-utils';
import FButton from '../Button.vue';

describe('Button', () => {
    const actionType = 'button';

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

            describe('when `href` and `to` props are empty :: ', () => {
                beforeEach(() => {
                    propsData = {
                        href: null,
                        to: null,
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

            describe.each([
                ['to', '/test', 'router-link'],
                ['href', 'http://www.just-eat.co.uk', 'link-button']
            ])('when %s prop is not an empty string :: ', (prop, value, componentType) => {
                beforeEach(() => {
                    propsData = { [prop]: value };
                });

                it(`should return componentType of ${componentType}`, () => {
                    // Act
                    const wrapper = shallowMount(FButton, {
                        propsData,
                        stubs: [componentType === 'router-link' ? componentType : '']
                    });
                    // Assert
                    expect(wrapper.vm.componentType).toEqual(componentType);
                });

                it('should render correct component', () => {
                    // Act
                    const wrapper = mount(FButton, {
                        propsData,
                        stubs: [componentType === 'router-link' ? componentType : '']
                    });
                    // Assert
                    expect(wrapper.find(`[data-test-id=${componentType}-component]`).exists()).toBeTruthy();
                });

                it(`should apply correct ${prop} value`, () => {
                    // Act
                    const wrapper = mount(FButton, {
                        propsData,
                        stubs: [componentType === 'router-link' ? componentType : '']
                    });
                    // Assert
                    expect(wrapper.attributes(prop)).toEqual(value);
                });

                it('should not add `type` or `action-type` attribute', () => {
                    // Act
                    const wrapper = mount(FButton, {
                        propsData,
                        stubs: [componentType === 'router-link' ? componentType : '']
                    });
                    // Assert
                    expect(wrapper.attributes('type')).toBeUndefined();
                    expect(wrapper.attributes('action-type')).toBeUndefined();
                });
            });
        });

        describe('buttonActionType :: ', () => {
            describe.each([
                ['to'],
                ['href']
            ])('when %s prop is empty :: ', () => {
                it('should add `type` attribute', () => {
                    // Arrange
                    const propsData = {
                        href: null,
                        to: null,
                        actionType
                    };

                    // Act
                    const wrapper = mount(FButton, { propsData });

                    // Assert
                    expect(wrapper.attributes('type')).toEqual(actionType);
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

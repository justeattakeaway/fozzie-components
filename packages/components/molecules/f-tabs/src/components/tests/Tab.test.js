import { shallowMount } from '@vue/test-utils';
import Tab from '../Tab.vue';

const REGISTER_DATA = {
    name: '__TAB_NAME__',
    title: '__TAB_TITLE__',
    selected: true
};

describe('Tab.vue', () => {
    let wrapper;

    beforeEach(() => {
        // Arrange
        wrapper = shallowMount(Tab, {
            propsData: {
                name: REGISTER_DATA.name,
                title: REGISTER_DATA.title,
                selected: REGISTER_DATA.selected
            },
            provide: {
                register: jest.fn(),
                tabsComponent: {
                    activeTab: REGISTER_DATA.name,
                    animationDirection: 'LEFT',
                    animate: true
                }
            }
        });
    });

    it('should be defined', () => {
        // Assert
        expect(wrapper.exists()).toBe(true);
    });

    it('should call the register callback method when created', () => {
        // Assert
        expect(wrapper.vm.register).toHaveBeenCalled();
    });

    it('should supply the correct object to the callback method', () => {
        // Assert
        expect(wrapper.vm.register).toHaveBeenCalledWith(REGISTER_DATA);
    });

    it('should show only if isActive is true', () => {
        // Arrange
        const isActiveWrapper = shallowMount(Tab, {
            propsData: {
                name: REGISTER_DATA.name,
                title: REGISTER_DATA.title,
                selected: false
            },
            provide: {
                register: jest.fn(),
                tabsComponent: {
                    activeTab: '',
                    animationDirection: 'LEFT',
                    animate: true
                }
            },
            mocks: {
                $style: {
                    'c-tab': 'c-tab'
                }
            }
        });

        // Act
        const tab = isActiveWrapper.find('.c-tab');

        // Assert
        expect(tab.isVisible()).toBe(false);
    });

    describe('Animation', () => {
        it('should only create transition element when animateTab is true', () => {
            // Act
            const tabTransition = wrapper.find(`[data-test-id="tab-content-${wrapper.vm.name}"]`);
            const tabNormal = wrapper.find(`[data-test-id="no-transition-tab-${wrapper.vm.name}"]`);

            // Assert
            expect(tabTransition.exists()).toBe(true);
            expect(tabNormal.exists()).toBe(false);
        });

        it('should apply the fade-in-right class when animationDirection is LEFT', () => {
            // Arrange
            const leftWrapper = shallowMount(Tab, {
                propsData: {
                    name: REGISTER_DATA.name,
                    title: REGISTER_DATA.title,
                    selected: REGISTER_DATA.selected
                },
                provide: {
                    register: jest.fn(),
                    tabsComponent: {
                        activeTab: '',
                        animationDirection: 'LEFT',
                        animate: true
                    }
                }
            });

            // Assert
            expect(leftWrapper.vm.transitionName).toEqual('fade-in-right');
        });

        it('should apply the fade-in-left class when animationDirection is RIGHT', () => {
            // Arrange
            const rightWrapper = shallowMount(Tab, {
                propsData: {
                    name: REGISTER_DATA.name,
                    title: REGISTER_DATA.title,
                    selected: REGISTER_DATA.selected
                },
                provide: {
                    register: jest.fn(),
                    tabsComponent: {
                        activeTab: '',
                        animationDirection: 'RIGHT',
                        animate: true
                    }
                }
            });

            // Assert
            expect(rightWrapper.vm.transitionName).toEqual('fade-in-left');
        });
    });
});

import { shallowMount } from '@vue/test-utils';
import Tab from '../Tab.vue';
import { INJECTIONS } from '../../constants';

const {
    REGISTER,
    SELECT,
    TABS_COMPONENT
} = INJECTIONS;

const REGISTER_DATA = {
    name: '__TAB_NAME__',
    title: '__TAB_TITLE__',
    selected: true
};

describe('Tab.vue', () => {
    let activeWrapper;

    function defineActiveCompoment () {
        activeWrapper = shallowMount(Tab, {
            propsData: {
                name: REGISTER_DATA.name,
                title: REGISTER_DATA.title,
                selected: true
            },
            provide: {
                [REGISTER]: jest.fn(),
                [SELECT]: jest.fn(),
                [TABS_COMPONENT]: {
                    activeTab: REGISTER_DATA.name,
                    animationDirection: 'LEFT',
                    animate: true
                }
            }
        });
    }

    it('should be defined', () => {
        // Arrange & Act
        defineActiveCompoment();

        // Assert
        expect(activeWrapper.exists()).toBe(true);
    });

    describe('when active', () => {
        beforeEach(() => {
            // Arrange & Act
            defineActiveCompoment();
        });

        it('should call the register callback method when created', () => {
            // Assert
            expect(activeWrapper.vm[REGISTER]).toHaveBeenCalled();
        });

        it('should supply the correct object to the callback method', () => {
            // Assert
            expect(activeWrapper.vm[REGISTER]).toHaveBeenCalledWith(REGISTER_DATA);
        });

        it('should show', () => {
            // Assert
            const tab = activeWrapper.find('.c-tab');
            expect(tab.isVisible()).toBe(true);
        });
    });

    describe('when inactive', () => {
        let inactiveWrapper;

        beforeEach(() => {
            // Arrange & Act
            inactiveWrapper = shallowMount(Tab, {
                propsData: {
                    name: REGISTER_DATA.name,
                    title: REGISTER_DATA.title,
                    selected: false
                },
                provide: {
                    [REGISTER]: jest.fn(),
                    [SELECT]: jest.fn(),
                    [TABS_COMPONENT]: {
                        activeTab: '',
                        animationDirection: 'LEFT',
                        animate: true
                    }
                }
            });
        });

        it('should not show', () => {
            // Assert
            const tab = inactiveWrapper.find('.c-tab');
            expect(tab.isVisible()).toBe(false);
        });

        it('should call the select callback when becoming active via selected prop', async () => {
            // Act
            await inactiveWrapper.setProps({ selected: true });

            // Assert
            expect(inactiveWrapper.vm[SELECT]).toHaveBeenCalled();
        });
    });

    describe('Animation', () => {
        it('should only create transition element when animateTab is true', () => {
            // Act
            const tabTransition = activeWrapper.find(`[data-test-id="tab-content-${activeWrapper.vm.name}"]`);
            const tabNormal = activeWrapper.find(`[data-test-id="no-transition-tab-${activeWrapper.vm.name}"]`);

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
                    [REGISTER]: jest.fn(),
                    [SELECT]: jest.fn(),
                    [TABS_COMPONENT]: {
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
                    [REGISTER]: jest.fn(),
                    [SELECT]: jest.fn(),
                    [TABS_COMPONENT]: {
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

import { shallowMount } from '@vue/test-utils';
import { windowServices } from '@justeat/f-services';
import LinkList from '../LinkList.vue';

const propsData = {
    linkList: {
        title: 'Customer service',
        links: [
            {
                url: '/contact',
                text: 'Contact us'
            }
        ]
    }
};

describe('LinkList component', () => {
    allure.feature('Link List');
    it('should be defined', () => {
        // Arrange
        const wrapper = shallowMount(LinkList, {
            propsData
        });

        // Assert
        expect(wrapper.exists()).toBe(true);
    });

    describe('`computed` ::', () => {
        describe('`isBelowWide` ::', () => {
            it.each([
                [true, 500],
                [true, 1024],
                [false, 1200]
            ])('Should return %s if `currentScreenWidth` is $s', (expected, width) => {
                // Arrange
                const wrapper = shallowMount(LinkList, {
                    propsData
                });

                wrapper.vm.currentScreenWidth = width;

                // Assert
                expect(wrapper.vm.isBelowWide).toEqual(expected);
            });
        });
    });

    describe('`methods` ::', () => {
        describe('`setPanelCollapsed` ::', () => {
            it.each([
                [true, 500, null],
                [true, 500, true],
                [false, 500, false],
                [false, 1200, false]
            ])('Should set `panelCollapsed` to %s if `currentScreenWidth` is %s AND `interactedState` is $s', (expected, width, interactedState) => {
                // Arrange
                const wrapper = shallowMount(LinkList, {
                    propsData
                });

                wrapper.vm.currentScreenWidth = width;
                wrapper.vm.interactedState = interactedState;

                // Act
                wrapper.vm.setPanelCollapsed();

                // Assert
                expect(wrapper.vm.panelCollapsed).toEqual(expected);
            });
        });

        describe('`onPanelClick` ::', () => {
            let setPanelCollapsedSpy;

            describe('when `isBelowWide` is `true`', () => {
                let wrapper;

                beforeEach(() => {
                    wrapper = shallowMount(LinkList, {
                        propsData,
                        computed: {
                            isBelowWide: {
                                get () {
                                    return true;
                                }
                            }
                        }
                    });

                    setPanelCollapsedSpy = jest.spyOn(wrapper.vm, 'setPanelCollapsed');
                });

                afterEach(() => {
                    jest.clearAllMocks();
                });

                it('Should set `interactedState` correctly and call `setPanelCollapsed`', () => {
                    // Arrange
                    wrapper.vm.panelCollapsed = true;

                    // Act
                    wrapper.vm.onPanelClick();

                    // Assert
                    expect(wrapper.vm.interactedState).toEqual(false);
                    expect(setPanelCollapsedSpy).toHaveBeenCalled();
                });
            });

            describe('when `isBelowWide` is `false`', () => {
                let wrapper;

                beforeEach(() => {
                    wrapper = shallowMount(LinkList, {
                        propsData,
                        computed: {
                            isBelowWide: {
                                get () {
                                    return false;
                                }
                            }
                        }
                    });

                    setPanelCollapsedSpy = jest.spyOn(wrapper.vm, 'setPanelCollapsed');
                });

                afterEach(() => {
                    jest.clearAllMocks();
                });

                it('Should not call `setPanelCollapsed`', () => {
                    // Act
                    wrapper.vm.onPanelClick();

                    // Assert
                    expect(setPanelCollapsedSpy).not.toHaveBeenCalled();
                });
            });
        });

        describe('`onResize` ::', () => {
            const width = 500;
            let setPanelCollapsedSpy;
            let wrapper;

            beforeEach(() => {
                wrapper = shallowMount(LinkList, {
                    propsData
                });

                jest.spyOn(windowServices, 'getWindowWidth').mockReturnValue(width);
                setPanelCollapsedSpy = jest.spyOn(wrapper.vm, 'setPanelCollapsed');
            });

            afterEach(() => {
                jest.clearAllMocks();
            });

            it('should set `currentScreenWidth` to screenWidth', () => {
                // Arrange
                wrapper.vm.currentScreenWidth = 0;

                // Act
                wrapper.vm.onResize();

                // Assert
                expect(wrapper.vm.currentScreenWidth).toEqual(width);
                expect(setPanelCollapsedSpy).toHaveBeenCalled();
            });

            it('should not set `currentScreenWidth` if it is the same as the screenWidth', () => {
                // Arrange
                wrapper.vm.currentScreenWidth = width;

                // Act
                wrapper.vm.onResize();

                // Assert
                expect(setPanelCollapsedSpy).not.toHaveBeenCalled();
            });
        });
    });
});

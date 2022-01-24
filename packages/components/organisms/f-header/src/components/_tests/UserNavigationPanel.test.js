import { mount } from '@vue/test-utils';
import UserNavigationPanel from '../UserNavigationPanel.vue';

let wrapper;

const copy = {
    navLinks: [{
        text: 'Link 1',
        url: '/test',
        gtm: 'some-property'
    }],
    accountLogout: {
        gtm: 'logout'
    }
};

describe('UserNavigationPanel', () => {
    describe('computed ::', () => {
        describe('tabIndex', () => {
            describe('(mobile)', () => {
                it('should be -1 if nav is closed', () => {
                    // Arrange & Act
                    wrapper = mount(UserNavigationPanel, {
                        propsData: {
                            copy,
                            isBelowMid: true,
                            isNavOpen: false
                        }
                    });

                    // Assert
                    expect(wrapper.vm.tabIndex).toBe(-1);
                });

                it('should be 0 if nav is open and country selector is closed', () => {
                    // Arrange & Act
                    wrapper = mount(UserNavigationPanel, {
                        propsData: {
                            copy,
                            isBelowMid: true,
                            isNavOpen: true,
                            isCountrySelectorOpen: false
                        }
                    });

                    // Assert
                    expect(wrapper.vm.tabIndex).toBe(0);
                });

                it('should be -1 if nav is open and country selector is open', () => {
                    // Arrange & Act
                    wrapper = mount(UserNavigationPanel, {
                        propsData: {
                            copy,
                            isBelowMid: true,
                            isNavOpen: true,
                            isCountrySelectorOpen: true
                        }
                    });

                    // Assert
                    expect(wrapper.vm.tabIndex).toBe(-1);
                });
            });

            describe('(desktop)', () => {
                it('should be -1 if user menu is closed', () => {
                    // Arrange & Act
                    wrapper = mount(UserNavigationPanel, {
                        propsData: {
                            copy,
                            isBelowMid: false,
                            isUserMenuOpen: false
                        }
                    });

                    // Assert
                    expect(wrapper.vm.tabIndex).toBe(-1);
                });

                it('should be 0 if user menu is open', () => {
                    // Arrange & Act
                    wrapper = mount(UserNavigationPanel, {
                        propsData: {
                            copy,
                            isBelowMid: false,
                            isUserMenuOpen: true
                        }
                    });

                    // Assert
                    expect(wrapper.vm.tabIndex).toBe(0);
                });
            });
        });
    });
});

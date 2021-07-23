import { shallowMount } from '@vue/test-utils';
import Vue from 'vue';
import Tabs from '../Tabs.vue';
import { DIRECTION, INJECTIONS } from '../../constants';

const {
    REGISTER,
    SELECT,
    TABS_COMPONENT,
    UPDATE_TITLE
} = INJECTIONS;

const registeredTabsMock = [
    {
        name: '__TEST_TAB_1__',
        title: '__TEST_TAB_1_TITLE__',
        selected: true
    },
    {
        name: '__TEST_TAB_2__',
        title: '__TEST_TAB_2_TITLE__',
        selected: false
    }
];

describe('Tabs', () => {
    const Tab = Vue.extend({
        name: 'Tab',
        template: '<div data-tab="true"></div>',
        inject: [
            REGISTER,
            SELECT,
            TABS_COMPONENT,
            UPDATE_TITLE
        ]
    });

    const arrange = ({ mocks } = {}) => {
        const tabsInstance = shallowMount(Tabs, {
            // default mounting settings
            propsData: {},
            stubs: {
                Tab
            },
            scopedSlots: {
                default: '<tab/>'
            },
            // mounting settings from parameters
            mocks
        });

        const tabStub = tabsInstance.findComponent(Tab);

        return { tabsInstance, tabStub };
    };

    it('should be defined', () => {
        const { tabsInstance } = arrange();
        expect(tabsInstance.exists()).toBe(true);
    });

    describe('when mounting descendants', () => {
        let tabsInstance,
            tabStub;

        beforeEach(() => {
            ({ tabsInstance, tabStub } = arrange());
        });

        it(`should provide a "${REGISTER}" callback`, () => {
            // Assert
            expect(tabStub.vm[REGISTER]).toBeDefined();
        });

        it(`should provide a "${SELECT}" callback`, () => {
            // Assert
            expect(tabStub.vm[SELECT]).toBeDefined();
        });

        describe(`should provide a "${TABS_COMPONENT}" object`, () => {
            it('', () => {
                // Assert
                expect(tabStub.vm[TABS_COMPONENT]).toBeDefined();
            });

            describe('which', () => {
                const propertyToState = {
                    activeTab: 'activeTab',
                    animationDirection: 'direction',
                    animate: 'animate'
                };

                it.each(Object.entries(propertyToState))('should surface the {state} state of the Tabs object as {property}', (
                    property,
                    state
                ) => {
                    expect(tabStub.vm[TABS_COMPONENT][property]).toBe(tabsInstance.vm[state]);
                });
            });
        });

        it(`should provide a "${UPDATE_TITLE}" callback`, () => {
            // Assert
            expect(tabStub.vm[UPDATE_TITLE]).toBeDefined();
        });
    });

    describe('Tabs registration', () => {
        let wrapper,
            tabStub;

        beforeEach(() => {
            // Arrange
            ({ tabsInstance: wrapper, tabStub } = arrange());
        });

        it(`should register a tab when provided ${REGISTER} method is called`, async () => {
            // Act
            await tabStub.vm[REGISTER](registeredTabsMock[0]);
            const tabButton = wrapper.find(`[data-test-id="tab-button-${registeredTabsMock[0].name}"]`);

            // Assert
            expect(tabButton.exists()).toBe(true);
        });

        it('should display a button for each registered tab', async () => {
            // Act
            const tabs = [];
            await Promise.all(registeredTabsMock.map(async tab => {
                await tabStub.vm[REGISTER](tab);
                tabs.push(wrapper.find(`[data-test-id="tab-button-${tab.name}"]`));
            }));
            await wrapper.vm.$nextTick();

            // Assert
            expect(tabs.length).toBe(2);
        });

        it('should display the title of the registered tab inside the button', async () => {
            // Act
            await tabStub.vm[REGISTER](registeredTabsMock[0]);

            // Assert
            const tabButton = wrapper.find(`[data-test-id="tab-button-${registeredTabsMock[0].name}"]`);
            expect(tabButton.text()).toBe(registeredTabsMock[0].title);
        });
    });

    describe('Tabs selection', () => {
        let wrapper,
            tabStub;

        beforeEach(async () => {
            // Arrange
            ({ tabsInstance: wrapper, tabStub } = arrange({
                mocks: {
                    $style: {
                        'c-tabs-button--active': 'c-tabs-button--active'
                    }
                }
            }));

            await Promise.all(registeredTabsMock.map(async tab => {
                await tabStub.vm[REGISTER](tab);
            }));
            await wrapper.vm.$nextTick();
        });

        describe('by user click', () => {
            it('should apply a active class to the selected tab when selectTabIndex method is called', async () => {
                // Act
                const tabButton = wrapper.find(`[data-test-id="tab-button-${registeredTabsMock[0].name}"]`);
                await tabButton.trigger('click');

                // Assert
                expect(tabButton.classes()).toContain('c-tabs-button--active');
            });

            it('should set the direction to LEFT when new index > old index', async () => {
                // Act
                await wrapper.find(`[data-test-id="tab-button-${registeredTabsMock[1].name}"]`).trigger('click');

                // Assert
                expect(wrapper.vm.direction).toEqual(DIRECTION.LEFT);
            });

            it('should set the direction to RIGHT when new index <= old index', async () => {
                // Act
                await wrapper.find(`[data-test-id="tab-button-${registeredTabsMock[1].name}"]`).trigger('click');
                await wrapper.find(`[data-test-id="tab-button-${registeredTabsMock[0].name}"]`).trigger('click');

                // Assert
                expect(wrapper.vm.direction).toEqual(DIRECTION.RIGHT);
            });

            it('should emit a `change` event if new index != old index', async () => {
                // Act
                await wrapper.find(`[data-test-id="tab-button-${registeredTabsMock[0].name}"]`).trigger('click');
                await wrapper.find(`[data-test-id="tab-button-${registeredTabsMock[1].name}"]`).trigger('click');

                // Assert
                expect(wrapper.emitted().change).toBeTruthy();
                expect(wrapper.emitted().change.length).toBe(1);
                expect(wrapper.emitted().change[0]).toStrictEqual([{
                    new: 1,
                    prev: 0
                }]);
            });

            it('should not emit a `change` event if new index = old index', async () => {
                // Act
                await wrapper.find(`[data-test-id="tab-button-${registeredTabsMock[0].name}"]`).trigger('click');
                await wrapper.find(`[data-test-id="tab-button-${registeredTabsMock[0].name}"]`).trigger('click');

                // Assert
                expect(wrapper.emitted().change).toBeFalsy();
            });
        });

        describe('programmatically', () => {
            it('should apply a active class to the selected tab when selectTabIndex method is called', async () => {
                // Act
                await tabStub.vm[SELECT](registeredTabsMock[0].name);

                // Assert
                const tabButton = wrapper.find(`[data-test-id="tab-button-${registeredTabsMock[0].name}"]`);
                expect(tabButton.classes()).toContain('c-tabs-button--active');
            });

            it('should set the direction to LEFT when new index > old index', async () => {
                // Act
                await tabStub.vm[SELECT](registeredTabsMock[1].name);

                // Assert
                expect(wrapper.vm.direction).toEqual(DIRECTION.LEFT);
            });

            it('should set the direction to RIGHT when new index <= old index', async () => {
                // Act
                await tabStub.vm[SELECT](registeredTabsMock[1].name);
                await tabStub.vm[SELECT](registeredTabsMock[0].name);

                // Assert
                expect(wrapper.vm.direction).toEqual(DIRECTION.RIGHT);
            });

            it('should emit a `change` event if new index != old index', async () => {
                // Act
                await tabStub.vm[SELECT](registeredTabsMock[0].name);
                await tabStub.vm[SELECT](registeredTabsMock[1].name);

                // Assert
                expect(wrapper.emitted().change).toBeTruthy();
                expect(wrapper.emitted().change.length).toBe(1);
                expect(wrapper.emitted().change[0]).toStrictEqual([{
                    new: 1,
                    prev: 0
                }]);
            });

            it('should not emit a `change` event if new index = old index', async () => {
                // Act
                await tabStub.vm[SELECT](registeredTabsMock[0].name);
                await tabStub.vm[SELECT](registeredTabsMock[0].name);

                // Assert
                expect(wrapper.emitted().change).toBeFalsy();
            });

            it(`should update button text when ${UPDATE_TITLE} is called`, async () => {
                // Arrange
                const tabButton = wrapper.find(`[data-test-id="tab-button-${registeredTabsMock[0].name}"]`);

                // Act
                await tabStub.vm[UPDATE_TITLE](registeredTabsMock[0].name, '__UPDATED_TITLE__');

                // Assert
                expect(tabButton.text()).toEqual('__UPDATED_TITLE__');
            });
        });
    });
});

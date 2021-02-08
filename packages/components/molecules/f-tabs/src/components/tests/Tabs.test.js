import { shallowMount } from '@vue/test-utils';
import Tabs from '../Tabs.vue';

const registeredTabs = [
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
    it('should be defined', () => {
        const propsData = {};
        const wrapper = shallowMount(Tabs, { propsData });
        expect(wrapper.exists()).toBe(true);
    });

    describe('Tabs registration', () => {
        let wrapper;

        beforeEach(() => {
            // Arrange
            wrapper = shallowMount(Tabs);
        });

        it('should register a tab when addTab method is called', async () => {
            // Act
            await wrapper.vm.addTab(registeredTabs[0]);
            const tabButton = wrapper.find(`[data-test-id="tab-${registeredTabs[0].name}"]`);

            // Assert
            expect(tabButton.exists()).toBe(true);
        });

        it('should display a button for each registered tab', async () => {
            // Act
            const tabs = [];
            registeredTabs.forEach(tab => {
                wrapper.vm.addTab(tab);
                tabs.push(wrapper.find(`[data-test-id="tab-${tab.name}"]`));
            });
            await wrapper.vm.$nextTick();

            // Assert
            expect(tabs.length).toBe(2);
        });

        it('should display the name of the registered tab inside the button', async () => {
            // Act
            await wrapper.vm.addTab(registeredTabs[0]);
            const tabButton = wrapper.find(`[data-test-id="tab-${registeredTabs[0].name}"]`);

            // Assert
            expect(tabButton.text()).toBe(registeredTabs[0].title);
        });
    });

    describe('Tabs selection', () => {
        let wrapper;

        beforeEach(() => {
            // Arrange
            wrapper = shallowMount(Tabs, {
                mocks: {
                    $style: {
                        'c-tabs-button--active': 'c-tabs-button--active'
                    }
                }
            });
        });

        it('should apply a active class to the selected tab when selectTabIndex method is called', async () => {
            // Act
            registeredTabs.forEach(tab => {
                wrapper.vm.addTab(tab);
            });

            await wrapper.vm.$nextTick();

            const tabButton = wrapper.find(`[data-test-id="tab-${registeredTabs[0].name}"]`);
            await tabButton.trigger('click');

            // Assert
            expect(tabButton.classes()).toContain('c-tabs-button--active');
        });

        it('should set the direction to RIGHT when new index > old index', async () => {
            // Act
            registeredTabs.forEach(tab => {
                wrapper.vm.addTab(tab);
            });

            await wrapper.vm.$nextTick();

            await wrapper.find(`[data-test-id="tab-${registeredTabs[1].name}"]`).trigger('click');

            // Assert
            expect(wrapper.vm.direction).toEqual('RIGHT');
        });

        it('should set the direction to LEFT when new index <= old index', async () => {
            // Act
            registeredTabs.forEach(tab => {
                wrapper.vm.addTab(tab);
            });

            await wrapper.vm.$nextTick();

            await wrapper.find(`[data-test-id="tab-${registeredTabs[1].name}"]`).trigger('click');
            await wrapper.find(`[data-test-id="tab-${registeredTabs[0].name}"]`).trigger('click');

            // Assert
            expect(wrapper.vm.direction).toEqual('LEFT');
        });
    });
});

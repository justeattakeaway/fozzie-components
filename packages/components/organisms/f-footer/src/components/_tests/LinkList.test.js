import { shallowMount } from '@vue/test-utils';
import { windowServices } from '@justeat/f-services';
import LinkList from '../LinkList.vue';

const propsData = {
    linkList: {
        name: 'Customer service',
        links: [
            {
                href: '/contact',
                text: 'Contact us'
            }
        ]
    }
};

describe('LinkList component', () => {
    describe('for narrow viewport widths', () => {
        jest.spyOn(windowServices, 'getWindowWidth').mockImplementation(() => 414);

        const wrapper = shallowMount(LinkList, {
            propsData
        });

        it('should display the headers as buttons', () => {
            // Arrange
            const linkListHeaderButton = wrapper.find('[data-test-id="linkList-header-button"]');
            const linkListHeaderText = wrapper.find('[data-test-id="linkList-header-text"]');


            // Assert
            expect(linkListHeaderButton.exists()).toBe(true);
            expect(linkListHeaderText.exists()).toBe(false);
        });

        it('should be in a collapsed state', () => {
            // Arrange & Act
            const linkListCollapsedWrapper = wrapper.find('[data-test-id="linkList-wrapper-collapsed"]');

            // Assert
            expect(linkListCollapsedWrapper.exists()).toBe(true);
        });

        it('should be in an open state when linkList title has been clicked', async () => {
            // Arrange
            const linkListHeader = wrapper.find('[data-test-id="linkList-header-button"]');

            // Act
            await linkListHeader.trigger('click'); // wait for DOM to update as a result of click being triggered
            const linkListOpenWrapper = wrapper.find('[data-test-id="linkList-wrapper"]');
            const linkListCollapsedWrapper = wrapper.find('[data-test-id="linkList-wrapper-collapsed"]');

            // Assert
            expect(linkListOpenWrapper.exists()).toBe(true);
            expect(linkListCollapsedWrapper.exists()).toBe(false);
        });
    });

    describe('for wide viewport widths', () => {
        jest.spyOn(windowServices, 'getWindowWidth').mockImplementation(() => 1200);

        const wrapper = shallowMount(LinkList, {
            propsData
        });

        it('should display the headers as text', () => {
            // Arrange
            const linkListHeaderButton = wrapper.find('[data-test-id="linkList-header-button"]');
            const linkListHeaderText = wrapper.find('[data-test-id="linkList-header-text"]');

            // Assert
            expect(linkListHeaderButton.exists()).toBe(false);
            expect(linkListHeaderText.exists()).toBe(true);
        });

        it('should be in an open state', () => {
            // Arrange & Act
            const linkListCollapsedWrapper = wrapper.find('[data-test-id="linkList-wrapper-collapsed"]');
            const linkListOpenWrapper = wrapper.find('[data-test-id="linkList-wrapper"]');

            // Assert
            expect(linkListOpenWrapper.exists()).toBe(true);
            expect(linkListCollapsedWrapper.exists()).toBe(false);
        });
    });
});

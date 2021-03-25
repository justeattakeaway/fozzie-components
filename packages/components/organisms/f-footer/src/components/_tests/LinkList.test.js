import { shallowMount } from '@vue/test-utils';
import LinkList from '../LinkList.vue';

const wrapper = shallowMount(LinkList, {
    propsData: {
        linkList: {
            title: 'Customer service',
            links: [
                {
                    url: '/contact',
                    text: 'Contact us'
                }
            ]
        }
    }
});

describe('LinkList component', () => {
    allure.feature('Link List');
    it('should be defined', () => {
        expect(wrapper.exists()).toBe(true);
    });

    describe('for narrow viewport widths', () => {
        beforeEach(() => {
            window.innerWidth = 414;
            window.dispatchEvent(new Event('resize'));
        });

        it('should be in a collapsed state', () => {
            // Arrange & Act
            const linkListCollapsedWrapper = wrapper.find('[data-test-id="linkList-wrapper-collapsed"]');

            // Assert
            expect(linkListCollapsedWrapper.exists()).toBe(true);
        });

        it('should be in an open state when linkList title has been clicked', async () => {
            // Arrange
            const linkListHeader = wrapper.find('[data-test-id="linkList-header"]');

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
        beforeEach(() => {
            window.innerWidth = 1200;
            window.dispatchEvent(new Event('resize'));
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

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
            const linkListWrapper = wrapper.find('[data-test-id="linkList-wrapper"]');

            // Assert
            expect(linkListWrapper.classes()).toContain('is-collapsed');
        });

        it('should be in an open state when linkList title has been clicked', async () => {
            // Arrange
            const linkListWrapper = wrapper.find('[data-test-id="linkList-wrapper"]');
            const linkListHeader = wrapper.find('[data-test-id="linkList-header"]');

            // Act
            await linkListHeader.trigger('click'); // wait for DOM to update as a result of click being triggered

            // Assert
            expect(linkListWrapper.classes()).not.toContain('is-collapsed');
        });
    });

    describe('for wide viewport widths', () => {
        beforeEach(() => {
            window.innerWidth = 1200;
            window.dispatchEvent(new Event('resize'));
        });

        it('should be in an open state', () => {
            // Arrange & Act
            const linkListWrapper = wrapper.find('[data-test-id="linkList-wrapper"]');

            // Assert
            expect(linkListWrapper.classes()).not.toContain('is-collapsed');
        });
    });
});

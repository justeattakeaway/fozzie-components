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
    it('should be defined', () => {
        expect(wrapper).toBeDefined();
    });

    it('is-collapsed class is present', () => {
        // Arrange & Act
        const linkListWrapper = wrapper.find('[data-js-test="linkList-wrapper"]');

        // Assert
        expect(linkListWrapper.classes()).toContain('is-collapsed');
    });

    it('removes is-collapsed class when linkList is clicked', () => {
        // Arrange
        const linkListWrapper = wrapper.find('[data-js-test="linkList-wrapper"]');
        const linkListHeader = wrapper.find('[data-js-test="linkList-header"]');

        // Act
        linkListHeader.trigger('click');

        // Assert
        expect(linkListWrapper.classes()).not.toContain('is-collapsed');
    });
});

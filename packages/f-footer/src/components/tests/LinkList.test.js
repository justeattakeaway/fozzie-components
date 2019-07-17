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

    describe('for mobile widths', () => {
        beforeEach(() => {
            window.innerWidth = 414;
            window.dispatchEvent(new Event('resize'));
        });

        it('should contain the class "is-collapsed"', () => {
            // Arrange & Act
            const linkListWrapper = wrapper.find('[data-js-test="linkList-wrapper"]');

            // Assert
            expect(linkListWrapper.classes()).toContain('is-collapsed');
        });

        it('shouldn\'t contain class "is-collapsed" when linkList title is clicked', () => {
            // Arrange
            const linkListWrapper = wrapper.find('[data-js-test="linkList-wrapper"]');
            const linkListHeader = wrapper.find('[data-js-test="linkList-header"]');

            // Act
            linkListHeader.trigger('click');

            // Assert
            expect(linkListWrapper.classes()).not.toContain('is-collapsed');
        });
    });

    describe('for desktop widths', () => {
        beforeEach(() => {
            window.innerWidth = 1200;
            window.dispatchEvent(new Event('resize'));
        });

        it('should not contain the class "is-collapsed"', () => {
            // Arrange & Act
            const linkListWrapper = wrapper.find('[data-js-test="linkList-wrapper"]');

            // Assert
            expect(linkListWrapper.classes()).not.toContain('is-collapsed');
        });
    });
});

import { shallowMount } from '@vue/test-utils';
import Body from '../ContentCardBody.vue';

const MOCK_TITLE = '__TEST_MOCK_TITLE__';
const MOCK_SUB_TITLE = '__TEST_MOCK_SUB_TITLE__';
const MOCK_DESCRIPTION = [
    '__TEST_MOCK_DESCRIPTION_1__',
    '__TEST_MOCK_DESCRIPTION_2__',
    '__TEST_MOCK_DESCRIPTION_3__'
];

describe('Body.vue', () => {
    describe('Title', () => {
        it('should show the default h3 title when NO header is provided to the header slot', () => {
            // Arrange
            const wrapper = shallowMount(Body, {
                propsData: {
                    title: MOCK_TITLE
                }
            });

            // Act
            const titleElement = wrapper.find('[data-test-id="content-card-title"]');

            // Assert
            expect(titleElement.text()).toBe(MOCK_TITLE);
        });

        it('should show the contents provided to the header slot', () => {
            // Arrange
            const wrapper = shallowMount(Body, {
                scopedSlots: {
                    title: `<div data-test-id="content-card-header-slot-content">${MOCK_TITLE}</div>`
                }
            });

            // Act
            const slotContentElement = wrapper.find('[data-test-id="content-card-header-slot-content"]');

            // Assert
            expect(slotContentElement.exists()).toBe(true);
            expect(slotContentElement.text()).toBe(MOCK_TITLE);
        });

        it('should not show header if NO slot of title is provided', () => {
            // Arrange
            const wrapper = shallowMount(Body);

            // Act
            const titleElement = wrapper.find('[data-test-id="content-card-title"]');
            const slotContentElement = wrapper.find('[data-test-id="content-card-title-slot-content"]');

            // Assert
            expect(titleElement.exists()).toBe(false);
            expect(slotContentElement.exists()).toBe(false);
        });
    });
    describe('Subtitle', () => {
        it('should show the default h4 tag with subtitle text when NO slot content is provided AND subtitle prop is set', () => {
            // Arrange
            const wrapper = shallowMount(Body, {
                propsData: {
                    subtitle: MOCK_SUB_TITLE
                }
            });

            // Act
            const subTitleElement = wrapper.find('[data-test-id="content-card-subtitle"]');

            // Assert
            expect(subTitleElement.text()).toBe(MOCK_SUB_TITLE);
        });

        it('should show the contents provided to the subtitle slot', () => {
            // Arrange
            const wrapper = shallowMount(Body, {
                scopedSlots: {
                    subtitle: `<div data-test-id="content-card-subtitle-slot-content">${MOCK_SUB_TITLE}</div>`
                }
            });

            // Act
            const slotContentElement = wrapper.find('[data-test-id="content-card-subtitle-slot-content"]');

            // Assert
            expect(slotContentElement.exists()).toBe(true);
            expect(slotContentElement.text()).toBe(MOCK_SUB_TITLE);
        });

        it('should not show the subtitle if NO slot or subtitle prop is provided', () => {
            // Arrange
            const wrapper = shallowMount(Body);

            // Act
            const subtitleElement = wrapper.find('[data-test-id="content-card-subtitle"]');
            const slotContentElement = wrapper.find('[data-test-id="content-card-subtitle-slot-content"]');

            // Assert
            expect(subtitleElement.exists()).toBe(false);
            expect(slotContentElement.exists()).toBe(false);
        });
    });

    describe('Description', () => {
        it('should show the default p tag for each description item when no slot is provided', () => {
            // Arrange
            const wrapper = shallowMount(Body, {
                propsData: {
                    description: MOCK_DESCRIPTION
                }
            });

            // Act
            const descriptionItems = wrapper.findAll('[data-test-id="content-card-description-item"]');

            // Assert
            expect(descriptionItems.length).toBe(3);
        });

        it('should show the contents provided to the description slot', () => {
            // Arrange
            const wrapper = shallowMount(Body, {
                scopedSlots: {
                    description: '<div data-test-id="content-card-description-item-slot-content">TEST</div>'
                }
            });

            // Act
            const slotContentElement = wrapper.find('[data-test-id="content-card-description-item-slot-content"]');

            // Assert
            expect(slotContentElement.exists()).toBe(true);
        });

        it('should not show the description if NO slot or description prop is provided', () => {
            // Arrange
            const wrapper = shallowMount(Body);

            // Act
            const descriptionElement = wrapper.findAll('[data-test-id="content-card-description-item"]');
            const slotContentElement = wrapper.find('[data-test-id="content-card-description-item-slot-content"]');

            // Assert
            expect(descriptionElement.length).toBe(0);
            expect(slotContentElement.exists()).toBe(false);
        });
    });

    describe('Footer', () => {
        it('should display the contents of the footer slot', () => {
            // Arrange
            const wrapper = shallowMount(Body, {
                scopedSlots: {
                    footer: '<div data-test-id="content-card-footer-slot-content">Footer</div>'
                }
            });

            // Act
            const slotContentElement = wrapper.find('[data-test-id="content-card-footer-slot-content"]');

            // Assert
            expect(slotContentElement.exists()).toBe(true);
        });
    });
});

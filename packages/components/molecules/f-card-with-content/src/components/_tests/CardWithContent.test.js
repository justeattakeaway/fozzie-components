import { mount, shallowMount, RouterLinkStub } from '@vue/test-utils';
import CardWithContent from '../CardWithContent.vue';

describe('CardWithContent', () => {
    it('should be defined', () => {
        const propsData = {};
        const wrapper = shallowMount(CardWithContent, { propsData });
        expect(wrapper.exists()).toBe(true);
    });

    describe('props ::', () => {
        describe('cardHeading', () => {
            const headingSelector = '[data-test-id="cardWithContent-heading"]';

            it('should render heading when passed in', () => {
                // Arrange
                const cardHeading = 'Test heading';
                const propsData = { cardHeading };

                // Act
                const wrapper = shallowMount(CardWithContent, { propsData });
                const heading = wrapper.find(headingSelector);

                // Assert
                expect(heading.exists()).toBe(true);
                expect(heading.text()).toBe(cardHeading);
            });

            it('should not render heading when omitted', () => {
                // Arrange
                const propsData = {};

                // Act
                const wrapper = shallowMount(CardWithContent, { propsData });
                const heading = wrapper.find(headingSelector);

                // Assert
                expect(heading.exists()).toBe(false);
            });
        });

        describe('cardDescription', () => {
            const descriptionSelector = '[data-test-id="cardWithContent-description"]';

            it('should render description when passed in', () => {
                // Arrange
                const cardDescription = 'Test description';
                const propsData = { cardDescription };

                // Act
                const wrapper = shallowMount(CardWithContent, { propsData });
                const description = wrapper.find(descriptionSelector);

                // Assert
                expect(description.exists()).toBe(true);
                expect(description.text()).toBe(cardDescription);
            });

            it('should not render description when omitted', () => {
                // Arrange
                const propsData = {};

                // Act
                const wrapper = shallowMount(CardWithContent, { propsData });
                const description = wrapper.find(descriptionSelector);

                // Assert
                expect(description.exists()).toBe(false);
            });
        });

        describe('primaryButton', () => {
            const primaryButtonSelector = '[data-test-id="cardWithContent-primaryButton"]';
            const text = 'Primary button text';

            it('should render when object with `text` property passed in', () => {
                // Arrange
                const propsData = {
                    primaryButton: {
                        text
                    }
                };

                // Act
                const wrapper = shallowMount(CardWithContent, { propsData });
                const primaryButton = wrapper.find(primaryButtonSelector);

                // Assert
                expect(primaryButton.exists()).toBe(true);
                expect(primaryButton.text()).toBe(text);
            });

            it('should not render when object without `text` property is passed in', () => {
                // Arrange
                const propsData = {
                    primaryButton: {}
                };

                // Act
                const wrapper = shallowMount(CardWithContent, { propsData });
                const primaryButton = wrapper.find(primaryButtonSelector);

                // Assert
                expect(primaryButton.exists()).toBe(false);
            });

            it('should not render when no object is passed in', () => {
                // Arrange
                const propsData = {};

                // Act
                const wrapper = shallowMount(CardWithContent, { propsData });
                const primaryButton = wrapper.find(primaryButtonSelector);

                // Assert
                expect(primaryButton.exists()).toBe(false);
            });

            it('should render as an anchor when given an `href`', () => {
                // Arrange
                const propsData = {
                    primaryButton: {
                        href: '/test',
                        text
                    }
                };

                // Act
                const wrapper = mount(CardWithContent, { propsData });
                const primaryButton = wrapper.find(primaryButtonSelector);

                // Assert
                expect(primaryButton.element.tagName).toBe('A');
                expect(primaryButton.attributes('href')).toBe('/test');
            });

            it('should render as an anchor when given a `to` attribute', () => {
                // Arrange
                const propsData = {
                    primaryButton: {
                        to: '/test',
                        text
                    }
                };

                // Act
                const wrapper = mount(CardWithContent, {
                    propsData,
                    stubs: {
                        RouterLink: RouterLinkStub
                    }
                });
                const primaryButton = wrapper.find(primaryButtonSelector);

                // Assert
                expect(primaryButton.element.tagName).toBe('A');
                expect(primaryButton.attributes('to')).toBe('/test');
            });
        });

        describe('secondaryButton', () => {
            const secondaryButtonSelector = '[data-test-id="cardWithContent-secondaryButton"]';
            const text = 'Secondary button text';

            it('should render when object with `text` property passed in', () => {
                // Arrange
                const propsData = {
                    secondaryButton: {
                        text
                    }
                };

                // Act
                const wrapper = shallowMount(CardWithContent, { propsData });
                const secondaryButton = wrapper.find(secondaryButtonSelector);

                // Assert
                expect(secondaryButton.exists()).toBe(true);
                expect(secondaryButton.text()).toBe(text);
            });

            it('should not render when object without `text` property is passed in', () => {
                // Arrange
                const propsData = {
                    secondaryButton: {}
                };

                // Act
                const wrapper = shallowMount(CardWithContent, { propsData });
                const secondaryButton = wrapper.find(secondaryButtonSelector);

                // Assert
                expect(secondaryButton.exists()).toBe(false);
            });

            it('should not render when no object is passed in', () => {
                // Arrange
                const propsData = {};

                // Act
                const wrapper = shallowMount(CardWithContent, { propsData });
                const secondaryButton = wrapper.find(secondaryButtonSelector);

                // Assert
                expect(secondaryButton.exists()).toBe(false);
            });

            it('should render as an anchor when given an `href`', () => {
                // Arrange
                const propsData = {
                    secondaryButton: {
                        href: '/test',
                        text
                    }
                };

                // Act
                const wrapper = mount(CardWithContent, { propsData });
                const secondaryButton = wrapper.find(secondaryButtonSelector);

                // Assert
                expect(secondaryButton.element.tagName).toBe('A');
                expect(secondaryButton.attributes('href')).toBe('/test');
            });

            it('should render as an anchor when given a `to` attribute', () => {
                // Arrange
                const propsData = {
                    secondaryButton: {
                        to: '/test',
                        text
                    }
                };

                // Act
                const wrapper = mount(CardWithContent, {
                    propsData,
                    stubs: {
                        RouterLink: RouterLinkStub
                    }
                });
                const secondaryButton = wrapper.find(secondaryButtonSelector);

                // Assert
                expect(secondaryButton.element.tagName).toBe('A');
                expect(secondaryButton.attributes('to')).toBe('/test');
            });
        });
    });

    describe('events ::', () => {
        describe('primary-button-click', () => {
            const primaryButtonSelector = '[data-test-id="cardWithContent-primaryButton"]';
            const text = 'Primary button text';

            it('should be emitted when primary button is clicked', () => {
                // Arrange
                const propsData = { primaryButton: { text } };

                // Act
                const wrapper = shallowMount(CardWithContent, { propsData });
                const primaryButton = wrapper.find(primaryButtonSelector);

                primaryButton.trigger('click');

                // Assert
                expect(wrapper.emitted('primary-button-click').length).toBe(1);
            });

            it('should be emitted when primary button is clicked, even if button is an anchor', () => {
                // Arrange
                const propsData = {
                    primaryButton: {
                        href: '/test',
                        text
                    }
                };

                // Act
                const wrapper = shallowMount(CardWithContent, { propsData });
                const primaryButton = wrapper.find(primaryButtonSelector);

                primaryButton.trigger('click');

                // Assert
                expect(wrapper.emitted('primary-button-click').length).toBe(1);
            });
        });

        describe('secondary-button-click', () => {
            const secondaryButtonSelector = '[data-test-id="cardWithContent-secondaryButton"]';
            const text = 'Secondary button text';

            it('should be emitted when secondary button is clicked', () => {
                // Arrange
                const propsData = { secondaryButton: { text } };

                // Act
                const wrapper = shallowMount(CardWithContent, { propsData });
                const secondaryButton = wrapper.find(secondaryButtonSelector);

                secondaryButton.trigger('click');

                // Assert
                expect(wrapper.emitted('secondary-button-click').length).toBe(1);
            });

            it('should be emitted when secondary button is clicked, even if button is an anchor', () => {
                // Arrange
                const propsData = {
                    secondaryButton: {
                        href: '/test',
                        text
                    }
                };

                // Act
                const wrapper = shallowMount(CardWithContent, { propsData });
                const secondaryButton = wrapper.find(secondaryButtonSelector);

                secondaryButton.trigger('click');

                // Assert
                expect(wrapper.emitted('secondary-button-click').length).toBe(1);
            });
        });
    });
});

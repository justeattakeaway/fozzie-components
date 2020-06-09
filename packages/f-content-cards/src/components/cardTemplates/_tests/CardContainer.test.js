import { createLocalVue, shallowMount } from '@vue/test-utils';
import VueLazyload from 'vue-lazyload';
import CardContainer from '../CardContainer.vue';

const localVue = createLocalVue();

localVue.use(VueLazyload);

const url = '__URL__';
const button = '__BUTTON__';
const line1 = '__LINE_1__';
const description = '__DESCRIPTION__';
const id = btoa('ABC123');
const type = 'Promotion_Card_1';

const card = {
    id,
    url,
    button,
    description,
    extras: {
        button_1: button, // eslint-disable-line camelcase
        custom_card_type: type, // eslint-disable-line camelcase
        line_1: line1 // eslint-disable-line camelcase
    }
};

describe('ContentCard', () => {
    it('should render a link if ctaUrl is provided', () => {
        // Act
        const wrapper = shallowMount(CardContainer, {
            localVue,
            propsData: {
                card
            }
        });

        // Assert
        expect(wrapper.contains('a')).toBe(true);
    });

    it('should display description lines', () => {
        // Arrange & Act
        const wrapper = shallowMount(CardContainer, {
            localVue,
            propsData: {
                card
            }
        });

        // Assert
        expect(wrapper.find('[data-test-id="ContentCard-TextItem-0"').text()).toBe(line1);
    });

    it('should apply the correct URL', () => {
        // Arrange & Act
        const wrapper = shallowMount(CardContainer, {
            localVue,
            propsData: {
                card
            }
        });

        // Assert
        expect(wrapper.find(`[href="${url}"]`).exists()).toBe(true);
    });

    describe('`createDataObject`', () => {
        it('should exist', () => {
            const wrapper = shallowMount(CardContainer, {
                localVue,
                propsData: {
                    card,
                    isCarousel: false
                }
            });

            expect(wrapper.vm.createDataObject).toBeDefined();
        });

        describe('when invoked', () => {
            it('should return an `object`', () => {
                const wrapper = shallowMount(CardContainer, {
                    localVue,
                    propsData: {
                        card,
                        isCarousel: false
                    }
                });
                // Act
                const result = wrapper.vm.createDataObject();

                // Assert
                expect(typeof result).toBe('object');
            });

            describe('with `args`', () => {
                it('should include passed arguments in the final object', () => {
                    // Arrange
                    const obj = {
                        canvasName: null,
                        carousel: null,
                        contentAction: 'M2-9',
                        contentCTA: '__BUTTON__',
                        contentCategory: null,
                        contentDeeplink: null,
                        contentId: 'ABC12',
                        contentPosition: undefined,
                        contentTitle: undefined,
                        contentType: 'ContentCard',
                        customVoucherCode: null,
                        variantName: null
                    };

                    const wrapper = shallowMount(CardContainer, {
                        localVue,
                        propsData: {
                            card,
                            isCarousel: false
                        }
                    });

                    // Act
                    const result = wrapper.vm.createDataObject({
                        contentAction: 'M2-9'
                    });

                    // Assert
                    expect(result).toEqual(obj);
                });
            });

            describe('AND `isCarousel` is `falsy`', () => {
                it('should set `carousel` to `null`', () => {
                    // Arrange
                    const obj = {
                        canvasName: null,
                        carousel: null,
                        contentAction: null,
                        contentCTA: '__BUTTON__',
                        contentCategory: null,
                        contentDeeplink: null,
                        contentId: 'ABC12',
                        contentPosition: undefined,
                        contentTitle: undefined,
                        contentType: 'ContentCard',
                        customVoucherCode: null,
                        variantName: null
                    };

                    const wrapper = shallowMount(CardContainer, {
                        store,
                        localVue,
                        propsData: {
                            card,
                            isCarousel: false
                        }
                    });

                    // Act
                    const result = wrapper.vm.createDataObject();

                    // Assert
                    expect(result).toEqual(obj);
                });
            });

            describe('AND `isCarousel` is `truthy`', () => {
                it('should set the correct object for `carousel`', () => {
                    // Arrange
                    const obj = {
                        canvasName: null,
                        carousel: {
                            listType: 'offers',
                            componentId: ''
                        },
                        contentAction: null,
                        contentCTA: '__BUTTON__',
                        contentCategory: null,
                        contentDeeplink: null,
                        contentId: 'ABC12',
                        contentPosition: undefined,
                        contentTitle: undefined,
                        contentType: 'ContentCard',
                        customVoucherCode: null,
                        variantName: null
                    };

                    const wrapper = shallowMount(CardContainer, {
                        localVue,
                        propsData: {
                            card,
                            isCarousel: true
                        }
                    });

                    // Act
                    const result = wrapper.vm.createDataObject();

                    // Assert
                    expect(result).toEqual(obj);
                });
            });
        });
    });
});

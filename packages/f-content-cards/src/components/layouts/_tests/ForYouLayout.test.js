import initialiseMetadata from '@justeat/f-metadata';
import { mount, shallowMount } from '@vue/test-utils';
import ForYouLayout from '../ForYouLayout.vue';
import cardTemplates from '../../cardTemplates';

jest.mock('@justeat/f-metadata');

const apiKey = '__API_KEY__';
const userId = '__USER_ID__';

const url = '__URL__';
const button = '__BUTTON__';
const description = '__DESCRIPTION__';
const headline = '__HEADLINE__';
const title = '__TITLE__';
const voucherCode = '__VOUCHERCODE__';
const order = '__ORDER__';
const id = btoa('ABC123');

const metadataDispatcher = {
    logCardClick: jest.fn(),
    logCardImpressions: jest.fn(),
    pushShapedEventToDataLayer: jest.fn()
};

const createCard = type => ({
    id,
    url,
    headline,
    ctaText: button,
    description,
    title,
    order,
    type,
    voucherCode
});

const createMetadataCards = cardTypes => cardTypes.map(type => createCard(type));

beforeEach(() => {
    jest.resetAllMocks();
    initialiseMetadata.mockResolvedValue(metadataDispatcher);
});

describe('ForYouLayout', () => {
    allure.feature('For You Layout');
    it.each`
            type                             | component
            ${'Anniversary_Card_1'}          | ${'VoucherCard'}
            ${'Voucher_Card_1'}              | ${'VoucherCard'}
            ${'Restaurant_FTC_Offer_Card'}   | ${'FirstTimeCustomerCard'}
            ${'Promotion_Card_1'}            | ${'PromotionCard'}
            ${'Promotion_Card_2'}            | ${'PromotionCard'}
            ${'Terms_And_Conditions_Card'}   | ${'TermsAndConditionsCard'}
            ${'Terms_And_Conditions_Card_2'} | ${'TermsAndConditionsCard'}
        `('should map `$type` card type to `$component` component', async ({ type, component }) => {
    // Arrange
    const cardTypes = [type];
    const cards = createMetadataCards(cardTypes);

    // Act
    const instance = mount(ForYouLayout, {
        propsData: {
            apiKey,
            userId,
            testId: component
        }
    });

    instance.vm.$children[0].metadataContentCards(cards);
    await instance.vm.$nextTick();

    // Assert
    expect(instance.find(`[data-test-id="ContentCard-${component}-0"`)
            .exists())
            .toBe(true);
});

    it('should not render invalid card types as components', async () => {
        // Arrange
        const cardTypes = ['INVALID'];
        const cards = createMetadataCards(cardTypes);

        // Act
        const instance = mount(ForYouLayout, {
            propsData: {
                apiKey,
                userId,
                testId: 'empty-content-cards'
            }
        });
        instance.vm.$children[0].metadataContentCards(cards);
        await instance.vm.$nextTick();

        // Assert
        expect(() => instance.get('[data-test-id="empty-content-cards"] *')).toThrowError();
    });

    describe('loading state', () => {
        it('should show a skeleton loading card before Metadata has initialised', async () => {
            // Arrange
            const { SkeletonLoader } = cardTemplates;

            // Act
            const instance = mount(ForYouLayout, {
                propsData: {
                    apiKey,
                    userId
                }
            });

            // Assert
            expect(instance.findComponent(SkeletonLoader).exists()).toBe(true);
        });

        it('should hide the skeleton loading card after Metadata has initialised', async () => {
            // Arrange
            const cardTypes = ['Promotion_Card_1', 'Promotion_Card_2', 'Post_Order_Card_1'];
            const cards = createMetadataCards(cardTypes);
            const { SkeletonLoader } = cardTemplates;

            // Act
            const instance = mount(ForYouLayout, {
                propsData: {
                    apiKey,
                    userId
                }
            });
            instance.vm.$children[0].metadataContentCards(cards);
            await instance.vm.$nextTick();

            // Assert
            expect(instance.findComponent(SkeletonLoader).exists()).toBe(false);
        });

        it('should default to "promo" skeleton loading card', () => {
            // Assemble & Act
            const instance = mount(ForYouLayout, {
                propsData: {
                    apiKey,
                    userId
                }
            });

            // Assert
            expect(instance.vm.$data.loadingCard).toEqual({ type: 'promo', count: 3 });
        });
    });

    // describe('when test id prop provided', () => {
    //     const testId = 'foo';
    //     let instance;
    //
    //     beforeEach(async () => {
    //         // Arrange
    //         const cardTypes = ['Promotion_Card_1', 'Promotion_Card_2', 'Post_Order_Card_1'];
    //         const cards = createMetadataCards(cardTypes);
    //         initialiseMetadata.mockResolvedValue(metadataDispatcher);
    //
    //         // Act
    //         instance = shallowMount(ContentCards, {
    //             propsData: {
    //                 apiKey,
    //                 userId,
    //                 testId
    //             }
    //         });
    //         instance.vm.metadataContentCards(cards);
    //         await instance.vm.$nextTick();
    //     });
    //
    //     it('should generate test id attribute on content cards container', async () => {
    //         // Assert
    //         expect(instance.find(`[data-test-id=${testId}]`).exists()).toBeTruthy();
    //     });
    //
    //     it('should generate test id attributes on child content cards components', async () => {
    //         // Assert
    //         expect(instance.find(`[data-test-id="ContentCard-${testId}-0"]`).exists()).toBeTruthy();
    //         expect(instance.find(`[data-test-id="ContentCard-${testId}-1"]`).exists()).toBeTruthy();
    //         expect(instance.find(`[data-test-id="ContentCard-${testId}-2"]`).exists()).toBeTruthy();
    //     });
    // });

    // it('should not generate test id attribute on self or children when no test id provided', async () => {
    //     // Arrange
    //     const cardTypes = ['Promotion_Card_1', 'Promotion_Card_2', 'Post_Order_Card_1'];
    //     const cards = createMetadataCards(cardTypes);
    //
    //     // Act
    //     const instance = shallowMount(ContentCards, {
    //         propsData: {
    //             apiKey,
    //             userId
    //         }
    //     });
    //     instance.vm.metadataContentCards(cards);
    //     await instance.vm.$nextTick();
    //
    //     // Assert
    //     expect(instance.find('[data-test-id]').exists()).toBeFalsy();
    // });
});

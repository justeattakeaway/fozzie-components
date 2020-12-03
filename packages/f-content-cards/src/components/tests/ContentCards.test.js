/* eslint indent: ["error", 4, {ignoredNodes: ["TemplateLiteral > *"]}] */
import { shallowMount, mount } from '@vue/test-utils';
import Vue from 'vue';
import initialiseMetadata from '@justeat/f-metadata';
import ContentCards, { CARDSOURCE_METADATA, CARDSOURCE_CUSTOM } from '../ContentCards.vue';
import cardTemplates from '../cardTemplates';
import CardContainer from '../cardTemplates/CardContainer.vue';
import HomePromotionCard1 from '../cardTemplates/homePromotionCard/HomePromotionCard1.vue';
import HomePromotionCard2 from '../cardTemplates/homePromotionCard/HomePromotionCard2.vue';

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

const createMetadataCardsGrouped = cardTypes => cardTypes.reduce((acc, type) => {
    const card = createCard(type);

    if (type === 'Header_Card' || type === 'Terms_And_Conditions_Card') {
        return [...acc, { ...card, cards: [] }];
    }
    if (!acc.length) {
        return [{ title: '', cards: [card] }];
    }
    acc[acc.length - 1].cards.push(card);
    return acc;
}, []);

beforeEach(() => {
    jest.resetAllMocks();
    initialiseMetadata.mockResolvedValue(metadataDispatcher);
});

describe('ContentCards', () => {
    allure.feature('Content Cards');
    it('should emit a custom content callback when mounted', () => {
        // Arrange & Act
        const instance = shallowMount(ContentCards, {
            propsData: {
                apiKey,
                userId
            }
        });

        // Assert
        expect(instance.emitted()['custom-cards-callback']).toBeTruthy(); // Correct event emitted
        expect(instance.emitted()['custom-cards-callback'].length).toBe(1); // Once
        expect(instance.emitted()['custom-cards-callback'][0].length).toBe(1); // With one argument
        expect(instance.emitted()['custom-cards-callback'][0][0]).toBeInstanceOf(Function); // That is a callback
    });

    it('should call intitialiseMetadata when mounted', () => {
        // Arrange & Act
        shallowMount(ContentCards, {
            propsData: {
                apiKey,
                userId
            }
        });

        // Assert
        const [[settings]] = initialiseMetadata.mock.calls;
        expect(settings.apiKey).toBe(apiKey);
        expect(settings.userId).toBe(userId);
        expect(settings.enableLogging).toBe(false);
    });

    it('should handle rejections from the promise returned by intitialiseMetadata by emitting an onError event', async () => {
        // Arrange
        initialiseMetadata.mockReset();
        const error = new Error('foo');
        initialiseMetadata.mockRejectedValue(error);

        // Act
        const instance = shallowMount(ContentCards, {
            propsData: {
                apiKey,
                userId
            }
        });
        await instance.vm.$nextTick();

        // Assert
        expect(instance.emitted()['on-error']).toBeTruthy();
        expect(instance.emitted()['on-error'].length).toBe(1);
        expect(instance.emitted()['on-error'][0]).toEqual([error]);
    });

    it('should format and display allowed card types', async () => {
        // Arrange
        const cardTypes = ['Promotion_Card_1', 'Promotion_Card_2', 'Post_Order_Card_1'];
        const cards = createMetadataCards(cardTypes);

        // Act
        const instance = shallowMount(ContentCards, {
            propsData: {
                apiKey,
                userId
            }
        });
        instance.vm.metadataContentCards(cards);
        await instance.vm.$nextTick();

        // Assert
        expect(instance.findAllComponents(cardTemplates.PromotionCard).length).toBe(2);
        expect(instance.findAllComponents(cardTemplates.PostOrderCard).length).toBe(1);
    });


    it('should format and display injected custom cards', async () => {
        // Arrange
        const cardTypes = ['Post_Order_Card_1'];
        const cards = createMetadataCards(cardTypes);

        // Act
        const instance = shallowMount(ContentCards, {
            propsData: {
                apiKey,
                userId
            }
        });
        instance.vm.customContentCards(cards);
        await instance.vm.$nextTick();

        // Assert
        expect(instance.findAllComponents(cardTemplates.PostOrderCard).length).toBe(1);
    });

    it.each`
            type                             | component
            ${'Anniversary_Card_1'}          | ${'VoucherCard'}
            ${'Voucher_Card_1'}              | ${'VoucherCard'}
            ${'Restaurant_FTC_Offer_Card'}   | ${'FirstTimeCustomerCard'}
            ${'Post_Order_Card_1'}           | ${'PostOrderCard'}
            ${'Promotion_Card_1'}            | ${'PromotionCard'}
            ${'Promotion_Card_2'}            | ${'PromotionCard'}
            ${'Terms_And_Conditions_Card'}   | ${'TermsAndConditionsCard'}
            ${'Terms_And_Conditions_Card_2'} | ${'TermsAndConditionsCard'}
            ${'Home_Promotion_Card_1'}       | ${'HomePromotionCard1'}
            ${'Home_Promotion_Card_2'}       | ${'HomePromotionCard2'}
        `('should map `$type` card type to `$component` component', async ({ type, component }) => {
        // Arrange
        const cardTypes = [type];
        const cards = createMetadataCards(cardTypes);

        // Act
        const instance = shallowMount(ContentCards, {
            propsData: {
                apiKey,
                userId
            }
        });
        instance.vm.metadataContentCards(cards);
        await instance.vm.$nextTick();

        // Assert
        expect(instance.findAllComponents(cardTemplates[component]).length).toBe(1);
    });

    it('should not render invalid card types as components', async () => {
        // Arrange
        const cardTypes = ['INVALID'];
        const cards = createMetadataCards(cardTypes);

        // Act
        const instance = shallowMount(ContentCards, {
            propsData: {
                apiKey,
                userId,
                testId: 'empty-content-cards'
            }
        });
        instance.vm.metadataContentCards(cards);
        await instance.vm.$nextTick();

        // Assert
        expect(() => instance.get('[data-test-id="empty-content-cards"] *')).toThrowError();
    });

    describe('loading state', () => {
        it('should show a skeleton loading card before Metadata has initialised', async () => {
            // Arrange
            const { SkeletonLoader } = cardTemplates;

            // Act
            const instance = shallowMount(ContentCards, {
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
            const instance = shallowMount(ContentCards, {
                propsData: {
                    apiKey,
                    userId
                }
            });
            instance.vm.metadataContentCards(cards);
            await instance.vm.$nextTick();

            // Assert
            expect(instance.findComponent(SkeletonLoader).exists()).toBe(false);
        });

        it('should NOT show a skeleton loading card whilst initialising Metadata if "showLoadingState" prop is false"', async () => {
            // Arrange
            const showLoadingState = false;
            const { SkeletonLoader } = cardTemplates;

            // Act
            const instance = shallowMount(ContentCards, {
                propsData: {
                    apiKey,
                    userId,
                    showLoadingState
                }
            });

            // Assert
            expect(instance.findComponent(SkeletonLoader).exists()).toBe(false);
        });

        it('should default to "promo" skeleton loading card', () => {
            // Assemble & Act
            const instance = shallowMount(ContentCards, {
                propsData: {
                    apiKey,
                    userId
                }
            });

            // Assert
            expect(instance.vm.$data.loadingCard).toEqual({ type: 'promo', count: 3 });
        });

        it('should request a "postOrder" skeleton loading card when all card types are "Post_Order_Card_1"', () => {
            // Arrange
            const enabledCardTypes = ['Post_Order_Card_1'];

            // Act
            const instance = shallowMount(ContentCards, {
                propsData: {
                    apiKey,
                    userId,
                    enabledCardTypes
                }
            });

            // Assert
            expect(instance.vm.$data.loadingCard).toEqual({ type: 'postOrder', count: 1 });
        });
    });

    it('should call logCardImpressions from f-metadata with data from all displayed cards', async () => {
        // Arrange
        const cardTypes = ['Promotion_Card_1', 'Promotion_Card_2', 'Post_Order_Card_1'];
        const cards = createMetadataCards(cardTypes);

        // Act
        const instance = shallowMount(ContentCards, {
            propsData: {
                apiKey,
                userId
            }
        });
        instance.vm.metadataContentCards(cards);
        await instance.vm.$nextTick();

        // Assert
        expect(metadataDispatcher.logCardImpressions).toHaveBeenCalledWith(cards.map(card => card.id));
    });

    describe('when mounting descendants', () => {
        const pushToDataLayer = jest.fn();

        const arrange = async () => {
            const PromotionCard = Vue.extend({
                template: '<div data-promotion-card="true"></div>',
                inject: ['emitCardClick', 'emitCardView', 'emitVoucherCodeClick']
            });
            const cardTypes = ['Promotion_Card_1', 'Promotion_Card_2', 'Post_Order_Card_1'];
            const cards = createMetadataCards(cardTypes);
            const instance = shallowMount(ContentCards, {
                propsData: {
                    apiKey,
                    userId,
                    pushToDataLayer
                },
                stubs: {
                    PromotionCard
                }
            });
            const cardClickHandler = jest.spyOn(instance.vm._provided, 'emitCardClick');
            const cardViewHandler = jest.spyOn(instance.vm._provided, 'emitCardView');
            const voucherCodeClickHandler = jest.spyOn(instance.vm._provided, 'emitVoucherCodeClick');
            instance.vm.metadataContentCards(cards);
            await instance.vm.$nextTick();

            return {
                instance,
                cardClickHandler,
                cardViewHandler,
                voucherCodeClickHandler
            };
        };

        it('should provide a view handler', async () => {
            const { instance, cardViewHandler } = await arrange();
            const cardViewDetails = createCard('Post_Order_Card_1');
            cardViewHandler.mockImplementation(() => {});

            // Act
            instance.find('[data-promotion-card="true"]').vm.emitCardView(cardViewDetails);

            // Assert
            expect(cardViewHandler).toHaveBeenCalledWith(cardViewDetails);
        });

        describe('the view handler, for a metadata card', () => {
            it('should push a correctly-formed tracking event to the data layer', async () => {
                const { instance } = await arrange();
                const cardViewDetails = {
                    source: CARDSOURCE_METADATA,
                    ...createCard('Post_Order_Card_1')
                };

                // Act
                instance.find('[data-promotion-card="true"]').vm.emitCardView(cardViewDetails);

                // Assert
                expect(metadataDispatcher.pushShapedEventToDataLayer).toHaveBeenCalledWith(pushToDataLayer, {
                    contentId: id,
                    contentAction: 'view',
                    contentType: 'contentCard',
                    contentTitle: title,
                    contentPosition: order,
                    contentCTA: button,
                    customVoucherCode: voucherCode
                });
            });
        });

        describe('the view handler, for a card with invalid source', () => {
            it('should throw an error', async () => {
                const { instance } = await arrange();
                const cardViewDetails = {
                    source: 'invalid',
                    ...createCard('Post_Order_Card_1')
                };

                // Act
                expect(() => {
                    instance.find('[data-promotion-card="true"]').vm.emitCardView(cardViewDetails);
                })
                // Assert
                    .toThrowError();
            });
        });

        describe('the view handler, for a card with custom source', () => {
            it('should not throw an error', async () => {
                // Arrange
                const { instance } = await arrange();
                const cardViewDetails = {
                    source: CARDSOURCE_CUSTOM,
                    ...createCard('Post_Order_Card_1')
                };

                // Act
                expect(() => {
                    instance.find('[data-promotion-card="true"]').vm.emitCardView(cardViewDetails);
                })
                // Assert
                    .not.toThrowError();
            });

            it('should push a correctly-formed tracking event to the data layer', async () => {
                const { instance } = await arrange();
                const cardViewDetails = {
                    source: CARDSOURCE_CUSTOM,
                    ...createCard('Post_Order_Card_1')
                };

                // Act
                instance.find('[data-promotion-card="true"]').vm.emitCardView(cardViewDetails);

                // Assert
                expect(pushToDataLayer).toHaveBeenCalledWith({
                    event: 'Promotion',
                    custom: {
                        Promotion: {
                            name: headline,
                            type: 'justeat_contentCard',
                            id: null,
                            voucher: null,
                            action: 'view',
                            cta: button
                        }
                    }
                });
            });
        });

        it('should provide a click handler', async () => {
            const { instance, cardClickHandler } = await arrange();
            const cardClickDetails = createCard('Post_Order_Card_1');
            cardClickHandler.mockImplementation(() => {});

            // Act
            instance.find('[data-promotion-card="true"]').vm.emitCardClick(cardClickDetails);

            // Assert
            expect(cardClickHandler).toHaveBeenCalledWith(cardClickDetails);
        });

        describe('the click handler, for a metadata card', () => {
            it('should push a correctly-formed tracking event to the data layer', async () => {
                const { instance } = await arrange();
                const cardClickDetails = {
                    source: CARDSOURCE_METADATA,
                    ...createCard('Post_Order_Card_1')
                };

                // Act
                instance.find('[data-promotion-card="true"]').vm.emitCardClick(cardClickDetails);

                // Assert
                expect(metadataDispatcher.pushShapedEventToDataLayer).toHaveBeenCalledWith(pushToDataLayer, {
                    contentId: id,
                    contentAction: 'click',
                    contentType: 'contentCard',
                    contentTitle: title,
                    contentPosition: order,
                    contentCTA: button,
                    customVoucherCode: voucherCode
                });
            });

            it('should log a card click event with metadata', async () => {
                const { instance } = await arrange();
                const cardClickDetails = {
                    source: CARDSOURCE_METADATA,
                    id: 'foo'
                };

                // Act
                instance.find('[data-promotion-card="true"]').vm.emitCardClick(cardClickDetails);

                // Assert
                expect(metadataDispatcher.logCardClick).toHaveBeenCalledWith('foo');
            });
        });

        describe('the click handler, for a card with invalid source', () => {
            it('should throw an error', async () => {
                const { instance } = await arrange();
                const cardClickDetails = {
                    source: 'invalid',
                    ...createCard('Post_Order_Card_1')
                };

                // Act
                expect(() => {
                    instance.find('[data-promotion-card="true"]').vm.emitCardClick(cardClickDetails);
                })
                // Assert
                    .toThrowError();
            });
        });

        describe('the click handler, for a card with custom source', () => {
            it('should not throw an error', async () => {
                const { instance } = await arrange();
                const cardClickDetails = {
                    source: CARDSOURCE_CUSTOM,
                    ...createCard('Post_Order_Card_1')
                };

                // Act
                expect(() => {
                    instance.find('[data-promotion-card="true"]').vm.emitCardClick(cardClickDetails);
                })
                // Assert
                    .not.toThrowError();
            });

            it('should push a correctly-formed tracking event to the data layer', async () => {
                const { instance } = await arrange();
                const cardViewDetails = {
                    source: CARDSOURCE_CUSTOM,
                    ...createCard('Post_Order_Card_1')
                };

                // Act
                instance.find('[data-promotion-card="true"]').vm.emitCardClick(cardViewDetails);

                // Assert
                expect(pushToDataLayer).toHaveBeenCalledWith({
                    event: 'Promotion',
                    custom: {
                        Promotion: {
                            name: headline,
                            type: 'justeat_contentCard',
                            id: null,
                            voucher: null,
                            action: 'click',
                            cta: button
                        }
                    }
                });
            });
        });

        it('should provide a voucher code copied handler', async () => {
            const { instance, voucherCodeClickHandler } = await arrange();

            // Act
            instance.find('[data-promotion-card="true"]').vm.emitVoucherCodeClick(url);

            // Assert
            expect(voucherCodeClickHandler).toHaveBeenCalledWith(url);
        });

        describe('the voucher code copied handler', () => {
            it('should emit a voucherCodeClick event', async () => {
                const { instance } = await arrange();

                // Act
                instance.find('[data-promotion-card="true"]').vm.emitVoucherCodeClick(url);

                // Assert
                expect(instance.emitted().voucherCodeClick).toBeTruthy();
                expect(instance.emitted().voucherCodeClick.length).toBe(1);
                expect(instance.emitted().voucherCodeClick[0]).toEqual([{
                    url
                }]);
            });
        });
    });

    describe('when test id prop provided', () => {
        const testId = 'foo';
        let instance;

        beforeEach(async () => {
            // Arrange
            const cardTypes = ['Promotion_Card_1', 'Promotion_Card_2', 'Post_Order_Card_1'];
            const cards = createMetadataCards(cardTypes);
            initialiseMetadata.mockResolvedValue(metadataDispatcher);

            // Act
            instance = shallowMount(ContentCards, {
                propsData: {
                    apiKey,
                    userId,
                    testId
                }
            });
            instance.vm.metadataContentCards(cards);
            await instance.vm.$nextTick();
        });

        it('should generate test id attribute on content cards container', async () => {
            // Assert
            expect(instance.find(`[data-test-id=${testId}]`).exists()).toBeTruthy();
        });

        it('should generate test id attributes on child content cards components', async () => {
            // Assert
            expect(instance.find(`[data-test-id="ContentCard-${testId}-0"]`).exists()).toBeTruthy();
            expect(instance.find(`[data-test-id="ContentCard-${testId}-1"]`).exists()).toBeTruthy();
            expect(instance.find(`[data-test-id="ContentCard-${testId}-2"]`).exists()).toBeTruthy();
        });
    });

    it('should not generate test id attribute on self or children when no test id provided', async () => {
        // Arrange
        const cardTypes = ['Promotion_Card_1', 'Promotion_Card_2', 'Post_Order_Card_1'];
        const cards = createMetadataCards(cardTypes);

        // Act
        const instance = shallowMount(ContentCards, {
            propsData: {
                apiKey,
                userId
            }
        });
        instance.vm.metadataContentCards(cards);
        await instance.vm.$nextTick();

        // Assert
        expect(instance.find('[data-test-id]').exists()).toBeFalsy();
    });

    describe('emitters', () => {
        const cards = createMetadataCards(['Post_Order_Card_1']);

        const testEmitter = async (emitter, expectedArgs) => {
            // Arrange
            const instance = await shallowMount(ContentCards, {
                propsData: {
                    apiKey,
                    userId
                }
            });

            // Act
            await instance.vm.metadataContentCards(cards);

            // Assert
            const [calls] = instance.emitted()[emitter];
            const [args] = calls;

            expect(calls.length).toBe(1);
            expect(args).toEqual(expectedArgs);
        };

        it('should emit an event containing the global appboy instance when appboy is initialised', async () => {
            // Arrange
            const appboy = '__APPBOY__';
            window.appboy = appboy;

            await testEmitter('on-metadata-init', appboy);
        });

        it('should emit an event containing the content card count when appboy is initialised', async () => {
            await testEmitter('get-card-count', 1);
        });

        it('should emit an event containing the loading status when appboy is initialised', async () => {
            await testEmitter('has-loaded', true);
        });
    });

    describe('when `cardLimit` prop is set', () => {
        const cardTypes = ['Promotion_Card_1', 'Promotion_Card_2', 'Post_Order_Card_1'];
        const cards = createMetadataCards(cardTypes);

        const mountWithArguments = async (cardLimit, ingestedCards = cards, enabledCardTypes = cardTypes) => {
            const instance = mount(ContentCards, {
                propsData: {
                    apiKey,
                    userId,
                    cardLimit,
                    enabledCardTypes
                }
            });
            instance.vm.metadataContentCards(ingestedCards);
            await instance.vm.$nextTick();
            return instance;
        };

        it('should retain all cards if count is -1', async () => {
            // Act
            const component = await mountWithArguments(-1);

            // Assert
            const allCards = component.findComponent(ContentCards).findAllComponents(CardContainer);
            expect(allCards).toHaveLength(cardTypes.length);
        });

        it('should limit cards by the given count', async () => {
            // Act
            const component = await mountWithArguments(2);

            // Assert
            const allCards = component.findComponent(ContentCards).findAllComponents(CardContainer);
            expect(allCards).toHaveLength(2);
        });

        it('should apply card limits using enabledCardType order when limit is set to 1 - Correct card first', async () => {
            // Arrange
            const enabledCardTypes = ['Home_Promotion_Card_1', 'Home_Promotion_Card_2'];
            const orderedCards = createMetadataCards(['Home_Promotion_Card_1', 'Home_Promotion_Card_2']);

            // Act
            const component = await mountWithArguments(1, orderedCards, enabledCardTypes);

            // Assert
            expect(component.findComponent(ContentCards).findAllComponents(HomePromotionCard1)).toHaveLength(1);
            expect(component.findComponent(ContentCards).findAllComponents(HomePromotionCard2)).toHaveLength(1); // HPC2 is nested within HPC1
        });

        it('should apply card limits using enabledCardType order when limit is set to 1 - Correct card last', async () => {
            // Arrange
            const enabledCardTypes = ['Home_Promotion_Card_2', 'Home_Promotion_Card_1'];
            const orderedCards = createMetadataCards(['Home_Promotion_Card_1', 'Home_Promotion_Card_2']);

            // Act
            const component = await mountWithArguments(1, orderedCards, enabledCardTypes);

            // Assert
            expect(component.findComponent(ContentCards).findAllComponents(HomePromotionCard1)).toHaveLength(0);
            expect(component.findComponent(ContentCards).findAllComponents(HomePromotionCard2)).toHaveLength(1);
        });
    });

    describe('when `groupCards` prop is set', () => {
        it('should group cards by Header_Card or Terms_And_Conditions_Card', async () => {
            // Arrange
            const cardTypes = ['Post_Order_Card_1', 'Header_Card', 'Post_Order_Card_1', 'Post_Order_Card_1', 'Header_Card', 'Post_Order_Card_1', 'Post_Order_Card_1'];
            const cardsGrouped = createMetadataCardsGrouped(cardTypes);

            // Act
            const instance = shallowMount(ContentCards, {
                propsData: {
                    apiKey,
                    userId,
                    groupCards: true
                }
            });
            instance.vm.metadataContentCardsGrouped(cardsGrouped);
            await instance.vm.$nextTick();
            const postOrderCards = instance.findAllComponents(cardTemplates.PostOrderCard);
            const [, { id: groupId1, title: title1Text }, { id: groupId2, title: title2Text }] = cardsGrouped;
            const title1 = instance.find(`[data-test-id="${1}_${groupId1}"]`);
            const title2 = instance.find(`[data-test-id="${2}_${groupId2}"]`);

            // Assert - one for each child
            expect(postOrderCards).toHaveLength(5);
            expect(title1.text()).toBe(title1Text);
            expect(title2.text()).toBe(title2Text);
        });

        it('should emit an event with the grouped content card count of 3 when appboy is initialised', async () => {
            // Arrange
            const cardTypes = ['Post_Order_Card_1', 'Header_Card', 'Post_Order_Card_1', 'Post_Order_Card_1', 'Header_Card', 'Post_Order_Card_1', 'Post_Order_Card_1'];
            const cardsGrouped = createMetadataCardsGrouped(cardTypes);

            // Act
            const instance = shallowMount(ContentCards, {
                propsData: {
                    apiKey,
                    userId,
                    groupCards: true
                }
            });
            instance.vm.metadataContentCardsGrouped(cardsGrouped);
            await instance.vm.$nextTick();

            // Assert
            expect(instance.emitted('get-group-count')[0]).toEqual([3]);
        });

        it('should call logCardImpressions from f-metadata with data from all displayed cards including the header cards minus the groups with no ID', async () => {
            // Arrange
            const cardTypes = ['Post_Order_Card_1', 'Header_Card', 'Post_Order_Card_1', 'Post_Order_Card_1', 'Header_Card', 'Post_Order_Card_1', 'Post_Order_Card_1'];
            const cardsGrouped = createMetadataCardsGrouped(cardTypes);

            // Act
            const instance = shallowMount(ContentCards, {
                propsData: {
                    apiKey,
                    userId,
                    groupCards: true
                }
            });
            instance.vm.metadataContentCardsGrouped(cardsGrouped);
            await instance.vm.$nextTick();

            const cardsReduced = cardsGrouped.reduce((acc, { cards, id: groupId }) => [...acc, ...[groupId, ...cards.map(({ id: cardId }) => cardId)]], []).filter(cardID => cardID !== undefined);

            // Assert - Check to see all card Id's are present excluding cards with with no ID
            expect(metadataDispatcher.logCardImpressions).toHaveBeenCalledWith(cardsReduced);
        });

        it('should call logCardImpressions from f-metadata ONCE and make sure the normal logCardImpressions from cards watcher is not being fired when the groupCards prop is set to true', async () => {
            // Arrange
            const cardTypes = ['Post_Order_Card_1', 'Header_Card', 'Post_Order_Card_1', 'Post_Order_Card_1', 'Header_Card', 'Post_Order_Card_1', 'Post_Order_Card_1'];
            const cardsGrouped = createMetadataCardsGrouped(cardTypes);

            // Act
            const instance = shallowMount(ContentCards, {
                propsData: {
                    apiKey,
                    userId,
                    groupCards: true
                }
            });
            instance.vm.metadataContentCardsGrouped(cardsGrouped);
            await instance.vm.$nextTick();

            // Assert
            expect(metadataDispatcher.logCardImpressions).toHaveBeenCalledTimes(1);
        });

        it('should generate test id attributes on child content cards components within a group', async () => {
            // Arrange
            const testId = 'foo';
            const cardTypes = ['Post_Order_Card_1', 'Header_Card', 'Post_Order_Card_1', 'Post_Order_Card_1', 'Header_Card', 'Post_Order_Card_1', 'Post_Order_Card_1'];
            const cardsGrouped = createMetadataCardsGrouped(cardTypes);

            // Act
            const instance = shallowMount(ContentCards, {
                propsData: {
                    apiKey,
                    userId,
                    groupCards: true,
                    testId
                }
            });
            instance.vm.metadataContentCardsGrouped(cardsGrouped);
            await instance.vm.$nextTick();

            // Assert
            expect(instance.find(`[data-test-id="ContentCard-${testId}-0-0"]`).exists()).toBeTruthy();
            expect(instance.find(`[data-test-id="ContentCard-${testId}-0-1"]`).exists()).toBeTruthy();
            expect(instance.find(`[data-test-id="ContentCard-${testId}-1-1"]`).exists()).toBeTruthy();
            expect(instance.find(`[data-test-id="ContentCard-${testId}-0-2"]`).exists()).toBeTruthy();
            expect(instance.find(`[data-test-id="ContentCard-${testId}-1-2"]`).exists()).toBeTruthy();
        });
    });
    describe('logging callback', () => {
        const testMessage = '__TEST_MESSAGE__';
        const testPayload = { test: 'PAYLOAD' };
        const testId = 'foo';

        it('should return a function with the correct logging parameters when callback is called', async () => {
            // Arrange
            const loggingType = 'logInfo';
            const instance = shallowMount(ContentCards, {
                propsData: {
                    apiKey,
                    userId,
                    groupCards: true,
                    testId
                },
                mocks: {
                    $logger: {
                        logInfo: jest.fn()
                    }
                }
            });

            // Act
            const loggingCallback = instance.vm.handleLogging(instance.vm.$logger);
            loggingCallback(loggingType, testMessage, testPayload);
            await instance.vm.$nextTick();

            // Assert
            expect(instance.vm.$logger.logInfo).toHaveBeenCalledWith(testMessage, null, testPayload);
        });
        it('should NOT return a function when the callback is called with incorrect logging type', async () => {
            // Arrange
            const loggingType = 'foo';
            const instance = shallowMount(ContentCards, {
                propsData: {
                    apiKey,
                    userId,
                    groupCards: true,
                    testId
                },
                mocks: {
                    $logger: {
                        logInfo: jest.fn()
                    }
                }
            });

            // Act
            const loggingCallback = instance.vm.handleLogging(instance.vm.$logger);
            loggingCallback(loggingType, testMessage, testPayload);
            await instance.vm.$nextTick();

            // Assert
            expect(instance.vm.$logger.logInfo).not.toHaveBeenCalled();
        });
    });
});

/* eslint indent: ["error", 4, {ignoredNodes: ["TemplateLiteral > *"]}] */
import { shallowMount } from '@vue/test-utils';
import Vue from 'vue';
import initialiseMetadata from '@justeat/f-metadata';
import ContentCards, { CARDSOURCE_METADATA, CARDSOURCE_CUSTOM } from '../ContentCards';

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

describe('ContentCards', () => {
    allure.feature('Content Cards');

    it('should call intitialiseMetadata when mounted', () => {
        // Arrange & Act
        shallowMount(ContentCards, {
            propsData: {
                apiKey,
                userId
            },
            scopedSlots: {
                default: '<div></div>'
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
            },
            scopedSlots: {
                default: '<div></div>'
            }
        });
        await instance.vm.$nextTick();

        // Assert
        expect(instance.emitted()['on-error']).toBeTruthy();
        expect(instance.emitted()['on-error'].length).toBe(1);
        expect(instance.emitted()['on-error'][0]).toEqual([error]);
    });

    it('should format and provide allowed card types', async () => {
        // Arrange
        const cardTypes = ['Promotion_Card_1', 'Promotion_Card_2', 'Post_Order_Card_1'];
        const cards = createMetadataCards(cardTypes);

        // Act
        const instance = shallowMount(ContentCards, {
            propsData: {
                apiKey,
                userId
            },
            scopedSlots: {
                default: `
                    <div slot-scope="{ cards }">
                        <div :data-test-id="card.type" v-for="card in cards"></div>
                    </div>
                `
            }
        });
        instance.vm.metadataContentCards(cards);
        await instance.vm.$nextTick();

        // Assert
        expect(instance.find('[data-test-id="Promotion_Card_1"]').exists()).toBe(true);
        expect(instance.find('[data-test-id="Promotion_Card_2"]').exists()).toBe(true);
        expect(instance.find('[data-test-id="Post_Order_Card_1"]').exists()).toBe(true);
    });


    it('should format and provide passed custom cards', async () => {
        // Arrange
        const cardTypes = ['Post_Order_Card_1'];
        const customCards = createMetadataCards(cardTypes);

        // Act
        const instance = shallowMount(ContentCards, {
            propsData: {
                apiKey,
                userId,
                customCards
            },
            scopedSlots: {
                default: `
                    <div slot-scope="{ cards }">
                        <div :data-test-id="card.type" v-for="card in cards"></div>
                    </div>
                `
            }
        });
        instance.vm.metadataContentCards([]);
        await instance.vm.$nextTick();

        console.log(instance.html());

        // Assert
        expect(instance.find('[data-test-id="Post_Order_Card_1"]').exists()).toBe(true);
    });

    describe('loading state', () => {
        it('should emit a "has-loaded" event when cards have loaded', async () => {
            // Arrange
            const cardTypes = ['Promotion_Card_1', 'Promotion_Card_2', 'Post_Order_Card_1'];
            const cards = createMetadataCards(cardTypes);

            // Act
            const instance = shallowMount(ContentCards, {
                propsData: {
                    apiKey,
                    userId
                },
                scopedSlots: {
                    default: `
                    <div slot-scope="{ cards }">
                        <div :data-test-id="card.type" v-for="card in cards"></div>
                    </div>
                `
                }
            });
            instance.vm.metadataContentCards(cards);
            await instance.vm.$nextTick();

            // Assert
            expect(instance.emitted()['has-loaded']).toBeTruthy();
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
            },
            scopedSlots: {
                default: `
                    <div slot-scope="{ cards }">
                        <div :data-test-id="card.type" v-for="card in cards"></div>
                    </div>
                `
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
                },
                scopedSlots: {
                    default: `
                        <div slot-scope="{ cards }">
                            <promotion-card v-for="(card, i) in cards" :key="i"></promotion-card>
                        </div>
                    `
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

    describe('emitters', () => {
        const cards = createMetadataCards(['Post_Order_Card_1']);

        const testEmitter = async (emitter, expectedArgs) => {
            // Arrange
            const instance = await shallowMount(ContentCards, {
                propsData: {
                    apiKey,
                    userId
                },
                scopedSlots: {
                    default: `
                        <div slot-scope="{ cards }">
                            <div :data-test-id="card.type" v-for="card in cards"></div>
                        </div>
                    `
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
                },
                scopedSlots: {
                    default: `
                        <div slot-scope="{ cards }">
                            <div :data-test-id="card.type" v-for="card in cards"></div>
                        </div>
                    `
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
                },
                scopedSlots: {
                    default: `
                        <div slot-scope="{ cards }">
                            <div :data-test-id="card.type" v-for="card in cards"></div>
                        </div>
                    `
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

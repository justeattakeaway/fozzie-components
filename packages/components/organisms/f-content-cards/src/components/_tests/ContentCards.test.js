/* eslint indent: ["error", 4, {ignoredNodes: ["TemplateLiteral > *"]}] */
import { shallowMount, mount } from '@vue/test-utils';
import Vue from 'vue';
import BrazeAdapter from '@justeat/f-braze-adapter';
import ContentCards, {
    CARDSOURCE_METADATA,
    CARDSOURCE_CUSTOM,
    STATE_NO_CARDS,
    STATE_DEFAULT,
    STATE_ERROR,
    STATE_LOADING
} from '../ContentCards';
import {
    GET_CARD_COUNT,
    HAS_LOADED,
    ON_ERROR,
    ON_METADATA_INIT,
    VOUCHER_CODE_CLICK
} from '../../events';

jest.mock('@justeat/f-braze-adapter');

const apiKey = '__API_KEY__';
const userId = '__USER_ID__';
const testId = '__TEST_ID__';

const url = '__URL__';
const button = '__BUTTON__';
const description = '__DESCRIPTION__';
const headline = '__HEADLINE__';
const title = '__TITLE__';
const voucherCode = '__VOUCHERCODE__';
const order = '__ORDER__';
const id = btoa('ABC123');

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

const scopedSlots = {
    [STATE_NO_CARDS]: `<div data-test-id="slot-${STATE_NO_CARDS}"/>`,
    [STATE_DEFAULT]: `
        <div data-test-id="slot-${STATE_NO_CARDS}" slot-scope="{ cards }">
            <div :data-test-id="card.type" v-for="card in cards"></div>
        </div>
    `,
    [STATE_ERROR]: `<div data-test-id="slot-${STATE_ERROR}"/>`,
    [STATE_LOADING]: `<div data-test-id="slot-${STATE_LOADING}"/>`
};

beforeEach(() => {
    jest.resetAllMocks();
});

describe('ContentCards', () => {
    it('should call BrazeAdapter when mounted', () => {
        // Arrange & Act
        const wrapper = shallowMount(ContentCards, {
            propsData: {
                apiKey,
                userId
            },
            scopedSlots: {
                default: '<div></div>'
            }
        });

        // Assert
        expect(wrapper.vm.brazeAdapter).toBeInstanceOf(BrazeAdapter);
    });



    describe('when a error is thrown from the instantiation of BrazeAdapter during loading', () => {
        const error = new Error('foo');
        let instance;

        beforeEach(async () => {
            // Arrange
            BrazeAdapter.mockReset();
            BrazeAdapter.mockImplementation(() => {
                throw error;
            });

            // Act
            instance = shallowMount(ContentCards, {
                propsData: {
                    apiKey,
                    userId
                },
                scopedSlots: {
                    default: '<div></div>'
                }
            });
            await instance.vm.$nextTick();
        });

        it(`should emit an "${ON_ERROR}" event`, () => {
            // Assert
            expect(instance.emitted()[ON_ERROR]).toBeTruthy();
            expect(instance.emitted()[ON_ERROR].length).toBe(1);
            expect(instance.emitted()[ON_ERROR][0]).toEqual([error]);
        });

        it('should display the "error" slot', () => {
            // Assert
            expect(instance.find('[data-test-id="slot-error"]').exists).toBeTruthy();
        });
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
            scopedSlots
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
        const instance = mount({
            name: 'shell-stub',
            components: {
                ContentCards
            },
            data () {
                return {
                    customCards: []
                };
            },
            methods: {
                async testCustomCards () {
                    this.$children[0].metadataContentCards([]);
                    await this.$nextTick();
                    this.customCards = customCards;
                    await this.$nextTick();
                }
            },
            template: `
                <content-cards
                    api-key="${apiKey}"
                    user-id="${userId}"
                    :custom-cards="customCards"
                    #default="{ cards }">
                    <div :data-test-id="card.type" v-for="card in cards"></div>
                </content-cards>
            `
        });

        // Act
        await instance.vm.testCustomCards();

        // Assert
        expect(instance.find('[data-test-id="Post_Order_Card_1"]').exists()).toBe(true);
    });

    describe('loading state', () => {
        describe('before cards have loaded', () => {
            let instance;

            beforeEach(async () => {
                // Arrange & Act
                instance = shallowMount(ContentCards, {
                    propsData: {
                        apiKey,
                        userId,
                        testId
                    },
                    scopedSlots
                });
            });

            it(`should not emit a "${HAS_LOADED}" event`, () => {
                // Assert
                expect(instance.emitted()[HAS_LOADED]).toBeFalsy();
            });

            it('should display the "loading" slot', () => {
                // Assert
                expect(instance.find('[data-test-id="slot-loading"]').exists).toBeTruthy();
            });
        });

        describe('when the card source instance has returned an empty array', () => {
            let instance;

            beforeEach(async () => {
                // Arrange
                instance = shallowMount(ContentCards, {
                    propsData: {
                        apiKey,
                        userId,
                        testId
                    },
                    scopedSlots
                });

                // Act
                instance.vm.metadataContentCards([]);
                await instance.vm.$nextTick();
            });

            it(`should emit a "${GET_CARD_COUNT}" event with \`0\` as payload`, () => {
                // Assert
                expect(instance.emitted()[GET_CARD_COUNT]).toBeTruthy();
                expect(instance.emitted()[GET_CARD_COUNT][0][0]).toBe(0);
            });

            it('should display the "no-cards" slot', () => {
                // Assert
                expect(instance.find('[data-test-id="slot-no-cards"]').exists).toBeTruthy();
            });
        });

        describe('when cards have loaded', () => {
            let instance;

            beforeEach(async () => {
                // Arrange
                const cardTypes = ['Promotion_Card_1', 'Promotion_Card_2', 'Post_Order_Card_1'];
                const cards = createMetadataCards(cardTypes);

                // Act
                instance = shallowMount(ContentCards, {
                    propsData: {
                        apiKey,
                        userId,
                        testId
                    },
                    scopedSlots
                });
                instance.vm.metadataContentCards(cards);
                await instance.vm.$nextTick();
            });

            it(`should emit a "${HAS_LOADED}" event`, () => {
                // Assert
                expect(instance.emitted()[HAS_LOADED]).toBeTruthy();
            });

            it('should display the "default" slot', () => {
                // Assert
                expect(instance.find('[data-test-id="slot-default"]').exists).toBeTruthy();
            });
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
            scopedSlots
        });
        instance.vm.metadataContentCards(cards);
        await instance.vm.$nextTick();

        expect(BrazeAdapter).toHaveBeenCalled();

        // Assert
        expect(instance.vm.brazeAdapter.logCardImpressions).toHaveBeenCalledWith(cards.map(card => card.id));
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
                expect(instance.vm.brazeAdapter.pushShapedEventToDataLayer).toHaveBeenCalledWith(pushToDataLayer, {
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
                expect(instance.vm.brazeAdapter.pushShapedEventToDataLayer).toHaveBeenCalledWith(pushToDataLayer, {
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
                expect(instance.vm.brazeAdapter.logCardClick).toHaveBeenCalledWith('foo');
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
                expect(instance.emitted()[VOUCHER_CODE_CLICK]).toBeTruthy();
                expect(instance.emitted()[VOUCHER_CODE_CLICK].length).toBe(1);
                expect(instance.emitted()[VOUCHER_CODE_CLICK][0]).toEqual([{
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
                scopedSlots
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

            await testEmitter(ON_METADATA_INIT, appboy);
        });

        it('should emit an event containing the content card count when appboy is initialised', async () => {
            await testEmitter(GET_CARD_COUNT, 1);
        });

        it('should emit an event containing the loading status when appboy is initialised', async () => {
            await testEmitter(HAS_LOADED, true);
        });
    });

    describe('logging callback', () => {
        const testMessage = '__TEST_MESSAGE__';
        const testPayload = { test: 'PAYLOAD' };

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
                scopedSlots
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
                scopedSlots
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

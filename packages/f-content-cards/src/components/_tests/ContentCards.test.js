import { shallowMount } from '@vue/test-utils';
import Vue from 'vue';
import initialiseBraze, { logCardImpressions, logCardClick } from '@justeat/f-metadata';
import ContentCards from '../ContentCards.vue';
import cardTemplates from '../cardTemplates';

jest.mock('@justeat/f-metadata');

const apiKey = '__API_KEY__';
const userId = '__USER_ID__';

const url = '__URL__';
const button = '__BUTTON__';
const line1 = '__LINE_1__';
const description = '__DESCRIPTION__';
const title = '__TITLE__';
const voucherCode = '__VOUCHERCODE__';
const order = '__ORDER__';
const id = btoa('ABC123');

const createRawCard = type => ({
    id,
    url,
    button,
    description,
    title,
    extras: {
        order,
        button_1: button, // eslint-disable-line camelcase
        custom_card_type: type, // eslint-disable-line camelcase
        line_1: line1, // eslint-disable-line camelcase
        voucher_code: voucherCode // eslint-disable-line camelcase
    }
});

const createCard = type => ({
    id,
    url,
    ctaText: button,
    description,
    title,
    order,
    type,
    voucherCode
});

const createAppboyInstance = cardTypes => ({
    cards: cardTypes.map(type => createRawCard(type))
});

beforeEach(() => {
    jest.resetAllMocks();
});

describe('ContentCards', () => {
    it('should call intitialiseBraze when mounted', () => {
        // Arrange & Act
        shallowMount(ContentCards, {
            propsData: {
                apiKey,
                userId
            }
        });

        // Assert
        const [[settings]] = initialiseBraze.mock.calls;
        expect(settings.apiKey).toBe(apiKey);
        expect(settings.userId).toBe(userId);
        expect(settings.enableLogging).toBe(false);
    });

    it('should format and display allowed card types', async () => {
        // Arrange
        const cardTypes = ['Promotion_Card_1', 'Promotion_Card_2', 'Post_Order_Card_1'];
        const appboy = createAppboyInstance(cardTypes);

        // Act
        const instance = shallowMount(ContentCards, {
            propsData: {
                apiKey,
                userId
            }
        });
        instance.vm.contentCards(appboy);
        await instance.vm.$nextTick();

        // Assert
        expect(instance.findAllComponents(cardTemplates.PromotionCard).length).toBe(2);
        expect(instance.findAllComponents(cardTemplates.PostOrderCard).length).toBe(1);
    });

    describe('loading state', () => {
        it('should show a skeleton loading card before Braze has initialised', async () => {
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

        it('should hide the skeleton loading card after Braze has initialised', async () => {
            // Arrange
            const cardTypes = ['Promotion_Card_1', 'Promotion_Card_2', 'Post_Order_Card_1'];
            const appboy = createAppboyInstance(cardTypes);
            const { SkeletonLoader } = cardTemplates;

            // Act
            const instance = shallowMount(ContentCards, {
                propsData: {
                    apiKey,
                    userId
                }
            });
            instance.vm.contentCards(appboy);
            await instance.vm.$nextTick();

            // Assert
            expect(instance.findComponent(SkeletonLoader).exists()).toBe(false);
        });

        it('should NOT show a skeleton loading card whilst initialising Braze if "showLoadingState" prop is false"', async () => {
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
        const appboy = createAppboyInstance(cardTypes);

        // Act
        const instance = shallowMount(ContentCards, {
            propsData: {
                apiKey,
                userId
            }
        });
        instance.vm.contentCards(appboy);
        await instance.vm.$nextTick();

        // Assert
        expect(logCardImpressions).toHaveBeenCalledWith(appboy.cards);
    });

    describe('when mounting descendants', () => {
        const pushToDataLayer = jest.fn();

        const arrange = async () => {
            const PromotionCard = Vue.extend({
                template: '<div data-promotion-card="true"></div>',
                inject: ['emitCardClick', 'emitCardView', 'emitVoucherCodeClick']
            });
            const cardTypes = ['Promotion_Card_1', 'Promotion_Card_2', 'Post_Order_Card_1'];
            const appboy = createAppboyInstance(cardTypes);
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
            instance.vm.contentCards(appboy);
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

            // Act
            instance.find('[data-promotion-card="true"]').vm.emitCardView(cardViewDetails);

            // Assert
            expect(cardViewHandler).toHaveBeenCalledWith(cardViewDetails);
        });

        describe('the view handler', () => {
            it('should push a correctly-formed tracking event to the data layer', async () => {
                const { instance } = await arrange();
                const cardViewDetails = createCard('Post_Order_Card_1');

                // Act
                instance.find('[data-promotion-card="true"]').vm.emitCardView(cardViewDetails);

                // Assert
                expect(pushToDataLayer).toHaveBeenCalledWith({
                    event: 'BrazeContent',
                    custom: {
                        braze: {
                            contentId: id,
                            contentAction: 'view',
                            contentType: 'contentCard',
                            contentTitle: title,
                            contentPosition: order,
                            contentCTA: button,
                            customVoucherCode: voucherCode
                        }
                    }
                });
            });
        });

        it('should provide a click handler', async () => {
            const { instance, cardClickHandler } = await arrange();
            const cardClickDetails = createCard('Post_Order_Card_1');

            // Act
            instance.find('[data-promotion-card="true"]').vm.emitCardClick(cardClickDetails);

            // Assert
            expect(cardClickHandler).toHaveBeenCalledWith(cardClickDetails);
        });

        describe('the click handler', () => {
            it('should push a correctly-formed tracking event to the data layer', async () => {
                const { instance } = await arrange();
                const cardClickDetails = createCard('Post_Order_Card_1');

                // Act
                instance.find('[data-promotion-card="true"]').vm.emitCardClick(cardClickDetails);

                // Assert
                expect(pushToDataLayer).toHaveBeenCalledWith({
                    event: 'BrazeContent',
                    custom: {
                        braze: {
                            contentId: id,
                            contentAction: 'click',
                            contentType: 'contentCard',
                            contentTitle: title,
                            contentPosition: order,
                            contentCTA: button,
                            customVoucherCode: voucherCode
                        }
                    }
                });
            });

            it('should log a card click event with braze', async () => {
                const { instance } = await arrange();
                const cardClickDetails = 'foo';

                // Act
                instance.find('[data-promotion-card="true"]').vm.emitCardClick(cardClickDetails);

                // Assert
                expect(logCardClick).toHaveBeenCalledWith('foo');
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

        beforeAll(async () => {
            // Arrange
            const cardTypes = ['Promotion_Card_1', 'Promotion_Card_2', 'Post_Order_Card_1'];
            const appboy = createAppboyInstance(cardTypes);

            // Act
            instance = shallowMount(ContentCards, {
                propsData: {
                    apiKey,
                    userId,
                    testId
                }
            });
            instance.vm.contentCards(appboy);
            await instance.vm.$nextTick();
        });

        it('should generate test id attribute on content cards container', async () => {
            // Assert
            expect(instance.find(`[data-test-id=${testId}]`).exists()).toBeTruthy();
        });

        it('should generate test id attributes on child content cards components', async () => {
            // Assert
            expect(instance.find('[data-test-id="ContentCard-0"]').exists()).toBeTruthy();
            expect(instance.find('[data-test-id="ContentCard-1"]').exists()).toBeTruthy();
            expect(instance.find('[data-test-id="ContentCard-2"]').exists()).toBeTruthy();
        });
    });

    it('should not generate test id attribute on self or children when no test id provided', async () => {
        // Arrange
        const cardTypes = ['Promotion_Card_1', 'Promotion_Card_2', 'Post_Order_Card_1'];
        const appboy = createAppboyInstance(cardTypes);

        // Act
        const instance = shallowMount(ContentCards, {
            propsData: {
                apiKey,
                userId
            }
        });
        instance.vm.contentCards(appboy);
        await instance.vm.$nextTick();

        // Assert
        expect(instance.find('[data-test-id]').exists()).toBeFalsy();
    });

    describe('emitters', () => {
        const appboy = createAppboyInstance(['Post_Order_Card_1']);

        const testEmitter = async (emitter, expectedArgs) => {
            // Arrange & Act
            const instance = await shallowMount(ContentCards, {
                propsData: {
                    apiKey,
                    userId
                }
            });
            await instance.vm.contentCards(appboy);

            // Assert
            const [calls] = instance.emitted()[emitter];
            const [args] = calls;

            expect(calls.length).toBe(1);
            expect(args).toEqual(expectedArgs);
        };

        it('should emit an event containing the appboy instance when appboy is initialised', async () => {
            await testEmitter('on-braze-init', appboy);
        });

        it('should emit an event containing the content card count when appboy is initialised', async () => {
            await testEmitter('get-card-count', 1);
        });

        it('should emit an event containing the loading status when appboy is initialised', async () => {
            await testEmitter('has-loaded', true);
        });
    });
});

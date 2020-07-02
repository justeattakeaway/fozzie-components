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
const id = btoa('ABC123');

const createCard = type => ({
    id,
    url,
    button,
    description,
    extras: {
        button_1: button, // eslint-disable-line camelcase
        custom_card_type: type, // eslint-disable-line camelcase
        line_1: line1 // eslint-disable-line camelcase
    }
});

const createAppboyInstance = cardTypes => ({
    cards: cardTypes.map(type => createCard(type))
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
                inject: ['emitCardClick', 'emitCardView']
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
            instance.vm.contentCards(appboy);
            await instance.vm.$nextTick();

            return { instance, cardClickHandler, cardViewHandler };
        };

        it('should provide a view handler', async () => {
            const { instance, cardViewHandler } = await arrange();
            const cardViewDetails = { details: { message: 'bar' }, card: 'bar' };

            // Act
            instance.find('[data-promotion-card="true"]').vm.emitCardView(cardViewDetails);

            // Assert
            expect(cardViewHandler).toHaveBeenCalledWith(cardViewDetails);
        });

        describe('the view handler', () => {
            it('should push a correctly-formed tracking event to the data layer', async () => {
                const { instance } = await arrange();
                const cardViewDetails = {
                    details: {
                        message: 'bar',
                        messageAlignment: 'bang',
                        dg: 'baz',
                        buttons: [{}, {
                            text: 'Call to Arms!'
                        }]
                    },
                    card: 'bar'
                };

                // Act
                instance.find('[data-promotion-card="true"]').vm.emitCardView(cardViewDetails);

                // Assert
                expect(pushToDataLayer).toHaveBeenCalledWith({
                    event: 'BrazeContent',
                    custom: {
                        braze: {
                            contentAction: 'view',
                            contentType: 'inAppMessage',
                            contentTitle: 'bar',
                            contentPosition: 'bang',
                            contentCTA: 'Call to Arms!',
                            variantName: 'baz'
                        }
                    }
                });
            });
        });

        it('should provide a click handler', async () => {
            const { instance, cardClickHandler } = await arrange();
            const cardClickDetails = { details: { message: 'foo' }, card: 'foo' };

            // Act
            instance.find('[data-promotion-card="true"]').vm.emitCardClick(cardClickDetails);

            // Assert
            expect(cardClickHandler).toHaveBeenCalledWith(cardClickDetails);
        });

        describe('the click handler', () => {
            it('should push a correctly-formed tracking event to the data layer', async () => {
                const { instance } = await arrange();
                const cardClickDetails = {
                    details: {
                        message: 'foo',
                        messageAlignment: 'bar',
                        dg: 'baz',
                        buttons: [{}, {
                            text: 'Call to Arms!'
                        }]
                    },
                    card: 'foo'
                };

                // Act
                instance.find('[data-promotion-card="true"]').vm.emitCardClick(cardClickDetails);

                // Assert
                expect(pushToDataLayer).toHaveBeenCalledWith({
                    event: 'BrazeContent',
                    custom: {
                        braze: {
                            contentAction: 'click',
                            contentType: 'inAppMessage',
                            contentTitle: 'foo',
                            contentPosition: 'bar',
                            contentCTA: 'Call to Arms!',
                            variantName: 'baz'
                        }
                    }
                });
            });

            it('should log a card click event with braze', async () => {
                const { instance } = await arrange();
                const cardClickDetails = { details: { message: 'foo' }, card: 'foo' };

                // Act
                instance.find('[data-promotion-card="true"]').vm.emitCardClick(cardClickDetails);

                // Assert
                expect(logCardClick).toHaveBeenCalledWith('foo');
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
});

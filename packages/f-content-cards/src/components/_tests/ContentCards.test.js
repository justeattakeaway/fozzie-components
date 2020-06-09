import { shallowMount } from '@vue/test-utils';
import initialiseBraze from '@justeat/f-metadata';
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

    it('should format and display `Promotion_Card_1` and `Promotion_Card_2`', async () => {
        // Arrange
        const cardTypes = ['Promotion_Card_1', 'Promotion_Card_2'];
        const appboy = {
            cards: cardTypes.map(type => createCard(type))
        };

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
    });
});

import { shallowMount } from '@vue/test-utils';
import ContentCards, {
    STATE_NO_CARDS,
    STATE_DEFAULT,
    STATE_ERROR,
    STATE_LOADING
} from '../ContentCards';
import { HAS_LOADED } from '../../events';

const mockLogger = {
    error: jest.fn(),
    warn: jest.fn(),
    info: jest.fn()
};

const mocks = {
    $log: mockLogger
};


const scopedSlots = {
    [STATE_NO_CARDS]: `<div data-test-id="slot-${STATE_NO_CARDS}"/>`,
    [STATE_DEFAULT]: `
        <div data-test-id="slot-${STATE_DEFAULT}" slot-scope="{ cards }">
            <div :data-test-id="card.type" v-for="card in cards"></div>
        </div>
    `,
    [STATE_ERROR]: `<div data-test-id="slot-${STATE_ERROR}"/>`,
    [STATE_LOADING]: `<div data-test-id="slot-${STATE_LOADING}"/>`
};

describe('ContentCards', () => {
    describe('When given a single adapter that returns cards', () => {
        let instance;
        let adapter;
        let spy;
        let adapterInstance;
        const mockCards = [
            {
                id: '__MOCK_CARD__',
                type: '__MOCK_TYPE__'
            }
        ];
        const mockFilter = jest.fn();

        beforeEach(() => {
            // Arrange
            adapter = () => ({
                source: 'mockAdapter',
                initialise: (_, callback) => {
                    callback(mockCards);
                },
                handleCardView: jest.fn(),
                handleCardClick: jest.fn()
            });
            adapterInstance = adapter();

            spy = jest.spyOn(adapterInstance, 'initialise');

            instance = shallowMount(ContentCards, {
                propsData: {
                    adapters: [adapterInstance],
                    filters: [mockFilter],
                    locale: 'uk'
                },
                scopedSlots,
                mocks
            });
        });

        it('should push cards returned from adapter into cards', () => {
            // Act
            const { cards } = instance.vm;

            // Assert
            expect(cards.length).toEqual(1);
        });

        it('should return the default slots state', () => {
            // Act
            const slot = instance.find(`[data-test-id="slot-${STATE_DEFAULT}"]`);

            // Assert
            expect(slot).toBeDefined();
        });

        it('should return these cards in the scoped slot variable', () => {
            // Act
            const cards = instance.findAll('[data-test-id="__MOCK_TYPE__"]');

            // Assert
            expect(cards.length).toEqual(1);
        });

        it('should emit event to indicate that said adapter has returned cards', () => {
            // Assert
            expect(instance.emitted()[HAS_LOADED]).toBeTruthy();
            expect(instance.emitted()[HAS_LOADED].length).toBe(1);
            expect(instance.emitted()[HAS_LOADED][0]).toEqual([{ adapter: adapterInstance.source, cards: mockCards }]);
        });

        it('should call the adapter instance initialise method with filters, callback and errorCallback', () => {
            // Assert
            expect(spy).toBeCalledWith([mockFilter], expect.any(Function), expect.any(Function));
        });
    });

    describe('when given a single adapter that does not return cards', () => {
        let instance;
        let adapter;
        let adapterInstance;
        const mockCards = [];
        const mockFilter = jest.fn();

        beforeEach(() => {
            // Arrange
            adapter = () => ({
                source: 'mockAdapter',
                initialise: (_, callback) => {
                    callback(mockCards);
                },
                handleCardView: jest.fn(),
                handleCardClick: jest.fn()
            });
            adapterInstance = adapter();

            instance = shallowMount(ContentCards, {
                propsData: {
                    adapters: [adapterInstance],
                    filters: [mockFilter],
                    locale: 'uk'
                },
                scopedSlots,
                mocks
            });
        });

        it('should show the no cards state', () => {
            // Act
            const slot = instance.find(`[data-test-id="slot-${STATE_NO_CARDS}"]`);

            // Assert
            expect(slot).toBeDefined();
        });

        it('should have 0 cards in the cards array', () => {
            // Act
            const cards = instance.findAll('[data-test-id="__MOCK_TYPE__"]');

            // Assert
            expect(cards.length).toEqual(0);
        });

        it('should emit event to indicate that no cards were returned', () => {
            // Assert
            expect(instance.emitted()[HAS_LOADED]).toBeTruthy();
            expect(instance.emitted()[HAS_LOADED].length).toBe(1);
            expect(instance.emitted()[HAS_LOADED][0]).toEqual([{ adapter: adapterInstance.source, cards: mockCards }]);
        });
    });
});


// when given 2 adapters that both return cards

// it should combine both adapters cards by pushing cards into cards array

// it should return cards from both adapters in the scoped slot variable

// it should return the default slots state

// it should emit event to indicate each adapter has returned cards

// it should filter cards for each adapter based on adapter assigned filters



// when given 2 adapters and 1 returns NO cards

// it should return cards from adapter with cards in the scoped slot variable

// it should return the default slots state

// it should NOT show NO cards slots state

// it should emit event to indicate cards were returned for adapter that returned cards

// it should emit event to indicate that NO cards were returned for adapter with NO cards

// it should have ONLY the cards from adapter with returned cards in the cards array


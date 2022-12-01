import { shallowMount } from '@vue/test-utils';
import { mockIntersectionObserver } from 'jsdom-testing-mocks';
import ContentCards, {
    STATE_NO_CARDS,
    STATE_DEFAULT,
    STATE_ERROR,
    STATE_LOADING
} from '../ContentCards';
import { HAS_LOADED, ON_ERROR } from '../../events';

mockIntersectionObserver();

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

    describe('when given 2 adapters that both return cards', () => {
        let instance;
        let adapter;
        let adapter2;
        let spy;
        let spy2;
        let adapterInstance;
        let adapterInstance2;
        const mockCards = [
            {
                id: '__MOCK_CARD__',
                type: '__MOCK_TYPE__'
            }
        ];
        const mockCards2 = [
            {
                id: '__MOCK_CARD_2__',
                type: '__MOCK_TYPE_2__'
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

            adapter2 = () => ({
                source: 'mockAdapter',
                initialise: (_, callback) => {
                    callback(mockCards2);
                },
                handleCardView: jest.fn(),
                handleCardClick: jest.fn()
            });
            adapterInstance2 = adapter2();

            spy = jest.spyOn(adapterInstance, 'initialise');
            spy2 = jest.spyOn(adapterInstance2, 'initialise');

            instance = shallowMount(ContentCards, {
                propsData: {
                    adapters: [adapterInstance, adapterInstance2],
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
            expect(cards.length).toEqual(2);
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
            const cards2 = instance.findAll('[data-test-id="__MOCK_TYPE_2__"]');

            // Assert
            expect(cards.length + cards2.length).toEqual(2);
        });

        it('should emit event to indicate that said adapter has returned cards', () => {
            // Assert
            expect(instance.emitted()[HAS_LOADED]).toBeTruthy();
            expect(instance.emitted()[HAS_LOADED].length).toBe(2);
            expect(instance.emitted()[HAS_LOADED][0]).toEqual([{ adapter: adapterInstance.source, cards: mockCards }]);
            expect(instance.emitted()[HAS_LOADED][1]).toEqual([{ adapter: adapterInstance2.source, cards: mockCards2 }]);
        });

        it('should call the adapters instance initialise method with filters, callback and errorCallback', () => {
            // Assert
            expect(spy).toBeCalledWith([mockFilter], expect.any(Function), expect.any(Function));
            expect(spy2).toBeCalledWith([mockFilter], expect.any(Function), expect.any(Function));
        });
    });

    describe('when given 2 adapters and 1 returns NO cards', () => {
        let instance;
        let adapter;
        let adapter2;
        let spy;
        let spy2;
        let adapterInstance;
        let adapterInstance2;
        const mockCards = [
            {
                id: '__MOCK_CARD__',
                type: '__MOCK_TYPE__'
            }
        ];
        const mockCards2 = [];
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

            adapter2 = () => ({
                source: 'mockAdapter',
                initialise: (_, callback) => {
                    callback(mockCards2);
                },
                handleCardView: jest.fn(),
                handleCardClick: jest.fn()
            });
            adapterInstance2 = adapter2();

            spy = jest.spyOn(adapterInstance, 'initialise');
            spy2 = jest.spyOn(adapterInstance2, 'initialise');

            instance = shallowMount(ContentCards, {
                propsData: {
                    adapters: [adapterInstance, adapterInstance2],
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
            const cards2 = instance.findAll('[data-test-id="__MOCK_TYPE_2__"]');

            // Assert
            expect(cards.length + cards2.length).toEqual(1);
        });

        it('should emit event to indicate that said adapter has returned cards', () => {
            // Assert
            expect(instance.emitted()[HAS_LOADED]).toBeTruthy();
            expect(instance.emitted()[HAS_LOADED].length).toBe(2);
            expect(instance.emitted()[HAS_LOADED][0]).toEqual([{ adapter: adapterInstance.source, cards: mockCards }]);
            expect(instance.emitted()[HAS_LOADED][1]).toEqual([{ adapter: adapterInstance2.source, cards: mockCards2 }]);
        });

        it('should call the adapters instance initialise method with filters, callback and errorCallback', () => {
            // Assert
            expect(spy).toBeCalledWith([mockFilter], expect.any(Function), expect.any(Function));
            expect(spy2).toBeCalledWith([mockFilter], expect.any(Function), expect.any(Function));
        });
    });

    describe('when given an adapter that errors the error state should be shown', () => {
        let instance;
        let adapter;
        let adapterInstance;
        const message = '__MOCK_ERROR_MESSAGE__';
        const mockFilter = jest.fn();

        beforeEach(() => {
            // Arrange
            adapter = () => ({
                source: 'mockAdapter',
                initialise: (_, callback, errorCallback) => {
                    errorCallback(message);
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

        it('should return the error slots state', () => {
            // Act
            const slot = instance.find(`[data-test-id="slot-${STATE_ERROR}"]`);

            // Assert
            expect(slot).toBeDefined();
        });

        it('should emit event to indicate that an error was returned', () => {
            // Assert
            expect(instance.emitted()[ON_ERROR]).toBeTruthy();
            expect(instance.emitted()[ON_ERROR].length).toBe(1);
        });
    });

    describe('when given an adapter a loading state should be shown before the cards are returned', () => {
        let instance;
        let adapter;
        let adapterInstance;
        const mockFilter = jest.fn();

        beforeEach(() => {
            // Arrange
            adapter = () => ({
                source: 'mockAdapter',
                initialise: () => {},
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

        it('should return the loading slots state', () => {
            // Act
            const slot = instance.find(`[data-test-id="slot-${STATE_LOADING}"]`);

            // Assert
            expect(slot).toBeDefined();
        });
    });
});

// TODO tests for analytics observe events

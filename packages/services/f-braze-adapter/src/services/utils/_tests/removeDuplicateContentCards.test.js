import removeDuplicateContentCards from '../removeDuplicateContentCards';

const mockCards = [
    {
        title: 'Wasp-17b',
        updated: new Date('2020-02-17T13:23:58.000Z'),
        type: 'promotion_card_1'
    },
    {
        title: 'Wasp-17b',
        updated: new Date('2020-02-17T12:28:58.000Z'),
        type: 'promotion_card_1'
    },
    {
        title: 'Jupiter Hot',
        updated: new Date('2020-02-17T18:23:58.000Z'),
        deduplicationKey: 'zzzzzz',
        type: 'promotion_card_3'
    },
    {
        title: 'Initial card state',
        updated: new Date('2021-07-05T01:23:45.000Z'),
        type: 'new_card_1',
        deduplicationKey: 'xxxxxx'
    },
    {
        title: 'Later card state',
        updated: new Date('2021-07-06T01:23:45.000Z'),
        type: 'new_card_2',
        deduplicationKey: 'xxxxxx'
    },
    {
        title: 'Later card state',
        updated: new Date('2021-07-05T01:23:45.000Z'),
        type: 'new_card_2',
        deduplicationKey: 'yyyyyy'
    },
    {
        title: 'Jupiter Hot',
        updated: new Date('2020-02-17T18:23:58.000Z'),
        type: 'promotion_card_3'
    }
];

describe('removeDuplicateContentCards', () => {
    let result;

    beforeEach(() => {
        // Arrange
        result = removeDuplicateContentCards(mockCards);
    });

    describe('where `duplication_key` is absent', () => {
        it('should remove duplicate content cards that contain the same `title` & `custom_card_type` type', () => {
            // Assert
            const matchingCardCount = result.map(({ title }) => title)
                .filter(title => title === 'Wasp-17b')
                .length;
            expect(matchingCardCount).toBe(1);
        });

        it('should choose the card with the later `updated` date', () => {
            // Assert
            const dedupedCard = result.find(({ title }) => title === 'Wasp-17b');
            expect(dedupedCard.updated).toBe(mockCards[0].updated);
        });
    });

    describe('where `duplication_key` differs', () => {
        it('should _not_ remove duplicate content cards that contain the same `title` & `custom_card_type` type', () => {
            // Assert
            const matchingCardCount = result.filter(({ title }) => title === 'Later card state').length;
            expect(matchingCardCount).toBe(2);
        });
    });

    describe('where `duplication_key` matches', () => {
        it('should remove duplicate content cards even where `title` and/or `custom_card_type` differ', () => {
            // Assert
            const cardTitles = result.map(({ title }) => title);
            expect(cardTitles).not.toContain('Initial card state');
        });

        it('should keep the card with the later `updated` date on deduplication', () => {
            // Assert
            const dedupedCard = result.find(({ deduplicationKey }) => deduplicationKey === 'xxxxxx');
            expect(dedupedCard.updated).toBe(mockCards[4].updated);
        });
    });

    describe('where `duplication_key` is present on one card and absent on another', () => {
        it('should keep both cards even where `title` and `custom_card_type` match', () => {
            // Assert
            const matchingCardCount = result.filter(({ title }) => title === 'Jupiter Hot').length;
            expect(matchingCardCount).toBe(2);
        });
    });
});

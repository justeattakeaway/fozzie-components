/* eslint camelcase: ["error", {allow: [
    "custom_card_type",
    "deduplication_key"
]}] */

import isCardCurrentlyActive from '../utils/isCardCurrentlyActive';
import ContentCardService, {
    defaultEnabledCardTypes
} from '../contentCard.service';

jest.mock('../utils/isCardCurrentlyActive', () => ({
    __esModule: true,
    default: jest.fn(() => true)
}));

afterEach(() => {
    jest.resetAllMocks();
});

describe('`contentCardService`', () => {
    it('should exist', () => {
        expect(ContentCardService).toBeDefined();
    });

    describe('`orderCardsByOrderValue` method', () => {
        it('should sort cards by `order` value', () => {
            // Arrange
            const cards = [
                {
                    title: 'Kepler‑10b',
                    extras: { order: '4' }
                },
                {
                    title: 'Kepler‑69c',
                    extras: { order: '3' }
                },
                {
                    title: 'Kepler‑186f',
                    extras: { order: '1' }
                }
            ];
            const service = new ContentCardService({ cards });

            // Act
            const { cards: result } = service.orderCardsByOrderValue().output();
            const cardOrderValues = result.map(({ order }) => order);

            // Assert
            expect(cardOrderValues).toEqual(['1', '3', '4']);
        });

        it('should handle cards without `order` value by pinning them to the back', () => {
            // Arrange
            const cards = [
                {
                    title: 'Stephenson 2-18',
                    extras: { }
                },
                {
                    title: 'Kepler‑10b',
                    extras: { order: '4' }
                },
                {
                    title: 'Kepler‑69c',
                    extras: { order: '3' }
                },
                {
                    title: 'UY Scuti',
                    extras: { }
                },
                {
                    title: 'Kepler‑186f',
                    extras: { order: '1' }
                }
            ];
            const service = new ContentCardService({ cards });

            // Act
            const { cards: result } = service.orderCardsByOrderValue().output();
            const cardOrderValues = result.map(({ order }) => order);

            // Assert
            expect(cardOrderValues).toEqual(['1', '3', '4', undefined, undefined]);
        });
    });

    describe('`orderCardsByUpdateValue`, method', () => {
        it('should sort cards by last `updated` type', () => {
            // Arrange
            const cards = [
                {
                    title: '51 Pegasi b',
                    updated: new Date('2020-02-17T13:23:58.000Z'),
                    extras: {
                        custom_card_type: 'promotion_card_1'
                    }
                },
                {
                    title: 'Wasp-17b',
                    updated: new Date('2020-02-16T12:28:58.000Z'),
                    extras: {
                        custom_card_type: 'promotion_card_2'
                    }
                },
                {
                    title: 'Wasp-19b',
                    updated: new Date('2020-02-15T18:23:58.000Z'),
                    extras: {
                        custom_card_type: 'promotion_card_3'
                    }
                }
            ];
            const service = new ContentCardService({ cards });

            // Act
            const {
                cards: result
            } = service.orderCardsByUpdateValue().output();
            const order = Object.values(result).map(({ title }) => title);

            // Assert
            expect(order).toEqual(['Wasp-19b', 'Wasp-17b', '51 Pegasi b']);
        });
    });

    describe('`filterCards`', () => {
        it('should allow a user defined list of filtered content cards', () => {
            // Arrange
            const enabledCardTypes = ['Custom_Card_1'];
            const cards = [
                {
                    title: 'Promo Card 1',
                    extras: {
                        custom_card_type: 'Promotion_Card_1'
                    }
                },
                {
                    title: 'Custom Card',
                    extras: {
                        custom_card_type: 'Custom_Card_1'
                    }
                }
            ];
            const service = new ContentCardService(
                { cards },
                { enabledCardTypes }
            );

            // Act
            const { cards: result } = service.filterCards().output();
            const areAllCardsSupported = Object.values(result).every(({ extras: { custom_card_type } }) => enabledCardTypes.includes(custom_card_type));

            // Assert
            expect(areAllCardsSupported).toBe(true);
        });

        describe('where `custom_card_type` exists', () => {
            it('should filter content cards by, `promotion_card_1` & `promotion_card_2`', () => {
                // Arrange
                const cards = [
                    {
                        title: 'Promo Card 1',
                        updated: new Date('2020-02-17T13:23:58.000Z'),
                        extras: {
                            custom_card_type: 'Promotion_Card_1'
                        }
                    },
                    {
                        title: 'Promo Card 2',
                        updated: new Date('2020-02-17T12:28:58.000Z'),
                        extras: {
                            custom_card_type: 'Promotion_Card_2'
                        }
                    },
                    {
                        title: 'Promo Card 3',
                        updated: new Date('2020-02-17T18:23:58.000Z'),
                        extras: {
                            custom_card_type: 'Promotion_Card_3'
                        }
                    },
                    {
                        title: 'Post Order Card 1',
                        updated: new Date('2020-02-17T12:28:58.000Z'),
                        extras: {
                            custom_card_type: 'Post_Order_Card_1'
                        }
                    }
                ];
                const service = new ContentCardService({ cards });

                // Act
                const { cards: result } = service.filterCards().output();
                const areAllCardsSupported = Object
                    .values(result)
                    .every(({ extras: { custom_card_type } }) => defaultEnabledCardTypes.includes(custom_card_type));

                // Assert
                expect(areAllCardsSupported).toBe(true);
            });
        });

        describe('where `custom_card_type` does NOT exist', () => {
            it('should return `[]`', () => {
                // Arrange
                const cards = [
                    {
                        title: '51 Pegasi b',
                        extras: {}
                    },
                    {
                        title: 'Wasp-17b',
                        extras: {}
                    },
                    {
                        title: 'Wasp-19b',
                        extras: {}
                    }
                ];
                const { cards: result } = new ContentCardService({ cards })
                    .filterCards()
                    .output();

                // Assert
                expect(result).toEqual([]);
            });
        });

        describe('where isCardCurrentlyActive returns `false`', () => {
            const cards = [
                {
                    title: 'a',
                    extras: {
                        custom_card_type: 'foo'
                    }
                },
                {
                    title: 'b',
                    extras: {
                        custom_card_type: 'foo'
                    }
                },
                {
                    title: 'c',
                    extras: {
                        custom_card_type: 'bar'
                    }
                },
                {
                    title: 'd',
                    extras: {
                        custom_card_type: 'bar'
                    }
                }
            ];

            beforeEach(() => {
                isCardCurrentlyActive.mockImplementationOnce(() => true)
                    .mockImplementationOnce(() => false)
                    .mockImplementationOnce(() => true)
                    .mockImplementationOnce(() => false);
            });

            it('should filter out the inactive cards and keep the active cards', () => {
                // Arrange
                const { cards: result } = new ContentCardService({
                    cards
                }, {
                    enabledCardTypes: ['foo', 'bar']
                })
                    // Act
                    .filterCards()
                    .output();

                // Assert
                expect(result.map(({ title }) => title))
                    .toIncludeSameMembers(['a', 'c']);
            });
        });
    });

    describe('`removeDuplicateContentCards` method', () => {
        const cards = [
            {
                title: 'Wasp-17b',
                updated: new Date('2020-02-17T13:23:58.000Z'),
                extras: {
                    custom_card_type: 'promotion_card_1'
                }
            },
            {
                title: 'Wasp-17b',
                updated: new Date('2020-02-17T12:28:58.000Z'),
                extras: {
                    custom_card_type: 'promotion_card_1'
                }
            },
            {
                title: 'Jupiter Hot',
                updated: new Date('2020-02-17T18:23:58.000Z'),
                extras: {
                    deduplication_key: 'zzzzzz',
                    custom_card_type: 'promotion_card_3'
                }
            },
            {
                title: 'Initial card state',
                updated: new Date('2021-07-05T01:23:45.000Z'),
                extras: {
                    custom_card_type: 'new_card_1',
                    deduplication_key: 'xxxxxx'
                }
            },
            {
                title: 'Later card state',
                updated: new Date('2021-07-06T01:23:45.000Z'),
                extras: {
                    custom_card_type: 'new_card_2',
                    deduplication_key: 'xxxxxx'
                }
            },
            {
                title: 'Later card state',
                updated: new Date('2021-07-05T01:23:45.000Z'),
                extras: {
                    custom_card_type: 'new_card_2',
                    deduplication_key: 'yyyyyy'
                }
            },
            {
                title: 'Jupiter Hot',
                updated: new Date('2020-02-17T18:23:58.000Z'),
                extras: {
                    custom_card_type: 'promotion_card_3'
                }
            }
        ];
        let result;

        beforeEach(() => {
            // Arrange
            const service = new ContentCardService({ cards });

            // Act
            ({
                cards: result
            } = service.removeDuplicateContentCards().output());
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
                expect(dedupedCard.updated).toBe(cards[0].updated);
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
                expect(dedupedCard.updated).toBe(cards[4].updated);
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

    describe('`getTitleCard`', () => {
        it('should exist', () => {
            expect(new ContentCardService().getTitleCard).toBeDefined();
        });

        describe('when invoked', () => {
            describe('AND a `card` contains a match for `Terms_And_Conditions_Card`, `url` & `pinned`', () => {
                it('should return two populated groups of cards: `titleCard` & `otherCards`', () => {
                    // Arrange
                    const cards = [
                        {
                            title: 'Wasp-17b',
                            url: '/WASP-17b',
                            pinned: '11 August 2009',
                            updated: new Date('2020-02-17T13:23:58.000Z'),
                            extras: {
                                custom_card_type: 'Terms_And_Conditions_Card'
                            }
                        },
                        {
                            title: 'Wasp-17b',
                            updated: new Date('2020-02-17T12:28:58.000Z'),
                            extras: {
                                custom_card_type: 'promotion_card_1'
                            }
                        },
                        {
                            title: 'Jupiter Hot',
                            updated: new Date('2020-02-17T18:23:58.000Z'),
                            extras: {
                                custom_card_type: 'promotion_card_3'
                            }
                        }
                    ];

                    // Act
                    const { titleCard, cards: contentCards } = new ContentCardService({ cards })
                        .getTitleCard()
                        .output();

                    // Assert
                    expect(titleCard.title).toBe('Wasp-17b');
                    expect(contentCards).toHaveLength(2);
                });
            });

            describe('AND a `card` does not contain any matches for `Terms_And_Conditions_Card`, `url` or `pinned`', () => {
                it('should return `titleCards` as an empty object but include a populated `otherCards` array set', () => {
                    // Arrange
                    const cards = [
                        {
                            title: 'Wasp-17b',
                            updated: new Date('2020-02-17T13:23:58.000Z'),
                            extras: {
                                custom_card_type: 'promotion_card_1'
                            }
                        },
                        {
                            title: 'Wasp-17b',
                            updated: new Date('2020-02-17T12:28:58.000Z'),
                            extras: {
                                custom_card_type: 'promotion_card_1'
                            }
                        },
                        {
                            title: 'Jupiter Hot',
                            updated: new Date('2020-02-17T18:23:58.000Z'),
                            extras: {
                                custom_card_type: 'promotion_card_3'
                            }
                        }
                    ];

                    // Act
                    const { titleCard, cards: contentCards } = new ContentCardService({ cards })
                        .getTitleCard()
                        .output();

                    // Assert
                    expect(titleCard).toEqual({});
                    expect(contentCards).toHaveLength(3);
                });
            });
        });
    });

    describe('`arrangeCardsByTitles` method', () => {
        const cards = [
            {
                title: '20% off at ASOS.',
                extras: {
                    order: '1',
                    custom_card_type: 'Promotion_Card_1'
                }
            },
            {
                title: 'Hot deals on the takeaways you love',
                extras: {
                    order: '40',
                    custom_card_type: 'Header_Card'
                }
            },
            {
                title: 'OK Pizza.',
                extras: {
                    order: '41',
                    custom_card_type: 'Promotion_Card_2'
                }
            },
            {
                title: 'OK Burgers.',
                extras: {
                    order: '42',
                    custom_card_type: 'Promotion_Card_2'
                }
            },
            {
                title: 'The tastiest offers near you!',
                extras: {
                    order: '50',
                    custom_card_type: 'Header_Card'
                }
            },
            {
                title: 'Best Pizza.',
                extras: {
                    order: '51',
                    custom_card_type: 'Promotion_Card_2'
                }
            },
            {
                title: 'Bristol Burgers.',
                extras: {
                    order: '52',
                    custom_card_type: 'Promotion_Card_2'
                }
            },
            {
                title: 'Full terms and conditions here.',
                extras: {
                    order: '100',
                    custom_card_type: 'Terms_And_Conditions_Card_2'
                }
            }
        ];

        it('should group content cards by type where type starts with either `Header_Card` or `Terms_And_Conditions_Card`', () => {
            // Arrange
            const service = new ContentCardService({ cards });

            // Act
            const {
                groups: contentCards
            } = service.arrangeCardsByTitles().output();

            // Assert
            expect(contentCards).toHaveLength(4);
            expect(contentCards[1].cards).toHaveLength(2);
            expect(contentCards[2].cards).toHaveLength(2);
        });
    });
});

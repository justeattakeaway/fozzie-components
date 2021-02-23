import ContentCardService, {
    defaultEnabledCardTypes
} from '../contentCard.service';

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
                    extras: {
                        updated: '2020-02-17T13:23:58.000Z',
                        customCardType: 'promotion_card_1'
                    }
                },
                {
                    title: 'Wasp-17b',
                    extras: {
                        updated: '2020-02-16T12:28:58.000Z',
                        customCardType: 'promotion_card_2'
                    }
                },
                {
                    title: 'Wasp-19b',
                    extras: {
                        updated: '2020-02-15T18:23:58.000Z',
                        customCardType: 'promotion_card_3'
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
                        customCardType: 'Promotion_Card_1'
                    }
                },
                {
                    title: 'Custom Card',
                    extras: {
                        customCardType: 'Custom_Card_1'
                    }
                }
            ];
            const service = new ContentCardService(
                { cards },
                { enabledCardTypes }
            );

            // Act
            const { cards: result } = service.filterCards().output();
            const areAllCardsSupported = Object.values(result).every(({ extras: { customCardType } }) => enabledCardTypes.includes(customCardType));

            // Assert
            expect(areAllCardsSupported).toBe(true);
        });

        describe('AND `custom_card_type` exists', () => {
            it('should filter content cards by, `promotion_card_1` & `promotion_card_2`', () => {
                // Arrange
                const cards = [
                    {
                        title: 'Promo Card 1',
                        extras: {
                            updated: '2020-02-17T13:23:58.000Z',
                            customCardType: 'Promotion_Card_1'
                        }
                    },
                    {
                        title: 'Promo Card 2',
                        extras: {
                            updated: '2020-02-17T12:28:58.000Z',
                            customCardType: 'Promotion_Card_2'
                        }
                    },
                    {
                        title: 'Promo Card 3',
                        extras: {
                            updated: '2020-02-17T18:23:58.000Z',
                            customCardType: 'Promotion_Card_3'
                        }
                    },
                    {
                        title: 'Post Order Card 1',
                        extras: {
                            updated: '2020-02-17T12:28:58.000Z',
                            customCardType: 'Post_Order_Card_1'
                        }
                    }
                ];
                const service = new ContentCardService({ cards });

                // Act
                const { cards: result } = service.filterCards().output();
                const areAllCardsSupported = Object
                    .values(result)
                    .every(({ extras: { customCardType } }) => defaultEnabledCardTypes.includes(customCardType));

                // Assert
                expect(areAllCardsSupported).toBe(true);
            });
        });

        describe('AND `custom_card_type` does NOT exist', () => {
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
    });

    describe('`removeDuplicateContentCards` method', () => {
        it('should remove duplicate content cards that contain the same `title` & `custom_card_type` type', () => {
            // Arrange
            const cards = [
                {
                    title: 'Wasp-17b',
                    extras: {
                        updated: '2020-02-17T13:23:58.000Z',
                        custom_card_type: 'promotion_card_1' // eslint-disable-line camelcase
                    }
                },
                {
                    title: 'Wasp-17b',
                    extras: {
                        updated: '2020-02-17T12:28:58.000Z',
                        custom_card_type: 'promotion_card_1' // eslint-disable-line camelcase
                    }
                },
                {
                    title: 'Jupiter Hot',
                    extras: {
                        updated: '2020-02-17T18:23:58.000Z',
                        custom_card_type: 'promotion_card_3' // eslint-disable-line camelcase
                    }
                }
            ];
            const service = new ContentCardService({ cards });

            // Act
            const {
                cards: result
            } = service.removeDuplicateContentCards().output();
            const cardTitles = result.map(({ title }) => title);

            // Assert
            expect(cardTitles).toEqual(['Wasp-17b', 'Jupiter Hot']);
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
                            extras: {
                                updated: '2020-02-17T13:23:58.000Z',
                                custom_card_type: 'Terms_And_Conditions_Card' // eslint-disable-line camelcase
                            }
                        },
                        {
                            title: 'Wasp-17b',
                            extras: {
                                updated: '2020-02-17T12:28:58.000Z',
                                custom_card_type: 'promotion_card_1' // eslint-disable-line camelcase
                            }
                        },
                        {
                            title: 'Jupiter Hot',
                            extras: {
                                updated: '2020-02-17T18:23:58.000Z',
                                custom_card_type: 'promotion_card_3' // eslint-disable-line camelcase
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
                            extras: {
                                updated: '2020-02-17T13:23:58.000Z',
                                custom_card_type: 'promotion_card_1' // eslint-disable-line camelcase
                            }
                        },
                        {
                            title: 'Wasp-17b',
                            extras: {
                                updated: '2020-02-17T12:28:58.000Z',
                                custom_card_type: 'promotion_card_1' // eslint-disable-line camelcase
                            }
                        },
                        {
                            title: 'Jupiter Hot',
                            extras: {
                                updated: '2020-02-17T18:23:58.000Z',
                                custom_card_type: 'promotion_card_3' // eslint-disable-line camelcase
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
                    custom_card_type: 'Promotion_Card_1' // eslint-disable-line camelcase
                }
            },
            {
                title: 'Hot deals on the takeaways you love',
                extras: {
                    order: '40',
                    custom_card_type: 'Header_Card' // eslint-disable-line camelcase
                }
            },
            {
                title: 'OK Pizza.',
                extras: {
                    order: '41',
                    custom_card_type: 'Promotion_Card_2' // eslint-disable-line camelcase
                }
            },
            {
                title: 'OK Burgers.',
                extras: {
                    order: '42',
                    custom_card_type: 'Promotion_Card_2' // eslint-disable-line camelcase
                }
            },
            {
                title: 'The tastiest offers near you!',
                extras: {
                    order: '50',
                    custom_card_type: 'Header_Card' // eslint-disable-line camelcase
                }
            },
            {
                title: 'Best Pizza.',
                extras: {
                    order: '51',
                    custom_card_type: 'Promotion_Card_2' // eslint-disable-line camelcase
                }
            },
            {
                title: 'Bristol Burgers.',
                extras: {
                    order: '52',
                    custom_card_type: 'Promotion_Card_2' // eslint-disable-line camelcase
                }
            },
            {
                title: 'Full terms and conditions here.',
                extras: {
                    order: '100',
                    custom_card_type: 'Terms_And_Conditions_Card_2' // eslint-disable-line camelcase
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

import ContentCardService, { enabledCardTypes } from '../contentCard.service';

describe('`contentCardService`', () => {
    it('should exist', () => {
        expect(ContentCardService).toBeDefined();
    });

    describe('`orderCardsByOrderValue` method', () => {
        it('should sort cards by `order` value', () => {
            // Arrange
            const cards = [{
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
            }];
            const service = new ContentCardService({ cards });

            // Act
            const { cards: result } = service.orderCardsByOrderValue().output();
            const cardOrderValues = result.map(({ extras: { order } }) => order);

            // Assert
            expect(cardOrderValues).toEqual(['1', '3', '4']);
        });
    });

    describe('`orderCardsByUpdateValue`, method', () => {
        it('should sort cards by last `updated` type', () => {
            // Arrange
            const cards = [{
                title: '51 Pegasi b',
                extras: { updated: '2020-02-17T13:23:58.000Z', customCardType: 'promotion_card_1' }
            },
            {
                title: 'Wasp-17b',
                extras: { updated: '2020-02-16T12:28:58.000Z', customCardType: 'promotion_card_2' }
            },
            {
                title: 'Wasp-19b',
                extras: { updated: '2020-02-15T18:23:58.000Z', customCardType: 'promotion_card_3' }
            }];
            const service = new ContentCardService({ cards });

            // Act
            const { cards: result } = service.orderCardsByUpdateValue().output();
            const order = Object.values(result).map(({ title }) => title);

            // Assert
            expect(order).toEqual(['Wasp-19b', 'Wasp-17b', '51 Pegasi b']);
        });
    });

    describe('`filterCards`', () => {
        describe('AND `custom_card_type` exists', () => {
            it('should filter content cards by, `promotion_card_1` & `promotion_card_2`', () => {
                // Arrange
                const cards = [{
                    title: 'Promo Card 1',
                    extras: { updated: '2020-02-17T13:23:58.000Z', customCardType: 'Promotion_Card_1' }
                },
                {
                    title: 'Promo Card 2',
                    extras: { updated: '2020-02-17T12:28:58.000Z', customCardType: 'Promotion_Card_2' }
                },
                {
                    title: 'Promo Card 3',
                    extras: { updated: '2020-02-17T18:23:58.000Z', customCardType: 'Promotion_Card_3' }
                },
                {
                    title: 'Post Order Card 1',
                    extras: { updated: '2020-02-17T12:28:58.000Z', customCardType: 'Post_Order_Card_1' }
                }];
                const service = new ContentCardService({ cards });

                // Act
                const { cards: result } = service.filterCards().output();
                const areAllCardsSupported = Object.values(result).every(({ extras: { customCardType } }) => enabledCardTypes.includes(customCardType));

                // Assert
                expect(areAllCardsSupported).toBe(true);
            });
        });

        describe('AND `custom_card_type` does NOT exist', () => {
            it('should return `[]`', () => {
                // Arrange
                const cards = [{
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
                }];
                const { cards: result } = new ContentCardService({ cards }).filterCards().output();

                // Assert
                expect(result).toEqual([]);
            });
        });
    });

    describe('`removeDuplicateContentCards` method', () => {
        it('should remove duplicate content cards that contain the same `title` & `custom_card_type` type', () => {
            // Arrange
            const cards = [{
                title: 'Wasp-17b',
                extras: { updated: '2020-02-17T13:23:58.000Z', custom_card_type: 'promotion_card_1' } // eslint-disable-line camelcase
            },
            {
                title: 'Wasp-17b',
                extras: { updated: '2020-02-17T12:28:58.000Z', custom_card_type: 'promotion_card_1' } // eslint-disable-line camelcase
            },
            {
                title: 'Jupiter Hot',
                extras: { updated: '2020-02-17T18:23:58.000Z', custom_card_type: 'promotion_card_3' } // eslint-disable-line camelcase
            }];
            const service = new ContentCardService({ cards });

            // Act
            const { cards: result } = service.removeDuplicateContentCards().output();
            const cardTitles = result.map(({ title }) => title);

            // Assert
            expect(cardTitles).toEqual(['Wasp-17b', 'Jupiter Hot']);
        });
    });

    describe('`logBrazeEvent` method', () => {
        describe('AND `window` is `undefined`', () => {
            it('should return `false` to exit the method', () => {
                // Arrange & Act
                const result = new ContentCardService().logBrazeEvent();

                // Assert
                expect(result).toBe(false);
            });
        });

        describe('AND `window` is `defined` but `appboy` is `undefined`', () => {
            it('should return `false` to exit the method', () => {
                // Arrange & Act
                const result = new ContentCardService().logBrazeEvent();

                // Assert
                expect(result).toBe(false);
            });
        });

        describe('AND both `window` & `appboy` exist', () => {
            // Arrange
            const requestImmediateDataFlush = jest.fn();
            const jupiterEvent = jest.fn().mockReturnValue({ id: 'Epic 201912552 b' });
            const appboy = {
                requestImmediateDataFlush,
                jupiterEvent
            };

            it('should invoke `appboy.requestImmediateDataFlush`', () => {
                // Act
                new ContentCardService(appboy).logBrazeEvent('jupiterEvent', []);

                // Assert
                expect(requestImmediateDataFlush).toHaveBeenCalled();
            });

            it('should `return` the expected `output`', () => {
                // Act
                const result = new ContentCardService(appboy).logBrazeEvent('jupiterEvent', []);

                // Assert
                expect(result).toEqual({ id: 'Epic 201912552 b' });
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
                    const cards = [{
                        title: 'Wasp-17b',
                        url: '/WASP-17b',
                        pinned: '11 August 2009',
                        extras: { updated: '2020-02-17T13:23:58.000Z', custom_card_type: 'Terms_And_Conditions_Card' } // eslint-disable-line camelcase
                    },
                    {
                        title: 'Wasp-17b',
                        extras: { updated: '2020-02-17T12:28:58.000Z', custom_card_type: 'promotion_card_1' } // eslint-disable-line camelcase
                    },
                    {
                        title: 'Jupiter Hot',
                        extras: { updated: '2020-02-17T18:23:58.000Z', custom_card_type: 'promotion_card_3' } // eslint-disable-line camelcase
                    }];

                    const expectedResult = {
                        titleCard: {
                            title: 'Wasp-17b',
                            url: '/WASP-17b',
                            pinned: '11 August 2009',
                            extras: { updated: '2020-02-17T13:23:58.000Z', custom_card_type: 'Terms_And_Conditions_Card' } // eslint-disable-line camelcase
                        },
                        cards: [
                            {
                                title: 'Wasp-17b',
                                extras: { updated: '2020-02-17T12:28:58.000Z', custom_card_type: 'promotion_card_1' } // eslint-disable-line camelcase
                            },
                            {
                                title: 'Jupiter Hot',
                                extras: { updated: '2020-02-17T18:23:58.000Z', custom_card_type: 'promotion_card_3' } // eslint-disable-line camelcase
                            }
                        ]
                    };

                    // Act
                    const result = new ContentCardService({ cards }).getTitleCard().output();

                    // Assert
                    expect(result).toEqual(expectedResult);
                });
            });

            describe('AND a `card` does not contain any matches for `Terms_And_Conditions_Card`, `url` or `pinned`', () => {
                it('should return `titleCards` as an empty object but include a populated `otherCards` array set', () => {
                    // Arrange
                    const cards = [{
                        title: 'Wasp-17b',
                        extras: { updated: '2020-02-17T13:23:58.000Z', custom_card_type: 'promotion_card_1' } // eslint-disable-line camelcase
                    },
                    {
                        title: 'Wasp-17b',
                        extras: { updated: '2020-02-17T12:28:58.000Z', custom_card_type: 'promotion_card_1' } // eslint-disable-line camelcase
                    },
                    {
                        title: 'Jupiter Hot',
                        extras: { updated: '2020-02-17T18:23:58.000Z', custom_card_type: 'promotion_card_3' } // eslint-disable-line camelcase
                    }];

                    const expectedResult = {
                        titleCard: {},
                        cards: [
                            {
                                title: 'Wasp-17b',
                                extras: { updated: '2020-02-17T13:23:58.000Z', custom_card_type: 'promotion_card_1' } // eslint-disable-line camelcase
                            },
                            {
                                title: 'Wasp-17b',
                                extras: { updated: '2020-02-17T12:28:58.000Z', custom_card_type: 'promotion_card_1' } // eslint-disable-line camelcase
                            },
                            {
                                title: 'Jupiter Hot',
                                extras: { updated: '2020-02-17T18:23:58.000Z', custom_card_type: 'promotion_card_3' } // eslint-disable-line camelcase
                            }
                        ]
                    };

                    // Act
                    const result = new ContentCardService({ cards }).getTitleCard(cards).output();

                    // Assert
                    expect(result).toEqual(expectedResult);
                });
            });
        });
    });
});

import contentCardService from '../contentCard.service';

describe('`contentCardService`', () => {
    it('should exist', () => {
        expect(contentCardService).toBeDefined();
    });

    describe('`orderCardsByOrderValue` method', () => {
        it('should exist', () => {
            expect(contentCardService.orderCardsByOrderValue).toBeDefined();
        });

        describe('when invoked', () => {
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

                // Act
                const result = contentCardService.orderCardsByOrderValue(cards);

                // Assert
                expect(contentCardService.orderCardsByOrderValue(cards)).toEqual(result);
            });
        });
    });

    describe('`orderCardsByUpdateValue`, method', () => {
        it('should exist', () => {
            expect(contentCardService.orderCardsByUpdateValue).toBeDefined();
        });

        describe('when invoked', () => {
            it('should sort cards by last `updated` type', () => {
                // Arrange
                const cards = [{
                    title: '51 Pegasi b',
                    extras: { updated: '2020-02-17T13:23:58.000Z', customCardType: 'promotion_card_1' }
                },
                {
                    title: 'Wasp-17b',
                    extras: { updated: '2020-02-17T12:28:58.000Z', customCardType: 'promotion_card_2' }
                },
                {
                    title: 'Wasp-19b',
                    extras: { updated: '2020-02-17T18:23:58.000Z', customCardType: 'promotion_card_3' }
                }];

                // Act
                const result = contentCardService.orderCardsByUpdateValue(cards);

                // Assert
                expect(contentCardService.orderCardsByUpdateValue(cards)).toEqual(result);
            });
        });
    });

    describe('`filterCards`', () => {
        it('should exist', () => {
            expect(contentCardService.filterCards).toBeDefined();
        });

        describe('when invoked', () => {
            describe('AND `custom_card_type` exists', () => {
                it('should filter content cards by, `promotion_card_1` & `promotion_card_2`', () => {
                    // Arrange
                    const cards = [{
                        title: '51 Pegasi b',
                        extras: { updated: '2020-02-17T13:23:58.000Z', customCardType: 'promotion_card_1' }
                    },
                    {
                        title: 'Wasp-17b',
                        extras: { updated: '2020-02-17T12:28:58.000Z', customCardType: 'promotion_card_2' }
                    },
                    {
                        title: 'Wasp-19b',
                        extras: { updated: '2020-02-17T18:23:58.000Z', customCardType: 'promotion_card_3' }
                    }];

                    // Act
                    const result = contentCardService.filterCards(cards);

                    // Assert
                    expect(contentCardService.filterCards(cards)).toEqual(result);
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

                    expect(contentCardService.filterCards(cards)).toEqual([]);
                });
            });
        });
    });

    describe('`removeDuplicateContentCards` method', () => {
        it('should exist', () => {
            expect(contentCardService.removeDuplicateContentCards).toBeDefined();
        });

        describe('when invoked', () => {
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

                // Act
                const result = contentCardService.removeDuplicateContentCards(cards);

                // Assert
                expect(contentCardService.removeDuplicateContentCards(cards)).toEqual(result);
            });
        });
    });

    describe('`logBrazeEvent` method', () => {
        it('should exist', () => {
            expect(contentCardService.logBrazeEvent).toBeDefined();
        });

        describe('when invoked', () => {
            describe('AND `window` is `undefined`', () => {
                it('should return `false` to exit the method', () => {
                    // Arrange
                    global.window = null;

                    // Act
                    const result = contentCardService.logBrazeEvent();

                    // Assert
                    expect(result).toBe(false);
                });
            });

            describe('AND `window` is `defined` but `appboy` is `undefined`', () => {
                it('should return `false` to exit the method', () => {
                    // Arrange
                    global.window.appboy = null;

                    // Act
                    const result = contentCardService.logBrazeEvent();

                    // Assert
                    expect(result).toBe(false);
                });
            });

            describe('AND both `window` & `appboy` exist', () => {
                beforeEach(() => {
                    // Arrange
                    global.window.appboy = {
                        requestImmediateDataFlush: jest.fn(),
                        jupiterEvent: jest.fn().mockReturnValue({ id: 'Epic 201912552 b' })
                    };
                });

                it('should invoke `appboy.requestImmediateDataFlush`', () => {
                    // Arrange
                    const spy = jest.spyOn(global.window.appboy, 'requestImmediateDataFlush');

                    // Act
                    contentCardService.logBrazeEvent('jupiterEvent', []);

                    // Assert
                    expect(spy).toHaveBeenCalled();
                });

                it('should `return` the expected `output`', () => {
                    // Act
                    const result = contentCardService.logBrazeEvent('jupiterEvent', []);

                    // Assert
                    expect(result).toEqual({ id: 'Epic 201912552 b' });
                });
            });
        });
    });

    describe('`getTitleCard`', () => {
        it('should exist', () => {
            expect(contentCardService.getTitleCard).toBeDefined();
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
                        otherCards: [
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
                    const result = contentCardService.getTitleCard(cards);

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
                        otherCards: [
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
                    const result = contentCardService.getTitleCard(cards);

                    // Assert
                    expect(result).toEqual(expectedResult);
                });
            });
        });
    });
});

import { shallowMount } from '@vue/test-utils';
import ContentCards from '../ContentCards.vue';

const expectedBrazeKey = 'test-braze-key';
const sectionTitle = '__SECTION_TITLE__';
const cardMock = {
    extras: {}
};
const cardsMock = {
    title: sectionTitle,
    cards: [cardMock]
};

beforeEach(() => {
    jest.clearAllMocks();
});

const emptyAddressAction = jest.fn();
const invalidAddressAction = jest.fn();
const unknownErrorAction = jest.fn();

const contentCards = [cardsMock];
const titleCard = {};
const hasOffers = true;

describe('Offers component', () => {
    it('should not render the appropriate data when `hasOffersMounted` is `false`', () => {
        // Arrange
        const data = {
            hasOffersMounted: false
        };
        const wrapper = shallowMount(Offers, {
            data: () => data
        });

        // Assert
        expect(wrapper.contains('[data-test-id="OffersInbox-Content"]')).toBe(false);
        expect(wrapper.contains('[data-test-id="OffersInbox-Cards"]')).toBe(false);
    });

    describe('when `hasOffersMounted` is `truthy`', () => {
        describe('AND `offersCarouselEnabled` is `falsy`', () => {
            it('should NOT render the carousel component', () => {
                // Arrange
                const data = {
                    hasOffersMounted: true
                };

                store.state.offersCarouselEnabled = false;

                const wrapper = shallowMount(Offers, {
                    store,
                    localVue,
                    i18n,
                    data: () => data
                });

                // Assert
                expect(wrapper.contains('[data-test-id="OffersInbox-Cards-Carousel"]')).toBe(false);
            });
        });
    });

    describe('when `offersCarouselEnabled` is NOT `truthy` and a title does not exist', () => {
        it('should display a non titled content cards', () => {
            // Arrange
            store.state.offersCarouselEnabled = true;

            const wrapper = shallowMount(Offers, {
                store: createStore({
                    cards: [{
                        cards: [
                            {
                                viewed: false,
                                imageUrl: null,
                                created: null,
                                updated: '2020-04-21T17:06:45.000Z',
                                categories: [],
                                expiresAt: '2020-05-21T17:06:45.000Z',
                                url: 'https://www.just-eat.co.uk/',
                                linkText: 'www.just-eat.co.uk',
                                aspectRatio: 1,
                                extras: {
                                    order: '1',
                                    image_1: 'https://appboy-images.com/appboy/communication/assets/image_assets/images/5e74ceff4302b23018a1ee79/original.png?1584713471',
                                    button_1: 'Got it, thanks!',
                                    custom_card_type: 'Promotion_Card_1',
                                    offer_auth_required: 'true' //eslint-disable-line
                                }
                            }]
                    }]
                }),
                localVue,
                i18n,
                data: () => ({
                    hasOffersMounted: true
                })
            });

            // Assert
            expect(wrapper.contains('[data-test-id="OffersInbox-Cards"]')).toBe(true);
        });
    });

    describe('handleSearchBoxError method', () => {
        it('should handle POSTCODE_EMPTY error', () => {
            // Act
            const wrapper = shallowMount(Offers, {
                store,
                localVue,
                i18n
            });
            wrapper.vm.handleSearchboxError(['POSTCODE_EMPTY']);

            // Assert
            expect(emptyAddressAction).toHaveBeenCalled();
        });

        it('should handle POSTCODE_INVALID error', () => {
            // Act
            const wrapper = shallowMount(Offers, {
                store,
                localVue,
                i18n
            });
            wrapper.vm.handleSearchboxError(['POSTCODE_INVALID']);

            // Assert
            expect(invalidAddressAction).toHaveBeenCalled();
        });

        it('should trigger an unknown error when the error code is not recognised', () => {
            // Act
            const wrapper = shallowMount(Offers, {
                store,
                localVue,
                i18n
            });
            wrapper.vm.handleSearchboxError(['UNKNOWN_ERROR']);

            // Assert
            expect(unknownErrorAction).toHaveBeenCalled();
        });
    });

    describe('`handleCustomCardType`', () => {
        it('should exist', () => {
            // Arrange
            const wrapper = shallowMount(Offers, {
                store,
                localVue,
                i18n
            });

            // Assert
            expect(wrapper.vm.handleCustomCardType).toBeDefined();
        });

        describe('when invoked', () => {
            let wrapper;

            beforeEach(() => {
                // Arrange
                wrapper = shallowMount(Offers, {
                    store,
                    localVue,
                    i18n
                });
            });

            describe('without a valid `cardType`', () => {
                it('should return `false`', () => {
                    // Act
                    const result = wrapper.vm.handleCustomCardType('Cliffs_BB');

                    // Assert
                    expect(result).toBe(false);
                });
            });

            describe('with `Anniversary_Card_1`', () => {
                it('should return `VoucherCard`', () => {
                    // Act
                    const result = wrapper.vm.handleCustomCardType('Anniversary_Card_1');

                    // Assert
                    expect(result).toBe('VoucherCard');
                });
            });

            describe('with `Voucher_Card_1`', () => {
                it('should return `VoucherCard`', () => {
                    // Act
                    const result = wrapper.vm.handleCustomCardType('Voucher_Card_1');

                    // Assert
                    expect(result).toBe('VoucherCard');
                });
            });

            describe('with `Promotion_Card_1`', () => {
                it('should return `VoucherCard`', () => {
                    // Act
                    const result = wrapper.vm.handleCustomCardType('Promotion_Card_1');

                    // Assert
                    expect(result).toBe('PromotionCard');
                });
            });

            describe('with `Promotion_Card_2`', () => {
                it('should return `VoucherCard`', () => {
                    // Act
                    const result = wrapper.vm.handleCustomCardType('Promotion_Card_2');

                    // Assert
                    expect(result).toBe('PromotionCard');
                });
            });
        });
    });

    it('should hide the title card if no content cards are available', () => {
        const { title } = cardsMock;
        const wrapper = shallowMount(Offers, {
            store: createStore({ cards: [{ title, cards: [] }] }),
            localVue,
            i18n,
            data: () => ({
                hasOffersMounted: true
            })
        });
        expect(wrapper.contains('[data-test-id="OffersInbox-SectionTitle"]')).toBe(false);
    });

    describe('skeleton offers cards while loading', () => {
        it('should be shown on the beta domain', () => {
            // Arrange
            const wrapper = shallowMount(Offers, {
                store: createStore({
                    state: {
                        isBetaDomain: true
                    },
                    contentCardsState: {
                        loading: true
                    }
                }),
                localVue,
                i18n
            });

            // Assert
            expect(wrapper.find('skeleton-loader-stub').exists()).toBe(true);
        });

        it('should be hidden when not on the beta domain', () => {
            // Arrange
            const wrapper = shallowMount(Offers, {
                store: createStore({
                    contentCardsState: {
                        loading: true
                    }
                }),
                localVue,
                i18n
            });

            // Assert
            expect(wrapper.find('skeleton-loader-stub').exists()).not.toBe(true);
        });

        it('should be hidden when not authenticated', () => {
            // Arrange
            const wrapper = shallowMount(Offers, {
                store: createStore({
                    state: {
                        isBetaDomain: true,
                        isAuthenticated: false
                    },
                    contentCardsState: {
                        loading: true
                    }
                }),
                localVue,
                i18n
            });

            // Assert
            expect(wrapper.find('skeleton-loader-stub').exists()).not.toBe(true);
        });
    });
});

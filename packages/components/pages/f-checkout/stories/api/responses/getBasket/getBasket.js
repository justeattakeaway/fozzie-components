import { CHECKOUT_METHOD_DELIVERY } from '../../../../src/constants';

const product = {
    Name: 'Alcoholic beverage',
    ProductId: '299994'
};

const restriction = {
    Type: 'Alcohol'
};

const buildPrompts = issues => ({
    SpendMore: null,
    DiscountApplied: {
        Amount: 0
    },
    Offers: [],
    InvalidProducts: issues === 'invalidProduct' ? [product] : [],
    OfflineProducts: issues === 'offlineProduct' ? [product] : [],
    RequiresOther: false,
    RefreshMenu: false,
    Restrictions: issues === 'ageRestriction' ? [restriction] : [],
    ItemDiscounts: []
});

const getBasket = (serviceType = CHECKOUT_METHOD_DELIVERY, issues) => ({
    BasketId: '11111111',
    ServiceType: serviceType,
    RestaurantId: '99999',
    RestaurantSeoName: 'poppies-fish-and-chips-spitalfields-aldgate',
    BasketSummary: {
        BasketTotals: {
            Total: 23.55
        },
        Prompts: buildPrompts(issues)
    }
});

export default getBasket;

const product = {
    Name: 'Alcoholic beverage',
    ProductId: '299994'
};

const restriction = {
    Type: 'Alcohol'
};


function buildPrompts (issues) {
    return {
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
    };
}

export default function (serviceType, issues) {
    return {
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
    };
}

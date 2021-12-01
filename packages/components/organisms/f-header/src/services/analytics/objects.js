export default {
    navigation: {
        clickHeaderLink: attributes => ({
            trakEvent: 'click',
            category: 'engagement',
            action: 'header',
            ...attributes
        }),

        offers: {
            clickLink: {
                trakEvent: 'click',
                category: 'header',
                action: 'click - navigation',
                label: 'offers'
            }
        }
    }
};

export const internalDomains = ['just-eat', 'justeat', 'menulog'];

const getCardUrlTarget = cardUrl => {
    try {
        const url = new URL(cardUrl);
        const openInNewWindow = !internalDomains.some(partial => url.hostname.indexOf(partial) > -1);
        return openInNewWindow ? {
            attribute: '_blank',
            rel: 'noopener'
        } : {
            attribute: '_self'
        };
    } catch (err) {
        return {
            attribute: '_self'
        };
    }
};

export default getCardUrlTarget;

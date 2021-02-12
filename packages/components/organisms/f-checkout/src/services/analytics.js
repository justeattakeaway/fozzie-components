import Trak from '@justeat/f-trak';

const trackInitialLoad = eventData => {
    const { basket, restaurantId, isLoggedIn } = eventData;

    const pageName = isLoggedIn ? 'Overview' : 'Guest';

    Trak.event({
        custom: {
            checkout: {
                step: 1
            },
            basket: {
                id: basket.id,
                total: basket.total
            },
            restaurant: {
                id: restaurantId
            },
            pageData: {
                name: `Checkout 1 ${pageName}`,
                group: 'Checkout'
            }
        }
    });
};

const cleanFields = errors => {
    errors = errors.map(item => item.replace('customer.', ''));
    errors = errors.map(item => item.replace('address.', 'address_'));
    errors = errors.map(item => (item === 'mobileNumber' ? 'phone' : item));

    // TODO: input events don't contain 'address_'
    return errors.sort();
};

const trackFormInteraction = eventData => {
    const { action, isLoggedIn } = eventData;

    const error = eventData.error && cleanFields(eventData.error);
    const changes = eventData.changes && cleanFields(eventData.changes);

    const formName = isLoggedIn ? 'checkout' : 'checkout_guest';

    Trak.event({
        event: 'Form',
        custom: {
            form: {
                name: formName,
                action,
                error,
                autofill: [],
                changes
            }

        }
    });
};

export { trackInitialLoad, trackFormInteraction };

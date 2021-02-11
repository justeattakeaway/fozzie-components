import Trak from '@justeat/f-trak';

const trackInitialLoad = (eventData) => {

    const {basket, restaurantId} = eventData;

    Trak.event({
        custom: {
            "checkout":{
                "step": 1
            },
            "basket":{
                "id": basket.id,
                "total": basket.total
            },
            "restaurant":{
                "id": restaurantId
            },
            "pageData":{
                "name": "Checkout 1 Overview", //or "Checkout 1 Guest"
                "group": "Checkout"
            }
        }
    });
}

export { trackInitialLoad };

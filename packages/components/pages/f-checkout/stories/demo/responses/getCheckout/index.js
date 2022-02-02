import error403 from './checkout-403-get-error.json';
import error500 from './checkout-500-get-error.json';
import collectionUserSelectedAsap from './checkout-collection-user-selected-asap.json';
import collectionUserSelectedLater from './checkout-collection-user-selected-later.json';
import collectionUserSelectedUnavailableTime from './checkout-collection-user-selected-unavailable-time.json';
import deliveryUserSelectedAsap from './checkout-delivery-user-selected-asap.json';
import deliveryUserSelectedLater from './checkout-delivery-user-selected-later.json';
import deliveryUserSelectedUnavailableTime from './checkout-delivery-user-selected-unavailable-time.json';
import collectionUk from './uk/checkout-collection.json';
import deliveryUk from './uk/checkout-delivery.json';
import deliveryNoteTypeUk from './uk/checkout-delivery-split-notes-courier.json';
import deliveryAndKitchenNoteTypesUk from './uk/checkout-delivery-split-notes-courier-kitchen.json';
import dineinUk from './uk/checkout-dinein.json';
import collectionAu from './au/checkout-collection.json';
import deliveryAu from './au/checkout-delivery.json';
import dineinAu from './au/checkout-dinein.json';
import collectionNz from './nz/checkout-collection.json';
import deliveryNz from './nz/checkout-delivery.json';
import dineinNz from './nz/checkout-dinein.json';

export default {
    error403,
    error500,
    collectionUserSelectedAsap,
    collectionUserSelectedLater,
    collectionUserSelectedUnavailableTime,
    deliveryUserSelectedAsap,
    deliveryUserSelectedLater,
    deliveryUserSelectedUnavailableTime,
    uk: {
        collection: collectionUk,
        delivery: deliveryUk,
        dinein: dineinUk,
        deliveryNoteType: deliveryNoteTypeUk,
        deliveryAndKitchenNoteTypes: deliveryAndKitchenNoteTypesUk
    },
    au: {
        collection: collectionAu,
        delivery: deliveryAu,
        dinein: dineinAu
    },
    nz: {
        collection: collectionNz,
        delivery: deliveryNz,
        dinein: dineinNz
    }
};

import { httpMethods, httpStatusCodes } from '../../helpers';

function getNotesConfig (isSplitNotes = false) {
    return {
        customerNotes: {
            serviceTypes: {
                collection: {
                    orderNoteAccepted: !isSplitNotes,
                    kitchenNoteAccepted: !!isSplitNotes
                },
                delivery: {
                    orderNoteAccepted: !isSplitNotes,
                    kitchenNoteAccepted: !!isSplitNotes,
                    courierNoteAccepted: !!isSplitNotes
                },
                dineIn: {
                    orderNoteAccepted: true
                }
            }
        }
    };
}

export default {
    'get-notes-config': {
        method: httpMethods.get,
        status: httpStatusCodes.ok,
        payload: getNotesConfig()
    },
    'get-notes-config-split': {
        method: httpMethods.get,
        status: httpStatusCodes.ok,
        payload: getNotesConfig(true)
    }
};

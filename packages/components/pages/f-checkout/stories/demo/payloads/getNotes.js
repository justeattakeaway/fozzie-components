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

const success = {
    method: httpMethods.get,
    responseStatus: httpStatusCodes.ok
};

export default [
    {
        url: '/get-notes-config',
        ...success,
        payload: getNotesConfig()
    },
    {
        url: '/get-notes-config-split',
        ...success,
        payload: getNotesConfig(true)
    }
];

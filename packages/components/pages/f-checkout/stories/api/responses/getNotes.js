import { getSuccess } from '../../helpers';

export function getNotesConfig (isSplitNotes = false) {
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

export default [
    {
        url: '/get-notes-config/99999/checkout-note-types',
        ...getSuccess,
        payload: getNotesConfig()
    },
    {
        url: '/get-notes-config-split/99999/checkout-note-types',
        ...getSuccess,
        payload: getNotesConfig(true)
    }
];

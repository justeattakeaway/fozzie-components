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
    notesConfig: getNotesConfig(),
    splitNotesConfig: getNotesConfig(true)
};

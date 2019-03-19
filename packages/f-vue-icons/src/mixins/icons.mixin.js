export default {
    props: {
        isWhite: {
            type: Boolean,
            default: false
        },

        isBlue: {
            type: Boolean,
            default: false
        },

        isGreen: {
            type: Boolean,
            default: false
        },

        isOrange: {
            type: Boolean,
            default: false
        },

        isDarkestGrey: {
            type: Boolean,
            default: false
        },

        pushLeft: {
            type: Boolean,
            default: false
        }
    },

    computed: {
        iconClasses () {
            return {
                'c-icon--white': this.isWhite,
                'c-icon--blue': this.isBlue,
                'c-icon--green': this.isGreen,
                'c-icon--orange': this.isOrange,
                'c-icon--grey--darkest': this.isDarkestGrey,
                'c-icon--pushLeft': this.pushLeft
            };
        }
    }
};

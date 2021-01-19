export default {
    methods: {
        /**
        * Returns true if `field` has been touched and if it is still empty
        * The $dirty boolean changes to true when the user has focused/lost
        * focus on the input field.
        *
        * @param type {string} The type being validated. (`Address` or `Guest`)
        * @param field {string} The field to be checked.
        */
        isFieldEmpty (type, field) {
            return this.$v[type][field].$dirty && !this.$v[type][field].required;
        },

        /**
        * Dispatches action `updateAddressDetails` or `updateCustomerDetails` to update input fields values in Vuex store.
        *
        * @param component {string} The component being updated. (`Address` or `Guest`)
        * @param field {string} The field to be being updated. e.g. `firstName`, `line1`
        * @param value {string} The new value.
        */
        updateFulfilmentDetails (component, field, value) {
            this.$store.dispatch(`checkout/update${component}Details`, { [field]: value });
        }
    }
};

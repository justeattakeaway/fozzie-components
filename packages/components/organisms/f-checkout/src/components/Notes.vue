<template>
    <div>
        <form-field
            :label-text="$t(`userNote.${serviceType}.title`)"
            input-type="textarea"
            :placeholder="$t(`userNote.${serviceType}.placeholder`)"
            :value="userNote.restaurant"
            cols="30"
            rows="7"
            maxlength="200"
            name="Note"
            has-input-description
            @input="updateUserNote({ note: $event, type: 'restaurant' })">
            {{ $t(`userNote.${serviceType}.text`) }}
        </form-field>

        <form-field
            v-if="shouldShowKitchenNotes"
            :label-text="$t(`userNote.${serviceType}.title`)"
            input-type="textarea"
            :placeholder="$t(`userNote.${serviceType}.placeholder`)"
            :value="userNote.kitchen"
            cols="30"
            rows="7"
            maxlength="200"
            name="Note"
            has-input-description
            @input="updateUserNote({ note: $event, type: 'kitchen' })">
            {{ $t(`userNote.${serviceType}.text`) }}
        </form-field>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import FormField from '@justeat/f-form-field';
import '@justeat/f-form-field/dist/f-form-field.css';
import {
    VUEX_CHECKOUT_MODULE
} from '../constants';
import loggerMixin from '../mixins/logger.mixin';

export default {
    components: {
        FormField
    },
    mixins: [
        loggerMixin
    ],

    computed: {
        ...mapState(VUEX_CHECKOUT_MODULE, [
            'noteTypes',
            'serviceType',
            'userNote'
        ]),

        shouldShowKitchenNotes () {
            return this.noteTypes && this.noteTypes.includes('kitchen');
        }
    },

    methods: {
        ...mapActions(VUEX_CHECKOUT_MODULE, [
            'updateUserNote',
            'getUserNote',
            'saveUserNote'
        ])
    }
};
</script>

<style lang="scss" module>

</style>

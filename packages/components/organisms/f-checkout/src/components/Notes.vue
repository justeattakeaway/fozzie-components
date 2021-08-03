<template>
    <div>
        <accordion
            :id="noteTypeCourierOrOrder"
            :title="$t(`userNote.${noteTypeCourierOrOrder}.${serviceType}.title`)">
            <form-field
                input-type="textarea"
                :placeholder="$t(`userNote.${noteTypeCourierOrOrder}.${serviceType}.placeholder`)"
                :value="noteValue"
                cols="30"
                rows="7"
                maxlength="200"
                :name="`${noteTypeDeliveryOrRestaurant}-note`"
                has-input-description
                @input="updateUserNote({ note: $event, type: noteTypeCourierOrOrder })">
                {{ $t(`userNote.${noteTypeCourierOrOrder}.${serviceType}.text`) }}
            </form-field>
        </accordion>
        <accordion
            v-if="shouldShowKitchenNotes"
            id="kitchen"
            :title="$t(`userNote.kitchen.${serviceType}.title`)">
            <form-field
                input-type="textarea"
                :placeholder="$t(`userNote.kitchen.${serviceType}.placeholder`)"
                :value="kitchenNoteValue"
                cols="30"
                rows="7"
                maxlength="200"
                name="kitchen-note"
                has-input-description
                @input="updateUserNote({ note: $event, type: 'kitchen' })">
                {{ $t(`userNote.kitchen.${serviceType}.text`) }}
            </form-field>
        </accordion>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import FormField from '@justeat/f-form-field';
import Accordion from './Accordion.vue';
import '@justeat/f-form-field/dist/f-form-field.css';
import {
    CHECKOUT_NOTE_TYPE_ORDER,
    CHECKOUT_NOTE_TYPE_COURIER,
    VUEX_CHECKOUT_MODULE
} from '../constants';
import loggerMixin from '../mixins/logger.mixin';

export default {
    components: {
        Accordion,
        FormField
    },

    mixins: [
        loggerMixin
    ],

    computed: {
        ...mapState(VUEX_CHECKOUT_MODULE, [
            'notesConfiguration',
            'serviceType',
            'notes'
        ]),

        shouldShowKitchenNotes () {
            return this.notesConfiguration[this.capitalisedServiceType]?.KitchenNoteAccepted;
        },

        noteTypeCourierOrOrder () {
            return this.notesConfiguration[this.capitalisedServiceType]?.OrderNoteAccepted ? CHECKOUT_NOTE_TYPE_ORDER : CHECKOUT_NOTE_TYPE_COURIER;
        },

        capitalisedServiceType () {
            return this.serviceType.charAt(0).toUpperCase() + this.serviceType.slice(1);
        },

        noteValue () {
            return this.noteTypeCourierOrOrder === CHECKOUT_NOTE_TYPE_COURIER ? this.notes.courier?.value : this.notes.order?.value;
        },

        kitchenNoteValue () {
            return this.notes.kitchen?.value || '';
        }
    },

    methods: {
        ...mapActions(VUEX_CHECKOUT_MODULE, [
            'updateUserNote'
        ])
    }
};
</script>

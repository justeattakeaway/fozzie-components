<template>
    <div v-if="isSplitNotesEnabled">
        <accordion
            :id="noteTypeCourierOrOrder"
            :title="$t(`userNote.${noteTypeCourierOrOrder}.${serviceType}.title`)">
            <span :class="$style['c-checkout-accordion-help']">{{ $t(`userNote.${noteTypeCourierOrOrder}.${serviceType}.text`) }}</span>
            <form-field
                input-type="textarea"
                :placeholder="$t(`userNote.${noteTypeCourierOrOrder}.${serviceType}.placeholder`)"
                :value="noteValue"
                v-bind="inputStyles"
                :name="`${noteTypeCourierOrOrder}-note`"
                has-input-description
                @input="updateUserNotes({ note: $event, type: noteTypeCourierOrOrder })" />
        </accordion>
        <accordion
            v-if="shouldShowKitchenNotes"
            id="kitchen"
            :title="$t(`userNote.kitchen.${serviceType}.title`)">
            <span :class="$style['c-checkout-accordion-help']">{{ $t(`userNote.kitchen.${serviceType}.text`) }}</span>
            <form-field
                input-type="textarea"
                :placeholder="$t(`userNote.kitchen.${serviceType}.placeholder`)"
                :value="kitchenNoteValue"
                v-bind="inputStyles"
                name="kitchen-note"
                has-input-description
                @input="updateUserNotes({ note: $event, type: 'kitchen' })" />
        </accordion>
    </div>
    <form-field
        v-else-if="!isSplitNotesEnabled"
        :label-text="$t(`userNote.order.delivery.title`)"
        input-type="textarea"
        :placeholder="$t(`userNote.order.${serviceType}.placeholder`)"
        :value="noteValue"
        v-bind="inputStyles"
        :name="'order-note'"
        has-input-description
        @input="updateUserNotes({ note: $event, type: 'order' })" />
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

    props: {
        isSplitNotesEnabled: {
            type: Boolean,
            default: false
        }
    },

    computed: {
        ...mapState(VUEX_CHECKOUT_MODULE, [
            'notesConfiguration',
            'serviceType',
            'notes'
        ]),

        shouldShowKitchenNotes () {
            return this.notesConfiguration[this.capitalisedServiceType]?.kitchenNoteAccepted;
        },

        noteTypeCourierOrOrder () {
            return this.notesConfiguration[this.capitalisedServiceType]?.courierNoteAccepted ? CHECKOUT_NOTE_TYPE_COURIER : CHECKOUT_NOTE_TYPE_ORDER;
        },

        capitalisedServiceType () {
            return this.serviceType.charAt(0).toUpperCase() + this.serviceType.slice(1);
        },

        noteValue () {
            return this.noteTypeCourierOrOrder === CHECKOUT_NOTE_TYPE_COURIER ? this.notes.courier?.note : this.notes.order?.note;
        },

        kitchenNoteValue () {
            return this.notes.kitchen?.note || '';
        },

        inputStyles () {
            return {
                cols: 30,
                rows: 7,
                maxlength: 200
            };
        }
    },

    methods: {
        ...mapActions(VUEX_CHECKOUT_MODULE, [
            'updateUserNotes'
        ])
    }
};
</script>

<style lang="scss" module>
    .c-checkout-accordion-help {
        display: block;
        padding: spacing() 0;
    }
</style>

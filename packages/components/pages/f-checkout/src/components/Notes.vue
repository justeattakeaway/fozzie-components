<template>
    <div v-if="notesConfiguration.isSplitNotesEnabled">
        <accordion
            v-if="courierNoteAccepted"
            :id="courier"
            :title="$t(`userNote.courier.${serviceType}.title`)">
            <span :class="$style['c-checkout-accordion-help']">{{ $t(`userNote.courier.${serviceType}.text`) }}</span>
            <form-field
                :placeholder="$t(`userNote.courier.${serviceType}.placeholder`)"
                :value="noteValue"
                v-bind="inputStyles"
                :name="`courier-note`"
                @input="updateUserNotes({ note: $event, type: courier })" />
        </accordion>
        <accordion
            v-if="kitchenNoteAccepted"
            id="kitchen"
            :title="$t(`userNote.kitchen.${serviceType}.title`)">
            <span :class="$style['c-checkout-accordion-help']">{{ $t(`userNote.kitchen.${serviceType}.text`) }}</span>
            <form-field
                :placeholder="$t(`userNote.kitchen.${serviceType}.placeholder`)"
                :value="kitchenNoteValue"
                v-bind="inputStyles"
                name="kitchen-note"
                @input="updateUserNotes({ note: $event, type: 'kitchen' })" />
        </accordion>
    </div>
    <form-field
        v-else
        :label-text="$t(`userNote.order.${serviceType}.title`)"
        :placeholder="$t(`userNote.order.${serviceType}.placeholder`)"
        :value="noteValue"
        v-bind="inputStyles"
        :name="'order-note'"
        :label-description="$t(`userNote.order.${serviceType}.text`)"
        @input="updateUserNotes({ note: $event, type: 'order' })" />
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';
import FormField from '@justeat/f-form-field';
import '@justeat/f-form-field/dist/f-form-field.css';

import Accordion from './Accordion.vue';
import {
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

    data () {
        return {
            inputStyles: {
                inputType: 'textarea',
                cols: 30,
                rows: 7,
                maxlength: 200,
                hasInputDescription: true
            }
        };
    },

    computed: {
        ...mapState(VUEX_CHECKOUT_MODULE, [
            'notesConfiguration',
            'serviceType'
        ]),

        ...mapGetters(VUEX_CHECKOUT_MODULE, [
            'kitchenNoteValue',
            'noteTypeCourierOrOrder',
            'noteValue',
            'kitchenNoteAccepted',
            'courierNoteAccepted'
        ])
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

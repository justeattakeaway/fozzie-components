<template>
    <div v-if="features.isSplitNotesEnabled">
        <accordion
            :id="noteTypeCourierOrOrder"
            :title="$t(`userNote.${noteTypeCourierOrOrder}.${serviceType}.title`)">
            <span :class="$style['c-checkout-accordion-help']">{{ $t(`userNote.${noteTypeCourierOrOrder}.${serviceType}.text`) }}</span>
            <form-field
                :placeholder="$t(`userNote.${noteTypeCourierOrOrder}.${serviceType}.placeholder`)"
                :value="noteValue"
                v-bind="inputStyles"
                :name="`${noteTypeCourierOrOrder}-note`"
                @input="updateUserNotes({ note: $event, type: noteTypeCourierOrOrder })" />
        </accordion>
        <accordion
            v-if="shouldShowKitchenNotes"
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
        :label-text="$t(`userNote.order.delivery.title`)"
        :placeholder="$t(`userNote.order.${serviceType}.placeholder`)"
        :value="noteValue"
        v-bind="inputStyles"
        :name="'order-note'"
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
            'features'
        ]),

        ...mapGetters(VUEX_CHECKOUT_MODULE, [
            'kitchenNoteValue',
            'noteTypeCourierOrOrder',
            'noteValue',
            'shouldShowKitchenNotes'
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

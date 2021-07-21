<template>
    <div>
        <accordion
            :id="noteTypeDeliveryOrRestaurant"
            :title="$t(`userNote.${noteTypeDeliveryOrRestaurant}.${serviceType}.title`)">
            <form-field
                :label-text="$t(`userNote.${noteTypeDeliveryOrRestaurant}.${serviceType}.title`)"
                input-type="textarea"
                :placeholder="$t(`userNote.${noteTypeDeliveryOrRestaurant}.${serviceType}.placeholder`)"
                :value="userNotes[noteTypeDeliveryOrRestaurant]"
                cols="30"
                rows="7"
                maxlength="200"
                :name="noteTypeDeliveryOrRestaurant + '-note'"
                has-input-description
                @input="updateUserNote({ note: $event, type: noteTypeDeliveryOrRestaurant })">
                {{ $t(`userNote.${noteTypeDeliveryOrRestaurant}.${serviceType}.text`) }}
            </form-field>
        </accordion>
        <accordion
            v-if="shouldShowKitchenNotes"
            id="kitchen"
            :title="$t(`userNote.kitchen.${serviceType}.title`)">
            <form-field
                :label-text="$t(`userNote.kitchen.${serviceType}.title`)"
                input-type="textarea"
                :placeholder="$t(`userNote.kitchen.${serviceType}.placeholder`)"
                :value="userNotes.kitchen"
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
    CHECKOUT_METHOD_DELIVERY,
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
            'noteTypes',
            'serviceType',
            'userNotes'
        ]),

        shouldShowKitchenNotes () {
            return this.serviceType === CHECKOUT_METHOD_DELIVERY && this.noteTypes?.includes('kitchen');
        },

        noteTypeDeliveryOrRestaurant () {
            return this.noteTypes?.includes('delivery') ? 'delivery' : 'restaurant';
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

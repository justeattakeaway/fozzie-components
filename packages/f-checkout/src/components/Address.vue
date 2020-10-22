<template>
    <div data-test-id='address-component'>
        <fieldset :class="$style['l-addressGroup']">
            <form-field
                v-model="address.line1"
                name="address-line-1"
                data-test-id="input-address-line-1"
                :label-text="labels.line1"
                label-style="inline" />

            <form-field
                v-model="address.line2"
                name="address-line-2"
                data-test-id="input-address-line-2"
                :label-text="labels.line2"
                label-style="inline" />

            <form-field
                v-model="address.city"
                name="address-city"
                data-test-id="input-address-city"
                :label-text="labels.city"
                label-style="inline" />
        </fieldset>

        <form-field
            v-model="address.postcode"
            :class="$style['c-formField']"
            name="address-postcode"
            data-test-id="input-address-postcode"
            :label-text="labels.postcode"
            label-style="inline" />
    </div>
</template>

<script>
import FormField from '@justeat/f-form-field';
import '@justeat/f-form-field/dist/f-form-field.css';

export default {
    components: { FormField },

    props: {
        labels: {
            type: Object,
            default: () => ({})
        }
    },

    data () {
        return {
            address: {
                line1: null,
                line2: null,
                city: null,
                postcode: null
            }
        };
    }
};
</script>

<style lang="scss" module>
.c-formField {
    input {
        height: 50px;
    }
    label {
        @include font-size(body-l);
    }
}

.l-addressGroup {
    margin: spacing(x2) 0 spacing(x4) 0;
    padding: 0;
    border: none;
    @include font-size(body-s);

    .c-formField  {
        margin-bottom: -50px;
    }
}
</style>

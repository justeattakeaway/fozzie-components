<template>
    <div data-test-id='address-component'>
        <div :class="$style['l-addressGroup']">
            <form-field
                v-model="address.line1"
                :class="$style['c-formField']"
                name="address-line-1"
                data-test-id="input-address-line-1"
                :label-text="labels.line1"
                input-type="text"
                label-style="inline" />

            <form-field
                v-model="address.line2"
                :class="$style['c-formField']"
                name="address-line-2"
                data-test-id="input-address-line-2"
                :label-text="labels.line2"
                input-type="text"
                label-style="inline" />

            <form-field
                v-model="address.city"
                :class="$style['c-formField']"
                name="address-city"
                data-test-id="input-address-city"
                :label-text="labels.city"
                input-type="text"
                label-style="inline" />
        </div>

        <form-field
            v-model="address.postcode"
            :class="$style['c-formField']"
            name="address-postcode"
            data-test-id="input-address-postcode"
            :label-text="labels.postcode"
            input-type="text"
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
    @include font-size(body-s);

    div {
        margin-bottom: -17px;
    }
}
</style>

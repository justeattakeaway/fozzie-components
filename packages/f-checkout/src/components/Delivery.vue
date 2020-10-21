<template>
    <div data-test-id='delivery-component'>
        <form-field
            :class="$style['c-formField']"
            name="mobile-number"
            data-test-id="input-mobile-number"
            :label-text="labels.mobileNumber"
            input-type="text"
            label-style="inline" />

        <div :class="$style['l-addressGroup']">
            <form-field
                :class="$style['c-formField']"
                name="address-line-1"
                data-test-id="input-address-line-1"
                :label-text="labels.line1"
                input-type="text"
                label-style="inline" />

            <form-field
                :class="$style['c-formField']"
                name="address-line-2"
                data-test-id="input-address-line-2"
                :label-text="labels.line2"
                input-type="text"
                label-style="inline" />

            <form-field
                :class="$style['c-formField']"
                name="address-city"
                data-test-id="input-address-city"
                :label-text="labels.city"
                input-type="text"
                label-style="inline" />
        </div>

        <form-field
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

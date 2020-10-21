<template>
    <div data-test-id='collection-component'>
        <form-field
            v-model="mobileNumber"
            :class="$style['c-formField']"
            name="mobile-number"
            data-test-id="input-mobile-number"
            :label-text="labels.mobileNumber"
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
</style>

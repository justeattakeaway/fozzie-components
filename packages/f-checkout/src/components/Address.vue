<template>
    <div data-test-id='address-component'>
        <fieldset :class="$style['c-addressGroup']">
            <form-field
                v-model="localAddress.line1"
                :value="address.line1"
                :class="$style['c-addressGroup-formField']"
                name="address-line-1"
                data-test-id="input-address-line-1"
                :label-text="labels.line1"
                label-style="inline">
                // TODO: - Replace with f-error-message
                <template #error>
                    <p
                        v-if="errors.line1.error"
                        :class="$style['o-form-error']"
                        data-test-id='error-address-line1-empty'>
                        {{ errors.line1.message }}
                    </p>
                </template>
            </form-field>

            <form-field
                v-model="localAddress.line2"
                :value="address.line2"
                :class="$style['c-addressGroup-formField']"
                name="address-line-2"
                data-test-id="input-address-line-2"
                :label-text="labels.line2"
                label-style="inline" />

            <form-field
                v-model="localAddress.city"
                :value="address.city"
                :class="$style['c-addressGroup-formField']"
                name="address-city"
                data-test-id="input-address-city"
                :label-text="labels.city"
                label-style="inline">
                // TODO: - Replace with f-error-message
                <template #error>
                    <p
                        v-if="errors.city.error"
                        :class="$style['o-form-error']"
                        data-test-id='error-address-city-empty'>
                        {{ errors.city.message }}
                    </p>
                </template>
            </form-field>
        </fieldset>

        <form-field
            v-model="localAddress.postcode"
            :value="address.postcode"
            name="address-postcode"
            data-test-id="input-address-postcode"
            :label-text="labels.postcode"
            label-style="inline">
            // TODO: - Replace with f-error-message
            <template #error>
                <p
                    v-if="errors.postcode.errors.required.error"
                    :class="$style['o-form-error']"
                    data-test-id='error-address-postcode-empty'>
                    {{ errors.postcode.errors.required.message }}
                </p>
                <p
                    v-else-if="errors.postcode.errors.type.error"
                    :class="$style['o-form-error']"
                    data-test-id='error-address-postcode-type-error'>
                    {{ errors.postcode.errors.type.message }}
                </p>
            </template>
        </form-field>
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
        },

        errors: {
            type: Object,
            default: () => ({})
        },

        value: {
            type: Object,
            required: true
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
    },

    computed: {
        localAddress: {
            get () { return this.value; },
            set (localAddress) { this.$emit('input', localAddress); }
        }
    }
};
</script>

<style lang="scss" module>

.c-addressGroup {
    margin: spacing(x2) 0 spacing(x4) 0;
    padding: 0;
    border: none;
    @include font-size(body-s);

    .c-addressGroup-formField {
        margin-bottom: -17px;
    }
}

.o-form-error {
    display: flex;
    align-items: center;
    color: $red;
    @include font-size(body-s);
    margin-top: spacing();
}
</style>

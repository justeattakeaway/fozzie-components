<template>
    <div
        :class="{
            [$style['c-search-inputWrapper']]: true
        }">
        <label
            :class="{
                [$style['c-search-label']]: true,
                [$style['has-error']]: errorMessage,
                [$style['c-search-label--noBorder']]: isCompressed
            }">
            <input
                ref="addressInput"
                :value="getAddressValue"
                name="postcode"
                type="search"
                data-test-id="address-box-input"
                :aria-label="copy.fieldLabel"
                :autocomplete="shouldDisplayCustomAutocomplete ? 'off' : 'on'"
                :aria-describedby="errorMessage ? 'errorMessage' : false"
                :class="{
                    [$style['c-search-input']]: true,
                    [$style['is-notEmpty']]: address
                }"
                @input="$emit('input', $event.target.value)">

            <span :class="$style['c-search-placeholder']">{{ copy.fieldPlaceholder }}</span>
        </label>
    </div>
</template>

<script>
export default {
    props: {
        errorMessage: {
            type: [Boolean, String],
            default: false
        },
        address: {
            type: String,
            default: ''
        },
        isCompressed: {
            type: Boolean,
            default: true
        },
        copy: {
            type: Object,
            default:  () => ({})
        },
        shouldDisplayCustomAutocomplete: {
            type: Boolean,
            default: false
        }
    },

    computed: {
        getAddressValue () {
            return this.address;
        }
    }
};
</script>

<style lang="scss" module>
@import '../../assets/scss/form';

.c-search-inputWrapper {
    position: relative;
    border: 0;
    margin: 0;
    padding: 0;
    flex: 1 1 auto;
}

.c-search-label--noBorder {
    border: none;
}

.c-search-inputWrapper--fullWidth {
    @include media('>=mid') {
        position: static;
    }
}

</style>

<template>
    <form
        action="#"
        method="post">
        <input
            v-model="cuisine"
            type="hidden"
            name="cuisine">

        <input
            v-model="query"
            type="hidden"
            name="query">

        <div :class="$style['c-search-fieldWrapper']">
            <div
                :class="{
                    [$style['c-search-inputWrapper']]: true
                }">
                <label
                    :class="{
                        [$style['c-search-label']]: true,
                        [$style['c-search-label--noBorder']]: isCompressed
                    }">
                    <input
                        ref="addressInput"
                        :value="address"
                        name="postcode"
                        type="search"
                        data-test-id="address-box-input"
                        :aria-label="copy.fieldLabel"
                        :aria-describedby="false ? 'errorMessage' : false"
                        :class="{
                            [$style['c-search-input']]: true,
                            [$style['is-notEmpty']]: address
                        }">

                    <span :class="$style['c-search-placeholder']">{{ copy.fieldPlaceholder }}</span>
                </label>
            </div>

            <button
                type="submit"
                data-test-id="find-restaurants-button"
                :aria-label="copy.buttonText"
                :class="{
                    [$style['c-search-btn']]: true,
                    [$style['c-search-btn--compressed']]: isCompressed
                }">
                <div :class="$style['c-search-btn-icon']">
                    <slot name="icon-submit">
                        <eyeglass-icon />
                    </slot>
                </div>

                <span :class="$style['c-search-btn-text']">{{ copy.buttonText }}</span>
            </button>
        </div>
    </form>
</template>

<script>
import { EyeglassIcon } from '@justeat/f-vue-icons';

export default {
    components: {
        EyeglassIcon
    },

    props: {
        copy: {
            type: Object,
            default: () => {}
        },
        config: {
            type: Object,
            default: () => {}
        }
    },

    data () {
        const {
            address = '',
            cuisine = '',
            query = '',
            queryString = '',
            isCompressed = false
        } = this.config;

        return {
            address,
            cuisine,
            query,
            queryString,
            isCompressed
        };
    }
};
</script>

<style lang="scss" module>
@import '../assets/scss/form.scss';

.is-visuallyHidden {
    border: 0;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
}

.c-search-btn-clear {
    $btn-size: 52px;

    background: $white;
    border: none;
    width: $btn-size;
    height: $btn-size;
    right: 5px;
    top: 5px;
    position: absolute;
    cursor: pointer;

    &:hover,
    &:focus {
        background-color: $grey--offWhite;
    }
}
</style>

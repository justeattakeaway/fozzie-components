<template>
    <form
        :action="config.formUrl"
        :class="$style['c-search']"
        method="post"
        @submit.stop="submit">
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
                        [$style['has-error']]: errorMessage,
                        [$style['c-search-label--noBorder']]: isCompressed
                    }">
                    <input
                        ref="addressInput"
                        v-model="address"
                        name="postcode"
                        type="search"
                        data-test-id="address-box-input"
                        :aria-label="copy.fieldLabel"
                        :aria-describedby="errorMessage ? 'errorMessage' : false"
                        :class="{
                            [$style['c-search-input']]: true,
                            [$style['is-notEmpty']]: address
                        }"/>

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

        <error-message
            v-if="errorMessage"
            :class="$style['c-search-error']"
            aria-live="assertive">{{ errorMessage }}</error-message>
    </form>
</template>

<script>
import ErrorMessage from '@justeat/f-error-message';
import '@justeat/f-error-message/dist/f-error-message.css';
import { EyeglassIcon } from '@justeat/f-vue-icons';
import store from '../store/searchbox.module';
import { getLastLocation } from '../utils/helpers';
import { processLocationCookie } from '../services/form.services';

export default {
    components: {
        EyeglassIcon,
        ErrorMessage
    },

    props: {
        copy: {
            type: Object,
            default: () => {}
        },
        config: {
            type: Object,
            default: () => {}
        },
        service: {
            type: Object,
            default: () => {}
        }
    },

    data () {
        const {
            address,
            cuisine,
            query,
            queryString,
            isCompressed,
            clearAddressOnValidSubmit,
            addressField,
            setCookies,
            autoPopulateAddress
        } = this.config;

        return {
            address: this.lastAddress || address,
            cuisine,
            query,
            queryString,
            isCompressed,
            clearAddressOnValidSubmit,
            addressField,
            setCookies,
            autoPopulateAddress,
            store
        };
    },

    computed: {
        /**
         * Return a tenant specific error message from the config.
         *
         * @returns {*}
         */
        errorMessage() {
            const messageKey = this.store.state.errors.length && this.store.state.errors[0];

            if (!messageKey) return false;

            return this.copy.errors[messageKey] || this.copy.errors['UNKNOWN_ERROR'];
        },
    },

    methods: {
        async submit (e) {
            this.store.commit('SET_IS_VALID', this.service.isValid(this.address));

            if (this.store.state.isValid === true) {
                this.store.commit('SET_ERRORS', []);
            } else {
                e.preventDefault();
                this.store.commit('SET_ERRORS', this.store.state.isValid);
            }

            if (this.clearAddressOnValidSubmit) {
                this.address = '';
                this.store.commit('SET_IS_DIRTY', false);
            }

            processLocationCookie(this.setCookies, this.address);

            return true;
        }
    },

    mounted () {
        this.lastAddress = this.config.locationFormat(getLastLocation());

        if (this.lastAddress) {
            this.address = this.autoPopulateAddress ? this.lastAddress : '';
        }
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

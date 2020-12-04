<template>
    <div :class="$style['c-allergenAlert-standardContent-wrapper']">
        <p v-if="hasPhoneNumberAndAllergenUrl">
            <i18n
                path="allergies.phoneNumberAndUrl">
                <template #number>
                    <a
                        data-test-id="allergen-phone-link"
                        :href="`tel:${allergenInformation.phoneNumber}`"
                        @handleClick="onPhoneClick">{{ allergenInformation.phoneNumber }}</a>
                </template>
                <template #readMoreUrl>
                    <a
                        :href="allergenInformation.url"
                        data-test-id="allergen-url-link"
                        target="_blank"
                        rel="noopener"
                        @handleClick="onUrlClick">{{ $t('allergies.readMore') }}</a>
                </template>
            </i18n>
        </p>

        <p v-else-if="hasPhoneNumberOnly">
            <i18n
                path="allergies.phoneNumberOnly">
                <template #number>
                    <a
                        data-test-id="allergen-phone-link"
                        :href="`tel:${allergenInformation.phoneNumber}`"
                        @handleClick="onPhoneClick">{{ allergenInformation.phoneNumber }}</a>
                </template>
            </i18n>
        </p>

        <p v-else-if="hasAllergenUrlOnly">
            <i18n
                path="allergies.urlOnly">
                <template #readMoreUrl>
                    <a
                        :href="allergenInformation.url"
                        data-test-id="allergen-url-link"
                        target="_blank"
                        rel="noopener"
                        @handleClick="onUrlClick">{{ $t('allergies.readMore') }}</a>
                </template>
            </i18n>
        </p>

        <p v-else>
            {{ $t('allergies.noPhoneNumberAndNoUrl') }}
        </p>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import '@justeat/f-mega-modal/dist/f-mega-modal.css';
import tenantConfigs from '../../tenants';

export default {
    components: { },
    data () {
        return {
            tenantConfigs
        };
    },
    computed: {
        ...mapState('restaurant', [
            'allergenInformation'
        ]),

        contactMethod () {
            const phone = this.allergenInformation.phoneNumber ? 'phone' : 'nophone';
            const url = this.allergenInformation.url ? 'url' : 'nourl';
            return `${phone}_${url}`;
        },

        hasPhoneNumberAndAllergenUrl () {
            return this.contactMethod === 'phone_url';
        },

        hasPhoneNumberOnly () {
            return this.contactMethod === 'phone_nourl';
        },

        hasAllergenUrlOnly () {
            return this.contactMethod === 'nophone_url';
        }
    },
    methods: {
        /* TODO - Add tracking (separate ticket) */
        pushAllergensInteraction (/* label */) {
            // this.trackAllergensInteraction({ label, method: this.contactMethod });
        },
        onPhoneClick () {
            // this.pushAllergensInteraction('click_phone');
        },
        onUrlClick () {
            // this.pushAllergensInteraction('click_url');
        }
    }
};
</script>


<style lang="scss" module>

    .c-allergenAlert-standardContent-wrapper {
        margin-bottom: spacing(x3);
    }
</style>

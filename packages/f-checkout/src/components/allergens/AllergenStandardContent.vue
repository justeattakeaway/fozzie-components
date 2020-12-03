<template>
    <div>
        <p v-if="hasPhoneNumberAndAllergenUrl">
            <i18n
                path="allergies.phoneNumberAndUrl">
                <template #number>
                    <a
                        data-test-id="allergen-phone-link"
                        :href="`tel:${allergenPhoneNumber}`"
                        @handleClick="onPhoneClick">{{ allergenPhoneNumber }}</a>
                </template>
                <template #readMoreUrl>
                    <a
                        :href="allergenUrl"
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
                        :href="`tel:${allergenPhoneNumber}`"
                        @handleClick="onPhoneClick">{{ allergenPhoneNumber }}</a>
                </template>
            </i18n>
        </p>

        <p v-else-if="hasAllergenUrlOnly">
            <i18n
                path="allergies.urlOnly">
                <template #readMoreUrl>
                    <a
                        :href="allergenUrl"
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
        ...mapState('checkout', [
            'allergenPhoneNumber',
            'allergenUrl'
        ]),

        contactMethod () {
            const phone = this.allergenPhoneNumber ? 'phone' : 'nophone';
            const url = this.allergenUrl ? 'url' : 'nourl';
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

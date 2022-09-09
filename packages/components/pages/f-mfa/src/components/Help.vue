<template>
    <div
        :class="$style['c-mfa']"
        data-test-id="v-mfa-help-component">
        <f-card
            :class="$style['c-mfa-card']"
            has-inner-spacing-large
            has-outline
            data-test-id="f-mfa-help-card">
            <div :class="$style['c-mfa-card-content']">
                <bag-sad-bg-icon
                    :class="$style['c-mfa-icon']" />

                <h2 :class="$style['c-mfa-heading']">
                    {{ $t('helpInfo.subTitle') }}
                </h2>

                <i18n
                    path="helpInfo.instructionsPrimaryText"
                    tag="p"
                    :class="$style['c-mfa-help-description']">
                    <strong>{{ email }}</strong>
                </i18n>

                <ul>
                    <li>{{ $t('helpInfo.instructionsPoint1Text') }}</li>
                    <li>{{ $t('helpInfo.instructionsPoint2Text') }}</li>
                    <li>{{ $t('helpInfo.instructionsPoint3Text') }}</li>
                    <i18n
                        path="helpInfo.instructionsPoint4Text"
                        tag="li">
                        <f-link
                            data-test-id="f-mfa-help-faq-link"
                            :href="$t('helpInfo.instructionsHelpLink')"
                            is-bold
                            target="_blank"
                            rel="noopener noreferrer">
                            <span>{{ $t('helpInfo.instructionsHelpText') }}</span>
                        </f-link>
                    </i18n>
                </ul>

                <f-button
                    :class="$style['c-mfa-primaryButton']"
                    action-type="button"
                    button-size="large"
                    is-full-width
                    data-test-id="mfa-help-enter-code-button"
                    @click="$emit('primary-button-click')">
                    {{ $t('helpInfo.primaryButtonText') }}
                </f-button>

                <f-button
                    :class="$style['c-mfa-secondaryButton']"
                    button-type="link"
                    :href="loginLinkWithReturnUrl"
                    button-size="large"
                    data-test-id="mfa-help-login-link"
                    @click="recordAnalytics">
                    {{ $t('helpInfo.secondaryButtonText') }}
                </f-button>
            </div>
        </f-card>
    </div>
</template>

<script>
import { VueGlobalisationMixin } from '@justeat/f-globalisation';

import { BagSadBgIcon } from '@justeat/f-vue-icons';
import FCard from '@justeat/f-card';
import '@justeat/f-card/dist/f-card.css';
import FButton from '@justeat/f-button';
import '@justeat/f-button/dist/f-button.css';
import FLink from '@justeat/f-link';
import '@justeat/f-link/dist/f-link.css';

import tenantConfigs from '../tenants';
import {
    buildEvent,
    HELP_LOGIN
} from '../services/EventBuilder';

export default {
    name: 'VMfa',

    components: {
        BagSadBgIcon,
        FCard,
        FButton,
        FLink
    },

    mixins: [VueGlobalisationMixin],

    props: {
        email: {
            type: String,
            required: true
        },
        returnUrl: {
            type: String,
            default: '/'
        }
    },

    data () {
        return {
            tenantConfigs
        };
    },

    computed: {
        loginLinkWithReturnUrl () {
            return `/account/login?returnUrl=${encodeURIComponent(this.returnUrl)}`;
        }
    },

    methods: {
        recordAnalytics () {
            this.$gtm.pushEvent(buildEvent(HELP_LOGIN));
        }
    }
};
</script>

<style lang="scss" module>
@use '@justeat/fozzie/src/scss/fozzie' as f;
</style>

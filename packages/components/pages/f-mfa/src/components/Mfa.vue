<template>
    <div
        :class="$style['c-mfa']"
        data-test-id="v-mfa-component">
        <f-card
            :class="$style['c-mfa-card']"
            has-inner-spacing-large
            has-outline
            data-test-id="f-mfa-verification-card">
            <div :class="$style['c-mfa-card-content']">
                <bag-surf-bg-icon
                    :class="$style['c-mfa-icon']" />
                <h2>
                    {{ $t('verificationPage.subTitle') }}
                </h2>
                <p
                    v-html="$t('verificationPage.instructionsPrimaryText', { email })" />
                <p>
                    {{ $t('verificationPage.instructionsSecondaryText') }}
                </p>

                <form
                    method="post"
                    novalidate
                    @submit.prevent="onFormSubmit">
                    <form-field
                        v-model="verificationCode"
                        :class="$style['c-mfa-formField']"
                        :label-text="$t('verificationPage.formField.labelText')"
                        :placeholder="$t('verificationPage.formField.placeholderText')"
                        required
                        :is-visually-required="false"
                        data-test-id="mfa-verification-code-textbox"
                        maxlength="10" />

                    <f-button
                        :class="$style['c-mfa-submit']"
                        :disabled="isSubmitButtonDisabled"
                        action-type="submit"
                        :is-loading="isSubmitting"
                        data-test-id="mfa-submit-button">
                        {{ $t('verificationPage.submitButtonText') }}
                    </f-button>
                </form>

                <f-button
                    :class="$style['c-mfa-need-help-link']"
                    button-type="link"
                    data-test-id="mfa-need-help-link"
                    @click="onShowHelpInfo">
                    {{ $t('verificationPage.helpModalLinkText') }}
                </f-button>
            </div>
        </f-card>
    </div>
</template>

<script>
import { VueGlobalisationMixin } from '@justeat/f-globalisation';

import FCard from '@justeat/f-card';
import '@justeat/f-card/dist/f-card.css';
import FormField from '@justeat/f-form-field';
import '@justeat/f-form-field/dist/f-form-field.css';
import FButton from '@justeat/f-button';
import '@justeat/f-button/dist/f-button.css';

import {
    BagSurfBgIcon
} from '@justeat/f-vue-icons';
import tenantConfigs from '../tenants';

const standardLogTags = ['account-pages', 'mfa'];

export default {
    name: 'VMfa',

    components: {
        FCard,
        FormField,
        FButton,
        BagSurfBgIcon
    },

    mixins: [VueGlobalisationMixin],

    props: {
        smartGatewayBaseUrl: {
            type: String,
            required: true
        }
    },

    data () {
        return {
            verificationCode: '',
            email: '',
            tenantConfigs,
            isSubmitting: false,
            showErrorPage: false
        };
    },

    computed: {
        isSubmitButtonDisabled () {
            return this.verificationCode.length < 1;
        }
    },

    mounted () {
        this.initialise();
    },

    methods: {
        /**
        * TODO
        */
        initialise () {
            try {
                // TODO - Validate Querystring params - Invalid > raise showErrorPage flag
                // TODO - Assign to data model
                this.email = 'email@email.com';
                this.code = 'someCode123';
            } catch (error) {
                this.$log.error('Error validating mfa data', error, standardLogTags);
            }
        },

        /**
        * TODO
        */
        async onFormSubmit () {
            this.isSubmitting = true;
            try {
                // TODO
                // eslint-disable-next-line no-promise-executor-return
                await new Promise(resolve => setTimeout(resolve, 1000)) // DEBUG - Simulate network delay
                .then(console.log('DEBUG - onFormSubmit', { verificationCode: this.verificationCode, code: this.code, email: this.email })); // eslint-disable-line no-console
            } catch (error) {
                this.$log.error('Error submitting mfa verification code', error, standardLogTags);
            } finally {
                this.isSubmitting = false;
            }
        },

        /**
        * TODO
        */
        onShowHelpInfo () {
            console.log('DEBUG - onShowHelpInfo'); // eslint-disable-line no-console
        }
    }
};
</script>

<style lang="scss" module>
@use '@justeat/fozzie/src/scss/fozzie' as f;

.c-mfa {
    display: flex;
    justify-content: center;
    margin: auto;
    text-align: center;

    h2 {
        margin-top: 0;
    }
}

.c-mfa-icon {
    transform: translate(10%);
    margin: -#{f.spacing(g)} 0 -#{f.spacing(d)};
    width: 212px;
}

.c-mfa-card {
    @include f.media('>=narrow') {
        box-shadow: f.$elevation-01;
    }
}

.c-mfa-card-content {
    max-width: 392px;
    margin: 0 f.spacing(d);

    @include f.media('>mid') {
        margin: 0 f.spacing(i);
    }
}

.c-mfa-formField {
    text-align: left;
    margin-top: f.spacing(f);
}

.c-mfa-submit {
    margin-top: f.spacing(g);
    margin-bottom: f.spacing(f);
}

.c-mfa-need-help-link {
    margin-bottom: f.spacing(d);
}
</style>

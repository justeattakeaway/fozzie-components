<template>
    <div
        :class="$style['c-mfa']"
        data-test-id="v-mfa-component">
        <f-card
            :class="$style['c-mfa-card']"
            data-test-id="f-mfa-verification-card"
            has-inner-spacing-large
            card-size-custom="medium"
            has-outline>
            <bag-sad-bg-icon
                :class="$style['c-mfa-icon']" />
            <h2>
                {{ $t('verificationPage.subTitle') }}
            </h2>
            <p
                :class="$style['c-mfa-instructions>']"
                v-html="$t('verificationPage.instructionsPrimaryText', { email })" />
            <p
                :class="$style['c-mfa-instructions>']">
                {{ $t('verificationPage.instructionsSecondaryText') }}
            </p>

            <form
                method="post"
                novalidate
                @submit.prevent="onFormSubmit">
                <form-field
                    v-model.lazy="verificationCode"
                    :class="$style['c-mfa-formField']"
                    data-test-id="mfa-verification-code-textbox"
                    required="true"
                    :is-visually-required=false
                    maxlength="10"
                    :label-text="$t('verificationPage.formField.labelText')"
                    :placeholder="$t('verificationPage.formField.placeholderText')" />

                <f-button
                    :class="$style['c-mfa-submit']"
                    data-test-id="mfa-submit-button"
                    :disabled="verificationCode.trim().length < 1"
                    button-type="primary"
                    action-type="submit"
                    :is-loading="isSubmitting">
                    {{ $t('verificationPage.submitButtonText') }}
                </f-button>
            </form>

            <f-button
                :class="$style['c-mfa-help-info']"
                data-test-id="mfa-need-help-link"
                button-type=link
                @click="onShowHelpInfo">
                {{ $t('verificationPage.helpModalLinkText') }}
            </f-button>
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
    BagSadBgIcon
} from '@justeat/f-vue-icons';
import tenantConfigs from '../tenants';

const standardLogTags = ['account-pages', 'mfa'];

export default {
    name: 'VMfa',

    components: {
        FCard,
        FormField,
        FButton,
        BagSadBgIcon
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
    font-family: f.$font-family-base;
    @include f.font-size(heading-m);
    text-align: center;

    @include f.media('>=narrow') {
        width: 80vw;
    }
}

.c-mfa-icon {
    transform: translate(10%);
    margin-top: - f.spacing(d);
    margin-bottom: - f.spacing(g);
    width: 183px;
}

.c-mfa-card {
    position: relative;

    @include f.media('>=narrow') {
        box-shadow: 0 1px 1px 0 rgba(f.$color-black, 0.03), 0 2px 1px -1px rgba(f.$color-black, 0.07), 0 1px 3px 0 rgba(f.$color-black, 0.06);
    }
}

.c-mfa-formField {
    text-align: left;
    margin-top: f.spacing(d);
}

.c-mfa-instructions {
    @include f.font-size(body-l);
}

.c-mfa-submit {
    margin-top: f.spacing(g);
    margin-bottom: f.spacing(f);
}

.c-mfa-help-info {
    margin-bottom: f.spacing(d);
}
</style>

<template>
    <div
        data-test-id="contact-preferences"
        :class="$style['c-contactPreferences']">
        <card-component
            v-if="!shouldShowErrorPage"
            :card-heading="$t('heading')"
            has-inner-spacing-large
            :card-size-custom="'medium'"
            has-outline>
            <form @submit.prevent="onFormSubmit">
                <div
                    v-for="{ key, isEmailEnabled, emailValue, isSmsEnabled, smsValue } in preferences"
                    :key="key">
                    <h2
                        :class="$style['c-contactPreferences-subtitle']">
                        {{ $t(`${key}.subtitle`) }}
                    </h2>
                    <fieldset
                        :class="$style['c-contactPreferences-fieldset']">
                        <f-form-field
                            :class="$style['c-contactPreferences-formField']"
                            input-type="checkbox"
                            :label-text=" $t(`${key}.email`)"
                            :label-description="getEmailDescription(key)"
                            :disabled="!isEmailEnabled"
                            :data-test-id="`contact-preferences-${key}-email-checkbox`"
                            :name="`contact-preferences-${key}-email`"
                            :checked="emailValue"
                            @input="(checked) => editPreferenceValue(key, Object.keys({ emailValue })[0], checked)"
                        />

                        <f-form-field
                            :class="$style['c-contactPreferences-formField']"
                            input-type="checkbox"
                            :label-text=" $t(`${key}.sms`)"
                            :label-description="getSmsDescription(key)"
                            :disabled="!isSmsEnabled"
                            :data-test-id="`contact-preferences-${key}-sms-checkbox`"
                            :name="`contact-preferences-${key}-sms`"
                            :checked="smsValue"
                            @input="(checked) => editPreferenceValue(key, Object.keys({ smsValue })[0], checked)"
                        />
                    </fieldset>
                </div>

                <f-button
                    :class="$style['c-contactPreferences-btn']"
                    data-test-id="contact-preferences-submit-button"
                    button-type="primary"
                    action-type="submit"
                    :is-loading="isFormSubmitting">
                    {{ $t('saveChangesButton') }}
                </f-button>
            </form>
        </card-component>

        <div v-else>
            <card-component
                data-test-id="contact-preferences-error-card"
                has-outline
                is-page-content-wrapper
                card-heading-position="center">
                <h1>
                    {{ $t('errorMessages.errorHeading') }}
                </h1>
                <p>
                    {{ $t(error.messageKey) }}
                </p>
            </card-component>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

// Fozzie
import { VueGlobalisationMixin } from '@justeat/f-globalisation';
import FButton from '@justeat/f-button';
import '@justeat/f-button/dist/f-button.css';
import FFormField from '@justeat/f-form-field';
import '@justeat/f-form-field/dist/f-form-field.css';
import CardComponent from '@justeat/f-card';
import '@justeat/f-card/dist/f-card.css';

// Internal
import tenantConfigs from '../tenants';
import { GetPreferencesError } from '../exceptions';
import ContactPreferencesApi from '../services/providers/contactPreferences.api';
import fContactPreferencesModule from '../store/contactPreferences.module';
import {
    EVENT_SPINNER_STOP_LOADING
} from '../constants';

export default {
    name: 'ContactPreferences',

    components: {
        CardComponent,
        FButton,
        FFormField
    },

    mixins: [VueGlobalisationMixin],

    props: {
        authToken: {
            type: String,
            default: null
        },
        isAuthFinished: {
            type: Boolean,
            required: true
        },
        smartGatewayBaseUrl: {
            type: String,
            required: true
        }
    },

    data () {
        return {
            isFormDirty: false,
            error: {},
            shouldShowErrorPage: false,
            tenantConfigs,
            contactPreferencesApi: new ContactPreferencesApi({
                httpClient: this.$http,
                cookies: this.$cookies,
                baseUrl: this.smartGatewayBaseUrl
            }),
            isFormSubmitting: false
        };
    },

    computed: {
        ...mapState('fContactPreferencesModule', [
            'preferences'
        ])
    },

    watch: {
        isAuthFinished: {
            immediate: true,
            async handler (value) {
                if (value) {
                    await this.initialise();
                }
            }
        }
    },

    created () {
        if (!this.$store.hasModule('fContactPreferencesModule')) {
            this.$store.registerModule('fContactPreferencesModule', fContactPreferencesModule);
        }
    },

    async mounted () {
        if (this.isAuthFinished) {
            await this.initialise();
        }
    },

    methods: {
        ...mapActions('fContactPreferencesModule', [
            'loadPreferences',
            'savePreferences',
            'editPreference'
        ]),



        /**
        * Returns translation string if it exists
        * @param {string} key - The key of the preference that needs changing
        */
        getEmailDescription (key) {
            if (!this.$te(`${key}.emailDescription`)) return '';

            return `(${this.$t(`${key}.emailDescription`)})`;
        },

        /**
        * Returns translation string if it exists
        * @param {string} key - The key of the preference that needs changing
        */
        getSmsDescription (key) {
            if (!this.$te(`${key}.smsDescription`)) return '';

            return `(${this.$t(`${key}.smsDescription`)})`;
        },

        /**
        * Informs the template that we are in an Error State.
        * @param {object} Error - The error that has recently occurred
        */
        handleErrorState (error) {
            this.shouldShowErrorPage = true;
            this.error = error;
        },

        /**
        * A generic method that updates the State (e.g. 'preference[key][field] = value')
        * @param {string} key - The key of the preference that needs changing
        * @param {string} field - The field of the preference that needs changing
        * @param {string} value - The new value the preference field
        */
        editPreferenceValue (key, field, value) {
            this.editPreference({ key, field, value });
            this.isFormDirty = true;
        },

        /**
        * Sets the flag to inform the Template of whether the form is currently submitting or not
        * @param {boolean} isFormSubmitting - True = Form is being submitted / False = Form is not being submitted
        */
        setSubmittingState (isFormSubmitting) {
            this.isFormSubmitting = isFormSubmitting;
        },

        /**
        * Gets the form data (from the api) and assigns it to State
        * then lowers the isFormDirty flag as the form data is currently clean
        * then stops the on-screen spinner from showing
        *
        * If an error occurs then this is logged and the Template is
        * informed that it is in a state of error.
        */
        async initialise () {
            try {
                await this.loadPreferences({ api: this.contactPreferencesApi, authToken: this.authToken });
                this.isFormDirty = false;
            } catch (error) {
                this.handleErrorState(new GetPreferencesError(error.message, error?.response?.status));
            } finally {
                this.$nextTick(() => {
                    this.$parent.$emit(EVENT_SPINNER_STOP_LOADING);
                });
            }
        },

        /**
        * If there are any form changes
        * then informs the Template that we are submitting the form
        * then Saves the State (via the api)
        * then lowers the isFormDirty flag as the form data is now currently clean again
        * then informs the Template that we are now not submitting the form
        *
        * If an error occurs then this is logged and the Template is
        * informed that it is in a state of error.
        */
        async onFormSubmit () {
            if (!this.isFormDirty) {
                return;
            }

            this.setSubmittingState(true);

            try {
                await this.savePreferences({ api: this.contactPreferencesApi, authToken: this.authToken });
                this.isFormDirty = false;
            } catch (error) {
                this.handleErrorState(new GetPreferencesError(error.message, error?.response?.status));
            } finally {
                this.setSubmittingState(false);
            }
        }
    }
};
</script>

<style lang="scss">
.c-formField-label,
.c-formField-label-description {
    margin-bottom: 0;
}
</style>

<style lang="scss" module>

.c-contactPreferences-fieldset {
    display: flex;
    flex-flow: column;
    border: none;
    padding: 0;
    margin: spacing(x2) 0;
}

.c-contactPreferences-subtitle {
    @include font-size(heading-s);
}

.c-contactPreferences {
    .c-contactPreferences-formField {
        margin-top: 0;
    }
    .c-contactPreferences-formField + .c-contactPreferences-formField {
        margin-top: 0;
        margin-bottom: spacing(x2);
    }
}

.c-contactPreferences-btn {
    width: 100%;

    @include media('>narrow') {
        width: inherit;
    }
}
</style>


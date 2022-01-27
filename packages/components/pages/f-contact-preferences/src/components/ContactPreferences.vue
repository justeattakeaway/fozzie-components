<template>
    <div
        data-test-id="contact-preferences"
        :class="$style['c-contactPreferences']">
        <card-component
            v-if="!shouldShowLoadErrorCard"
            :card-heading="$t('heading')"
            card-heading-size="beta"
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
                            is-grouped
                            :label-text="getLabelText(key, 'email')"
                            :disabled="!isEmailEnabled"
                            :data-test-id="`contact-preferences-${key}-email-checkbox`"
                            :name="`contact-preferences-${key}-email`"
                            :checked="emailValue"
                            @input="(checked) => editPreferenceValue(key, Object.keys({ emailValue })[0], checked)"
                        />

                        <f-form-field
                            :class="$style['c-contactPreferences-formField']"
                            input-type="checkbox"
                            is-grouped
                            :label-text="getLabelText(key, 'sms')"
                            :disabled="!isSmsEnabled"
                            :data-test-id="`contact-preferences-${key}-sms-checkbox`"
                            :name="`contact-preferences-${key}-sms`"
                            :checked="smsValue"
                            @input="(checked) => editPreferenceValue(key, Object.keys({ smsValue })[0], checked)"
                        />
                    </fieldset>
                </div>

                <f-alert
                    v-if="shouldShowSaveErrorAlert"
                    data-test-id="contact-preferences-error-alert"
                    :class="[
                        $style['c-contactPreferences-alert'],
                        $style['c-contactPreferences-inheritWidthAboveNarrow']
                    ]"
                    type="danger"
                    :heading="$t('errorMessages.saving.heading')">
                    {{ $t(error.messageKey) }}
                </f-alert>

                <f-alert
                    v-if="shouldShowSuccessfulAlert"
                    data-test-id="contact-preferences-success-alert"
                    :class="[
                        $style['c-contactPreferences-alert'],
                        $style['c-contactPreferences-inheritWidthAboveNarrow']
                    ]"
                    type="success"
                    :heading="$t('successMessages.saving.heading')"
                />

                <f-button
                    :class="$style['c-contactPreferences-inheritWidthAboveNarrow']"
                    data-test-id="contact-preferences-submit-button"
                    button-type="primary"
                    action-type="submit"
                    :is-loading="isFormSubmitting">
                    {{ $t('saveChangesButton') }}
                </f-button>
            </form>
        </card-component>

        <f-card-with-content
            v-else
            data-test-id="contact-preferences-error-card"
            :card-heading="$t('errorMessages.loading.heading')"
            :card-description="$t(error.messageKey)">
            <template #icon>
                <bag-sad-bg-icon />
            </template>
        </f-card-with-content>
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
import FCardWithContent from '@justeat/f-card-with-content';
import '@justeat/f-card-with-content/dist/f-card-with-content.css';
import FAlert from '@justeat/f-alert';
import '@justeat/f-alert/dist/f-alert.css';
import { BagSadBgIcon } from '@justeat/f-vue-icons';

// Internal
import tenantConfigs from '../tenants';
import PreferencesError from '../exceptions/preferencesError';
import ContactPreferencesApi from '../services/providers/contactPreferences.api';
import fContactPreferencesModule from '../store/contactPreferences.module';
import {
    EVENT_SPINNER_STOP_LOADING
} from '../constants';

const standardLogTags = ['account-pages', 'contact-preferences'];

export default {
    name: 'ContactPreferences',

    components: {
        CardComponent,
        FCardWithContent,
        FButton,
        FAlert,
        FFormField,
        BagSadBgIcon
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
            shouldShowLoadErrorCard: false,
            shouldShowSaveErrorAlert: false,
            shouldShowSuccessfulAlert: false,
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
            immediate: true, // this prevents the need to call initialise() on mounted
            async handler (value) {
                if (value) {
                    await this.initialise();
                }
            }
        }
    },

    beforeCreate () {
        if (!this.$store.hasModule('fContactPreferencesModule')) {
            this.$store.registerModule('fContactPreferencesModule', fContactPreferencesModule);
        }
    },

    methods: {
        ...mapActions('fContactPreferencesModule', [
            'loadPreferences',
            'savePreferences',
            'editPreference'
        ]),

        setFormDirtyState (isDirty) {
            this.isFormDirty = isDirty;
            this.shouldShowSaveErrorAlert = false;
            this.shouldShowSuccessfulAlert = !isDirty;
        },

        /**
        * Returns label text for a given key and field.
        * @param {string} key - The key of the preference that needs changing
        * @param {string} field - The field of the preference that needs changing
        */
        getLabelText (key, field) {
            const label = this.$t(`${key}.${field}`);
            const description = this.getDescription(key, `${field}Description`);

            return `${label} ${description}`;
        },

        /**
        * Returns translation for a description if it exists
        * @param {string} key - The key of the preference that needs changing
        * @param {string} field - The field of the preference that needs changing
        */
        getDescription (key, field) {
            if (!this.$te(`${key}.${field}`)) return '';

            return `(${this.$t(`${key}.${field}`)})`;
        },

        /**
        * Informs the template that we are in Load Error State.
        * @param {object} error - The error that has recently occurred
        */
        handleLoadErrorState (error) {
            this.shouldShowLoadErrorCard = true;
            this.error = new PreferencesError(error?.message, error?.response?.status, 'errorMessages.loading.description');
        },

        /**
        * Informs the template that we failed to save.
        * @param {object} error - The error that has recently occurred
        */
        handleSaveErrorState (error) {
            this.shouldShowSaveErrorAlert = true;
            this.error = new PreferencesError(error?.message, error?.response?.status, 'errorMessages.saving.description');
        },

        /**
        * A generic method that updates the State (e.g. 'preference[key][field] = value')
        * @param {string} key - The key of the preference that needs changing
        * @param {string} field - The field of the preference that needs changing
        * @param {string} value - The new value the preference field
        */
        editPreferenceValue (key, field, value) {
            this.editPreference({ key, field, value });
            this.setFormDirtyState(true);
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
                this.$log.info('Account preferences fetched successfully', standardLogTags);
            } catch (error) {
                this.$log.error('Error fetching account preferences', error, standardLogTags);
                this.handleLoadErrorState(error);
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
                this.$log.info('Account preferences saved successfully', standardLogTags);
                this.setFormDirtyState(false);
            } catch (error) {
                this.$log.error('Error saving account preferences', error, standardLogTags);
                this.handleSaveErrorState(error);
            } finally {
                this.setSubmittingState(false);
            }
        }
    }
};
</script>

<style lang="scss" module>
.c-contactPreferences-fieldset {
    display: flex;
    flex-flow: column;
    border: none;
    padding: 0;
    margin: spacing(x2) 0 spacing(x4);
}

.c-contactPreferences-subtitle {
    @include font-size(heading-s);
}

.c-contactPreferences {
    .c-contactPreferences-formField {
        margin-top: 0;

        .c-contactPreferences-formField + & {
            margin-bottom: spacing(x2);
        }
    }
}

.c-contactPreferences-inheritWidthAboveNarrow {
    width: 100%;

    @include media('>narrow') {
        width: inherit;
    }
}

.c-contactPreferences-alert {
    margin: -(spacing()) 0 spacing(x4); // Negative top margin needed to offset the fieldset's bottom margin.
}
</style>

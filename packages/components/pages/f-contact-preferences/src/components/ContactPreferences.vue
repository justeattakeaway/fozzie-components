<template>
    <div
        data-test-id="contactPreferences">
        <card-component
            v-if="!shouldShowErrorPage"
            :card-heading="$t('heading')"
            is-page-content-wrapper
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
                        <label>
                            <input
                                type="checkbox"
                                :data-test-id="`contactPreferences-${key}-checkbox`"
                                :disabled="!isEmailEnabled"
                                :checked="emailValue"
                                @change="editPreferenceValue(key, Object.keys({ emailValue })[0], $event.target.checked)">
                            <span
                                :class="{
                                    [$style['c-contactPreferences-labelText--disabled']]: !isEmailEnabled
                                }">
                                {{ $t(`${key}.email`) }}
                                <template v-if="$te(`${key}.emailDescription`)">
                                    <br>({{ $t(`${key}.emailDescription`) }})
                                </template>
                            </span>
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                :data-test-id="`contactPreferences-${key}-checkbox`"
                                :disabled="!isSmsEnabled"
                                :checked="smsValue"
                                @change="editPreferenceValue(key, Object.keys({ smsValue })[0], $event.target.checked)">
                            <span
                                :class="{
                                    [$style['c-contactPreferences-labelText--disabled']]: !isSmsEnabled
                                }">
                                {{ $t(`${key}.sms`) }}
                                <template v-if="$te(`${key}.smsDescription`)">
                                    <br>({{ $t(`${key}.smsDescription`) }})
                                </template>
                            </span>
                        </label>
                    </fieldset>
                </div>

                <f-button
                    button-type="primary"
                    is-full-width
                    action-type="submit"
                    :is-loading="isFormSubmitting">
                    {{ $t('saveChangesButton') }}
                </f-button>
            </form>
        </card-component>

        <div v-else>
            <card-component
                data-test-id="contactPreferences-error-card"
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
import CardComponent from '@justeat/f-card';
import '@justeat/f-card/dist/f-card.css';

// Internal
import tenantConfigs from '../tenants';
import { GetPreferencesError } from '../exceptions';
import ContactPreferencesApi from '../services/providers/contactPreferences.api';
import {
    STOP_LOADING_SPINNER_EVENT
} from '../constants';

export default {
    name: 'ContactPreferences',

    components: {
        CardComponent,
        FButton
    },

    mixins: [VueGlobalisationMixin],

    props: {
        authToken: {
            type: String,
            default: ''
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

    async mounted () {
        await this.initialise();
    },

    methods: {
        ...mapActions('fContactPreferencesModule', [
            'loadPreferences',
            'savePreferences',
            'editPreference'
        ]),

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
                this.$parent.$emit(STOP_LOADING_SPINNER_EVENT);
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

<style lang="scss" module>
.c-contactPreferences-fieldset {
    display: flex;
    flex-flow: column;
    border: none;
    padding: 0;
    margin: spacing(x2) 0;
}

.c-contactPreferences-labelText--disabled {
    color: $color-content-disabled;
}

.c-contactPreferences-subtitle {
    @include font-size(heading-s);
}
</style>

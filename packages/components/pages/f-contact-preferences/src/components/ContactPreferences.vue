<template>
    <div
        data-test-id="contactPreferences">
        <card-component
            v-if="!showErrorPage"
            :card-heading="$t('heading')"
            is-page-content-wrapper
            has-outline>
            <form @submit.prevent="onFormSubmit">
                <div
                    v-for="{ key, emailEnabled, emailValue, smsEnabled, smsValue } in preferences"
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
                                :disabled="!emailEnabled"
                                :checked="emailValue"
                                @change="updatePreferenceValue(key, Object.keys({ emailValue })[0], $event.target.checked)">
                            <span
                                :class="{
                                    [$style['c-contactPreferences-labelText--disabled']]: !emailEnabled
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
                                :disabled="!smsEnabled"
                                :checked="smsValue"
                                @change="updatePreferenceValue(key, Object.keys({ smsValue })[0], $event.target.checked)">
                            <span
                                :class="{
                                    [$style['c-contactPreferences-labelText--disabled']]: !smsEnabled
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
import { mapActions, mapState, mapMutations } from 'vuex';

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
    UPDATE_PREFERENCE,
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
            error: {},
            showErrorPage: false,
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
            'savePreferences'
        ]),

        ...mapMutations('fContactPreferencesModule', [
            UPDATE_PREFERENCE
        ]),

        handleErrorState (error) {
            this.showErrorPage = true;
            this.error = error;
        },

        updatePreferenceValue (key, field, value) {
            this[UPDATE_PREFERENCE]({ key, field, value });
        },

        setSubmittingState (isFormSubmitting) {
            this.isFormSubmitting = isFormSubmitting;
        },

        async initialise () {
            try {
                await this.loadPreferences({ api: this.contactPreferencesApi, authToken: this.authToken });
            } catch (error) {
                this.handleErrorState(new GetPreferencesError(error.message, error?.response?.status));
            } finally {
                this.$parent.$emit(STOP_LOADING_SPINNER_EVENT);
            }
        },

        async onFormSubmit () {
            this.setSubmittingState(true);

            try {
                await this.savePreferences({ api: this.contactPreferencesApi, authToken: this.authToken });
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

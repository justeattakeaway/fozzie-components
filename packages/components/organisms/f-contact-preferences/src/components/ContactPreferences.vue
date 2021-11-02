<template>
    <div>
        <card-component
            v-if="!showErrorPage"
            :card-heading="$t('heading')"
            is-page-content-wrapper
            has-outline>
            <form @submit.prevent="onFormSubmit">
                <div
                    v-for="{ email, key, sms } in preferences"
                    :key="key">
                    <h2 :class="$style['c-contactPreferences-subtitle']">
                        {{ $t(`${key}.subtitle`) }}
                    </h2>
                    <fieldset :class="$style['c-contactPreferences-fieldset']">
                        <label>
                            <input
                                type="checkbox"
                                :disabled="!email.enabled"
                                :checked="email.value">
                            <span
                                :class="{
                                    [$style['c-contactPreferences-labelText--disabled']]: !email.enabled
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
                                :disabled="!sms.enabled"
                                :checked="sms.value">
                            <span
                                :class="{
                                    [$style['c-contactPreferences-labelText--disabled']]: !sms.enabled
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
                    is-full-width>
                    {{ $t('saveChangesButton') }}
                </f-button>
            </form>
        </card-component>

        <div v-else>
            <card-component
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
// Services
import { VueGlobalisationMixin } from '@justeat/f-globalisation';

// Components
import FButton from '@justeat/f-button';
import '@justeat/f-button/dist/f-button.css';
import CardComponent from '@justeat/f-card';
import '@justeat/f-card/dist/f-card.css';

import tenantConfigs from '../tenants';
import { GetPreferencesError } from '../exceptions';
import { mapToPreferencesViewModel } from '../services/mapping';

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
            preferences: [],
            showErrorPage: false,
            tenantConfigs
        };
    },

    mounted () {
        try {
            const data = {
                preferencesVersionViewed: 0,
                preferences: [
                    {
                        displayName: 'orderUpdates',
                        email: true,
                        key: 'orderUpdates',
                        push: false,
                        sms: true,
                        sort: 0
                    },
                    {
                        displayName: 'newsletter',
                        email: false,
                        key: 'newsletter',
                        push: false,
                        sms: false,
                        sort: 0
                    }
                ]
            };

            this.preferences = mapToPreferencesViewModel(data).preferences;
        } catch (error) {
            this.handleErrorState(new GetPreferencesError(error.message, error?.response?.status));
        }
    },

    methods: {
        handleErrorState (error) {
            this.showErrorPage = true;
            this.error = error;
        },

        onFormSubmit () {}
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

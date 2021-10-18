<template>
    <card-component
        :card-heading="copy.heading"
        is-page-content-wrapper
        has-outline>
        <form @submit.prevent="onFormSubmit">
            <div
                v-for="{ email, key, sms } in preferences"
                :key="key">
                <h2 :class="$style['c-contactPreferences-subtitle']">
                    {{ copy[key].subtitle }}
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
                            {{ copy[key].email }}
                            <template v-if="copy[key].emailDescription">
                                <br>({{ copy[key].emailDescription }})
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
                            {{ copy[key].sms }}
                            <template v-if="copy[key].smsDescription">
                                <br>({{ copy[key].smsDescription }})
                            </template>
                        </span>
                    </label>
                </fieldset>
            </div>

            <f-button
                button-type="primary"
                is-full-width>
                {{ copy.saveChangesButton }}
            </f-button>
        </form>
    </card-component>
</template>

<script>
// import axios from 'axios';
import { globalisationServices } from '@justeat/f-services';

import FButton from '@justeat/f-button';
import '@justeat/f-button/dist/f-button.css';
import CardComponent from '@justeat/f-card';
import '@justeat/f-card/dist/f-card.css';

import tenantConfigs from '../tenants';
import { mapToPreferencesViewModel } from '../services/mapping';

export default {
    name: 'ContactPreferences',

    components: {
        CardComponent,
        FButton
    },

    props: {
        authToken: {
            type: String,
            default: ''
        },
        getPreferencesUrl: {
            type: String,
            required: true
        },
        locale: {
            type: String,
            default: ''
        },
        preferencesTimeout: {
            type: Number,
            required: false,
            default: 60000
        }
    },

    data () {
        const locale = globalisationServices.getLocale(tenantConfigs, this.locale, this.$i18n);
        const localeConfig = tenantConfigs[locale];

        return {
            copy: { ...localeConfig },
            preferences: []
        };
    },

    async mounted () {
        try {
            // const { data } = await axios.get(this.getPreferencesUrl, {
            //     headers: {
            //         'Content-Type': 'application/json',
            //         ...(this.authToken && {
            //             Authorization: `Bearer ${this.authToken}`
            //         })
            //     },
            //     timeout: this.preferencesTimeout
            // });

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

            // this.$emit('preferences-get-success');
            this.preferences = mapToPreferencesViewModel(data).preferences;
        } catch (error) {
            // TODO: Handle error when loading preferences fails
            console.error(error); // eslint-disable-line no-console
        }
    },

    methods: {
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

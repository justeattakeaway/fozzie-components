<template>
    <div :class="$style['c-selfExclusion']">
        <f-card
            has-inner-spacing-large
            card-size-custom="medium"
            has-outline
            :card-heading="$t('heading')"
            :class="$style['c-selfExclusion-card-component']">
            <div v-if="isOpenAlertConfirmation && hasAlcoholExclusion">
                <f-alert
                    type="success"
                    :heading="$t('alcoholicItemsExcludedConfirmation.heading')">
                    {{ selectedState === 'temporaryExclusion'
                        ? $t('alcoholicItemsExcludedConfirmation.textTemporary')
                        : $t('alcoholicItemsExcludedConfirmation.textPermanent') }}

                    <p>{{ $t('alcoholicItemsExcludedConfirmation.text2') }}</p>
                    <div :class="$style['c-buttons']">
                        <f-button
                            action-type="reset"
                            button-type="primary"
                            button-size="small-productive"
                            @click="closeAlertConfirmation"
                        >
                            {{ $t('buttons.cancel') }}
                        </f-button>
                    </div>
                </f-alert>
            </div>

            <p :class="$style['c-selfExclusion-details']">
                {{ $t('alcoholSelfExclusionInfo') }}
            </p>

            <form :class="$style['c-selfExclusion-form']">
                <fieldset
                    v-for="(option, optionKey) in alcoholExclusionOptions"
                    :key="optionKey"
                    :class="$style['c-selfExclusion-fieldset']"
                >
                    <f-form-field
                        :disabled="isFormDisabled"
                        input-type="radio"
                        name="self-exclusion-options"
                        :label-text="option.label"
                        :checked="selectedState === option.value"
                        @input="changeState(option.value)"
                    />

                    <span
                        v-if="alcoholExclusion.state === option.value
                            && alcoholExclusion.state === 'temporaryExclusion'
                            && hasAlcoholExclusion"
                        :class="$style['c-selfExclusion-fieldset-date']"
                    >
                        {{ $t('until') }} {{ alcoholExclusionDate }}
                    </span>
                </fieldset>

                <div :class="$style['c-buttons']">
                    <f-button
                        :disabled="isFormDisabled"
                        @click="openAlert">
                        {{ $t('buttons.save') }}
                    </f-button>
                </div>
            </form>

            <div
                v-if="isOpenAlert"
                :class="$style['c-selfExclusion-bottom-sheet-container']">
                <f-alert
                    v-if="selectedState === 'temporaryExclusion' || selectedState === 'permanentExclusion'"
                    type="warning"
                    :heading="$t('heading')"
                >
                    {{ selectedState === 'temporaryExclusion'
                        ? $t('alcoholSelfExclusionAlert.textTemporary')
                        : $t('alcoholSelfExclusionAlert.textPermanent') }}

                    <p :class="$style['c-warning-text']">
                        <strong>{{ $t('alcoholSelfExclusionAlert.warningText') }}</strong>
                    </p>

                    <p>{{ $t('alcoholSelfExclusionAlert.privacyStatementLinkText') }}</p>

                    <div :class="$style['c-buttons']">
                        <f-button
                            action-type="reset"
                            button-type="ghost"
                            button-size="small-productive"
                            @click="closeAlert"
                        >
                            {{ $t('buttons.cancel') }}
                        </f-button>

                        <f-button
                            action-type="submit"
                            button-type="primary"
                            button-size="small-productive"
                            @click="openAlertConfirmation"
                        >
                            {{ $t('buttons.excludeAlcohol') }}
                        </f-button>
                    </div>
                </f-alert>
            </div>
        </f-card>
    </div>
</template>

<script>
import { VueGlobalisationMixin } from '@justeat/f-globalisation';
import FCard from '@justeat/f-card';
import '@justeat/f-card/dist/f-card.css';
import FAlert from '@justeat/f-alert';
import '@justeat/f-alert/dist/f-alert.css';
import FButton from '@justeat/f-button';
import '@justeat/f-button/dist/f-button.css';
import FFormField from '@justeat/f-form-field';
import '@justeat/f-form-field/dist/f-form-field.css';
import { TENANT_MAP } from '@justeat/f-checkout/src/constants';
import { mapActions, mapGetters } from 'vuex';
import SelfExclusionApi from '../services/providers/selfExclusion.api';
import fSelfExclusionModule from '../store/selfExclusion.module';
import { GET_EXCLUSIONS_URL } from '../constants';
import tenantConfigs from '../tenants';

export default {
    name: 'SelfExclusion',
    components: {
        FCard,
        FAlert,
        FButton,
        FFormField
    },
    mixins: [VueGlobalisationMixin],
    props: {
        locale: {
            type: String,
            default: ''
        },
        authToken: {
            type: String,
            default: null
        },
        smartGatewayBaseUrl: {
            type: String,
            required: true
        }
    },
    data () {
        return {
            tenantConfigs,
            isOpenAlert: false,
            isOpenAlertConfirmation: false,
            selectedState: '',
            selfExclusionApi: new SelfExclusionApi({
                httpClient: this.$http,
                baseUrl: 'https://rest.api.ap-southeast-2.staging.jet-external.com', // to replace
                locale: this.$i18n.locale
            })
        };
    },
    computed: {
        ...mapGetters('fSelfExclusionModule', [
            'exclusions'
        ]),

        hasAlcoholExclusion () {
            return !!this.alcoholExclusion;
        },

        alcoholExclusion () {
            return this.exclusions.find(exclusion => exclusion.type === 'alcohol');
        },

        alcoholExclusionDate () {
            return this.formatDate(new Date(this.alcoholExclusion.expiryDate));
        },

        isFormDisabled () {
            return this.alcoholExclusion.state === 'permanentExclusion' || this.alcoholExclusion.state === 'temporaryExclusion';
        },

        alcoholExclusionOptions () {
            return [
                {
                    value: '',
                    label: this.$t('alcoholSelfExclusionOptions.option1')
                },
                {
                    value: 'temporaryExclusion',
                    label: this.$t('alcoholSelfExclusionOptions.option2')
                },
                {
                    value: 'permanentExclusion',
                    label: this.$t('alcoholSelfExclusionOptions.option3')
                }
            ];
        },

        tenant () {
            return TENANT_MAP[this.locale]; // to do: double check on staging
        },

        apiUrl () {
            return GET_EXCLUSIONS_URL.replace('{tenant}', this.tenant);
        }
    },

    async mounted () {
        try {
            // eslint-disable-next-line max-len
            // const token = 'eyJhbGciOiJSUzI1NiIsImtpZCI6Ik5yaC0waEtzalhlRVE1LVVDaldBQkc1Q293MCIsIng1dCI6Ik5yaC0waEtzalhlRVE1LVVDaldBQkc1Q293MCIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2FsbC1hdXRob3JpemUtaWFwaS1xYTU1LmF1LWp1c3RlYXQtMS1zdGFnaW5nLmplLWxhYnMuY29tL2lkZW50aXR5IiwibmJmIjoxNjk4ODQ5OTUwLCJpYXQiOjE2OTg4NDk5NTAsImV4cCI6MTY5ODg1MzU1MCwiYXVkIjoiaHR0cHM6Ly9hbGwtYXV0aG9yaXplLWlhcGktcWE1NS5hdS1qdXN0ZWF0LTEtc3RhZ2luZy5qZS1sYWJzLmNvbS9pZGVudGl0eS9yZXNvdXJjZXMiLCJzY29wZSI6WyJtb2JpbGVfc2NvcGUiLCJvcGVuaWQiLCJvZmZsaW5lX2FjY2VzcyJdLCJhbXIiOlsicGFzc3dvcmQiXSwiY2xpZW50X2lkIjoiY29uc3VtZXJfd2ViX2plIiwic3ViIjoiMTAzNTM1NDUiLCJhdXRoX3RpbWUiOjE2OTg4NDk5NTAsImlkcCI6Imlkc3J2Iiwicm9sZSI6IlJlZ2lzdGVyZWQiLCJncmFudF90eXBlIjoicGFzc3dvcmQiLCJpc190ZW1wb3JhcnlfbmFtZSI6IkZhbHNlIiwiZ2l2ZW5fbmFtZSI6IlRlc3QiLCJjcmVhdGVkX2RhdGUiOiIyMDIzLTEwLTI2IDEyOjMwOjEwWiIsImVtYWlsIjoidGVzdHRlc3RAdGVzdDExMTExLmNvbSIsImdsb2JhbF91c2VyX2lkIjoiSWhPWXhiZVgyV09xZkxvZ0ZvdWZwVkYvMzE0PSIsInJlYWxtX2lkIjoiYTNjMjQ2ZTEtMjRhNC00NWE2LWEzNjItZmRhNzNhNGI3NWFiIiwiZmFtaWx5X25hbWUiOiJ0ZXN0IiwidGVuYW50IjpbImF1Il0sImlzX25ld19yZWdpc3RyYXRpb24iOiJGYWxzZSIsIm5hbWUiOiJUZXN0IiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvc3VybmFtZSI6InRlc3QiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9jb3VudHJ5IjoiYXUiLCJqdGkiOiI2NkJGQzgyMkYxMjY4Q0UwOUU5RDdFRThDQTYxQTUwMyJ9.S-Irpg4xa7JmHwgxWrrRFGkBCltgJlR1BC1r8ihV76sU6JnOBVsbcSuaxD6xRy0JvOrzI89bz0V1eImPhe21VfpKITAmbyHom-xlb_zkaZq_E53Xc0Ek8eabsbOXavILhDPidMXi67u34l3ub1doNX7FZQj6KmqoOrs4HIDgyDL5zxZqyVyg-UyStk5GO8hdUzwmdPnF7fB70OcA2AtZfnQClLISOUrCYf2GLqXfen8KpFH02x1KrU6_Vmu1rhlmNUfKNpH6gLXIRW4Fdi1UoThmNAr4pK6n6rVcNRY2UPp-BDyw20W0aKXI9j6zeDK9lP0_cApNcxTjQbG50T6PwFe5W-e8veSU5KcfCfmfL17fywv6cPTsl_EARyVQmMlBeYnBA6umrieTT9DnnbRwSlNfcm-0aybQBmgjepJwSDlhS-vNA1TI6LgKB3rJ-A5FCvO91dLScjNzB034_h45drdOSWHx5q9qC7Y8HP5mYVBLMYV-ZZgrM3Bp-jOozAGR7nCQhpZ1kDE6YH3Rqjb2hX9Ouya34YFUnKtIwpPUI0E-2GP4EgL2on43WxqugFc1fOqyIUuYF_f_heFvABAqPfHXjyArOuwYUJELlctOs-r8_Ke-Ep7Php3ohLvSrh-MqfG3szt9n6XYcWLHLymv9wIMGdpEQwNfeqyakyQyiLQ';
            await this.getExclusions({ api: this.selfExclusionApi, authToken: this.authToken });
            this.selectedState = this.alcoholExclusion.state;
        } catch (error) {
            this.$log.error('Error getting self exclusion status', error);
        }
    },

    beforeCreate () {
        if (!this.$store.hasModule('fSelfExclusionModule')) {
            this.$store.registerModule('fSelfExclusionModule', fSelfExclusionModule);
        }
    },

    methods: {
        ...mapActions('fSelfExclusionModule', [
            'getExclusions',
            'updateAlcoholExclusion'
        ]),

        formatDate (date) {
            const dd = String(date.getDate()).padStart(2, '0');
            const mm = String(date.getMonth() + 1).padStart(2, '0');
            const yyyy = date.getFullYear();
            return `${dd}-${mm}-${yyyy}`;
        },

        changeState (state) {
            this.selectedState = state;
            this.closeAlert();
        },

        submitExclusionStatus () {
            const url = this.apiUrl;
            const token = this.authToken;
            const exclusionState = this.selectedState;

            return this.updateAlcoholExclusion({
                url,
                token,
                exclusionState
            })
                .then(response => {
                    this.$log.info('Self exclusion status updated successfully', response);
                })
                .catch(error => {
                    this.$log.error('Error updating self exclusion status', error);
                });
        },

        openAlertConfirmation () {
            this.submitExclusionStatus();
            this.isOpenAlert = false;
            this.isOpenAlertConfirmation = true;
        },

        closeAlertConfirmation () {
            this.isOpenAlertConfirmation = false;
        },

        openAlert () {
            this.isOpenAlert = true;
        },

        closeAlert () {
            this.isOpenAlert = false;
        }
    }
};
</script>

<style lang="scss" module>
@use "@justeat/fozzie/src/scss/fozzie" as f;

.c-selfExclusion-card-component {
    position: relative;
}

.c-selfExclusion-title {
    @include f.font-size(heading-m);
    margin-bottom: f.spacing(d);
}

.c-selfExclusion-details,
.c-selfExclusion-subtitle {
    @include f.font-size(heading-s);
}

.c-selfExclusion-details {
    margin-bottom: f.spacing(d);
}

.c-selfExclusion-fieldset {
    display: flex;
    flex-flow: column;
    border: none;
    padding: 0;
}

.c-selfExclusion-fieldset-date {
    margin-left: f.spacing(f);
    opacity: 0.5;
}

.c-selfExclusion-bottom-sheet-container {
    position: absolute;
    bottom: f.spacing(f);
    left: f.spacing(d);
    right: f.spacing(d);
}

.c-buttons {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-end;
    gap: f.spacing(d);
    padding: f.spacing(d);
}

.c-warning-text {
    color: f.$color-content-error;
}
</style>

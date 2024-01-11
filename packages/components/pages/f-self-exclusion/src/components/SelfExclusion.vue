<template>
    <div
        :class="$style['c-selfExclusion']"
        data-test-id="self-exclusion-component">
        <h1>{{ $t('heading') }}</h1>
        <!-- Success/Error alerts -->
        <f-alert
            v-if="isOpenAlertSuccess"
            type="success"
            :heading="$t('alcoholicItemsAlertSuccess.heading')"
            is-dismissible>
            {{ selectedState === 'temporaryExclusion'
                ? $t('alcoholicItemsAlertSuccess.text1Temporary')
                : $t('alcoholicItemsAlertSuccess.text1Permanent') }}

            <p>{{ $t('alcoholicItemsAlertSuccess.text2') }}</p>
        </f-alert>

        <f-alert
            v-else-if="isOpenAlertError"
            type="danger"
            :heading="$t('alcoholicItemsAlertError.heading')"
            is-dismissible>
            {{ $t('alcoholicItemsAlertError.text1') }}
        </f-alert>

        <f-alert
            v-else-if="showUnsavedChangesAlert"
            type="warning"
            :heading="$t('alcoholSelfExclusionUnsavedChangesAlert.heading')">
            ,
            {{ $t('alcoholSelfExclusionUnsavedChangesAlert.text') }}

            <div :class="$style['c-selfExclusion-buttons']">
                <f-button
                    action-type="reset"
                    button-type="ghost"
                    button-size="small-productive"
                    @click="cancelLeave"
                >
                    {{ $t('buttons.cancel') }}
                </f-button>

                <f-button
                    action-type="submit"
                    button-type="primary"
                    button-size="small-productive"
                    @click="confirmLeave"
                >
                    {{ $t('buttons.goBack') }}
                </f-button>
            </div>
        </f-alert>

        <f-alert
            v-if="isOpenAlertConfirmation && selectedState === ''"
            type="success"
            heading="Success"
            is-dismissible
        >
            {{ $t('alcoholSelfExclusionConfirmation.text1Show') }}
        </f-alert>

        <p :class="$style['c-selfExclusion-details']">
            {{ $t('text1') }}
        </p>

        <!-- Form -->
        <form
            v-if="isFormVisible"
            :class="$style['c-selfExclusion-form']">
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

            <div :class="$style['c-selfExclusion-buttons']">
                <f-button
                    :disabled="isFormDisabled"
                    @click="openAlertConfirmation">
                    {{ $t('buttons.save') }}
                </f-button>
            </div>
        </form>

        <!-- Confirmation Alert -->
        <div
            v-if="isOpenAlertConfirmation"
            :class="$style['c-selfExclusion-bottomSheet']">
            <f-alert
                v-if="selectedState === 'temporaryExclusion' || selectedState === 'permanentExclusion'"
                type="warning"
                :heading="$t('alcoholSelfExclusionConfirmation.heading')"
            >
                {{ selectedState === 'temporaryExclusion'
                    ? $t('alcoholSelfExclusionConfirmation.text1Temporary')
                    : $t('alcoholSelfExclusionConfirmation.text1Permanent') }}

                <p :class="$style['c-selfExclusion-bottomSheet-warning']">
                    <strong>{{ $t('alcoholSelfExclusionConfirmation.warningText') }}</strong>
                </p>

                <i18n
                    path="alcoholSelfExclusionConfirmation.privacyStatement"
                    tag="p"
                    :class="$style['c-mfa-help-description']">
                    <a :href="privacyPolicyUrl">{{ $t('alcoholSelfExclusionConfirmation.privacyStatementLinkText') }}</a>
                </i18n>

                <div :class="$style['c-selfExclusion-buttons']">
                    <f-button
                        action-type="reset"
                        button-type="ghost"
                        button-size="small-productive"
                        @click="closeAlertConfirmation"
                    >
                        {{ $t('buttons.cancel') }}
                    </f-button>

                    <f-button
                        action-type="submit"
                        button-type="primary"
                        button-size="small-productive"
                        @click="submitExclusionStatus"
                    >
                        {{ $t('buttons.excludeAlcohol') }}
                    </f-button>
                </div>
            </f-alert>
        </div>
    </div>
</template>

<script>
import { VueGlobalisationMixin } from '@justeat/f-globalisation';
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
import tenantConfigs from '../tenants';

export default {
    name: 'SelfExclusion',

    components: {
        FAlert,
        FButton,
        FFormField
    },

    mixins: [VueGlobalisationMixin],

    props: {
        locale: {
            type: String,
            default: 'en-AU'
        },
        authToken: {
            type: String,
            required: true
        },
        smartGatewayBaseUrl: {
            type: String,
            required: true
        },
        showUnsavedChangesAlert: {
            type: Boolean,
            default: false
        },
        privacyPolicyUrl: {
            type: String,
            default: null
        }
    },

    data () {
        return {
            tenantConfigs,
            isOpenAlertConfirmation: false,
            isOpenAlertSuccess: false,
            isOpenAlertError: false,
            isFormVisible: false,
            selectedState: '',
            selfExclusionApi: new SelfExclusionApi({
                httpClient: this.$http,
                baseUrl: this.smartGatewayBaseUrl,
                tenant: TENANT_MAP[this.locale]
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
        }
    },

    async mounted () {
        try {
            await this.getExclusions({ api: this.selfExclusionApi, authToken: this.authToken });
            this.$log.info('Self exclusion status fetched successfully');
            this.selectedState = this.alcoholExclusion.state;
            this.isFormVisible = true;
        } catch (error) {
            this.$log.error('Error getting self exclusion status', error);
            this.openAlertError();
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
            this.closeAlertConfirmation();
        },

        async submitExclusionStatus () {
            try {
                await this.updateAlcoholExclusion({
                    api: this.selfExclusionApi,
                    authToken: this.authToken,
                    exclusionState: this.selectedState
                });

                this.$log.info('Alcohol Exclusion saved successfully');
                this.openAlertSuccess();
            } catch (error) {
                this.$log.error('Error saving consumer details', error);
                this.openAlertError();
            }
        },

        openAlertSuccess () {
            this.closeAllAlerts();
            this.isOpenAlertSuccess = true;
        },

        openAlertError () {
            this.closeAllAlerts();
            this.isOpenAlertError = true;
        },

        openAlertConfirmation () {
            this.closeAllAlerts();
            this.isOpenAlertConfirmation = true;
        },

        closeAlertConfirmation () {
            this.isOpenAlertConfirmation = false;
        },

        closeAllAlerts () {
            this.closeAlertConfirmation();
        },

        cancelLeave () {
            this.$emit('cancel-leave');
        },

        confirmLeave () {
            this.$emit('confirm-leave');
        }
    }
};
</script>

<style lang="scss" module>
@use "@justeat/fozzie/src/scss/fozzie" as f;

.c-selfExclusion {
    max-width: 700px;
    position: relative;
}

.c-selfExclusion h1 {
    margin-bottom: f.spacing(d);
}

.c-selfExclusion-details {
    @include f.font-size(heading-s);
}

.c-selfExclusion-details {
    margin-top: f.spacing(c);
    margin-bottom: f.spacing(b);
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

.c-selfExclusion-bottomSheet {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;

    @include f.media('<mid') {
        position: relative;
        bottom: 0;
        left: 0;
        right: 0;
        margin-top: auto;
    }
}

.c-selfExclusion-buttons {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-end;
    gap: f.spacing(d);
    margin-top: f.spacing(d);
}

.c-selfExclusion-buttons button {
    margin: 0 5px 5px;
}

.c-selfExclusion-bottomSheet-warning {
    color: f.$color-content-error;
}
</style>

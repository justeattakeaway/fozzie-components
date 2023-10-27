<template>
    <div
        :class="$style['c-selfExclusion']"
        data-test-id="self-exclusion-component"
    >
        <f-card
            has-inner-spacing-large
            card-size-custom="medium"
            has-outline
            :card-heading="$t('heading')"
            :class="$style['c-selfExclusion-card-component']">
            <div v-if="isOpenAlertConfirmation && alcoholExcluded">
                <f-alert
                    data-test-id="self-exclusion-alert"
                    type="success"
                    heading="Confirmed"
                >
                    {{ selectedOption === 'temporary'
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
                    v-for="option in alcoholSelfExclusionOptions"
                    :key="option.id"
                    :class="$style['c-selfExclusion-fieldset']"
                >
                    <f-form-field
                        :disabled="formDisabled"
                        input-type="radio"
                        is-grouped
                        name="self-exclusion-options"
                        :label-text="option.label"
                        :checked="selectedOption === option.value"
                        @input="selectedOption = option.value"
                    />
                    <span
                        v-if="selectedOption === option.value
                            && selectedOption === 'temporary'
                            && alcoholExcluded"
                        :class="$style['c-selfExclusion-fieldset-date']"
                    >
                        Until {{ alcoholExclusionDate }}
                    </span>
                </fieldset>

                <div :class="$style['c-buttons']">
                    <f-button
                        :disabled="formDisabled"
                        @click="openAlert">
                        {{ $t('buttons.save') }}
                    </f-button>
                </div>
            </form>

            <div
                v-if="isOpenAlert"
                :class="$style['c-selfExclusion-bottom-sheet-container']">
                <f-alert
                    v-if="selectedOption === 'temporary' || selectedOption === 'permanent'"
                    data-test-id="self-exclusion-alert"
                    type="warning"
                    :heading="$t('heading')"
                >
                    {{ selectedOption === 'temporary'
                        ? $t('alcoholSelfExclusionAlert.textTemporary')
                        : $t('alcoholSelfExclusionAlert.textPermanent') }}

                    <p :class="$style['c-warning-text']">
                        <b>
                            {{ $t('alcoholSelfExclusionAlert.warningText') }}
                        </b>
                    </p>

                    <p>
                        {{ $t('alcoholSelfExclusionAlert.privacyStatementLinkText') }}
                    </p>

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
                            @click="confirmAlcoholExclusion"
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
import { mapActions } from 'vuex';
import fSelfExclusionModule from '../store/selfExclusion.module';
import { SELF_EXCLUSION_URL } from '../constants';
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
        }
    },
    data () {
        return {
            tenantConfigs,
            isOpenAlert: false,
            isOpenAlertConfirmation: false,
            alcoholExcluded: false,
            alcoholExclusionDate: null,
            alcoholExclusionDateReached: false,
            formDisabled: false,
            selectedOption: ''
        };
    },
    computed: {
        alcoholSelfExclusionOptions () {
            return [
                {
                    id: 1,
                    value: 'show',
                    label: this.$t('alcoholSelfExclusionOptions.option1')
                },
                {
                    id: 2,
                    value: 'temporary',
                    label: this.$t('alcoholSelfExclusionOptions.option2')
                },
                {
                    id: 3,
                    value: 'permanent',
                    label: this.$t('alcoholSelfExclusionOptions.option3')
                }
            ];
        },
        tenant () {
            return TENANT_MAP[this.locale]; // to do: double check on staging
        },
        apiUrl () {
            return SELF_EXCLUSION_URL.replace('{tenant}', this.tenant);
        }
    },

    mounted () {
        this.getSelfExclusionStatus();
    },

    beforeCreate () {
        if (!this.$store.hasModule('fSelfExclusionModule')) {
            this.$store.registerModule('fSelfExclusionModule', fSelfExclusionModule);
        }
    },

    methods: {
        ...mapActions('fSelfExclusionModule', [
            'loadExclusions',
            'saveExclusions'
        ]),
        getSelfExclusionStatus () {
            const url = this.apiUrl;
            const token = this.authToken;

            return this.loadExclusions({
                url,
                token
            })
                .then(response => {
                    const { exclusions } = response.data;
                    const alcoholExclusion = exclusions.filter(result => result.type === 'alcohol');

                    if (alcoholExclusion.length > 0) {
                        if (alcoholExclusion[0].state === 'temporaryExclusion') {
                            this.selectedOption = 'temporary';
                            this.alcoholExclusionDate = this.formatDate(new Date(alcoholExclusion[0].expiryDate));
                        }

                        if (alcoholExclusion[0].state === 'permanentExclusion') {
                            this.selectedOption = 'permanent';
                        }

                        this.alcoholExcluded = true;
                        this.formDisabled = true;
                    } else {
                        this.selectedOption = 'show';
                    }
                })
                .catch(error => {
                    this.$log.error('Error getting self exclusion status', error);
                });
        },

        setSelfExclusionStatus () {
            const url = this.apiUrl;
            const token = this.authToken;
            const exclusionState = this.selectedOption === 'temporary' ? 'temporaryExclusion' : 'permanentExclusion';

            return this.saveExclusions({
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

        confirmAlcoholExclusion () {
            this.setSelfExclusionStatus();
            this.isOpenAlert = false;
            this.isOpenAlertConfirmation = true;
            this.alcoholExcluded = true;
            this.formDisabled = true;
        },

        formatDate (date) {
            const dd = String(date.getDate()).padStart(2, '0');
            const mm = String(date.getMonth() + 1).padStart(2, '0');
            const yyyy = date.getFullYear();
            return `${dd}-${mm}-${yyyy}`;
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

<template>
    <div
        :class="$style['c-selfExclusion']"
        data-test-id="self-exclusion-component"
    >
        <card-component
            has-inner-spacing-large
            card-size-custom="large"
            has-outline
        >
            <h1 :class="$style['c-selfExclusion-title']">
                Exclude alcoholic items
            </h1>

            <div v-if="isOpenAlertConfirmation && alcoholExcluded">
                <f-alert
                    data-test-id="self-exclusion-alert"
                    type="success"
                    heading="Confirmed"
                >
                    While logged in, you will not see alcoholic items displayed
                    within restaurant menus for the next 6 months.
                    <p>These changes may take 24 hours to take effect.</p>
                    <div :class="$style['c-buttons']">
                        <f-button
                            action-type="reset"
                            button-type="primary"
                            button-size="small-productive"
                            @click="closeAlertConfirmation"
                        >
                            Cancel
                        </f-button>
                    </div>
                </f-alert>
            </div>

            <p :class="$style['c-selfExclusion-details']">
                You can opt out of seeing alcoholic items on menus for a period
                of six months or permanently. Once selected, this change can't
                be reversed.
            </p>

            <form :class="$style['c-selfExclusion-form']">
                <fieldset
                    v-for="option in options"
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
                            && selectedOption === 'period'
                            && alcoholExcluded"
                        :class="$style['c-selfExclusion-fieldset-date']"
                    >
                        Until {{ alcoholExclusionDate }}
                    </span>
                </fieldset>

                <div :class="$style['c-buttons']">
                    <f-button
                        :disabled="formDisabled"
                        @click="openAlertPeriod">
                        Save
                    </f-button>
                </div>
            </form>

            <div
                v-if="isOpenAlertPeriod"
                :class="$style['c-selfExclusion-bottom-sheet-container']">
                <div
                    v-for="description in alertPeriodDescriptions"
                    :key="description.id"
                >
                    <f-alert
                        v-if="selectedOption === description.option"
                        data-test-id="self-exclusion-alert"
                        :type="description.type"
                        heading="Exclude alcoholic items"
                    >
                        {{ description.text }}

                        <p :class="$style['c-warning-text']">
                            <b>
                                {{ description.warningText }}
                            </b>
                        </p>

                        <div :class="$style['c-buttons']">
                            <f-button
                                action-type="reset"
                                button-type="ghost"
                                button-size="small-productive"
                                @click="closeAlertPeriod"
                            >
                                Cancel
                            </f-button>

                            <f-button
                                action-type="submit"
                                button-type="primary"
                                button-size="small-productive"
                                @click="confirmAlcoholExclusion"
                            >
                                Exclude alcohol
                            </f-button>
                        </div>
                    </f-alert>
                </div>
            </div>
        </card-component>
    </div>
</template>

<script>
import { globalisationServices } from '@justeat/f-services';
import CardComponent from '@justeat/f-card';
import '@justeat/f-card/dist/f-card.css';
import FAlert from '@justeat/f-alert';
import '@justeat/f-alert/dist/f-alert.css';
import FButton from '@justeat/f-button';
import '@justeat/f-button/dist/f-button.css';
import FFormField from '@justeat/f-form-field';
import '@justeat/f-form-field/dist/f-form-field.css';
import tenantConfigs from '../tenants';

export default {
    name: 'SelfExclusion',
    components: {
        CardComponent,
        FAlert,
        FButton,
        FFormField
    },
    props: {
        locale: {
            type: String,
            default: ''
        }
    },
    data () {
        const locale = globalisationServices.getLocale(
            tenantConfigs,
            this.locale,
            this.$i18n
        );
        const localeConfig = tenantConfigs[locale];

        return {
            copy: { ...localeConfig },
            isOpenAlertPeriod: false,
            isOpenAlertConfirmation: false,
            alcoholExcluded: false,
            alcoholExclusionDate: null,
            alcoholExclusionDateReached: false,
            formDisabled: false,
            selectedOption: '',
            options: [
                {
                    id: 1,
                    value: 'show',
                    label: 'Show alcoholic beverages'
                },
                {
                    id: 2,
                    value: 'period',
                    label: 'Exclude alcoholic beverages for 6 months'
                },
                {
                    id: 3,
                    value: 'permanent',
                    label: 'Exclude alcoholic beverages permanently'
                }
            ],
            alertPeriodDescriptions: [
                {
                    id: 1,
                    option: 'show',
                    type: 'warning',
                    text: "You haven't saved your changes yet. Do you want to go back?",
                    warningText: ''
                },
                {
                    id: 2,
                    option: 'period',
                    type: 'warning',
                    text: 'You can opt out of seeing alcoholic items on menus for a period of six months. This change can take up to 24 hours to take effect.',
                    warningText:
                        'Once selected, this change can’t be reversed.'
                }
            ]
        };
    },
    mounted () {
        this.getSelectedOption();
        this.getAlcoholExclusionDate();
    },
    methods: {
        getSelectedOption () {
            this.selectedOption = 'show';
        },

        getAlcoholExclusionDate () {
            this.alcoholExclusionDate = new Date();
        },

        setAlcoholExclusionDate () {
            const endDate = new Date();
            endDate.setMonth(endDate.getMonth() + 6);
            this.alcoholExclusionDate = this.formatDate(endDate);
        },

        confirmAlcoholExclusion () {
            this.setAlcoholExclusionDate();
            this.isOpenAlertPeriod = false;
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

        openAlertPeriod () {
            if (this.selectedOption === 'period') {
                this.isOpenAlertPeriod = true;
            }
        },

        closeAlertPeriod () {
            this.isOpenAlertPeriod = false;
        }
    }
};
</script>

<style lang="scss" module>
@use "@justeat/fozzie/src/scss/fozzie" as f;

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
    width: 58%;
    left: 2%;
    bottom: 55%;
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

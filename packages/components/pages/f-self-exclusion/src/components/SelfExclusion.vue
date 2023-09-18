<template>
    <div
        :class="$style['c-selfExclusion']"
        data-test-id="self-exclusion-component"
    >
        <card-component
            has-inner-spacing-large
            card-size-custom="medium"
            has-outline
        >
            <h1 :class="$style['c-selfExclusion-title']">
                Alcohol self exclusion
            </h1>

            <span :class="$style['c-selfExclusion-details']">
                You can exclude alcoholic items from the partner menus here.
                Please note that these changes are irreversible.
            </span>

            <form :class="$style['c-selfExclusion-form']">
                <div>
                    <h2 :class="$style['c-selfExclusion-subtitle']">
                        Exclude alcoholic beverages
                    </h2>

                    <fieldset
                        v-for="option in options"
                        :key="option.id"
                        :class="$style['c-selfExclusion-fieldset']"
                    >
                        <f-form-field
                            input-type="radio"
                            is-grouped
                            name="self-exclusion-options"
                            :label-text="option.label"
                            :checked="selectedOption === option.value"
                            @input="selectedOption = option.value"
                        />
                    </fieldset>
                </div>

                <div :class="$style['c-buttons']">
                    <f-button @click="openBottomSheet">
                        Save
                    </f-button>
                </div>
            </form>

            <div
                v-if="isOpen"
                :class="$style['c-bottom-sheet-container']">
                <card-component
                    :class="$style['c-bottom-sheet']"
                    has-outline>
                    <h3 :class="$style['c-bottom-sheet-title']">
                        Alcohol self exclusion
                    </h3>

                    <div>
                        <span
                            v-for="description in bottomSheetDescriptions"
                            :key="description.id"
                        >
                            {{ description.text }}

                            <span>{{ description.warningText }}</span>
                        </span>
                    </div>

                    <div :class="$style['c-buttons']">
                        <f-button
                            action-type="reset"
                            @click="closeBottomSheet"
                        >
                            Cancel
                        </f-button
                        >

                        <f-button
                            action-type="submit"
                            @click="closeBottomSheet"
                        >
                            I agree
                        </f-button
                        >
                    </div>
                </card-component>
            </div>
        </card-component>
    </div>
</template>

<script>
import { globalisationServices } from '@justeat/f-services';
import CardComponent from '@justeat/f-card';
import '@justeat/f-card/dist/f-card.css';
import FButton from '@justeat/f-button';
import '@justeat/f-button/dist/f-button.css';
import FFormField from '@justeat/f-form-field';
import '@justeat/f-form-field/dist/f-form-field.css';
import tenantConfigs from '../tenants';

export default {
    name: 'SelfExclusion',
    components: {
        CardComponent, FButton, FFormField
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
            isOpen: false,
            currentDate: '',
            futureDate: '',
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
            bottomSheetDescriptions: [
                {
                    id: 1,
                    option: 2,
                    text: 'I agree to self exclude from seeing or purchasing alcohol on the Menulog platform for a period of 6 months.',
                    warningText:
                        'Please note that this change is irreversible.'
                }
            ]
        };
    },
    computed: {
        currentDateFormatted () {
            return this.formatDate(new Date());
        },
        futureDateFormatted () {
            const future = new Date();
            future.setMonth(future.getMonth() + 6);
            return this.formatDate(future);
        }
    },
    mounted () {
        this.getSelectedOption();
        this.futureDate = this.futureDateFormatted;
    },
    methods: {
        getSelectedOption () {
            this.selectedOption = 'show';
        },

        openBottomSheet () {
            if (this.selectedOption === 'period') {
                this.isOpen = true;
            }
        },

        closeBottomSheet () {
            this.isOpen = false;
        },

        formatDate (date) {
            return date.toLocaleDateString('en-GB', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            });
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

.c-selfExclusion-form {
    margin-top: f.spacing(d);
}

.c-selfExclusion-fieldset {
    display: flex;
    flex-flow: column;
    border: none;
    padding: 0;
}

.c-bottom-sheet-container {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1000;
    overflow: hidden;
}

.c-bottom-sheet {
    overflow: auto;
    position: absolute;
    bottom: 0;
    word-break: break-word;
}
.c-bottom-sheet-title {
    margin-bottom: f.spacing(d);
}

.c-buttons {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-end;
    gap: f.spacing(d);
    padding: f.spacing(d);
}
</style>

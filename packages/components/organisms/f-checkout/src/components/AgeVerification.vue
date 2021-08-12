<template>
    <card
        is-rounded
        is-page-content-wrapper
        card-heading-position="center"
        has-outline
        :card-heading="$t(`ageVerification.heading`)"
        data-test-id="checkout-age-verification-component">
        <p
            :class="$style['c-checkout-ageVerification-description']"
            data-test-id="checkout-age-verification-description">
            {{ $t(`ageVerification.description`) }}
        </p>

        <form>
            <form-field
                id="day-selection"
                input-type="dropdown"
                :label-text="$t(`ageVerification.ageSelection.day`)"
                :dropdown-options="days"
                :value="selectedDate.day"
                @input="selectionChanged($event, 'day')" />

            <form-field
                id="month-selection"
                input-type="dropdown"
                :label-text="$t(`ageVerification.ageSelection.month`)"
                :dropdown-options="months"
                :value="selectedDate.month"
                @input="selectionChanged($event, 'month')" />

            <form-field
                id="year-selection"
                input-type="dropdown"
                :label-text="$t(`ageVerification.ageSelection.year`)"
                :dropdown-options="years"
                :value="selectedDate.year"
                @input="selectionChanged($event, 'year')" />

            <div
                ref="AgeVerificationError"
                tabindex="-1">
                <error-message
                    v-if="shouldShowErrorMessage"
                    id="age-verification-error"
                    data-js-error-message
                    data-test-id="age-verification-error-message">
                    {{ $t('ageVerification.errorMessage') }}
                </error-message>
            </div>

            <p
                :class="$style['c-checkout-ageVerification-description']"
                data-test-id="checkout-age-verification-askForIdDescription">
                {{ $t(`ageVerification.askForIdDescription`) }}
            </p>

            <f-button
                :class="$style['c-checkout-ageVerification-button']"
                button-size="large"
                button-type="primary"
                is-full-width
                data-test-id="age-verification-redirect-button"
                @click.native="handleAgeVerifcation">
                {{ $t(`ageVerification.buttonText`) }}
            </f-button>
        </form>
    </card>
</template>

<script>
import Card from '@justeat/f-card';
import '@justeat/f-card/dist/f-card.css';
import ErrorMessage from '@justeat/f-error-message';
import '@justeat/f-error-message/dist/f-error-message.css';
import FButton from '@justeat/f-button';
import '@justeat/f-button/dist/f-button.css';
import FormField from '@justeat/f-form-field';
import '@justeat/f-form-field/dist/f-form-field.css';
import { mapState, mapActions } from 'vuex';
import { VUEX_CHECKOUT_MODULE } from '../constants';

export default {
    components: {
        Card,
        ErrorMessage,
        FButton,
        FormField
    },

    data () {
        return {
            selectedDate: {
                day: '',
                month: '',
                year: ''
            },
            hasSelectedDateOfBirth: false
        };
    },

    computed: {
        ...mapState(VUEX_CHECKOUT_MODULE, ['customer']),

        days () {
            return Array.from({ length: 31 }, (_, index) => {
                const day = (index + 1).toString();

                return {
                    text: day,
                    value: day
                };
            });
        },

        months () {
            return new Array(12).fill(0).map((_, i) => {
                const date = new Date(`${i + 1}/1`);

                return {
                    text: date.toLocaleDateString(undefined, { month: 'long' }),
                    value: date.getMonth()
                };
            });
        },

        years () {
            const currentYear = new Date().getFullYear();
            const start = currentYear - 10;
            const end = currentYear - 100;

            return Array(start - end)
                    .fill('')
                    .map((_, index) => {
                        const year = (start - index).toString();

                        return {
                            text: year,
                            value: year
                        };
                    });
        },

        userDateOfBirth () {
            return new Date(this.selectedDate.year, this.selectedDate.month, this.selectedDate.day);
        },

        isValidAge () {
            const currentDate = new Date();
            const maximumAgeDifference = new Date((currentDate.getFullYear() - 18), currentDate.getMonth(), currentDate.getDate());

            return Number(this.userDateOfBirth) <= Number(maximumAgeDifference);
        },

        shouldShowErrorMessage () {
            return this.hasSelectedDateOfBirth && !this.isValidAge;
        }
    },

    mounted () {
        this.initDateOfBirth();
    },

    methods: {
        ...mapActions(VUEX_CHECKOUT_MODULE, ['updateDateOfBirth']),

        initDateOfBirth () {
            this.selectedDate.day = this.customer.dateOfBirth?.getDate().toString() || this.days[0].text;
            this.selectedDate.month = this.customer.dateOfBirth?.getMonth().toString() || this.months[0].value.toString();
            this.selectedDate.year = this.customer.dateOfBirth?.getFullYear().toString() || this.years[0].text;
        },

        selectionChanged (selection, type) {
            this.selectedDate[type] = selection;
        },

        handleAgeVerifcation () {
            this.hasSelectedDateOfBirth = true;

            if (this.isValidAge) {
                this.updateDateOfBirth(this.userDateOfBirth);
                this.$emit('verify-age');
            } else {
                this.$nextTick(() => {
                    this.$refs.AgeVerificationError.focus();
                });
            }
        }
    }
};
</script>

<style lang="scss" module>
.c-checkout-ageVerification-description {
    margin: spacing(x2) 0;
}

.c-checkout-ageVerification-button {
    margin: spacing(x2) 0 spacing();
}
</style>

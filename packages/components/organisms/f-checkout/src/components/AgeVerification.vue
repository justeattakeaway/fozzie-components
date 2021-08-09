<template>
    <card
        is-rounded
        is-page-content-wrapper
        card-heading-position="center"
        :card-heading="$t(`ageVerification.heading`)"
        data-test-id="checkout-age-verification-component"
        :class="[$style['c-checkout-ageVerification'], $style['c-checkout-ageVerification--verticalPadding']]">
        <p
            :class="$style['c-checkout-ageVerification-description']"
            data-test-id="checkout-age-verification-description">
            {{ $t(`ageVerification.description`) }}
        </p>

        <div
            :class="$style['c-checkout-ageVerification-fields']">
            <form-field
                id="day-selection"
                input-type="dropdown"
                :class="$style['c-checkout-ageVerification-field']"
                :label-text="$t(`ageVerification.ageSelection.day`)"
                :dropdown-options="days"
                :value="days[0].text"
                @input="selectionChanged($event, 'day')" />

            <form-field
                id="month-selection"
                input-type="dropdown"
                :class="$style['c-checkout-ageVerification-field']"
                :label-text="$t(`ageVerification.ageSelection.month`)"
                :dropdown-options="months"
                :value="selectedMonth"
                @input="selectionChanged($event, 'month')" />

            <form-field
                id="year-selection"
                input-type="dropdown"
                :class="$style['c-checkout-ageVerification-field']"
                :label-text="$t(`ageVerification.ageSelection.year`)"
                :dropdown-options="years"
                :value="years[0].text"
                @input="selectionChanged($event, 'year')" />
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
            @click.native="continueToCheckout">
            {{ $t(`ageVerification.buttonText`) }}
        </f-button>
    </card>
</template>

<script>
import Card from '@justeat/f-card';
import '@justeat/f-card/dist/f-card.css';
import FButton from '@justeat/f-button';
import '@justeat/f-button/dist/f-button.css';
import FormField from '@justeat/f-form-field';
import '@justeat/f-form-field/dist/f-form-field.css';

export default {
    components: {
        Card,
        FButton,
        FormField
    },

    data () {
        return {
            currentYear: new Date().getUTCFullYear(),
            selectedDate: {
                day: '1',
                month: '0',
                year: this.currentYear
            },
            selectedMonth: '0'
        };
    },

    computed: {
        days () {
            const days = Array.from({ length: 31 }, (x, i) => {
                const day = (i + 1).toString();

                return {
                    text: day,
                    value: day
                };
            });

            return days;
        },

        months () {
            const months = new Array(12).fill(0).map((_, i) => {
                const date = new Date(`${i + 1}/1`);

                const monthValue = {
                    text: date.toLocaleDateString(undefined, { month: 'long' }),
                    value: date.toLocaleDateString(undefined, { month: 'numeric' }) - 1,
                    shortText: date.toLocaleDateString(undefined, { month: 'short' })
                };

                return monthValue;
            });

            return months;
        },

        years () {
            const years = Array(this.currentYear - (this.currentYear - 101)).fill('').map((v, idx) => {
                const year = (this.currentYear - idx).toString();

                const yearRange = {
                    text: year,
                    value: year
                };

                return yearRange;
            });

            return years;
        }
    },

    methods: {
        selectionChanged (selection, type) {
            this.selectedDate[type] = selection;
            console.log(this.selectedDate);
            // if (type === 'month') {
            //     this.selectedMonth = this.months[selection].shortText;
            //     console.log(this.selectedMonth);
            // }
        },

        continueToCheckout () {
            console.log(this.selectedDate);
            console.log(new Date(this.selectedDate.year, this.selectedDate.month, this.selectedDate.day));
        }
    }
};
</script>

<style lang="scss" module>
.c-checkout-ageVerification {
    // width: 600px;
}
.c-checkout-ageVerification-description {
    margin: spacing(x2) 0 spacing(x2);
}

.c-checkout-ageVerification-button {
    margin: spacing(x2) 0 spacing();
}

.c-checkout-ageVerification-fields {
    display: flex;
    flex-wrap: nowrap;
    justify-content: stretch;
    gap: spacing();

}
.c-checkout-ageVerification-field {
    margin-top: 0px !important;
    flex-basis: calc(100% /3);
}
</style>

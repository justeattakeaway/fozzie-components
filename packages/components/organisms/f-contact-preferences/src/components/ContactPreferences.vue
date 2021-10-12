<template>
    <card-component
        :card-heading="copy.heading"
        is-page-content-wrapper
        has-outline>
        <h2 :class="$style['c-contactPreferences-subtitle']">
            {{ copy.orderUpdates.subtitle }}
        </h2>

        <form submit.prevent="onFormSubmit">
            <fieldset>
                <label>
                    <input
                        type="checkbox"
                        checked
                        disabled>
                    <span :class="$style['c-label-text--disabled']">
                        {{ copy.orderUpdates.textMessage }}<br>
                        ({{ copy.orderUpdates.textMessageDescription }})
                    </span>
                </label>

                <label>
                    <input
                        type="checkbox"
                        checked
                        disabled>
                    <span :class="$style['c-label-text--disabled']">
                        {{ copy.orderUpdates.email }}<br>
                        ({{ copy.orderUpdates.emailDescription }})
                    </span>
                </label>
            </fieldset>

            <h2 :class="$style['c-contactPreferences-subtitle']">
                {{ copy.newsAndOffers.subtitle }}
            </h2>

            <fieldset>
                <label>
                    <input type="checkbox">
                    <span>
                        {{ copy.newsAndOffers.textMessage }}
                    </span>
                </label>

                <label>
                    <input type="checkbox">
                    <span>
                        {{ copy.newsAndOffers.email }}
                    </span>
                </label>
            </fieldset>

            <f-button
                button-type="primary"
                is-full-width>
                {{ copy.saveChangesButton }}
            </f-button>
        </form>
    </card-component>
</template>

<script>
import FButton from '@justeat/f-button';
import '@justeat/f-button/dist/f-button.css';
import CardComponent from '@justeat/f-card';
import '@justeat/f-card/dist/f-card.css';

import { globalisationServices } from '@justeat/f-services';
import tenantConfigs from '../tenants';

export default {
    name: 'ContactPreferences',
    components: {
        CardComponent,
        FButton
    },
    props: {
        locale: {
            type: String,
            default: ''
        }
    },
    data () {
        const locale = globalisationServices.getLocale(tenantConfigs, this.locale, this.$i18n);
        const localeConfig = tenantConfigs[locale];

        return {
            copy: { ...localeConfig }
        };
    },
    methods: {
        onFormSubmit () {}
    }
};
</script>

<style lang="scss" module>
fieldset {
    display: flex;
    flex-flow: column;
    border: none;
    padding: 0;
    margin: spacing(x2) 0;
}

.c-label-text--disabled {
    color: $color-content-disabled;
}

.c-contactPreferences-subtitle {
    @include font-size(heading-s);
}
</style>

<template>
    <div :class="['c-nav-container', { 'is-visible': isOpen }]">
        <div class="c-nav-popoverList c-nav-popoverList--countrySelector">
            <header class="c-nav-popoverList-header">
                <f-button
                    button-type="ghost"
                    is-icon
                    class="c-nav-popoverList-header-button"
                    :aria-label="copy.countrySelector.goBackToMainMenu"
                    @click="$emit('goBackButtonClick')">
                    <arrow-icon class="c-nav-popoverList-go-back-icon" />
                </f-button>

                <h3>{{ copy.countrySelector.selectYourCountryText }}</h3>
            </header>

            <ul class="c-countrySelector-list">
                <li
                    v-for="(country, i) in countries"
                    :key="i + '_Country'"
                    class="c-countrySelector-country"
                    :data-test-id="['countrySelector-countryList-' + country.dataTestKey]">
                    <a
                        :data-trak='`{
                            "trakEvent": "click",
                            "category": "engagement",
                            "action": "header",
                            "label": "${country.gtm}"
                        }`'
                        :tabindex="isOpen ? 0 : -1"
                        :href="country.siteUrl"
                        class="c-countrySelector-link"
                        @blur="$emit('blurOnLink')"
                        @focus="$emit('focusOnLink')">
                        <flag-icon
                            :country-code="country.key"
                            class="c-countrySelector-flag" />
                        <span>
                            {{ country.localisedName }}
                        </span>
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import FButton from '@justeat/f-button';
import { ArrowIcon } from '@justeat/f-vue-icons';
import FlagIcon from './FlagIcon.vue';
import '@justeat/f-button/dist/f-button.css';
import { countries } from '../tenants';

export default {
    components: {
        FButton,
        ArrowIcon,
        FlagIcon
    },
    props: {
        copy: {
            type: Object,
            default: () => ({})
        },
        isOpen: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            countries
        };
    }
};
</script>

<style lang="scss">

$countrySelector-text-color  : $grey--darkest;
$countrySelector-text-hover  : $color-bg--darker;

.c-nav-popoverList-header {
    display: flex;
    align-items: center;

    @include media('>=mid') {
        padding-bottom: spacing(x2);
    }

    h3 {
        @include font-size(heading-s, true, narrow);
        font-weight: $font-weight-headings;
        margin: 0;
        margin-left: spacing();

        @include media('>=mid') {
            @include font-size(heading-s);
            margin-left: 0;
        }
    }
}

.c-nav-popoverList-header-button {
    padding: 0;
    margin: spacing(x2);
    @include media('>=mid') {
        display: none;
    }
    .c-nav-popoverList-go-back-icon {
        transform: rotate(180deg);
        display: inline-block;
        width: 28px;
        height: 28px;
    }
}

.c-countrySelector-list {
    margin: 0;

    & > li:before {
        display: none;
    }
}

.c-countrySelector-country {
    padding: 0;
    white-space: nowrap;
    margin-bottom: 0;

    &:hover {
        background: $countrySelector-text-hover;
    }
}

.c-countrySelector-link {
    display: block;
    text-decoration: none;
    color: $countrySelector-text-color;
    @include font-size(body-l);
    padding: spacing(x1.5) spacing(x3);
    width: 100%;
}

.c-nav-popoverList.c-nav-popoverList--countrySelector {
    ul {
        list-style-type: none;
        padding: 0 spacing(x2);
    }

    @include media('>=mid') {
        padding: spacing(x3) 0;
        min-width: 330px;
        width: auto;

        ul {
            list-style-type: none;
            column-count: 2;
            padding: 0;
        }
    }
}

</style>

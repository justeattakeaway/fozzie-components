<template>
    <li
        :class="['c-nav-list-item has-sublist', {
            'open': countrySelectorIsOpen
        }]"
        data-test-id="countrySelector-toggle"
        v-on="isBelowMid ? null : { mouseover: openCountrySelector, mouseleave: closeCountrySelector }"
        @keyup.esc="closeCountrySelector">
        <a
            class="c-nav-list-text c-country-selector-list-item"
            href="/"
            :aria-expanded="!isBelowMid && countrySelectorIsOpen ? 'true' : 'false'"
            :aria-haspopup="isBelowMid ? false : true"
            @click.prevent="onCountrySelectorToggle"
            v-on="isBelowMid ? { focus: openNav } : null">
            <span class="c-countrySelector-currentFlag-wrapper">
                <flag-icon
                    :country-code="currentCountryKey"
                    class="c-countrySelector-flag c-countrySelector-flag--current" />
            </span>
            <span :class="['c-countrySelector-title',{ 'is-visuallyHidden': !isBelowMid }]">
                {{ selectYourCountryText }}
            </span>
        </a>

        <div :class="['c-nav-panel', { 'is-visible': countrySelectorIsOpen }]">
            <div class="c-nav-popoverList c-nav-popoverList--countrySelector">
                <header class="c-nav-popoverList-header">
                    <f-button
                        button-type="icon"
                        button-size="xsmall"
                        class="c-nav-popoverList-header-button"
                        @click.native="closeCountrySelector">
                        <arrow-icon class="c-nav-popoverList-go-back-icon" />
                    </f-button>

                    <h3>{{ selectYourCountryText }}</h3>
                </header>

                <ul :aria-label="changeCountryText">
                    <li
                        v-for="(country, i) in countries"
                        :key="i + '_Country'"
                        class="c-countrySelector-country"
                        :data-test-id="['countrySelector-countryList-' + country.key]">
                        <a
                            :data-trak='`{
                                "trakEvent": "click",
                                "category": "engagement",
                                "action": "header",
                                "label": "${country.gtm}"
                            }`'
                            :tabindex="countrySelectorIsOpen ? 0 : -1"
                            :href="country.siteUrl"
                            class="c-countrySelector-link"
                            @blur="closeCountrySelector"
                            @focus="openCountrySelector">
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
    </li>
</template>

<script>
import FButton from '@justeat/f-button';
import { ArrowIcon } from '@justeat/f-vue-icons';
import FlagIcon from './FlagIcon.vue';
import '@justeat/f-button/dist/f-button.css';
import { countries } from '../tenants';


export default {
    name: 'CountrySelector',
    components: {
        FButton,
        ArrowIcon,
        FlagIcon
    },
    props: {
        isBelowMid: {
            type: Boolean,
            defauld: false
        },
        currentCountryKey: {
            type: String,
            default: ''
        },
        changeCountryText: {
            type: String,
            default: ''
        },
        selectYourCountryText: {
            type: String,
            default: ''
        },
        openNav: {
            type: Function,
            default: () => (() => {})
        }
    },
    data () {
        return {
            countries,
            countrySelectorIsOpen: false
        };
    },
    methods: {
        onCountrySelectorToggle () {
            this.countrySelectorIsOpen = !this.countrySelectorIsOpen;
        },

        closeCountrySelector () {
            this.countrySelectorIsOpen = false;
        },

        openCountrySelector () {
            this.countrySelectorIsOpen = true;
        }

    }
};
</script>

<style lang="scss">

$contrySelector-icon-color  : $color-secondary;
$contrySelector-text-color  : $grey--darkest;
$countrySelector-text-hover : $color-bg--darker;
$contrySelector-flag-width  : 16px;
$contrySelector-flag-height : 16px;

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
}

.c-nav-popoverList-go-back-icon {
    transform: rotate(180deg);
    width: 28px;
    height: 28px;
    display: inline-block;

    use {
        fill: $contrySelector-icon-color;
    }
}

.c-countrySelector-flag {
    height: $contrySelector-flag-height;
    width: $contrySelector-flag-width;
    margin-right: spacing();
}

.c-countrySelector-flag--current {
    margin-right: 0;
}

.c-countrySelector-currentFlag-wrapper {
    height: $contrySelector-flag-height;
    width: $contrySelector-flag-width;

    .c-header--highlightBg &,
    .c-header--transparent & {
        @include media('>=mid') {
            background-color: $white;
            width: 32px;
            height: 32px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }
}

.c-countrySelector-title {
    font-size: 16px;
}

.c-country-selector-list-item {
    border-bottom: none;
    display: flex;
    align-items: center;
    justify-content: center;

    @include media('<mid') {
        &.c-nav-list-text {
            border-bottom: none;
        }
    }
}

.c-countrySelector-country {
    padding: spacing(x2);
    white-space: nowrap;

    &:hover {
        background: $countrySelector-text-hover;
    }
}

.c-countrySelector-link {
    text-decoration: none;
    color: $contrySelector-text-color;
    font-size: 16px;
    padding-bottom: 24px;
}

.c-nav-popoverList.c-nav-popoverList--countrySelector {
    ul {
        list-style-type: none;
        padding: 0 spacing(x2);
    }

    @include media('>=mid') {
        padding: spacing(x3);
        min-width: 330px;
        width: auto;

        ul {
            list-style-type: none;
            column-count: 2;
            padding: 0;
        }

        // tooltip arrow
        &:before {
            right: 4%;
        }
    }
}

</style>

<template>
    <li
        :class="['c-countrySelector c-nav-list-item has-sublist', {
            'is-open': countrySelectorIsOpen
        }]"
        data-test-id="countrySelector-toggle"
        v-on="isBelowMid ? null : { mouseover: openCountrySelector, mouseleave: closeCountrySelector }"
        @keyup.esc="closeCountrySelector">
        <button
            type="button"
            data-test-id="action-button-component"
            :tabindex="isBelowMid && !navIsOpen ? -1 : 0"
            class="c-nav-list-text c-countrySelector-btn"
            :aria-expanded="countrySelectorIsOpenOnDesktopView ? 'true' : 'false'"
            :aria-haspopup="!isBelowMid"
            :aria-label="copy.countrySelector.changeCurrentCountry"
            @click="onCountrySelectorToggle"
            v-on="countrySelectorIsClosedOnMobileView ? { blur: closeNav, focus: openNav } : null">
            <span class="c-countrySelector-currentFlag-wrapper">
                <flag-icon
                    :country-code="copy.countrySelector.currentCountryKey"
                    class="c-countrySelector-flag c-countrySelector-flag--current" />
            </span>
            <span class='c-countrySelector-title'>
                {{ copy.countrySelector.selectYourCountryText }}
            </span>
        </button>

        <div :class="['c-nav-panel', { 'is-visible': countrySelectorIsOpen }]">
            <div class="c-nav-popoverList c-nav-popoverList--countrySelector">
                <header class="c-nav-popoverList-header">
                    <f-button
                        button-type="ghost"
                        is-icon
                        class="c-nav-popoverList-header-button"
                        :aria-label="copy.countrySelector.goBackToMainMenu"
                        @click="closeCountrySelector">
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
            default: false
        },
        copy: {
            type: Object,
            default: () => ({})
        },
        openNav: {
            type: Function,
            default: () => {}
        },
        closeNav: {
            type: Function,
            default: () => {}
        },
        navIsOpen: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            countries,
            countrySelectorIsOpen: false
        };
    },
    computed: {
        countrySelectorIsClosedOnMobileView () {
            return this.isBelowMid && !this.countrySelectorIsOpen;
        },
        countrySelectorIsOpenOnDesktopView () {
            return !this.isBelowMid && this.countrySelectorIsOpen;
        }
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

$countrySelector-icon-color  : $color-secondary;
$countrySelector-text-color  : $grey--darkest;
$countrySelector-text-hover  : $color-bg--darker;
$countrySelector-flag-width  : 16px;
$countrySelector-flag-height : 16px;

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

.c-countrySelector-flag {
    height: $countrySelector-flag-height;
    width: $countrySelector-flag-width;
    margin-right: spacing();
}

.c-countrySelector-flag--current {
    margin-right: 0;
}

.c-countrySelector-currentFlag-wrapper {
    height: $countrySelector-flag-height;
    width: $countrySelector-flag-width;

    @include media('<mid') {
        margin-right: spacing();
    }

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
    width: 0;
    overflow: hidden;
    @include font-size(heading-s, true, narrow);

    @include media('<mid') {
        width: auto;
    }
}

.c-countrySelector-list {
    margin: 0;

    & > li:before {
        display: none;
    }
}

.c-countrySelector-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 0;
    background: transparent;
}

.c-nav-list-item .c-countrySelector-btn {
    border-bottom: none;
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
            right: 4.5%;
        }
    }
}

</style>

<template>
    <div
        ref="countrySelectorPanel"
        :class="[
            $style['c-nav-container'],
            { [$style['is-visible']]: isOpen }
        ]"
        @focusout="watchTabFocus">
        <div :class="$style['c-countrySelector']">
            <header :class="$style['c-countrySelector-header']">
                <f-button
                    button-type="ghost"
                    button-size="small"
                    is-icon
                    :class="$style['c-countrySelector-header-button']"
                    :aria-label="copy.goBackToMainMenu"
                    @click="$emit('closeCountrySelector')">
                    <arrow-long-left-small-icon
                        :class="$style['c-countrySelector-closePanelIcon']" />
                </f-button>

                <h3
                    id="selectYourCountry"
                    :class="$style['c-countrySelector-title']">
                    {{ copy.selectYourCountryText }}
                </h3>
            </header>

            <ul
                :class="[
                    $style['c-nav-popoverList'],
                    $style['c-nav-popoverList--twoColumns']
                ]"
                data-test-id="countrySelector-list"
                aria-labelledby="selectYourCountry">
                <li
                    v-for="(country) in countries"
                    :key="country.key"
                    :class="$style['c-countrySelector-country']"
                    :data-test-id="[`countrySelector-countryList-${country.dataTestKey}`]">
                    <nav-link
                        :data-trak="{
                            trakEvent: 'click',
                            category: 'engagement',
                            action: 'header',
                            label: `${country.gtm}`
                        }"
                        :tabindex="isOpen ? 0 : -1"
                        :text="country.localisedName"
                        :has-border-bottom="false"
                        :is-popover-link="true"
                        :href="country.siteUrl"
                        :lang="country.lang">
                        <template #icon>
                            <flag-icon
                                :country-code="country.flagKey"
                                :class="$style['c-countrySelector-country-flag']" />
                        </template>
                    </nav-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import FButton from '@justeat/f-button';
import { ArrowLongLeftSmallIcon } from '@justeattakeaway/pie-icons-vue';
import FlagIcon from './FlagIcon.vue';
import NavLink from './NavLink.vue';
import { countries } from '../tenants';

export default {
    components: {
        FButton,
        ArrowLongLeftSmallIcon,
        FlagIcon,
        NavLink
    },
    props: {
        copy: {
            type: Object,
            default: () => ({})
        },
        isOpen: {
            type: Boolean,
            default: false
        },
        isBelowMid: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            countries
        };
    },
    methods: {
        /**
         * Watch tab focus changes on non mobile version to trigger close event if the user tabs away from country selector panel
         *
         * @param {Object} e Event object.
         */
        watchTabFocus (e) {
            const {
                countrySelectorPanel
            } = this.$refs;

            const isFocusInPanel = countrySelectorPanel.contains(e.relatedTarget);
            if (!isFocusInPanel && !this.isBelowMid) {
                this.$emit('closeCountrySelector');
            }
        }
    }
};
</script>

<style lang="scss" module>
@import '../assets/scss/navigation.scss';

$countrySelector-text-color    : $color-content-default;
$countrySelector-text-bg-hover : $color-container-subtle;

.c-countrySelector-title {
    @include media('<=mid') {
        padding-top: spacing(d);
        padding-bottom: spacing(c);
    }
}

.c-countrySelector {
    @include media('>mid') {
        padding: spacing(e) spacing(c) spacing(c);
    }
}

.c-countrySelector-header {
    display: flex;
    align-items: center;

    @include media('>mid') {
        padding-bottom: spacing(d);
        padding-left: spacing(d);
    }

    h3 {
        @include font-size(heading-s, true, narrow);
        font-weight: $font-weight-headings;
        margin: 0;

        @include media('>mid') {
            @include font-size(heading-s);
            margin-left: 0;
        }
    }

    .c-countrySelector-header-button {
        margin: spacing(b) spacing() 0;

        @include media('>mid') {
            display: none;
        }

        .c-countrySelector-closePanelIcon {
            width: $countrySelector-arrowIcon-width;
            height: $countrySelector-arrowIcon-height;
        }
    }
}

.c-countrySelector-country {
    @include media('>mid') {
        // container for country link so countries are all 120h * 24w
        min-width: 192px;
    }

    &:hover {
        background: $countrySelector-text-bg-hover;
    }

    &:active {
        background: $color-container-strong;
    }

    &:focus {
        outline-color: $nav-link-focus-color;
    }
}

.c-countrySelector-country-flag {
    height: $countrySelector-flag-height;
    width: $countrySelector-flag-width;
    margin-left: spacing(d);
    margin-right: spacing(d);
}
</style>

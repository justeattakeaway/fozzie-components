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
@use '@justeat/fozzie/src/scss/fozzie' as f;

$countrySelector-text-color    : f.$color-content-default;
$countrySelector-text-bg-hover : f.$color-container-subtle;

.c-countrySelector-title {
    @include f.media('<=mid') {
        padding-top: f.spacing(d);
        padding-bottom: f.spacing(c);
    }
}

.c-countrySelector {
    @include f.media('>mid') {
        padding: f.spacing(e) f.spacing(c) f.spacing(c);
    }
}

.c-countrySelector-header {
    display: flex;
    align-items: center;

    @include f.media('>mid') {
        padding-bottom: f.spacing(d);
        padding-left: f.spacing(d);
    }

    h3 {
        @include f.font-size(heading-s, true, narrow);
        font-weight: f.$font-weight-headings;
        margin: 0;

        @include f.media('>mid') {
            @include f.font-size(heading-s);
            margin-left: 0;
        }
    }

    .c-countrySelector-header-button {
        margin: f.spacing(b) f.spacing() 0;

        @include f.media('>mid') {
            display: none;
        }

        .c-countrySelector-closePanelIcon {
            width: common.$countrySelector-arrowIcon-width;
            height: common.$countrySelector-arrowIcon-height;
        }
    }
}

.c-countrySelector-country {
    @include f.media('>mid') {
        // container for country link so countries are all 120h * 24w
        min-width: 192px;
    }

    &:hover {
        background: $countrySelector-text-bg-hover;
    }

    &:active {
        background: f.$color-container-strong;
    }

    &:focus {
        outline-color: common.$nav-link-focus-color;
    }
}

.c-countrySelector-country-flag {
    height: common.$countrySelector-flag-height;
    width: common.$countrySelector-flag-width;
    margin-left: f.spacing(d);
    margin-right: f.spacing(d);
}
</style>

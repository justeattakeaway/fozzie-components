<template>
    <div :class="$style['c-countrySelectorContainer']">
        <div
            v-click-outside="hideCountryList"
            :class="$style['c-countrySelector']"
            role="region"
            @keyup.esc="hideCountryList">
            <button
                id="countrySelector-button"
                :aria-expanded="showCountryList ? 'true' : 'false'"
                :aria-label="changeCountryText"
                :class="[
                    $style['c-countrySelector-link'],
                    $style['c-countrySelector-button']
                ]"
                data-test-id="countrySelector-button"
                type="button"
                aria-controls="countrySelector-countries"
                @click="toggleCountryList">
                <flag-icon
                    data-test-id="current-flag-icon"
                    :country-code="currentCountryKey"
                    :class="[
                        $style['c-countrySelector-flag'],
                        $style['c-countrySelector-flag--current']
                    ]" />
                <span
                    :data-test-id="[`countrySelector-current-country-${currentCountryKey}`]">
                    {{ currentCountryName }}
                </span>

                <chevron-icon
                    v-show="
                        !showCountryList"
                    :class="[
                        $style['c-icon--chevron--small'],
                        $style['c-countrySelector-chevron']
                    ]" />

                <cross-icon
                    v-show="showCountryList"
                    :class="[
                        $style['c-icon--cross'],
                        $style['c-countrySelector-cross']
                    ]" />
            </button>

            <ul
                v-show="showCountryList"
                id="countrySelector-countries"
                :class="$style['c-countrySelector-list']"
                data-test-id="countrySelector-list">
                <li
                    v-for="(country, i) in countries"
                    :key="`${i}_Country`"
                    :data-test-id="[`countrySelector-country-${country.dataTestKey}`]">
                    <a
                        :data-trak='`{
                            "trakEvent": "click",
                            "category": "engagement",
                            "action": "footer",
                            "label": "${country.gtm}"
                        }`'
                        :href="country.siteUrl"
                        :class="$style['c-countrySelector-link']"
                        data-test-id="countrySelector-countryLink">
                        <flag-icon
                            :country-code="country.key"
                            :class="$style['c-countrySelector-flag']" />
                        <p
                            data-test-id="countrySelector-list"
                            :lang="country.lang">
                            {{ country.localisedName }}
                        </p>
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import {
    ChevronIcon,
    CrossIcon
} from '@justeat/f-vue-icons';
import vClickOutside from 'v-click-outside';
import FlagIcon from './FlagIcon.vue';

export default {
    components: {
        ChevronIcon,
        CrossIcon,
        FlagIcon
    },

    directives: {
        clickOutside: vClickOutside.directive
    },

    props: {
        currentCountryName: {
            type: String,
            required: true
        },

        currentCountryKey: {
            type: String,
            required: true
        },

        countries: {
            type: Array,
            required: true
        },

        changeCountryText: {
            type: String,
            default: ''
        }
    },

    data () {
        return {
            showCountryList: false
        };
    },

    methods: {
        toggleCountryList () {
            this.showCountryList = !this.showCountryList;
        },

        hideCountryList () {
            this.showCountryList = false;
        }
    }
};
</script>

<style lang="scss" module>
@import '../assets/scss/icons.scss';

$countrySelector-btn-font-size: 'body-s';

.c-countrySelector {
    width: 190px;
    position: relative;
}
.c-countrySelector-link {
    display: flex;
    padding: spacing() spacing(d);
    text-decoration: none;
    color: $color-content-interactive-tertiary;

    &:hover {
        color: darken($color-content-link, $color-hover-01);
    }
    &:active,
    &:focus {
        color: darken($color-content-link, $color-active-01);
    }

    p {
        margin: 0 0 0 spacing();
        display: inline-block;
    }
}

.c-countrySelector-flag {
    height: 16px;
    width: 24px;
    margin-top: 2px;
}

.c-countrySelector-flag--current {
    margin-right: spacing();
    margin-top: 0;
}

.c-countrySelector-chevron {
    margin: 0 0 0 spacing();
}

.c-countrySelector-cross {
    margin: 0 0 0 11px;
}

.c-countrySelectorContainer {
    @include media('<wide') {
        width: 100%;
        border-top: 1px solid $footer-borderColor;
        order: 3;
    }
}

.c-countrySelector-button {
    align-items: center;
    background-color: $footer-bgColor;
    border: none;
    cursor: pointer;
    display: flex;
    @include font-size($countrySelector-btn-font-size);
    padding: spacing(d);
    width: 100%;
}

.c-countrySelector-list {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    padding: 0;
    margin-top: 0;
    margin-left: 0;
    margin-bottom: spacing(h) + 1;
    background-color: $footer-bgLight;
    box-shadow: $elevation-02;
    list-style: none;

    & > li:before {
        content: none;
    }
}
</style>

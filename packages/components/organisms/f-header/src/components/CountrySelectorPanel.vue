<template>
    <div
        :class="[
            $style['c-nav-container'],
            { [$style['is-visible']]: isOpen }
        ]">
        <div :class="$style['c-countrySelector']">
            <header :class="$style['c-countrySelector-header']">
                <f-button
                    button-type="ghost"
                    is-icon
                    :class="$style['c-countrySelector-header-button']"
                    :aria-label="copy.countrySelector.goBackToMainMenu"
                    @click="$emit('goBackButtonClick')">
                    <arrow-icon :class="$style['c-countrySelector-goBackIcon']" />
                </f-button>

                <h3>{{ copy.countrySelector.selectYourCountryText }}</h3>
            </header>

            <ul
                :class="[
                    $style['c-nav-popoverList'],
                    $style['c-nav-popoverList--twoColumns']
                ]"
                data-test-id="countrySelector-list">
                <li
                    v-for="(country) in countries"
                    :key="country.key"
                    :class="$style['c-countrySelector-country']"
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
                        :class="$style['c-countrySelector-link']"
                        @blur="$emit('blurOnLink')"
                        @focus="$emit('focusOnLink')">
                        <flag-icon
                            :country-code="country.flagKey"
                            :class="$style['c-nav-list-icon--flag']" />
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

<style lang="scss" module>
@import '../assets/scss/navigation.scss';

$countrySelector-text-color : $grey--darkest;
$countrySelector-text-hover : $color-bg--darker;

.c-countrySelector {
    @include media('>mid') {
        padding: spacing(x3) 0;
    }
}

.c-countrySelector-header {
    display: flex;
    align-items: center;

    @include media('>mid') {
        padding-bottom: spacing(x2);
        padding-left: spacing(x2);
    }

    h3 {
        @include font-size(heading-s, true, narrow);
        font-weight: $font-weight-headings;
        margin: 0;
        margin-left: spacing();

        @include media('>mid') {
            @include font-size(heading-s);
            margin-left: 0;
        }
    }

    .c-countrySelector-header-button {
        margin: spacing(x2);
        @include media('>mid') {
            display: none;
        }
        svg.c-countrySelector-goBackIcon {
            transform: rotate(180deg);
            width: 28px;
            height: 28px;
        }
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

</style>

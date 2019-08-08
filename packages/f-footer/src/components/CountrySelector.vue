<template>
    <div class="c-countrySelectorContainer">
        <div
            class="c-countrySelector"
            @keyup.esc="hideCountryList">
            <button
                id="countrySelector-button"
                v-click-outside="hideCountryList"
                data-js-test="countrySelector-button"
                class="c-countrySelector-link c-countrySelector-button"
                type="button"
                :aria-expanded="showCountryList ? 'true' : 'false'"
                :aria-label="changeCountryText"
                aria-controls="countrySelector-countries"
                @click="toggleCountryList">
                <flag-icon
                    :country-code="currentCountryKey" />
                {{ currentCountryName }}
                <chevron-icon
                    v-show="!showCountryList"
                    :is-small="true" />
                <cross-icon v-show="showCountryList" />
            </button>
            <ul
                v-show="showCountryList"
                id="countrySelector-countries"
                data-js-test="countrySelector-list"
                class="c-countrySelector-list"
                role="region">
                <li
                    v-for="country in countries"
                    :key="country.key"
                    data-js-test="countrySelector-country">
                    <a
                        class="c-countrySelector-link"
                        data-js-test="countrySelector-countryLink"
                        :data-trak="`{
                            event: 'click'
                            category: 'engagement'
                            action: 'footer'
                            label: '${country.gtm}'
                        }`"
                        :href="country.siteUrl">
                        <flag-icon :country-code="country.key" />
                        <p>
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
    CrossIcon,
    FlagIcon
} from '@justeat/f-vue-icons';
import vClickOutside from 'v-click-outside';

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

<style lang="scss">
.c-countrySelector {
    width: 190px;
    position: relative;

    svg {
        height: 16px;
        width: 24px;
        margin-right: spacing();
    }

    .c-icon--chevron--small {
        height: 6px;
        width: 14px;
        margin: 0 0 0 spacing();
    }

    .c-icon--cross {
        height: 8px;
        width: 8px;
        margin: 0 3px 0 spacing() + 3;
    }
}

.c-countrySelector-link {
    padding: 0;
    display: flex;
    padding: spacing() spacing(x2);
    text-decoration: none;
    color: $grey--dark;

    &:hover,
    &:focus {
        color: $blue--dark;
    }

    p {
        margin: 0 0 0 spacing();
        display: inline-block;
    }
}

.c-countrySelectorContainer {
    @include media('<wide') {
        width: 100%;
        border-top: 1px solid $grey--lighter;
        order: 3;
    }
}

.c-countrySelector-button {
    width: 100%;
    padding: spacing(x2);
    display: flex;
    align-items: center;
    background-color: $grey--lightest;
    border: none;
    cursor: pointer;
    @include font-size(base);
}

.c-countrySelector-list {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    padding: 0;
    margin-top: 0;
    margin-left: 0;
    margin-bottom: spacing(x6) + 1;
    background-color: $footer-bgLight;
    box-shadow: 0 2px 28px rgba($grey--darkest, 0.08);
    list-style: none;

    & > li:before {
        content: none;
    }
}
</style>

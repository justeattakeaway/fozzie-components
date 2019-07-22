<template>
    <div class="c-footer-countrySelector">
        <ul
            class="c-footer-countrySelector-list">
            <li>
                <button
                    class="o-btn o-btnLink c-countrySelector-link c-countrySelector-button"
                    type="button"
                    @click="showCountryList = !showCountryList">
                    <flag-icon :country-code="currentCountryKey" />
                    {{ currentCountryName }}
                    <chevron-icon
                        v-if="!showCountryList"
                        :is-small="true" />
                    <cross-icon v-else />
                </button>
            </li>
            <div v-show="showCountryList">
                <li
                    v-for="country in countries"
                    :key="country.key">
                    <a
                        class="c-countrySelector-link"
                        :href="country.siteUrl">
                        <flag-icon :country-code="country.key" />
                        <p>
                            {{ country.localisedName }}
                        </p>
                    </a>
                </li>
            </div>
        </ul>
    </div>
</template>

<script>
import { ChevronIcon, CrossIcon, FlagIcon } from '@justeat/f-vue-icons';

export default {
    components: {
        ChevronIcon,
        CrossIcon,
        FlagIcon
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
        }
    },
    data () {
        return {
            showCountryList: false
        };
    }
};
</script>

<style lang="scss">
.c-footer-countrySelector {

    @include media('<wide') {
        order: 1;
    }

    svg {
        height: 16px;
        width: 24px;
    }

    .c-icon--chevron--small {
        height: 6px;
        width: 14px;
    }

    .c-icon--cross {
        height: 8px;
        width: 8px;
    }
}

.c-countrySelector-link {
    padding: 0;
    display: flex;
    padding: spacing() spacing(x2);
    text-decoration: none;
    color: $grey--dark;

    &:hover {
        color: $blue--dark;
    }

    p {
        margin: 0 0 0 spacing();
        display: inline-block;
    }
}

.c-countrySelector-button {
    display: flex;
    align-items: center;
    justify-content: space-around;
    background-color: $grey--lightest;
    border: none;
    width: 100%;
    padding: spacing(x2);
}

.c-footer-countrySelector-list {
    background-color: $footer-bgLight;
    padding: 0;
    width: 190px;
    list-style: none;

    li:first-child {
        margin-top: spacing();
    }
}
</style>

<template>
    <div 
        class="c-footer-countrySelector"
        @keyup.esc="hideCountryList">
        <button
            id="countrySelector-button"
            class="c-countrySelector-link c-countrySelector-button"
            type="button"
            @click="toggleCountryList"
            :aria-expanded="showCountryList ? 'true' : 'false'">
            <flag-icon 
                :country-code="currentCountryKey" />
            {{ currentCountryName }}
            <chevron-icon
                v-if="!showCountryList"
                :is-small="true" />
            <cross-icon v-else />
        </button>
        <ul
            v-show="showCountryList"
            class="c-footer-countrySelector-list">
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
        </ul>
    </div>
</template>

<script>
import {
    ChevronIcon,
    CrossIcon,
    FlagIcon
} from '@justeat/f-vue-icons';

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
    },
    methods: {
        toggleCountryList () {
            this.showCountryList = !this.showCountryList;
        },
        hideCountryList () {
            if (this.showCountryList) {
                this.toggleCountryList();
            }
            var button = document.querySelector('#countrySelector-button');
            button.focus();
        }
    }
};
</script>

<style lang="scss">
.c-footer-countrySelector {
    width: 190px;
    position: relative;

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
        margin: 0 3px;
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

.c-countrySelector-button {
    width: 100%;
    padding: spacing(x2);
    display: flex;
    align-items: center;
    justify-content: space-around;
    background-color: $grey--lightest;
    border: none;
    cursor: pointer;
}

.c-footer-countrySelector-list {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    padding: 0;
    margin-bottom: spacing(x6) + 1;
    background-color: $footer-bgLight;
    box-shadow: 0 2px 28px rgba($grey--darkest, 0.08);
    list-style: none;
}
</style>

<template>
    <span>
        <a
            :class="[
                $style['o-link'], {
                    [$style['o-link--bold']]: isBold,
                    [$style['o-link--noDecoration']]: !hasTextDecoration,
                    [$style['o-link--full']]: isFullWidth,
                    [$style['o-link--noBreak']]: noLineBreak
                }]"
            data-test-id="link-component"
            :aria-describedby="descriptionId"
            v-bind="$attrs">
            <slot />
        </a>
        <span
            v-if="ariaDescription"
            :id="descriptionId"
            class="is-visuallyHidden">
            {{ ariaDescription }}
        </span>
    </span>
</template>

<script>
import { globalisationServices } from '@justeat/f-services';
import tenantConfigs from '../tenants';

let uid = 0;

export default {
    name: 'VLink',

    props: {
        isExternalSite: {
            type: Boolean,
            default: false
        },

        isBold: {
            type: Boolean,
            default: false
        },

        hasTextDecoration: {
            type: Boolean,
            default: true
        },

        isFullWidth: {
            type: Boolean,
            default: false
        },

        noLineBreak: {
            type: Boolean,
            default: false
        }
    },

    data () {
        const locale = globalisationServices.getLocale(tenantConfigs, this.locale, this.$i18n);
        const localeConfig = tenantConfigs[locale];

        uid += 1;

        return {
            copy: { ...localeConfig },
            uid: `link-${uid}-description`
        };
    },

    computed: {
        ariaDescription () {
            let linkType = '';

            if (this.isExternalSite) {
                linkType = 'external';
            }

            if (this.$attrs.target === '_blank') {
                linkType += 'newLocation';
            }

            return linkType ? this.copy.ariaDescription[linkType] : null;
        },

        descriptionId () {
            return this.ariaDescription ? this.uid : null;
        }
    }
};
</script>

<style lang="scss" module>
.o-link {
    & {
        color: $color-link-default;
    }

    &:hover,
    &:focus {
        color: $color-link-hover;
    }

    &:active {
        color: $color-link-active;
    }
}

.o-link--full {
    width: 100%;
    display: block;
}

.o-link--noDecoration {
    text-decoration: none;

    // for accessibility reasons we are leaving
    // text-decoration on hover and focus
    &:hover,
    &:focus {
        text-decoration: underline;
    }
}

.o-link--bold {
    font-weight: $font-weight-bold;
}

.o-link--noBreak {
    white-space: nowrap;
}
</style>

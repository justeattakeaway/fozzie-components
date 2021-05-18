<template>
    <a
        :class="[
            $style['o-link'],
            { [$style['o-link--bold']]: isBold },
            { [$style['o-link--noDecoration']]: !hasDecoration },
            { [$style['o-link--full']]: isFullWidth }
        ]"
        data-test-id="link"
        :href="linkHref"
        :target="target"
        rel="noopener"
        :aria-label="ariaLabel"
    >
        {{ linkText }}
    </a>
</template>

<script>
// import { globalisationServices } from '@justeat/f-services';
import { VueGlobalisationMixin } from '@justeat/f-globalisation';
import tenantConfigs from '../tenants';
import {
    DEFAULT_LINK_TARGET,
    VALID_LINK_TARGETS
} from '../constants';

export default {
    name: 'VLink',

    mixins: [VueGlobalisationMixin],

    props: {
        locale: {
            type: String,
            default: 'en-GB'
        },

        linkText: {
            type: String,
            required: true
        },

        linkHref: {
            type: String,
            required: true
        },

        isBold: {
            type: Boolean,
            default: false
        },

        hasDecoration: {
            type: Boolean,
            default: true
        },

        isFullWidth: {
            type: Boolean,
            default: false
        },

        target: {
            type: String,
            default: DEFAULT_LINK_TARGET,
            validator: value => (VALID_LINK_TARGETS.indexOf(value) !== -1) // The prop value must match one of the valid link types
        },

        isExternalLink: {
            type: Boolean,
            default: false
        }
    },

    data () {
        return {
            tenantConfigs
        };
    },

    computed: {
        ariaLabel () {
            const locationType = this.isExternalLink ? 'opensExternalSiteInNew' : 'openInNew';
            const type = this.target === DEFAULT_LINK_TARGET ? 'opensExternal' : locationType;

            return this.linkText + " - " + this.$t(`ariaDescribedBy['${type}']`) || null;
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
    // have left in in case we want to use eventually
    // &:visited {
    //     color: $color-link-visited;
    //     text-decoration: none;
    // }
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
</style>

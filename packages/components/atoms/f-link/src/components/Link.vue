<template>
    <a
        :class="[
            $style['o-link'],
            { [$style['o-link--bold']]: isBold },
            { [$style['o-link--noDecoration']]: !hasDecoration },
            { [$style['o-link--full']]: isFullWidth }
        ]"
        data-test-id="link"
        :href="url"
        :target="target"
        :aria-label="ariaLabel"
        :rel="rel"
    >{{ linkText }}</a>
</template>

<script>
import { VueGlobalisationMixin } from '@justeat/f-globalisation';
import tenantConfigs from '../tenants';

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

        url: {
            type: String,
            required: true
        },

        isExternalLink: {
            type: Boolean,
            default: false
        },

        opensInNew: {
            type: Boolean,
            default: false
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
        }
    },

    data () {
        return {
            tenantConfigs
        };
    },

    computed: {
        ariaLabel () {
            let message = this.$t('ariaLabel.prefix');

            if (this.isExternalLink) {
                message += this.$t('ariaLabel.externalSite');
            }
            if (this.opensInNew) {
                message += this.$t('ariaLabel.newLocation');
            }

            return message === this.$t('ariaLabel.prefix') ? this.linkText : this.linkText + message;
        },

        target () {
            return this.isExternalLink ? '_blank' : null;
        },

        rel () {
            return this.opensInNew ? 'noopener' : null;
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

<template>
    <div
        :class="[$style['c-iconList'], {
            [$style['c-iconList--apps']]: isApps,
            [$style['c-iconList--payments']]: isPayments,
            [$style['c-iconList--social']]: isSocial
        }]"
        data-test-id="footerBrands-column">
        <h2
            v-if="title"
            class="c-footer-heading c-footer-heading--shortBelowWide">
            {{ title }}
        </h2>

        <ul
            :class="['c-footer-list c-footer-list--inline', {
                'c-footer-list--noBottomMargin': isApps
            }]">
            <li
                v-for="(icon, i) in icons"
                :key="i + '_Icon'"
                :class="$style['c-iconList-listItem']">
                <a
                    v-if="icon.url"
                    :href="icon.url"
                    :title="icon.alt"
                    :data-trak='`{
                        "trakEvent": "click",
                        "category": "engagement",
                        "action": "footer",
                        "label": "${icon.gtm}"
                    }`'
                    data-test-id="footerIcon">
                    <component
                        :is="iconChoice"
                        v-bind="icon"
                        :locale="locale" />
                </a>

                <component
                    :is="iconChoice"
                    v-else
                    v-bind="icon"
                    :locale="locale"
                    :aria-label="icon.alt" />
            </li>
        </ul>
    </div>
</template>

<script>
import BaseProviderIcon from './BaseProviderIcon.vue';
import AppStoreIcon from './AppStoreIcon.vue';

export default {
    components: {
        AppStoreIcon,
        BaseProviderIcon
    },

    props: {
        icons: {
            type: Array,
            required: true
        },

        title: {
            type: String,
            default: ''
        },

        isApps: {
            type: Boolean,
            default: false
        },

        isPayments: {
            type: Boolean,
            default: false
        },

        isSocial: {
            type: Boolean,
            default: false
        },

        locale: {
            type: String,
            default: 'en-GB'
        }
    },

    computed: {
        iconChoice () {
            return this.isApps ? 'app-store-icon' : 'base-provider-icon';
        }
    }
};
</script>

<style lang="scss" module>

.c-iconList {
    svg {
        height: 25px;
    }
}

.c-iconList-listItem {
    margin-bottom: spacing();
    margin-right: spacing(x3);

    a,
    svg {
        display: block;
    }

    &:last-child {
        margin-right: 0;
    }
}

.c-iconList--social {
    flex-basis: 25%;

    svg {
        height: 28px;
        width: 28px;
    }
}

.c-iconList--apps {

    .c-iconList-listItem {
        margin-right: spacing(x2);
        margin-bottom: spacing(x2);
    }

    svg {
       height: 40px;
       width: 135px;
    }
}

.c-iconList--payments {
    display: flex;
    align-items: center;

    @include media('<wide') {
        padding: spacing(x2) spacing(x2) 0;
    }

    .c-iconList-listItem {
        @include media('>=wide') {
            margin-right: spacing(x6);
        }
    }

    svg {
        max-width: 67px;
    }
}

</style>

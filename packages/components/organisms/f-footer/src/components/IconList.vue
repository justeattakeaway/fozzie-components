<template>
    <div
        :class="[
            $style['c-iconList'],
            $style[`c-iconList--${listType}`],
            { [$style['c-iconList--rightAligned']]: listType === 'payments' }
        ]"
        data-test-id="footerBrands-column">
        <h2
            v-if="title"
            :class="[
                $style['c-footer-heading'],
                $style['c-footer-heading--shortBelowWide']
            ]">
            {{ title }}
        </h2>

        <ul
            :class="[
                $style['c-footer-list'],
                $style['c-footer-list--inline'],
                { [$style['c-footer-list--noBottomMargin']]: listType === 'apps' }
            ]"
            :data-test-id="`icon-list-${listType}`">
            <li
                v-for="(icon, i) in icons"
                :key="`${i}_Icon`"
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
                    :data-test-id="`footerIcon ${icon.name}`">
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

        listType: {
            type: String,
            required: true
        },

        locale: {
            type: String,
            default: 'en-GB'
        }
    },

    computed: {
        iconChoice () {
            return this.listType === 'apps' ? 'app-store-icon' : 'base-provider-icon';
        }
    }
};
</script>

<style lang="scss" module>
@import '../assets/scss/headings.scss';
@import '../assets/scss/lists.scss';

.c-iconList {
    svg {
        height: 25px;
    }
}

.c-iconList-listItem {
    margin-bottom: spacing();
    margin-right: spacing(e);

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
        margin-right: spacing(d);
        margin-bottom: spacing(d);
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
        padding: spacing(d) spacing(d) 0;
    }

    .c-iconList-listItem {
        @include media('>=wide') {
            margin-right: spacing(h);
        }
    }

    svg {
        max-width: 67px;
    }
}
</style>

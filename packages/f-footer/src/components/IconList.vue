<template>
    <div>
        <h2
            v-if="title"
            class="c-footer-heading c-footer-heading--shortBelowWide">
            {{ title }}
        </h2>
        <ul class="c-footer-list c-footer-list--inline">
            <li
                v-for="icon in icons"
                :key="icon.key"
                class="c-footer-listItem">
                <a
                    v-if="icon.url"
                    :href="icon.url"
                    :title="icon.alt"
                    :data-trak='`{
                        "event": "click",
                        "category": "engagement",
                        "action": "footer",
                        "label": "${icon.gtm}"
                    }`'>
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
import {
    AppStoreIcon,
    BaseProviderIcon
} from '@justeat/f-vue-icons';

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
            required: false,
            default: ''
        },
        isApps: {
            type: Boolean,
            required: false,
            default: false
        },
        locale: {
            type: String,
            required: false,
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

<style lang="scss">
.c-iconList {
    svg {
        height: 25px;
    }

    .c-footer-listItem {
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
}

.c-iconList--social {
    svg {
        height: 28px;
        width: 28px;
    }
}

.c-iconList--apps {
    .c-footer-listItem {
        margin-right: spacing(x2);
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

    .c-footer-listItem {
        @include media('>=wide') {
            margin-right: spacing(x6);
        }
    }

    svg {
        max-width: 67px;
    }
}

</style>

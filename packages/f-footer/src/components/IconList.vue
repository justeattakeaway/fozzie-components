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
                class="c-footer-list-item">
                <a
                    v-if="icon.url"
                    :href="icon.url"
                    :title="icon.alt">
                    <component
                        :is="isApps ? 'app-store-icon' : 'base-provider-icon'"
                        v-bind="icon"
                        :locale="locale" />
                </a>
                <component
                    :is="isApps ? 'app-store-icon' : 'base-provider-icon'"
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
    }
};
</script>

<style lang="scss">
.c-iconList {
    svg {
        height: 25px;
    }
}

.c-iconList--social {
    svg {
        height: 28px;
    }
}

.c-iconList--apps {
    svg {
       height: 40px;
    }
}
</style>

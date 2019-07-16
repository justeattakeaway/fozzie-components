<template>
    <div>
        <h2 v-if="title" class="c-footer-heading">{{ title }}</h2>
        <ul>
            <li
                v-for="icon in icons"
                :key="icon.key">
                <a
                    v-if="icon.url"
                    :href="icon.url"
                    :title="icon.alt" >
                    <component
                        :is="isApps ? 'app-store-icon' : 'base-provider-icon'"
                        v-bind="icon" />
                </a>
                <component
                    v-else
                    :is="isApps ? 'app-store-icon' : 'base-provider-icon'"
                    v-bind="icon"
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
        }
    }
};
</script>

<style lang="scss">
.c-icon-list {
    ul {
        margin: spacing(x2);
    }

    svg {
        height: 25px;
        margin: spacing();
    }

    .c-footer-heading {
        padding-left: 0;
    }
}

.c-icon-list--payments {
    ul {
        display: flex;
        flex-shrink: 1;
        justify-content: space-between;
    }
}

.c-icon-list--social {
    ul {
        display: flex;
        justify-content: flex-start;
        margin: 0 spacing(x2);
        margin-left: -1*spacing();
    }
}

.c-icon-list--apps {
    svg {
       height: 40px;
       margin: spacing();
    }

   ul {
        display: flex;
        justify-content: flex-start;
        margin: 0;
        margin-left: -1*spacing();
    }
}
</style>

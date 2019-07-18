<template>
    <div
        v-if="linkList.links.length"
        :class="['c-footer-panel', { 'is-collapsed': panelCollapsed && isBelowWide }]"
        data-js-test="linkList-wrapper">
        <h2>
            <button
                :id="listHeadingId"
                class="c-footer-heading c-footer-heading--button"
                data-js-test="linkList-header"
                :tabindex="isBelowWide ? 0 : -1"
                :disabled="!isBelowWide"
                :aria-disabled="!isBelowWide"
                :aria-expanded="!panelCollapsed ? 'true' : 'false'"
                :aria-controls="listId"
                @click="onPanelClick">
                {{ linkList.title }}
                <chevron-icon
                    :is-facing-up="!panelCollapsed" />
            </button>
        </h2>

        <ul
            :id="listId"
            class="c-footer-list"
            role="region"
            :aria-labelledby="listHeadingId">
            <li
                v-for="(link, index) in linkList.links"
                :key="index">
                <a
                    :href="link.url"
                    :rel="link.rel">
                    {{ link.text }}
                </a>
            </li>
        </ul>
    </div>
</template>

<script>
import { ChevronIcon } from '@justeat/f-vue-icons';

export default {
    components: {
        ChevronIcon
    },
    props: {
        linkList: {
            type: Object,
            default: () => ({})
        }
    },
    data () {
        return {
            panelCollapsed: true,
            currentScreenWidth: 0
        };
    },
    computed: {
        listId () {
            return `footer-${this.linkList.title.toLowerCase().split(' ').join('-')}`;
        },
        listHeadingId () {
            return `${this.listId}-heading`;
        },
        isBelowWide () {
            return this.currentScreenWidth <= 1024;
        }
    },
    mounted () {
        this.currentScreenWidth = window.innerWidth;
        window.addEventListener('resize', () => {
            this.currentScreenWidth = window.innerWidth;
        });
    },
    methods: {
        onPanelClick () {
            if (this.isBelowWide) {
                this.panelCollapsed = !this.panelCollapsed;
            }
        }
    }
};
</script>

<style lang="scss">

.c-footer-panel {
    flex: 1 0 0;

    .c-icon--chevron {
        display: none;

        @include media('<wide') {
            display: block;
        }
    }

    .c-icon--chevron--up {
        transform: rotate(180deg);
    }

    @include media('<wide') {
        border-bottom: 1px solid $footer-borderColor;

        &:last-of-type {
            border-bottom: none;
        }
    }

    .c-footer-heading--button {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        margin: 0;
        background: none;
        border-style: none;
        text-align: left;
        padding: spacing(x2);
        color: $color-headings;
        font-family: $font-family-headings;
        font-weight: $font-weight-headings;

        @include font-size(mid);

        @include media('<wide') {
            cursor: pointer;
        }

        @include media('>=wide') {
           padding: 0;
        }
    }

    a {
        color: $footer-textColor;
        display: inline-block;
        padding: spacing() spacing(x2);
        text-decoration: none;
        width: 100%;

        @include media('>=wide') {
            padding: 0 0 spacing();
            width: auto;
        }

        &:hover,
        &:focus {
            text-decoration: underline;
        }
    }
}

.c-icon--chevron {
    width: 16px;
    height: 9px;
}

</style>

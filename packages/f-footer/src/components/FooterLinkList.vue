<template>
    <div
        v-if="linkList.links.length"
        :class="['c-footer-panel', { 'is-collapsed': panelCollapsed }]">
        <h2
            class="c-footer-heading"
            @click="onPanelClick">
            {{ linkList.title }}
        </h2>

        <ul class="c-footer-list">
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
export default {
    props: {
        linkList: {
            type: Object,
            default: () => ({})
        }
    },
    data () {
        return {
            panelCollapsed: true
        };
    },
    methods: {
        onPanelClick () {
            if (this.isBelowWide()) {
                this.panelCollapsed = !this.panelCollapsed;
            }
        },
        isBelowWide () {
            return window.innerWidth <= 1024;
        }
    }
};
</script>

<style lang="scss">

.c-footer-panel {
    flex: 1 0 0;
    @include media('<wide') {
        border-bottom: 1px solid $footer-borderColor;
        cursor: pointer;

        &:last-of-type {
            border-bottom: none;
        }

        &.is-collapsed {
            .c-footer-list {
                display: none;
            }
        }
    }

    .c-footer-heading {
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

.c-footer-list {
    padding: 0;
    list-style: none;
    list-style-image: none;
    margin-top: 0;
    margin-bottom: spacing(x2);
    margin-left: spacing(x2);
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;

    & > li {
        margin-bottom: 0;

        &:before {
            content: none;
        }
    }

    @include media('>=wide') {
        margin: spacing(x2) 0 0 0;
    }
}
</style>

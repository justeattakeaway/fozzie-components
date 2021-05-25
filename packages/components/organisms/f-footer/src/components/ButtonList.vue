<template>
    <div>
        <h2 :class="$style['c-footer-heading']">
            {{ buttonList.title }}
        </h2>

        <div :class="$style['c-buttonList']">
            <a
                v-for="(button, i) in buttonList.buttons"
                :key="i + '_Button'"
                :href="button.url"
                :data-trak='`{
                    "trakEvent": "click",
                    "category": "engagement",
                    "action": "footer",
                    "label": "${button.gtm}"
                }`'
                :class="$style['c-buttonList-button']"
                target="_blank"
                rel="noopener">
                {{ button.title }}
            </a>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        buttonList: {
            type: Object,
            default: () => ({})
        }
    }
};
</script>

<style lang="scss" module>
@import '../assets/scss/headings.scss';

$buttonList-font-size: 'subheading-s';

.c-buttonList {
    align-items: center;
    display: flex;
    flex-flow: row wrap;
}

.c-buttonList-button {
    background-color: $color-interactive-inverse;
    border-radius: 4px;
    color: $color-content-interactive-inverse;
    display: inline-block;
    @include font-size($buttonList-font-size, false);
    font-weight: $font-weight-headings;
    min-width: 226px;
    margin-right: spacing(x2);
    margin-bottom: spacing();
    padding: 10px spacing(x2);
    text-align: center;
    text-decoration: none;
    vertical-align: middle;

    &:last-child {
        margin-right: 0;
    }

    &:hover,
    &:focus {
        background-color: darken($color-black, $color-hover-01);
    }

    @include media('<narrow') {
        margin-bottom: spacing(x2);
        margin-right: 0;
        width: 100%;

        &:last-child {
            margin-bottom: spacing();
        }
    }
}
</style>

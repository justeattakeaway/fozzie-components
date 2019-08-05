<template>
    <div>
        <h2 class="c-footer-heading">
            {{ buttonList.title }}
        </h2>
        <div class="c-buttonList">
            <a
                v-for="(button, index) in buttonList.buttons"
                :key="index"
                :href="button.url"
                target="_blank"
                class="c-buttonList-button"
                :data-gtm="['engagement|footer|' + button.gtm]">
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

<style lang="scss">

.c-buttonList {
    display: flex;
    flex-flow: row wrap;
    align-items: center;
}

.c-buttonList-button {
    display: inline-block;
    vertical-align: middle;
    min-width: 226px;
    background-color: $white;
    border-radius: 4px;
    color: $color-link-default;
    text-decoration: none;
    @include font-size(base--scaleUp, false);
    font-weight: $font-weight-headings;
    font-family: $font-family-headings;
    padding: 10px spacing(x2);
    text-align: center;
    margin-right: spacing(x2);
    margin-bottom: spacing();

    @include theme(ml) {
       font-family: $font-family-headings--ml;
       font-weight:  $font-weight-headings--ml;
       color: $color-link-default--ml;
    }

    &:last-child {
        margin-right: 0;
    }

    &:hover,
    &:focus {
        background-color: $grey--lighter;
    }

    @include media('<narrow') {
        width: 100%;
        margin-right: 0;
        margin-bottom: spacing(x2);

        &:last-child {
            margin-bottom: spacing();
        }
    }
}

</style>


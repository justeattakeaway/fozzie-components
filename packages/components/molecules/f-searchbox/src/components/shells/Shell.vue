<template>
    <div :class="$style['c-searchShell']">
        <h1
            v-if="copy.headlineTitle"
            :class="$style['c-searchShell-title']">
            {{ copy.headlineTitle }}
        </h1>
        <h2
            v-if="copy.headlineSubtitle"
            :class="$style['c-searchShell-subtitle']">
            {{ copy.headlineSubtitle }}
        </h2>
        <slot />
    </div>
</template>

<script>
export default {
    props: {
        copy: {
            type: Object,
            default: () => {}
        }
    }
};
</script>

<style lang="scss" module>
@import '../../assets/scss/common';

$midWide: 980px;

.c-searchShell {
    -webkit-font-smoothing: antialiased;
    background-color: $color-bg--component;
    border-radius: $border-radius;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.16);
    color: $grey--dark;
    @include font-size('heading-xl', false);
    font-family: $font-family-base;
    font-weight: $font-weight-base;
    padding: spacing(x2);
    text-align: center;
    text-rendering: optimizeLegibility;
    width: 95%;
    z-index: 10;

    @include media('>=narrowMid') {
        max-width: 800px;
        padding: spacing(x2);
        min-height: 210px;
    }

    @include media('>=#{$midWide}') {
        min-height: 230px;
        padding: 18px spacing(x2) 20px;
    }
}
.c-searchShell-title,
.c-searchShell-subtitle {
    font-family: $font-family-base;
    margin: 0;
    padding: 0;
    text-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
    text-align: center;
}

.c-searchShell-title {
    color: $color-headings--highlight;
    @include font-size('heading-xxl', true, 'narrow');
    font-weight: $font-weight-bold;
    margin-bottom: spacing();

    @include media('>=narrowMid') {
        @include font-size('heading-xxl');
        margin-bottom: 12px;
    }

    @include media('>=#{$midWide}') {
        margin-bottom: 14px;
    }
}

.c-searchShell-subtitle {
    color: $grey--dark;
    @include font-size('subheading-s', true, 'narrow');
    font-weight: $font-weight-base;
    margin-bottom: spacing(x2);

    @include media('>=narrowMid') {
        @include font-size('subheading-s');
    }
}
</style>

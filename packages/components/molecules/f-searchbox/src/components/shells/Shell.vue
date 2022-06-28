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
    name: 'SearchShell',
    props: {
        copy: {
            type: Object,
            default: () => {}
        }
    }
};
</script>

<style lang="scss" module>
@use '@justeat/fozzie/src/scss/fozzie' as f;

$midWide: 980px;

.c-searchShell {
    -webkit-font-smoothing: antialiased;
    background-color: f.$color-container-default;
    border-radius: f.$border-radius;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.16);
    color: f.$color-grey-50;
    @include f.font-size('heading-xl', false);
    font-family: f.$font-family-base;
    font-weight: f.$font-weight-regular;
    padding: f.spacing(d);
    text-align: center;
    text-rendering: optimizeLegibility;
    width: 95%;
    z-index: 10;

    @include f.media('>=narrowMid') {
        max-width: 800px;
        padding: f.spacing(d);
        min-height: 210px;
    }

    @include f.media('>=#{$midWide}') {
        min-height: 230px;
        padding: 18px spacing(d) 20px;
    }
}
.c-searchShell-title,
.c-searchShell-subtitle {
    font-family: f.$font-family-base;
    margin: 0;
    padding: 0;
    text-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
    text-align: center;
}

.c-searchShell-title {
    color: f.$color-content-brand;
    @include f.font-size('heading-xxl', true, 'narrow');
    font-weight: f.$font-weight-extrabold;
    margin-bottom: f.spacing();

    @include f.media('>=narrowMid') {
        @include f.font-size('heading-xxl');
        margin-bottom: 12px;
    }

    @include f.media('>=#{$midWide}') {
        margin-bottom: 14px;
    }
}

.c-searchShell-subtitle {
    color: f.$color-grey-50;
    @include f.font-size('subheading-s', true, 'narrow');
    font-weight: f.$font-weight-regular;
    margin-bottom: f.spacing(d);

    @include f.media('>=narrowMid') {
        @include f.font-size('subheading-s');
    }
}
</style>

<template>
    <div :class="$style['c-searchShell']">
        <slot />
    </div>
</template>

<style lang="scss" module>
@import '../../assets/scss/form';

.c-searchShell {
    text-align: center;
}
</style>

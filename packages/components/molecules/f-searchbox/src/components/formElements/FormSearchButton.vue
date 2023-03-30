<template>
    <div>
        <search-button
            type="submit"
            data-test-id="find-restaurants-button"
            :aria-label="copy.buttonText"
            :class="{
                [$style['c-search-btn']]: true,
                [$style['c-search-btn--compressed']]: isCompressed
            }">
            <span :class="$style['c-search-btn-icon']">
                <slot name="icon-submit">
                    <eyeglass-icon />
                </slot>
            </span>

            <span :class="$style['c-search-btn-text']">{{ copy.buttonText }}</span>
        </search-button>
    </div>
</template>

<script>
import SearchButton from '@justeat/f-button';
import '@justeat/f-button/dist/f-button.css';
import { EyeglassIcon } from '@justeat/f-vue-icons';

export default {
    components: {
        EyeglassIcon,
        SearchButton
    },
    props: {
        isCompressed: {
            type: Boolean,
            default: true
        },
        copy: {
            type: Object,
            default:  () => ({})
        }
    }
};
</script>

<style lang="scss" module>
@use '@justeat/fozzie/src/scss/fozzie' as f;

.c-search-btn {
    display: flex;
    align-items: center;
    -webkit-appearance: none;
    -webkit-box-sizing: border-box;
    background-color: common.$search-button-bgColor;
    border: none;
    box-sizing: border-box;
    color: f.$color-content-interactive-light;
    cursor: pointer;
    font-family: f.$font-family-base;
    @include f.font-size(heading-s);
    font-weight: f.$font-weight-bold;
    justify-content: space-around;
    margin: 0;
    outline: none;
    text-align: center;
    text-decoration: none;
    height: 56px;
    min-width: 56px;
    padding: f.spacing();
    right: 0;

    &,
    &:focus,
    &:focus-visible {
        &, &:after {
            border-radius: 0 f.$border-radius f.$border-radius 0;
        }
    }

    &:focus,
    &:hover {
        background-color: darken(f.$color-interactive-brand, f.$color-hover-01);
    }

    &:active {
        background-color: darken(f.$color-interactive-brand, f.$color-active-01);
    }

    @include f.media('>=narrow') {
        height: 60px;
    }

    @include f.media('>=narrowMid') {
        min-width: 128px;
    }

    .c-search-btn-icon {
        @include f.media('>=narrowMid') {
            display: none;
        }

        svg {
            width: 24px;
            height: 24px;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
}

.c-search-btn-text {
    display: none;

    @include f.media('>=narrowMid') {
        display: block;
        margin: 0 auto;
    }
}

.c-search-btn-clear {
    $btn-size: 52px;

    background: f.$color-interactive-inverse;
    border: none;
    width: $btn-size;
    height: $btn-size;
    right: 5px;
    top: 5px;
    position: absolute;
    cursor: pointer;

    &:hover,
    &:focus {
        background-color: darken(f.$color-interactive-inverse, f.$color-hover-01);
    }
}

.c-search-btn--compressed {
    margin: f.spacing(a);
    border-radius: f.$border-radius;
    height: 48px;
    min-width: 48px;
}
</style>

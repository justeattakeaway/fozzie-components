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
@import '../../assets/scss/form';

.c-search-btn {
    display: flex;
    align-items: center;
    -webkit-appearance: none;
    -webkit-box-sizing: border-box;
    background-color: $search-button-bgColor;
    border: none;
    border-radius: 0 $border-radius $border-radius 0;
    box-sizing: border-box;
    color: $white;
    cursor: pointer;
    font-family: $font-family-base;
    @include font-size(heading-s);
    font-weight: $font-weight-bold;
    justify-content: space-around;
    margin: 0;
    outline: none;
    text-align: center;
    text-decoration: none;
    height: 56px;
    min-width: 56px;
    padding: spacing();
    right: 0;

    &:focus,
    &:hover {
        background-color: $search-button-bgColor--hover;
    }

    &:active {
        background-color: $search-button-bgColor--active;
    }

    @include media('>=narrow') {
        height: 60px;
    }

    @include media('>=narrowMid') {
        min-width: 128px;
    }

    .c-search-btn-icon {
        @include media('>=narrowMid') {
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

    @include media('>=narrowMid') {
        display: block;
        margin: 0 auto;
    }
}

.c-search-btn-clear {
    $btn-size: 52px;

    background: $white;
    border: none;
    width: $btn-size;
    height: $btn-size;
    right: 5px;
    top: 5px;
    position: absolute;
    cursor: pointer;

    &:hover,
    &:focus {
        background-color: $grey--offWhite;
    }
}

.c-search-btn--compressed {
    margin: spacing(x0.5);
    border-radius: $border-radius;
    height: 48px;
    min-width: 48px;
}

</style>

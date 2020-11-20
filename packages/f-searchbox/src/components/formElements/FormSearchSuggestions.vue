<template>
    <div :class="$style['c-search-suggestions']">
        <button
            type="button"
            v-for="(item, index) in suggestions"
            :key="index"
            :class="{
                [$style['c-search-suggestions-item']]: true
            }">
            {{ suggestionFormat(item) }}
        </button>
        <div :class="$style['c-search-poweredByGoogle']">
            <img
                :src="poweredByGoogle"
                data-test-id="poweredByGoogle">
        </div>
    </div>
</template>

<script>
// Look into trying to convert this to a SVG then it can be pulled in via f-vue-icons.
import poweredByGoogle from '../../assets/img/powered_by_google.png';

export default {
    props: {
        suggestions: {
            type: Array,
            default: () => []
        },
        suggestionFormat: {
            type: Function,
            default: () => ({})
        }
    },

    data () {
        return {
            poweredByGoogle
        };
    }
};
</script>

<style lang="scss" module>
@import '../../assets/scss/common';

$highlight-colour: #eaeaea;

.c-search-suggestions {
    $border-radius: 3px;
    background: $white;
    box-shadow: #9b9b9b 0 5px 6px -2px;
    border-bottom-left-radius: $border-radius;
    border-bottom-right-radius: $border-radius;
    position: absolute;
    left: 0;
    right: 0;
    top: 55px;
    box-sizing: border-box;
    overflow-y: auto;
    z-index: 1000;
}

.c-search-suggestions-item {
    display: block;
    width: 100%;
    border: 0;
    border-top: $highlight-colour 1px solid;
    cursor: pointer;
    font-family: Arial, sans-serif;
    font-size: 11px;
    line-height: 30px;
    margin: 0;
    overflow: hidden;
    padding-left: 15px;
    text-align: left;
    text-overflow: ellipsis;
    white-space: nowrap;

    &:hover,
    &.selected {
        background: $highlight-colour;
    }
}

.c-search-poweredByGoogle {
    display: flex;
    justify-content: flex-end;
    padding: 8px;

    img {
        width: 100px;
        height: 12px;
    }
}
</style>

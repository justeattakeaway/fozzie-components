<template>
    <div
        :class="$style['c-wdioTest']"
        data-test-id="wdio-test-component">
        I am a WdioTest Component (GB)
                <f-button
            buttonType="primary"
            buttonSize="medium"
            actionType="button"
            :isLoading="isLoading"
            :hasIcon="hasIcon">
            Label
        </f-button>
    </div>
</template>

<script>


import FButton from '@justeat/f-button';
import '@justeat/f-button/dist/f-button.css';

export default {
    name: 'Wdiotest',
    components: {
        FButton
    }
}
</script>

<style lang="scss" module>
@use '@justeat/fozzie/src/scss/fozzie' as f;

.c-wdioTest {
    display: flex;
    justify-content: center;
    min-height: 80vh;
    width: 80vw;
    margin: auto;
    border: 1px solid red;
    font-family: f.$font-family-base;
    @include f.font-size(heading-m);
}
</style>

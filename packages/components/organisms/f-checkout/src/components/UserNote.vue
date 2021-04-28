<template>
    <div :class="$style['c-userNote']">
        <label
            for="userNote"
            :class="$style['c-userNote-title']">
            {{ $t('userNote.title') }}
        </label>
        <div :class="$style['c-userNote-content']">
            {{ $t('userNote.text') }}
        </div>
        <textarea
            id="userNote"
            name="notePlaceholder"
            cols="30"
            rows="10"
            maxlength="200"
            :class="$style['c-userNote-textArea']"
            :placeholder="$t('userNote.placeholder')"
            @input="updateUserNote($event.target.value)" />
    </div>
</template>

<script>
import { mapActions } from 'vuex';
import { VUEX_CHECKOUT_MODULE } from '../constants';

export default {
    methods: {
        ...mapActions(VUEX_CHECKOUT_MODULE, [
            'updateUserNote'
        ])
    }
};
</script>

<style lang="scss" module>
$userNote-textArea-borderRadius                  : $border-radius;
$userNote-textArea-borderWidth                   : 1px;
$userNote-textArea-borderColour                  : $grey--light;
$userNote-textColour                             : $color-text;
$userNote-textArea-bg                            : $color-bg--component;
$userNote-textArea-height                        : 188px;

.c-userNote {
    margin-top: spacing(x3);
    @include font-size(body-l);
    color: $userNote-textColour;

    .c-userNote-title {
        font-weight: $font-weight-bold;
    }

    .c-userNote-content {
        margin-top: spacing();
        margin-bottom: spacing(x0.5);
    }

    .c-userNote-textArea {
        height: $userNote-textArea-height;
        width: 100%;
        padding: spacing() spacing(x2);
        margin-top: spacing(x2);
        font: inherit;
        color: inherit;
        background-color: $userNote-textArea-bg;
        border: $userNote-textArea-borderWidth solid $userNote-textArea-borderColour;
        border-radius: $userNote-textArea-borderRadius;
        background-clip: padding-box;
        resize: none;
    }
}
</style>

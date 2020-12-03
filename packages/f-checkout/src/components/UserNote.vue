<template>
    <div :class="$style['c-userNote']">
        <div :class="$style['c-userNote-title']">
            Leave a note
        </div>
        <div :class="$style['c-userNote-content']">
            {{ noteText }}
        </div>
        <textarea
            name="notePlaceholder"
            cols="30"
            rows="10"
            maxlength="200"
            :class="$style['c-userNote-textArea']"
            :placeholder="notePlaceholder" />
    </div>
</template>

<script>
export default {
    props: {
        noteText: {
            type: String,
            default: "Leave a note for the resturant with anything they need to know (e.g. the doorbell doesn't work). Do not include details about any allergies here."
        },
        notePlaceholder: {
            type: String,
            default: "e.g. the doorbell doesn't work. Do not include details about any allergies here. \n\nWe're working with resturants to cut waste. Please don't ask for plastic cutlery."
        }
    }
};
</script>

<style lang="scss" module>
$userNote-textArea-borderRadius                  : $border-radius;
$userNote-textArea-borderWidth                   : 1px;
$userNote-textArea-borderColour                  : $grey--light;
$userNote-textColour                             : $color-text;
$userNote-textArea-bg                            : $color-bg--component;
$userNote-textArea-height                        : 144px;

.c-userNote {
    margin-top: spacing(x3);
    @include font-size(body-s);
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

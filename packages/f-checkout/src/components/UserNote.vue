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
$note-input-borderRadius                  : 3px;
$note-input-borderWidth                   : 1px;
$note-input-borderColour                  : $grey--light;
$note-textColour                          : $grey--dark;
$line-height                              : 17.5px;

.c-userNote {
    margin-top: spacing(x3);
    @include font-size(body-s);

    .c-userNote-title {
        font-weight: $font-weight-bold;
        color: $color-headings;
    }

    .c-userNote-content {
        margin-top: spacing();
        color: $color-headings;
        margin-bottom: spacing(x0.5);
    }

    .c-userNote-textArea {
        height: 144px;
        width: 100%;
        padding: spacing() spacing(x2);
        margin-top: spacing(x2);
        font: inherit;
        background-color: $color-bg--component;
        border: $note-input-borderWidth solid $note-input-borderColour;
        border-radius: $note-input-borderRadius;
        background-clip: padding-box;
        resize: none;
    }
}
</style>

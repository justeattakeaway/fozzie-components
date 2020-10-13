<template>
    <div :class="$style['c-userNote']">
        <div :class="$style['c-userNote-title']">
            Leave a note
        </div>
        <div>
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
$note-input-bg                            : $white;
$note-input-borderRadius                  : 3px;
$note-input-borderWidth                   : 1px;
$note-input-borderColour                  : $grey--light;
$note-font-weight-bold                    : $font-weight-bold;
$line-height                              : 17.5px;
$note-textColour                          : $grey--dark;
$note-headingColour                       : $grey--darkest;

.c-userNote {
    font-weight: $note-font-weight-bold;

    .c-userNote-title {
        margin-top: spacing(x3);
        @include font-size(body-l);
        color: $note-headingColour;
    }

    div {
        margin-top: spacing(x1);
        font-size: 14px;
        line-height: $line-height;
        color: $note-headingColour;
    }

    .c-userNote-textArea {
        height: 130px;
        width: 100%;
        padding: spacing(x1.5) spacing(x1);
        margin: spacing(x2) 0 spacing(x3) 0;
        font-family: inherit;
        background-color: $note-input-bg;
        border: $note-input-borderWidth solid $note-input-borderColour;
        border-radius: $note-input-borderRadius;
        background-clip: padding-box;
        resize: none;
    }
}
</style>

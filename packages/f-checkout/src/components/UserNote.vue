<template>
    <div :class="$style['c-userNote']">
        <div :class="$style['c-userNote--title']">
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
    name: 'UserNote',

    props: {
        noteText: {
            type: String,
            default: "Leave a note for the restaurant with anything they need to know (e.g. the doorbell doesn't work). Do not include details about any allergies here."
        },
        notePlaceholder: {
            type: String,
            default: "e.g. the doorbell doesn't work. Do not include details about any allergies here. \n\nWe're working with resturants to cut waste. Please don't ask for plastic cutlery."
        }
    }
};
</script>

<style lang="scss" module>
$form-input-colour                        : $color-text;
$form-input-bg                            : $white;
$form-input-borderRadius                  : 3px;
$form-input-borderWidth                   : 1px;
$form-input-borderColour                  : $grey--light;
$form-input-borderColour--focus           : $grey--dark;
$form-note-color                           : $grey--dark;

.c-userNote {
    .c-userNote--title {
        font-weight: 600;
        margin-top: spacing(x3);
    }

    div {
        color: $form-note-color;
        margin-top: 5px;
        font-size: 14px;
    }

    .c-userNote-textArea {
        width: 100%;
        height: 130px;
        padding: 15px 9px;
        font-weight: 600;
        resize: none;
        margin-top: spacing(x1.5);
        margin-bottom: spacing(x1.5);
        font-family: $font-family-base;
        color: $form-input-colour;
        font-weight: $font-weight-base;
        background-color: $form-input-bg;
        border: $form-input-borderWidth solid $form-input-borderColour;
        border-radius: $form-input-borderRadius;
        background-clip: padding-box;
    }
}
</style>

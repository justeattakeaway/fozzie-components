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
$form-input-bg                            : $white;
$form-input-borderRadius                  : 3px;
$form-input-borderWidth                   : 1px;
$form-input-borderColour                  : $grey--light;
$form-font-weight-bold                    : $font-weight-bold;
$line-height                              : 17.5px;

.c-userNote {
    font-weight: $form-font-weight-bold;

    .c-userNote-title {
        margin-top: spacing(x3);
        @include font-size(body-l);
    }

    div {
        margin-top: spacing(x1);
        font-size: 14px;
        line-height: $line-height;
    }

    .c-userNote-textArea {
        height: 130px;
        width: 100%;
        padding: spacing(x1.5) spacing(x1);
        margin-top: spacing(x2);
        font-family: inherit;
        background-color: $form-input-bg;
        border: $form-input-borderWidth solid $form-input-borderColour;
        border-radius: $form-input-borderRadius;
        background-clip: padding-box;
        resize: none;
    }
}
</style>

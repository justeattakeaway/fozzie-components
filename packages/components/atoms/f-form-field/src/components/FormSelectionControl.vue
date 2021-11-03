<template>
    <div :class="$style['c-formField-fieldWrapper']">
        <input
            :id="`${uniqueId}`"
            :aria-labelledby="`label-${uniqueId}`"
            :value="value"
            v-bind="$attrs"
            name="hey"
            type="checkbox"
            :data-test-id="testId.input"
            :class="[
                $style['c-formField-field'],
                $style['c-formField-field--noFocus'],
                $style[`c-formField-field--${fieldSize}`], {
                    [$style['c-formField-field--checkbox']]: isCheckbox,
                    [$style['c-formField--invalid']]: hasError
                }]"
            v-on="listeners"
        >

        <form-label
            :label-for="uniqueId"
        >
            {{ labelText }}
        </form-label>
    </div>
</template>

<script>
import FormLabel from './FormLabel.vue';

export default {
    components: {
        FormLabel
    },

    inheritAttrs: false,

    props: {
        labelText: {
            type: String,
            default: ''
        },
        attributes: {
            type: Object,
            default: () => {}
        },
        value: {
            type: String,
            default: ''
        },
        fieldSize: {
            type: String,
            default: 'medium'
        },
        hasError: {
            type: Boolean,
            default: false
        }
    },

    computed: {
        testId () {
            const formFieldName = (this.attributes && this.attributes.name ? this.attributes.name : null);

            return {
                container: formFieldName ? `formfield-${formFieldName}-dropdown` : 'formfield-dropdown',
                icon: formFieldName ? `formfield-${formFieldName}-dropdown-icon` : 'formfield-dropdown-icon',
                select: formFieldName ? `formfield-${formFieldName}-dropdown-select` : 'formfield-dropdown-select',
                option: formFieldName ? `formfield-${formFieldName}-dropdown-option` : 'formfield-dropdown-option'
            };
        },

        uniqueId () {
            return `formField-${(this.$attrs.name ? this.$attrs.name : this._uid)}`;
        },

        isCheckbox () {
            return true;
        },

        listeners () {
            return {
                ...this.$listeners,
                input: this.updateValue,
                update: this.updateOption
            };
        }
    },

    methods: {
        updateValue (event) {
            this.$emit('input', event.target.value);
        },

        updateOption (option) {
            this.$emit('input', option);
        }
    }
};
</script>

<style lang="scss" module>
@mixin tick-svg($color) {
	$encodedColor: encodeColor($color);
	background-image: url("data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg fill='none' viewBox='0 0 15 12' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='m4.5 9.4722-2.9861-2.9861c-0.15636-0.1569-0.36876-0.2451-0.59027-0.2451-0.22152 0-0.43392 0.0882-0.59028 0.2451-0.15691 0.15637-0.2451 0.36877-0.2451 0.59028 0 0.22152 0.088195 0.43392 0.2451 0.59028l3.5771 3.5771c0.15636 0.1569 0.36876 0.2451 0.59028 0.2451 0.22151 0 0.43391-0.0882 0.59028-0.2451l8.9229-8.9243c0.1569-0.15637 0.2451-0.36877 0.2451-0.59028 0-0.22152-0.0882-0.43392-0.2451-0.59028-0.1564-0.15691-0.3688-0.2451-0.5903-0.2451s-0.4339 0.088195-0.5903 0.2451l-8.3333 8.3333z' clip-rule='evenodd' fill='#{$encodedColor}' fill-rule='evenodd'/%3E%3C/svg%3E");
}

.c-formField {
    & + & {
        margin-top: spacing(x2);
    }
}

    .c-formField-fieldWrapper {
        position: relative;
    }

    .c-formField-field--noFocus {
        &:focus,
        &:active,
        &:focus-within {
            box-shadow: none;
        }
    }

    .c-formField-field--checkbox {
        position: absolute;
        opacity: 0;
        z-index: -1;
    }

	.c-formField-field--checkbox + label {
		cursor: pointer;
		font-weight: $font-weight-regular;
		@include font-size('body-l');
	}

	.c-formField-field--checkbox + label:before {
		content: '';
		border: 1px solid $color-grey-45;
		border-radius: 2px;
		display: inline-block;
		width: 22px;
		height: 22px;
		margin-right: 0.5em;
		margin-top: 0.5em;
		vertical-align: -5px;
	}

	/* Checked checkbox style (in this case the background is green #e7ffba, change this to change the color) */
	.c-formField-field--checkbox:checked + label:before {
		/* NOTE: Replace the url with a path to an SVG of a checkmark to get a checkmark icon */
		@include tick-svg(#fff);
		background-repeat: no-repeat;
		background-position: center;
		/* The size of the checkmark icon, you may/may not need this */
		background-size: 14px;
		border-radius: 2px;
		border: 1px solid $color-interactive-brand;
		background-color: $color-interactive-brand;
	}

	/* Adding a dotted border around the active tabbed-into checkbox */
	.c-formField-field--checkbox:focus + label:before {
	// .c-formField-field--checkbox:not(:disabled) + span:hover:before {
		/* Visible in the full-color space */
		box-shadow:
			0px 0px 0px 1px $color-white,
			0px 0px 0px 3px $color-focus;
		border: 1px solid $color-interactive-brand;
		border-radius: 2px;
		/* Visible in Windows high-contrast themes
			box-shadow will be hidden in these modes and
			transparency will not be hidden in high-contrast
			thus box-shadow will not show but the outline will
			providing accessibility */
		outline-color: transparent; /*switch to transparent*/
		outline-width: 2px;
		outline-style: dotted;
	}

	.c-formField-field--checkbox:focus:not(:checked) + label:before {
		box-shadow:
			0px 0px 0px 1px $color-white,
			0px 0px 0px 3px $color-focus;
		border: 1px solid $color-grey-45;

		// width: 20px;
		// height: 20px;
		// vertical-align: -2px;

		/* Visible in Windows high-contrast themes
			box-shadow will be hidden in these modes and
			transparency will not be hidden in high-contrast
			thus box-shadow will not show but the outline will
			providing accessibility */
		outline-color: transparent; /*switch to transparent*/
		outline-width: 2px;
		outline-style: dotted;
	}

	.c-formField-field--checkbox:not(:disabled):not(:checked) + label:hover:before {
		background-color: darken($color-white, $color-hover-01);
	}

	.c-formField-field--checkbox:disabled + label:before {
		border: 1px solid darken($color-white, $color-hover-01);
		background-color: darken($color-white, $color-hover-01);
	}

	// /* Disabled checkbox styles */
	// .c-formField-field--checkbox:disabled + label {
	// 	cursor: default;
	// 	color: black;
	// 	opacity: 0.5;
	// }
</style>

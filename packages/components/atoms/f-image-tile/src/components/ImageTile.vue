<template>
    <div
        :class="$style['c-imageTile']"
        data-test-id="image-tile-component">
        <a
            :class="[
                $style['c-imageTile-link'], {
                    [$style['c-imageTile-link--toggle']]: !isLink
                }]"
            :href="isLink ? href : '#'"
            :aria-hidden="!isLink"
            :tabindex="isLink ? false : -1"
            data-test-id="image-tile-link">
            <span class="is-visuallyHidden">
                {{ displayText }}
            </span>
        </a>
        <input
            :id="`imageTileToggle-${tileId}`"
            type="checkbox"
            class="is-visuallyHidden"
            :class="$style['c-imageTile-checkbox']"
            data-test-id="image-tile-input"
            @change="toggleFilter">
        <label
            :class="[
                $style['c-imageTile-label'], {
                    [$style['c-imageTile-label--selected']]: isToggleSelected
                }]"
            :for="`imageTileToggle-${tileId}`"
            data-test-id="image-tile-label">
            <span
                :class="$style['c-imageTile-imageContainer']"
                :style="cssVars">
                <img
                    v-if="imgSrc"
                    :class="$style['c-imageTile-image']"
                    :src="imgSrc"
                    data-test-id="image-tile-image"
                    :alt="altText"
                    :role="isPresentationRole ? 'presentation' : false">
            </span>
            <span :aria-hidden="isLink">
                {{ displayText }}
            </span>
        </label>
    </div>
</template>

<script>

export default {
    name: 'ImageTile',
    components: {},
    props: {
        href: {
            type: String,
            default: null
        },
        tileId: {
            type: String,
            default: null
        },
        isSelected: {
            type: Boolean,
            default: false
        },
        isLink: {
            type: Boolean,
            default: false
        },
        displayText: {
            type: String,
            default: null
        },
        imgSrc: {
            type: String,
            default: ''
        },
        altText: {
            type: String,
            default: ''
        },
        fallbackImage: {
            type: String,
            default: ''
        }
    },
    data () {
        return {
            isToggleSelected: false
        };
    },
    computed: {
        isPresentationRole () {
            return this.altText === '';
        },
        /**
         * Returns a css variable from the fallback image prop
         *
         */
        cssVars () {
            const cssVariable = JSON.stringify(this.fallbackImage);

            return {
                '--bg-image': `url(${cssVariable})`
            };
        }
    },
    watch: {
        isSelected (newValue) {
            if (newValue !== this.isToggleSelected) {
                this.isToggleSelected = newValue;
            }
        }
    },
    mounted () {
        this.isToggleSelected = this.isSelected;
    },
    methods: {
        /**
         * Updates the isToggleSelected data property
         * when the checkbox is interacted with.
         *
         */
        toggleFilter () {
            this.isToggleSelected = !this.isToggleSelected;

            this.$nextTick(() => {
                this.$emit('toggle', this.createEmitObject(this.tileId));
            });
        },
        /**
         * Creates the object that is $emitted
         * when the checkbox is toggled
         *
         * @param {tileId} string
         */
        createEmitObject (tileId) {
            return {
                tileId
            };
        }
    }
};
</script>

<style lang="scss" module>

$image-tile-background-opacity: 0.7;
$image-tile-background-color: $color-interactive-brand;


.c-imageTile {
    @include font-size(heading-m);

    font-family: $font-family-base;
    position: relative;
}

.c-imageTile-link {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
}

.c-imageTile-link--toggle {
    display: block;
    position: static;
    pointer-events: none;
}

.c-imageTile-label {
    display: flex;
    flex-flow: column wrap;
}

.c-imageTile-label--selected {
  border: 1px solid green;
}

.c-imageTile-imageContainer {
  display: block;
  background-color: rgba($image-tile-background-color, $image-tile-background-opacity);
  border-radius: $radius-rounded-b;
  background-image: var(--bg-image);
  padding-top: (3 / 5) * 100%; // 5:3 aspect ratio
  position: relative;
}

.c-imageTile-image {
    border-radius: $radius-rounded-b;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

</style>


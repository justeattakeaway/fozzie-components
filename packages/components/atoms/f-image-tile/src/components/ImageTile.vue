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
            <span :class="$style['c-imageTile-imageContainer']">
                <img
                    v-if="imgSrc"
                    :class="$style['c-imageTile-image']"
                    :src="imgSrc"
                    data-test-id="image-tile-image"
                    :alt="altText"
                    :role="addPresentationRole ? 'presentation' : false">
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
        }
    },
    data () {
        return {
            isToggleSelected: false
        };
    },
    computed: {
        addPresentationRole () {
            return this.altText === '';
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
  position: relative;
  border-radius: $radius-rounded-b;
  background-color: rgba(255,128,0,0.7);
  padding-top: (61 / 102) * 100%;
  background-image: url(https://d30v2pzvrfyzpo.cloudfront.net/a/sw/img/wallpaper.png);
}

.c-imageTile-image {
    border-radius: $radius-rounded-b;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

</style>


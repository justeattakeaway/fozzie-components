<template>
    <div
        :class="[
            $style['c-imageTile'], {
                [$style['c-imageTile--selected']]: isToggleSelected
            }]"
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
            :class="$style['c-imageTile-label']"
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
            <span
                :class="$style['c-imageTile-text-container']"
                :aria-hidden="isLink">
                <span :class="$style['c-imageTile-icon-container']">
                    <tick-icon :class="$style['c-imageTile-icon']" />
                </span>
                <span :class="$style['c-imageTile-text']">
                    {{ displayText }}
                </span>
            </span>
        </label>
    </div>
</template>

<script>
import { TickIcon } from '@justeat/f-vue-icons';

export default {
    name: 'ImageTile',
    components: {
        TickIcon
    },
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

    &:hover {
        cursor: pointer;
    }

    &:hover .c-imageTile-icon {
        opacity: 1;
        transform: rotate(0) scale(1);
        width: 20px;
    }
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

.c-imageTile-text-container {
    display: flex;

    .c-imageTile--selected & {
        color: #017A39;
    }
}

.c-imageTile-icon {
    opacity: 0;
    margin-right: spacing();
    transform: rotate( -45deg ) scale(.5);
    transition: transform .4s ease, opacity .4s ease;

    .c-imageTile--selected & {
        opacity: 1;
        transform: rotate(0) scale(1);
        width: 10px;
    }

    .c-imageTile--selected & path {
        fill: #017A39;
    }
}

.c-imageTile-text {
    @include font-size(body-s);
    font-family: $font-family-base;
    font-weight: $font-weight-regular;
    flex: 1;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 100%;
}

</style>


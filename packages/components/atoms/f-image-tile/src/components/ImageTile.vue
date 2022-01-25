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
                :class="$style['c-imageTile-textContainer']"
                :aria-hidden="isLink">
                <tick-icon :class="$style['c-imageTile-icon']" />
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
$image-tile-selected: $color-content-positive;
$image-tile-transition-duration: 0.2s;
$image-tile-ease: ease-in-out;


.c-imageTile {
    position: relative;
    width: 100%;
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
    background-color: rgba($image-tile-background-color, $image-tile-background-opacity);
    border-radius: $radius-rounded-b;
    background-image: var(--bg-image);
    display: block;
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

.c-imageTile-textContainer {
    margin-top: spacing();
    display: flex;
    max-width: 100%;

    .c-imageTile--selected & {
        color: $image-tile-selected;
    }
}

.c-imageTile-icon {
    align-self: center;
    opacity: 0;
    transform: translate3d(-10px, 0, 0) scale(0.5) rotate(-60deg);
    width: 0;
    will-change: transform, opacity;

    @media (prefers-reduced-motion: no-preference) {
        transition: transform $image-tile-transition-duration $image-tile-ease,
                    opacity $image-tile-transition-duration $image-tile-ease,
                    width $image-tile-transition-duration $image-tile-ease;
    }

    .c-imageTile--selected &,
    .c-imageTile:hover & {
        opacity: 1;
        transform: translate3d(0, 0, 0) scale(1) rotate(0);
        width: 15px;
    }

    .c-imageTile--selected & path {
        fill: $image-tile-selected;
    }
}

.c-imageTile-text {
    @include font-size(body-s);
    display: block;
    font-family: $font-family-base;
    font-weight: $font-weight-regular;
    margin-right: spacing(x2);
    overflow: hidden;
    text-overflow: ellipsis;
    transform: translate3d(0, 0, 0);
    white-space: nowrap;
    width: 100%;
    will-change: transform;

    @media (prefers-reduced-motion: no-preference) {
        transition: transform $image-tile-transition-duration $image-tile-ease;
    }

    .c-imageTile--selected &,
    .c-imageTile:hover & {
        transform: translate3d(5px, 0, 0);
    }
}

</style>


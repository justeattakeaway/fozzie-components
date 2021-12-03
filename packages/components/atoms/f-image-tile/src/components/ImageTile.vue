<template>
    <div
        :class="$style['c-imageTile']"
        data-test-id="image-tile">
        <a
            :class="[
                $style['c-imageTile-link'], {
                    [$style['c-imageTile-link--toggle']]: !isLink
                }]"
            :href="isLink ? href : '#'"
            :aria-hidden="isLink ? false : true"
            :tabindex="isLink ? false : -1"
            data-test-id="image-tile-link"
        >
            <span class="is-visuallyHidden">
                {{ displayText }}
            </span>
        </a>
        <input
            :id="`imageTileToggle-${tileId}`"
            type="checkbox"
            class="is-visuallyHidden"
            :class="$style['c-imageTile-checkbox']"
            @change="toggleFilter"
        >
        <label
            :class="[
                $style['c-imageTile-label'], {
                    [$style['c-imageTile-label--selected']]: isFilterSelected
                }]"
            :for="`imageTileToggle-${tileId}`"
        >
            <img
                :class="$style['c-imageTile-image']"
                :src="imgSrc"
                alt=""
            >
            <span :aria-hidden="isLink ? true : false">
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
            default: 'https://www.google.com'
        },
        tileId: {
            type: String,
            default: 'Chicken'
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
            default: 'Chicken'
        },
        imgSrc: {
            type: String,
            default: 'https://via.placeholder.com/150'
        }
    },
    data () {
        return {
            isFilterSelected: false
        };
    },
    watch: {
        isSelected (newValue) {
            if (newValue !== this.isFilterSelected) {
                this.isFilterSelected = newValue;
            }
        }
    },
    mounted () {
        this.isFilterSelected = this.isSelected;
    },
    methods: {
        /**
         * Toggles the isFilterSelected data property
         * when the checkbox is toggled.
         *
         */
        toggleFilter () {
            this.isFilterSelected = !this.isFilterSelected;

            this.$nextTick(() => {
                this.$emit('toggle', this.filterEmitObject(this.tileId));
            });
        },
        /**
         * Creates the object that is $emitted
         * when the checkbox is toggled
         *
         * @param {tileId} string
         */
        filterEmitObject (tileId) {
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

.c-imageTile-image {
    display: block;
}

</style>

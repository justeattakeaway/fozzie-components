

<script>
export default {
    name: 'SkeletonLoader',
    components: {},
    props: {
        skeletonType: {
            type: String,
            default: 'heading'
        }
    },
    data () {
        return {
            rootTypes: {
                text: 'text',
                heading: 'heading'
            }
        };
    },
    methods: {
        genBone (text = this.skeletonType, children) {
            return this.$createElement(
                'div',
                {
                    staticClass: `${this.$style[`c-skeleton-loader-${text}`]} ${this.$style['c-skeleton-loader-bone']}`
                },
                children
            );
        }
    },
    render (createElement) {
        return createElement(
            'div', {
                staticClass: this.$style['c-skeleton-loader'],
                attrs: {
                    'data-test-id': 'skeletonLoader'
                }
            },
            [this.genBone()]
        );
    }

};
</script>

<style lang="scss" module>

$skeleton-loader-heading-height: spacing(x4);
$skeleton-loader-text-height: spacing(x2);

.c-skeleton-loader {
  position: relative;
  vertical-align: top;
}

.c-skeleton-loader-bone {
    border-radius: inherit;
    overflow: hidden;
    position: relative;
    background-color: $grey--mid;
}

.c-skeleton-loader-heading {
    height: $skeleton-loader-heading-height;
    width: 45%;
}

.c-skeleton-loader-text {
    flex: 1 0 auto;
    height: $skeleton-loader-text-height;
    margin-bottom: spacing();
}

</style>

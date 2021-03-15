

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
                    staticClass: `${this.$style[`c-skeleton-loader__${text}`]} ${this.$style['c-skeleton-loader__bone']}`
                },
                children
            );
        }
    },
    render (createElement) {
        return createElement(
            'div', {
                staticClass: this.$style['c-skeleton-loader']
            },
            [this.genBone()]
        );
    }

};
</script>

<style lang="scss" module>

$skeleton-loader-heading-height: 32px;
$skeleton-loader-text-height: 16px;

.c-skeleton-loader {
  position: relative;
  vertical-align: top;

   &__bone {
       border-radius: inherit;
        overflow: hidden;
        position: relative;
        background-color: $grey--mid;
   }

   &__heading {
    height: $skeleton-loader-heading-height;
    width: 45%;
  }

  &__text {
    flex: 1 0 auto;
    height: $skeleton-loader-text-height;
    margin-bottom: spacing();
  }
}

</style>

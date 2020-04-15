import { action } from '@storybook/addon-actions'

import Footer from '../src/components/Footer.vue'

export default {
  component: Footer,
  title: 'f-footer'
}

export const JustEatFooter = () => ({
  components: { Footer },
  template: '<Footer locale="en-UK"/>',
  methods: { action: action('clicked') }
})

export const MenulogFooter = () => ({
    components: { Footer },
    template: '<Footer locale="en-AU"/>',
    methods: { action: action('clicked') }
  })

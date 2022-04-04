<template>
    <p>
        Component has loaded
    </p>
</template>

<script>
export default {
    name: 'TestComponent',

    props: {
        duration: {
            type: Number,
            required: true
        }
    },

    watch: {
        duration () {
            this.$parent.$emit('start-spinner');
            this.setSpinnerTimeout();
        }
    },

    mounted () {
        this.setSpinnerTimeout();
    },

    methods: {
        setSpinnerTimeout () {
            setTimeout(() => {
                this.$parent.$emit('stop-spinner');
            }, this.duration);
        }
    }
};
</script>

<script>
import loggerService from '../service/logger.service';

export default {
    props: {
        tier: {
            type: String,
            default: null
        },

        stopPropagation: {
            type: Boolean,
            default: true
        },

        hideOnError: {
            type: Boolean,
            default: false
        }
    },

    data: () => ({
        hasError: false,
        error: null,
        vm: null,
        info: null
    }),

    computed: {
        loggerPayload () {
            return loggerService.buildVueError(this.error, this.vm, this.info, {
                tier: this.tier
            });
        }
    },

    errorCaptured (error, vm, info) {
        this.hasError = true;
        this.error = error;
        this.vm = vm;
        this.info = info;

        this.$emit('on-error', {
            error,
            vm,
            info,
            tier: this.tier,
            loggerPayload: this.loggerPayload
        });

        return !this.stopPropagation;
    },

    render () {
        return this.hideOnError && this.hasError
            ? null
            : this.$scopedSlots.default?.({
                hasError: this.hasError,
                error: this.error,
                vm: this.vm,
                info: this.info,
                tier: this.tier,
                loggerPayload: this.loggerPayload
            });
    }
};
</script>

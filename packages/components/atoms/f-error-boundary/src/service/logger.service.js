const formatComponentName = vm => {
    if (!vm) {
        return 'vm not found';
    }

    if (vm.$root === vm) {
        return 'root instance';
    }

    const name = vm._isVue
        ? vm.$options.name || vm.$options._componentTag
        : vm.name;

    return (
        (name ? `component <${name}>` : 'anonymous component') +
        (vm._isVue && vm.$options.__file ? ` at ${vm.$options.__file}` : '')
    );
};

/**
 * Builds an object containing Vue component error info ready to send as a log.
 *
 * @param {Object} error
 * @param {Object} vm
 * @param {String} info
 * @param {Object} options
 * @param {String} [options.tier]
 */
const buildVueError = (error, vm, info, { tier } = {}) => ({
    ...(error && {
        Exception: error.name,
        ExceptionMessage: error.message,
        ExceptionStackTrace: error.stack
    }),
    ...(tier && {
        Tier: tier
    }),
    'vue.componentName': formatComponentName(vm),
    'vue.propsData': vm?.$options?.propsData,
    'vue.lifecycleHook': info
});

export default {
    buildVueError
};

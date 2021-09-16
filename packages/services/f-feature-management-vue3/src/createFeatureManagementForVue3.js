import createFeatureManagement from '@justeat/f-feature-management';
import { reactive } from '@vue/reactivity';

/**
 * Sets a property called `reactive` onto the FeatureManagement proxy, with a `getValue()` function on it.
 * @param {object} featureManagement The reactive FeatureManagement proxy.
 */
function setReactiveProperty (featureManagement) {
    if (featureManagement) {
        featureManagement.reactive = {
            getValue: key => featureManagement.getValue(key)
        };
    }
}

/**
 * Gets a FeatureManagement object, swaps it for a Vue3 proxy, adds a `reactive` property
 * then updates the `reactive` property every time new config is loaded.
 * @param {object} settings.  See f-feature-management module docs.
 * @returns Vue3 proxy for FeatureManagement
 */
async function createFeatureManagementForVue3 (settings) {
    const originalOnUpdated = settings.onUpdated;

    const overriddenSettings = {
        ...settings,
        onUpdated: () => {
            if (typeof originalOnUpdated === 'function') {
                originalOnUpdated();
            }

            /* eslint-disable no-use-before-define */
            setReactiveProperty(featureManagement);
            /* eslint-enable no-use-before-define */
        }
    };

    const featureManagement = reactive(await createFeatureManagement(overriddenSettings));

    setReactiveProperty(featureManagement);

    return featureManagement;
}

export default createFeatureManagementForVue3;

import createFeatureManagement from '@justeat/f-feature-management';
import { reactive, set } from 'vue-demi';

/**
 * Sets a property called `reactive` onto the FeatureManagement proxy, with a `getValue()` function on it.
 * @param {object} featureManagement The reactive FeatureManagement proxy.
 */
function setReactiveProperty (featureManagement) {
    if (featureManagement) {
        // set doesn't exist in Vue3, but vue-demi provides a shim
        set(featureManagement, 'reactive', {
            getValue: key => featureManagement.getValue(key)
        });
    }
}

/**
 * Gets a FeatureManagement object, swaps it for a Vue3 proxy (if Vue3 in use),
 * adds a `reactive` property then updates the `reactive` property every time new config is loaded.
 * @param {object} settings.  See f-feature-management module docs.
 * @param {object} axiosClient An optional injected axios client. If not provided, an internal instance will be created.
 * @returns FeatureManagement object ready for use in Vue2/3 as required
 */
function createFeatureManagementForVue (settings, axiosClient) {
    const originalOnUpdated = settings.onUpdated;

    let featureManagement;

    const overriddenSettings = {
        ...settings,
        onUpdated: () => {
            if (originalOnUpdated && typeof originalOnUpdated === 'function') {
                originalOnUpdated();
            }
            setReactiveProperty(featureManagement);
        }
    };

    featureManagement = createFeatureManagement(overriddenSettings, axiosClient);

    // if Vue2 is being used reactive will be null/undefined
    if (reactive) {
        featureManagement = reactive(featureManagement);
    }

    setReactiveProperty(featureManagement);

    return featureManagement;
}

export default createFeatureManagementForVue;

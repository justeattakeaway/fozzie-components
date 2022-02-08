/**
 * Mocks the `$style` CSS Module function to simply return the name of the class
 * @example
 * import { config } from '@vue/test-utils';
 * mockCssModules(config);
 * @example
 * :class="$style['o-btn']"
 * // This class with now be avaliable in the wrapper's class list as 'o-btn'
 * @param {object} config - Vue Test Utils config
 */
export default config => {
    if (config?.mocks) {
        config.mocks.$style = new Proxy({}, {
            get (_, name) {
                return name;
            }
        });
    }
};

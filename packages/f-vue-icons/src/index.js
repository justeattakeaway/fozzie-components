import * as components from './components';
import InfoIcon from './components/InfoIcon.vue';

const Fozzie = Vue => {
    // eslint-disable-next-line guard-for-in, no-restricted-syntax
    for (const componentKey in components) {
        Vue.use(components[componentKey]);
    }
};

export default Fozzie;

export {
    InfoIcon
};

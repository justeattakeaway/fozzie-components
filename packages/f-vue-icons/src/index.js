import * as components from './components';
import ChevronIcon from './components/ChevronIcon/ChevronIcon.vue';
import CrossIcon from './components/CrossIcon/CrossIcon.vue';
import HotIcon from './components/HotIcon/HotIcon.vue';
import InfoIcon from './components/InfoIcon/InfoIcon.vue';
import MinusIcon from './components/MinusIcon/MinusIcon.vue';
import OfferIcon from './components/OfferIcon/OfferIcon.vue';
import PlusIcon from './components/PlusIcon/PlusIcon.vue';
import VegetarianIcon from './components/VegetarianIcon/VegetarianIcon.vue';

const Fozzie = Vue => {
    Object
        .values(components)
        .forEach(component => {
            Vue.use(component);
        });
};

export default Fozzie;

export {
    ChevronIcon,
    CrossIcon,
    HotIcon,
    InfoIcon,
    MinusIcon,
    OfferIcon,
    PlusIcon,
    VegetarianIcon
};

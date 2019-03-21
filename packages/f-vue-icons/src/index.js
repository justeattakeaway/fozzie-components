import * as components from './components';
import ChevronIcon from './components/ChevronIcon/ChevronIcon.vue';
import CrossIcon from './components/CrossIcon/CrossIcon.vue';
import InfoIcon from './components/InfoIcon/InfoIcon.vue';
import MinusIcon from './components/MinusIcon/MinusIcon.vue';
import OfferIcon from './components/OfferIcon/OfferIcon.vue';
import PlusIcon from './components/PlusIcon/PlusIcon.vue';
import SpicyIcon from './components/SpicyIcon/SpicyIcon.vue';
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
    InfoIcon,
    MinusIcon,
    OfferIcon,
    PlusIcon,
    SpicyIcon,
    VegetarianIcon
};

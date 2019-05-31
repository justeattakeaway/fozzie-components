import * as components from './components';
import AlertIcon from './components/AlertIcon/AlertIcon.vue';
import BasketIcon from './components/BasketIcon/BasketIcon.vue';
import ChevronIcon from './components/ChevronIcon/ChevronIcon.vue';
import CollectionIcon from './components/CollectionIcon/CollectionIcon.vue';
import CrossIcon from './components/CrossIcon/CrossIcon.vue';
import DeliveryIcon from './components/DeliveryIcon/DeliveryIcon.vue';
import InfoIcon from './components/InfoIcon/InfoIcon.vue';
import MinusIcon from './components/MinusIcon/MinusIcon.vue';
import OfferIcon from './components/OfferIcon/OfferIcon.vue';
import PlusIcon from './components/PlusIcon/PlusIcon.vue';
import SpicyIcon from './components/SpicyIcon/SpicyIcon.vue';
import VegetarianIcon from './components/VegetarianIcon/VegetarianIcon.vue';
import PadlockIcon from './components/PadlockIcon/PadlockIcon.vue';
import CashIcon from './components/CashIcon/CashIcon.vue';
import StopwatchIcon from './components/StopwatchIcon/StopwatchIcon.vue';
import MapPinIcon from './components/MapPinIcon/MapPinIcon.vue';
import ClockIcon from './components/ClockIcon/ClockIcon.vue';
import LocalLegendIcon from './components/LocalLegendIcon/LocalLegendIcon.vue';



const Fozzie = Vue => {
    Object
        .values(components)
        .forEach(component => {
            Vue.use(component);
        });
};

export default Fozzie;

export {
    AlertIcon,
    BasketIcon,
    ChevronIcon,
    CollectionIcon,
    CrossIcon,
    DeliveryIcon,
    InfoIcon,
    MinusIcon,
    OfferIcon,
    PlusIcon,
    SpicyIcon,
    VegetarianIcon,
    PadlockIcon,
    CashIcon,
    StopwatchIcon,
    MapPinIcon,
    ClockIcon,
    LocalLegendIcon
};

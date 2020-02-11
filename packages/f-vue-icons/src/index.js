import * as components from './components';
import AlcoholAgeIcon from './components/AlcoholAgeIcon/AlcoholAgeIcon.vue';
import AlertIcon from './components/AlertIcon/AlertIcon.vue';
import AppStoreIcon from './components/AppStoreIcon/AppStoreIcon.vue';
import BaseProviderIcon from './components/BaseProviderIcon/BaseProviderIcon.vue';
import BasketIcon from './components/BasketIcon/BasketIcon.vue';
import CashIcon from './components/CashIcon/CashIcon.vue';
import ChevronIcon from './components/ChevronIcon/ChevronIcon.vue';
import ClockIcon from './components/ClockIcon/ClockIcon.vue';
import CollectionIcon from './components/CollectionIcon/CollectionIcon.vue';
import CrossIcon from './components/CrossIcon/CrossIcon.vue';
import DeliveryIcon from './components/DeliveryIcon/DeliveryIcon.vue';
import FlagIcon from './components/FlagIcon/FlagIcon.vue';
import GiftIcon from './components/FlagIcon/GiftIcon.vue';
import InfoIcon from './components/InfoIcon/InfoIcon.vue';
import LocalLegendIcon from './components/LocalLegendIcon/LocalLegendIcon.vue';
import MapPinIcon from './components/MapPinIcon/MapPinIcon.vue';
import MinusIcon from './components/MinusIcon/MinusIcon.vue';
import OfferIcon from './components/OfferIcon/OfferIcon.vue';
import PadlockIcon from './components/PadlockIcon/PadlockIcon.vue';
import PlusIcon from './components/PlusIcon/PlusIcon.vue';
import SpicyIcon from './components/SpicyIcon/SpicyIcon.vue';
import StopwatchIcon from './components/StopwatchIcon/StopwatchIcon.vue';
import TickIcon from './components/TickIcon/TickIcon.vue';
import VegetarianIcon from './components/VegetarianIcon/VegetarianIcon.vue';
import WarningIcon from './components/WarningIcon/WarningIcon.vue';

const Fozzie = Vue => {
    Object
        .values(components)
        .forEach(component => {
            Vue.use(component);
        });
};

export default Fozzie;

export {
    AlcoholAgeIcon,
    AlertIcon,
    AppStoreIcon,
    BaseProviderIcon,
    BasketIcon,
    CashIcon,
    ChevronIcon,
    ClockIcon,
    CollectionIcon,
    CrossIcon,
    DeliveryIcon,
    FlagIcon,
    GiftIcon,
    InfoIcon,
    LocalLegendIcon,
    MapPinIcon,
    MinusIcon,
    OfferIcon,
    PadlockIcon,
    PlusIcon,
    SpicyIcon,
    StopwatchIcon,
    TickIcon,
    VegetarianIcon,
    WarningIcon
};

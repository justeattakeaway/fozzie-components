import * as components from './components';
import AlertIcon from './components/AlertIcon/AlertIcon.vue';
import AmexIcon from './components/AmexIcon/AmexIcon.vue';
import AmexSafekeyIcon from './components/AmexSafekeyIcon/AmexSafekeyIcon.vue';
import BasketIcon from './components/BasketIcon/BasketIcon.vue';
import CashIcon from './components/CashIcon/CashIcon.vue';
import ChevronIcon from './components/ChevronIcon/ChevronIcon.vue';
import ClockIcon from './components/ClockIcon/ClockIcon.vue';
import CollectionIcon from './components/CollectionIcon/CollectionIcon.vue';
import CrossIcon from './components/CrossIcon/CrossIcon.vue';
import DankortIcon from './components/DankortIcon/DankortIcon.vue';
import DeliveryIcon from './components/DeliveryIcon/DeliveryIcon.vue';
import FacebookIcon from './components/FacebookIcon/FacebookIcon.vue';
import InfoIcon from './components/InfoIcon/InfoIcon.vue';
import InstagramIcon from './components/InstagramIcon/InstagramIcon.vue';
import InteracIcon from './components/InteracIcon/InteracIcon.vue';
import LocalLegendIcon from './components/LocalLegendIcon/LocalLegendIcon.vue';
import MaestroIcon from './components/MaestroIcon/MaestroIcon.vue';
import MapPinIcon from './components/MapPinIcon/MapPinIcon.vue';
import MastercardIcon from './components/MastercardIcon/MastercardIcon.vue';
import MastercardSecurecodeIcon from './components/MastercardSecurecodeIcon/MastercardSecurecodeIcon.vue';
import MinusIcon from './components/MinusIcon/MinusIcon.vue';
import OfferIcon from './components/OfferIcon/OfferIcon.vue';
import PadlockIcon from './components/PadlockIcon/PadlockIcon.vue';
import PaypalIcon from './components/PaypalIcon/PaypalIcon.vue';
import PinterestIcon from './components/PinterestIcon/PinterestIcon.vue';
import PlusIcon from './components/PlusIcon/PlusIcon.vue';
import RssIcon from './components/RssIcon/RssIcon.vue';
import SpicyIcon from './components/SpicyIcon/SpicyIcon.vue';
import StopwatchIcon from './components/StopwatchIcon/StopwatchIcon.vue';
import TwitterIcon from './components/TwitterIcon/TwitterIcon.vue';
import VegetarianIcon from './components/VegetarianIcon/VegetarianIcon.vue';
import VisaIcon from './components/VisaIcon/VisaIcon.vue';
import VisaVerifiedIcon from './components/VisaVerifiedIcon/VisaVerifiedIcon.vue';
import WarningIcon from './components/WarningIcon/WarningIcon.vue';
import YoutubeIcon from './components/YoutubeIcon/YoutubeIcon.vue';

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
    AmexIcon,
    AmexSafekeyIcon,
    BasketIcon,
    CashIcon,
    ChevronIcon,
    ClockIcon,
    CollectionIcon,
    CrossIcon,
    DankortIcon,
    DeliveryIcon,
    FacebookIcon,
    InfoIcon,
    InstagramIcon,
    InteracIcon,
    LocalLegendIcon,
    MaestroIcon,
    MapPinIcon,
    MastercardIcon,
    MastercardSecurecodeIcon,
    MinusIcon,
    OfferIcon,
    PadlockIcon,
    PaypalIcon,
    PinterestIcon,
    PlusIcon,
    RssIcon,
    SpicyIcon,
    StopwatchIcon,
    TwitterIcon,
    VegetarianIcon,
    VisaIcon,
    VisaVerifiedIcon,
    WarningIcon,
    YoutubeIcon
};

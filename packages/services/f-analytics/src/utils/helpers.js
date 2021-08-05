import { windowServices } from '@justeat/f-services';
import { GROUPS_FEATURES_ROUTES } from '../constants';

// TODO: jsdoc
export const getDisplaySize = () => {
    const width = windowServices.getWindowWidth();

    // Use fozzie for breakpoints?
    if (width > 1280) return 'full-size';
    else if (width > 1025) return 'huge';
    else if (width > 768) return 'wide';
    else if (width > 414) return 'mid';
    return 'narrow';
};

// TODO: jsdoc
export const getOrientation = () => {
    const height = windowServices.getWindowHeight();
    const width = windowServices.getWindowWidth();

    return height > width ? 'Portrait' : 'Landscape';
};

const getGroupObjectFromRoute = route => GROUPS_FEATURES_ROUTES.filter(groups => groups.features.find(x => x.routes.includes(route)));

export const mapRouteToGroup = route => getGroupObjectFromRoute(route).map(x => x.group).toString() || route;

export const mapRouteToFeature = route => {
    const feature = getGroupObjectFromRoute(route).map(group => group.features.filter(x => x.routes.includes(route)).map(x => x.feature)).toString();
    return feature || route;
};


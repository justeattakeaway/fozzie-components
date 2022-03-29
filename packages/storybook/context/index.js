import i18nContext from './i18n.context';
import cookieContext from './cookie.context';
import logContext from './log.context';
import dataLayer from './dataLayer.context';
import httpContext from './http.context';
import analyticsContext from './analytics.context';

const initialise = () => {
    i18nContext();
    cookieContext();
    logContext();
    dataLayer();
    httpContext();
    analyticsContext();
};

export default initialise;

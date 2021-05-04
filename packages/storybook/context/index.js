import i18nContext from './i18n.context';
import cookieContext from './cookie.context';
import loggerContext from './logger.context';
import dataLayer from './dataLayer.context';
import httpContext from './http.context';

const initialise = () => {
    i18nContext();
    cookieContext();
    loggerContext();
    dataLayer();
    httpContext();
};

export default initialise;

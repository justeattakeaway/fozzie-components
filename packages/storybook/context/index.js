import i18nContext from './i18n.context';
import cookieContext from './cookie.context';
import loggerContext from './logger.context';

const initialise = () => {
    i18nContext();
    cookieContext();
    loggerContext();
};

export default initialise;

import AnalyticService from '../services/analytics.service';
import defaultOptions from '../defaultOptions';

export default ({ store, req }, inject, _options) => {
    const options = {
        ...defaultOptions,
        ..._options
    };

    const service = new AnalyticService(store, req, options);

    inject(options.globalVarName, service);

    // If clientside, flush any stored serverside events
    service.pushEvent();
};

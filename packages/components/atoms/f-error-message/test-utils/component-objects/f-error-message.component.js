import Page from '@justeat/f-wdio-utils';

class ErrorMessage extends Page {
    constructor () {
        super('atom', 'error-message-component');
    }
}

export default new ErrorMessage();

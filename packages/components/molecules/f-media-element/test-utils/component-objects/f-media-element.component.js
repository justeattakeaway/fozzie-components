import Page from '@justeat/f-wdio-utils';

class MediaElement extends Page {
    constructor () {
        super('molecule', 'media-element-component');
    }
}

export default new MediaElement();

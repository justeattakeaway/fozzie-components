const Page = require('@justeat/f-wdio-utils/src/base.page');

module.exports = class MediaElement extends Page {
    constructor () {
        super('molecule', 'media-element-component');
    }
};

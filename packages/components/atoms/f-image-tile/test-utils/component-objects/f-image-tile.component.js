const Page = require('@justeat/f-wdio-utils/src/base.page');

module.exports = class ImageTile extends Page {
    constructor () {
        super('atom', 'image-tile-component');
    }

    async isComponentClickable () {
        return this.component.isClickable();
    }
};

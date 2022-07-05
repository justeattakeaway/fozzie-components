import Page from '@justeat/f-wdio-utils';

class ImageTile extends Page {
    constructor () {
        super('atom', 'image-tile-component');
    }

    async isComponentClickable () {
        return this.component.isClickable();
    }
}

export default new ImageTile();

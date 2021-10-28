const Page = require('@justeat/f-wdio-utils/src/page.object');
const { COMPONENT } = require('./f-imageTile-selectors');

module.exports = class ImageTile extends Page {
    constructor () {
        super('atom', 'image-tile-component');
    }

    get component () { return $(COMPONENT); }

    load () {
        super.load(this.component);
    }

    open (url) {
        super.open(url);
    }

    waitForComponent () {
        super.waitForComponent(this.component);
    }

    isComponentDisplayed () {
        return this.component.isDisplayed();
    }
}

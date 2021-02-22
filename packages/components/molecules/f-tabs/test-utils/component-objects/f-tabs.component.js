const Page = require('@justeat/f-wdio-utils/src/page.object');

class Tabs extends Page {

    get component () { return $('[data-test-id="tabs-component"]') }

    open(){
        super.openComponent('molecule', 'vue-tabs-component');
    }

    waitForComponent(){
        super.waitForComponent(this.component);
    }

    isComponentDisplayed(){
        return this.component.isDisplayed();
    }
}

module.exports = Tabs;

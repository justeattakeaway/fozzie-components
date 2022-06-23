const Page = require('./page.object');
const { buildUrl } = require('./storybook-extensions');

class BasePage extends Page {
    get component () {
        return $(`[${this.componentTag}='${this.componentName}']`);
    }

    async load (queries) {
        const pageUrl = buildUrl(this.componentType, this.componentName, this.composePath(queries));
        this.open(pageUrl);
        await this.waitForComponent();
    }

    async waitForComponent (timeoutMs = 1000) {
        return (await this.component).waitForDisplayed({ timeout: timeoutMs });
    }

    async isComponentDisplayed () {
        return (await this.component).isDisplayed();
    }
}

module.exports = BasePage;

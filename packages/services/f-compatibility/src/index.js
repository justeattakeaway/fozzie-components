export default class Compatibility {
    constructor (options = {}) {
        this.configuration = {
            ...options
        };
    }

    isCompatible () {
        this.testUAString = this.configuration?.browserUAString;
        this.testFor = this.configuration?.browserName;
        return true;
    }
}

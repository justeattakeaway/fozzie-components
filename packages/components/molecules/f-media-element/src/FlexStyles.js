import { MODIFIER_OPPOSITES_RULES_MAP, MODIFIER_RULES_MAP } from './constants';

class FlexStyles {
    flexDirection = '--row';

    flexReverse = undefined;

    defaultFlexDirection = '--row';

    defaultFlexReverse = '';

    operator = undefined;

    operatorOpposite = undefined;

    mediaSize = undefined;

    /**
     * Adds the specific part of css class string
     * @param value
     * @returns {string}
     */
    static returnReverseClassSegment (value) {
        return value ? '--reverse' : '';
    }

    /**
     * Adds the specific part of css class string
     * @param value
     * @returns {string}
     */
    static returnDirectionClassSegment (value) {
        return value ? '--col' : '--row';
    }

    /**
     * Function creates a string (css class name) using the previously set class properties
     * @returns {*}
     * @private
     */
    static createStyle (...values) {
        if (!values.some(value => value === undefined)) {
            return values.reduce((a, c) => `${a}${c}`, 'c-mediaElement');
        }
        return undefined;
    }

    /**
     * Compiles a list of css classes to be applied
     * @returns {*[]}
     */
    get styles () {
        return [
            FlexStyles.createStyle(this.defaultFlexDirection, this.defaultFlexReverse),
            FlexStyles.createStyle(this.operatorOpposite, this.mediaSize, this.defaultFlexDirection, this.defaultFlexReverse),
            FlexStyles.createStyle(this.operator, this.mediaSize, this.flexDirection, this.flexReverse)
        ].filter(value => value !== undefined);
    }

    /**
     * Sets the flex direction css string part value
     * @param value
     */
    set column (value) {
        this.flexDirection = FlexStyles.returnDirectionClassSegment(value);
    }

    /**
     * Sets the flex reverse css string part value
     * @param value
     */
    set reverse (value) {
        this.flexReverse = FlexStyles.returnReverseClassSegment(value);
    }

    /**
     * Sets the default flex direction css string part value
     * @param value
     */
    set defaultColumn (value) {
        this.flexDirection = FlexStyles.returnDirectionClassSegment(value);
    }

    /**
     * Sets the default flex reverse css string part value
     * @param value
     */
    set defaultReverse (value) {
        this.flexReverse = FlexStyles.returnReverseClassSegment(value);
    }

    /**
     * This sets the operators within the css class string and the media size on which to apply
     * @param operator
     * @param size
     */
    set rule ([operator, size]) {
        this.operator = `--${MODIFIER_RULES_MAP[operator]}`;
        this.operatorOpposite = `--${MODIFIER_OPPOSITES_RULES_MAP[operator]}`;
        this.mediaSize = `--${size}`;
    }

    constructor ({
        default: { column: defaultColumn, reverse: defaultReverse },
        modifier
    }) {
        this.defaultColumn = defaultColumn;
        this.defaultReverse = defaultReverse;
        this.column = modifier?.column;
        this.reverse = modifier?.reverse;
        if (modifier?.rule) {
            this.rule = modifier?.rule;
        }
    }
}

export default FlexStyles;

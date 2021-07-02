import { MODIFIER_OPPOSITES_RULES_MAP, MODIFIER_RULES_MAP } from './constants';

class FlexStyles {
    defaultFlexDirection = '--row';

    defaultFlexReverse = '';

    flexDirection = '--row';

    flexReverse;

    operator;

    operatorOpposite;

    mediaSize;

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

    /**
     * Adds the specific part of css class string
     * @param value
     * @returns {string}
     */
    static getReverseClassSegment (value) {
        return value ? '--reverse' : '';
    }

    /**
     * Adds the specific part of css class string
     * @param value
     * @returns {string}
     */
    static getDirectionClassSegment (value) {
        return value ? '--col' : '--row';
    }

    /**
     * Function creates a string (css class name) using the previously set class properties
     * @returns {*}
     * @private
     */
    static createClassName (...values) {
        if (!values.some(value => value === undefined)) {
            return values.reduce((a, c) => `${a}${c}`, 'c-mediaElement');
        }
        return undefined;
    }

    /**
     * Compiles a list of css classes to be applied
     * @returns {*[]}
     */
    get classNames () {
        return [
            FlexStyles.createClassName(this.defaultFlexDirection, this.defaultFlexReverse),
            FlexStyles.createClassName(this.operatorOpposite, this.mediaSize, this.defaultFlexDirection, this.defaultFlexReverse),
            FlexStyles.createClassName(this.operator, this.mediaSize, this.flexDirection, this.flexReverse)
        ].filter(value => value !== undefined);
    }

    /**
     * Sets the flex direction css string part value
     * @param value
     */
    set column (value) {
        this.flexDirection = FlexStyles.getDirectionClassSegment(value);
    }

    /**
     * Sets the flex reverse css string part value
     * @param value
     */
    set reverse (value) {
        this.flexReverse = FlexStyles.getReverseClassSegment(value);
    }

    /**
     * Sets the default flex direction css string part value
     * @param value
     */
    set defaultColumn (value) {
        this.defaultFlexDirection = FlexStyles.getDirectionClassSegment(value);
    }

    /**
     * Sets the default flex reverse css string part value
     * @param value
     */
    set defaultReverse (value) {
        this.defaultFlexReverse = FlexStyles.getReverseClassSegment(value);
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
}

export default FlexStyles;

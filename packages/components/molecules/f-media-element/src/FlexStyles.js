import { MODIFIER_OPPOSITES_RULES_MAP, MODIFIER_RULES_MAP } from './constants';

class FlexStyles {
    flexDirection = '--row';

    flexReverse = '';

    defaultFlexDirection = '--row';

    defaultFlexReverse = '';

    operator = '';

    operatorOpposite = '';

    mediaSize = '';

    static returnReverseClassSegment (value) {
        return value ? '--reverse' : '';
    }

    static returnDirectionClassSegment (value) {
        return value ? '--col' : '--row';
    }

    get styles () {
        const test = [
            this._createDefaultStyle(),
            this._createOppositeStyle(),
            this._createStyle()
        ];

        console.log(test);

        return test;
    }

    set column (value) {
        this.flexDirection = FlexStyles.returnDirectionClassSegment(value);
    }

    set reverse (value) {
        this.flexReverse = FlexStyles.returnReverseClassSegment(value);
    }

    set defaultColumn (value) {
        this.flexDirection = FlexStyles.returnDirectionClassSegment(value);
    }

    set defaultReverse (value) {
        this.flexReverse = FlexStyles.returnReverseClassSegment(value);
    }

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
        if (modifier) {
            this.column = modifier?.column;
            this.reverse = modifier?.reverse;
            this.rule = modifier?.rule;
        }
    }

    _createDefaultStyle () {
        return `c-mediaElement${this.defaultFlexDirection}${this.defaultFlexReverse}`;
    }

    _createOppositeStyle () {
        return `c-mediaElement${this.operatorOpposite}${this.mediaSize}${this.defaultFlexDirection}${this.defaultFlexReverse}`;
    }

    _createStyle () {
        return `c-mediaElement${this.operator}${this.mediaSize}${this.flexDirection}${this.flexReverse}`;
    }
}

export default FlexStyles;

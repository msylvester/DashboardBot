import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import _typeof from 'babel-runtime/helpers/typeof';
import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import pure from 'recompose/pure';
import Typography from '@material-ui/core/Typography';
import sanitizeRestProps from './sanitizeRestProps';

var hasNumberFormat = !!((typeof Intl === 'undefined' ? 'undefined' : _typeof(Intl)) === 'object' && Intl && typeof Intl.NumberFormat === 'function');

/**
 * Display a numeric value as a locale string.
 *
 * Uses Intl.NumberFormat() if available, passing the locales and options props as arguments.
 * If Intl is not available, it outputs number as is (and ignores the locales and options props).
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString
 * @example
 * <NumberField source="score" />
 * // renders the record { id: 1234, score: 567 } as
 * <span>567</span>
 *
 * <NumberField source="score" className="red" />
 * // renders the record { id: 1234, score: 567 } as
 * <span class="red">567</span>
 *
 * <NumberField source="share" options={{ style: 'percent' }} />
 * // renders the record { id: 1234, share: 0.2545 } as
 * <span>25%</span>
 *
 * <NumberField source="price" options={{ style: 'currency', currency: 'USD' }} />
 * // renders the record { id: 1234, price: 25.99 } as
 * <span>$25.99</span>
 *
 * <NumberField source="price" locales="fr-FR" options={{ style: 'currency', currency: 'USD' }} />
 * // renders the record { id: 1234, price: 25.99 } as
 * <span>25,99 $US</span>
 */
var NumberField = function NumberField(_ref) {
    var className = _ref.className,
        record = _ref.record,
        source = _ref.source,
        locales = _ref.locales,
        options = _ref.options,
        textAlign = _ref.textAlign,
        rest = _objectWithoutProperties(_ref, ['className', 'record', 'source', 'locales', 'options', 'textAlign']);

    if (!record) return null;
    var value = get(record, source);
    if (value == null) return null;
    if (!hasNumberFormat) {
        return React.createElement(
            Typography,
            _extends({
                component: 'span',
                body1: 'body1',
                className: className
            }, sanitizeRestProps(rest)),
            value
        );
    }

    return React.createElement(
        Typography,
        _extends({
            component: 'span',
            body1: 'body1',
            className: className
        }, sanitizeRestProps(rest)),
        value.toLocaleString(locales, options)
    );
};

export { NumberField };
NumberField.propTypes = {
    addLabel: PropTypes.bool,
    basePath: PropTypes.string,
    classes: PropTypes.object,
    className: PropTypes.string,
    cellClassName: PropTypes.string,
    headerClassName: PropTypes.string,
    label: PropTypes.string,
    locales: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
    options: PropTypes.object,
    record: PropTypes.object,
    textAlign: PropTypes.string,
    sortBy: PropTypes.string,
    source: PropTypes.string.isRequired
};

var ComposedNumberField = pure(NumberField);

ComposedNumberField.defaultProps = {
    addLabel: true,
    textAlign: 'right'
};
export default ComposedNumberField;
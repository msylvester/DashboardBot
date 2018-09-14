import React from 'react';
import PropTypes from 'prop-types';
import TitleDeprecated from './TitleDeprecated';

/**
 * @deprecated Use TitleForRecord instead
 */
var RecordTitle = function RecordTitle(_ref) {
    var defaultTitle = _ref.defaultTitle,
        record = _ref.record,
        title = _ref.title;
    return record ? React.createElement(TitleDeprecated, {
        title: title,
        record: record,
        defaultTitle: defaultTitle
    }) : '';
};

RecordTitle.propTypes = {
    defaultTitle: PropTypes.any,
    record: PropTypes.object,
    title: PropTypes.any
};

export default RecordTitle;
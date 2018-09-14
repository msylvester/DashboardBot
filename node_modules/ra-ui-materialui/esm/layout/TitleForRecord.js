import React from 'react';
import PropTypes from 'prop-types';
import Title from './Title';

var TitleForRecord = function TitleForRecord(_ref) {
    var defaultTitle = _ref.defaultTitle,
        record = _ref.record,
        title = _ref.title;
    return record ? React.createElement(Title, { title: title, record: record, defaultTitle: defaultTitle }) : '';
};

TitleForRecord.propTypes = {
    defaultTitle: PropTypes.any,
    record: PropTypes.object,
    title: PropTypes.any
};

export default TitleForRecord;
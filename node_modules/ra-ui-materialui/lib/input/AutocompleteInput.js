'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.AutocompleteInput = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _get = require('lodash/get');

var _get2 = _interopRequireDefault(_get);

var _isEqual = require('lodash/isEqual');

var _isEqual2 = _interopRequireDefault(_isEqual);

var _reactAutosuggest = require('react-autosuggest');

var _reactAutosuggest2 = _interopRequireDefault(_reactAutosuggest);

var _Paper = require('@material-ui/core/Paper');

var _Paper2 = _interopRequireDefault(_Paper);

var _Popper = require('@material-ui/core/Popper');

var _Popper2 = _interopRequireDefault(_Popper);

var _TextField = require('@material-ui/core/TextField');

var _TextField2 = _interopRequireDefault(_TextField);

var _MenuItem = require('@material-ui/core/MenuItem');

var _MenuItem2 = _interopRequireDefault(_MenuItem);

var _styles = require('@material-ui/core/styles');

var _parse = require('autosuggest-highlight/parse');

var _parse2 = _interopRequireDefault(_parse);

var _match2 = require('autosuggest-highlight/match');

var _match3 = _interopRequireDefault(_match2);

var _compose = require('recompose/compose');

var _compose2 = _interopRequireDefault(_compose);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _raCore = require('ra-core');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = function styles(theme) {
    return {
        container: {
            flexGrow: 1,
            position: 'relative'
        },
        root: {},
        suggestionsContainerOpen: {
            position: 'absolute',
            marginBottom: theme.spacing.unit * 3,
            zIndex: 2
        },
        suggestion: {
            display: 'block',
            fontFamily: theme.typography.fontFamily
        },
        suggestionText: { fontWeight: 300 },
        highlightedSuggestionText: { fontWeight: 500 },
        suggestionsList: {
            margin: 0,
            padding: 0,
            listStyleType: 'none'
        }
    };
};

/**
 * An Input component for an autocomplete field, using an array of objects for the options
 *
 * Pass possible options as an array of objects in the 'choices' attribute.
 *
 * By default, the options are built from:
 *  - the 'id' property as the option value,
 *  - the 'name' property an the option text
 * @example
 * const choices = [
 *    { id: 'M', name: 'Male' },
 *    { id: 'F', name: 'Female' },
 * ];
 * <AutocompleteInput source="gender" choices={choices} />
 *
 * You can also customize the properties to use for the option name and value,
 * thanks to the 'optionText' and 'optionValue' attributes.
 * @example
 * const choices = [
 *    { _id: 123, full_name: 'Leo Tolstoi', sex: 'M' },
 *    { _id: 456, full_name: 'Jane Austen', sex: 'F' },
 * ];
 * <AutocompleteInput source="author_id" choices={choices} optionText="full_name" optionValue="_id" />
 *
 * `optionText` also accepts a function, so you can shape the option text at will:
 * @example
 * const choices = [
 *    { id: 123, first_name: 'Leo', last_name: 'Tolstoi' },
 *    { id: 456, first_name: 'Jane', last_name: 'Austen' },
 * ];
 * const optionRenderer = choice => `${choice.first_name} ${choice.last_name}`;
 * <AutocompleteInput source="author_id" choices={choices} optionText={optionRenderer} />
 *
 * The choices are translated by default, so you can use translation identifiers as choices:
 * @example
 * const choices = [
 *    { id: 'M', name: 'myroot.gender.male' },
 *    { id: 'F', name: 'myroot.gender.female' },
 * ];
 *
 * However, in some cases (e.g. inside a `<ReferenceInput>`), you may not want
 * the choice to be translated. In that case, set the `translateChoice` prop to false.
 * @example
 * <AutocompleteInput source="gender" choices={choices} translateChoice={false}/>
 *
 * The object passed as `options` props is passed to the material-ui <AutoComplete> component
 *
 * @example
 * <AutocompleteInput source="author_id" options={{ fullWidth: true }} />
 */

var AutocompleteInput = exports.AutocompleteInput = function (_React$Component) {
    (0, _inherits3.default)(AutocompleteInput, _React$Component);

    function AutocompleteInput() {
        var _ref;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, AutocompleteInput);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = AutocompleteInput.__proto__ || Object.getPrototypeOf(AutocompleteInput)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
            dirty: false,
            inputValue: null,
            searchText: '',
            selectedItem: null,
            suggestions: []
        }, _this.inputEl = null, _this.getSelectedItem = function (_ref2, inputValue) {
            var choices = _ref2.choices;
            return choices && inputValue ? choices.find(function (choice) {
                return _this.getSuggestionValue(choice) === inputValue;
            }) : null;
        }, _this.getSuggestionValue = function (suggestion) {
            return (0, _get2.default)(suggestion, _this.props.optionValue);
        }, _this.getSuggestionText = function (suggestion) {
            if (!suggestion) return '';

            var _this$props = _this.props,
                optionText = _this$props.optionText,
                translate = _this$props.translate,
                translateChoice = _this$props.translateChoice;

            var suggestionLabel = typeof optionText === 'function' ? optionText(suggestion) : (0, _get2.default)(suggestion, optionText);

            // We explicitly call toString here because AutoSuggest expect a string
            return translateChoice ? translate(suggestionLabel, { _: suggestionLabel }).toString() : suggestionLabel.toString();
        }, _this.handleSuggestionSelected = function (event, _ref3) {
            var suggestion = _ref3.suggestion,
                method = _ref3.method;
            var input = _this.props.input;


            var inputValue = _this.getSuggestionValue(suggestion);
            _this.setState({
                dirty: false,
                inputValue: inputValue,
                selectedItem: suggestion,
                searchText: _this.getSuggestionText(suggestion),
                suggestions: [suggestion]
            }, function () {
                return input && input.onChange && input.onChange(inputValue);
            });

            if (method === 'enter') {
                event.preventDefault();
            }
        }, _this.handleSuggestionsFetchRequested = function () {
            _this.setState(function (_ref4) {
                var suggestions = _ref4.suggestions,
                    prevSuggestions = _ref4.prevSuggestions;
                return {
                    suggestions: prevSuggestions ? prevSuggestions : suggestions
                };
            });
        }, _this.handleSuggestionsClearRequested = function () {
            _this.updateFilter('');
        }, _this.handleMatchSuggestionOrFilter = function (inputValue) {
            var _this$props2 = _this.props,
                choices = _this$props2.choices,
                inputValueMatcher = _this$props2.inputValueMatcher,
                input = _this$props2.input;


            var matches = inputValue && choices.filter(function (it) {
                return inputValueMatcher(inputValue, it, _this.getSuggestionText);
            });

            if (matches.length === 1) {
                var _match = matches[0];
                var nextId = _this.getSuggestionValue(_match);
                var suggestionText = _this.getSuggestionText(_match);

                if (_this.state.inputValue !== nextId) {
                    _this.setState({
                        inputValue: nextId,
                        searchText: suggestionText, // The searchText could be whatever the inputvalue matcher likes, so sanitize it
                        selectedItem: _match,
                        suggestions: [_match]
                    }, function () {
                        return input.onChange(nextId);
                    });
                } else {
                    _this.setState({
                        dirty: false,
                        suggestions: [_match],
                        searchText: suggestionText
                    });
                }
            } else {
                _this.setState({
                    dirty: true,
                    searchText: inputValue
                });
                _this.updateFilter(inputValue);
            }
        }, _this.handleChange = function (event, _ref5) {
            var newValue = _ref5.newValue,
                method = _ref5.method;

            switch (method) {
                case 'type':
                case 'escape':
                    {
                        _this.handleMatchSuggestionOrFilter(newValue);
                    }
                    break;
            }
        }, _this.renderInput = function (inputProps) {
            var input = _this.props.input;
            var autoFocus = inputProps.autoFocus,
                className = inputProps.className,
                _inputProps$classes = inputProps.classes,
                classes = _inputProps$classes === undefined ? {} : _inputProps$classes,
                isRequired = inputProps.isRequired,
                label = inputProps.label,
                meta = inputProps.meta,
                onChange = inputProps.onChange,
                resource = inputProps.resource,
                source = inputProps.source,
                value = inputProps.value,
                ref = inputProps.ref,
                _inputProps$options = inputProps.options,
                InputProps = _inputProps$options.InputProps,
                options = (0, _objectWithoutProperties3.default)(_inputProps$options, ['InputProps']),
                other = (0, _objectWithoutProperties3.default)(inputProps, ['autoFocus', 'className', 'classes', 'isRequired', 'label', 'meta', 'onChange', 'resource', 'source', 'value', 'ref', 'options']);

            if (typeof meta === 'undefined') {
                throw new Error("The TextInput component wasn't called within a redux-form <Field>. Did you decorate it and forget to add the addField prop to your component? See https://marmelab.com/react-admin/Inputs.html#writing-your-own-input-component for details.");
            }

            var touched = meta.touched,
                error = meta.error,
                _meta$helperText = meta.helperText,
                helperText = _meta$helperText === undefined ? false : _meta$helperText;

            // We need to store the input reference for our Popper element containg the suggestions
            // but Autosuggest also needs this reference (it provides the ref prop)

            var storeInputRef = function storeInputRef(input) {
                _this.inputEl = input;
                ref(input);
            };

            return _react2.default.createElement(_TextField2.default, (0, _extends3.default)({
                label: _react2.default.createElement(_raCore.FieldTitle, {
                    label: label,
                    source: source,
                    resource: resource,
                    isRequired: isRequired
                }),
                value: value,
                onChange: onChange,
                autoFocus: autoFocus,
                margin: 'normal',
                className: (0, _classnames2.default)(classes.root, className),
                inputRef: storeInputRef,
                error: !!(touched && error),
                helperText: touched && error || helperText,
                name: input.name
            }, options, {
                InputProps: (0, _extends3.default)({
                    classes: {
                        input: classes.input
                    }
                }, InputProps, other)
            }));
        }, _this.renderSuggestionsContainer = function (options) {
            var _options$containerPro = options.containerProps,
                className = _options$containerPro.className,
                containerProps = (0, _objectWithoutProperties3.default)(_options$containerPro, ['className']),
                children = options.children;


            return _react2.default.createElement(
                _Popper2.default,
                {
                    className: className,
                    open: true,
                    anchorEl: _this.inputEl,
                    placement: 'bottom-start'
                },
                _react2.default.createElement(
                    _Paper2.default,
                    (0, _extends3.default)({ square: true }, containerProps),
                    children
                )
            );
        }, _this.renderSuggestionComponent = function (_ref6) {
            var suggestion = _ref6.suggestion,
                query = _ref6.query,
                isHighlighted = _ref6.isHighlighted,
                props = (0, _objectWithoutProperties3.default)(_ref6, ['suggestion', 'query', 'isHighlighted']);
            return _react2.default.createElement('div', props);
        }, _this.renderSuggestion = function (suggestion, _ref7) {
            var query = _ref7.query,
                isHighlighted = _ref7.isHighlighted;

            var label = _this.getSuggestionText(suggestion);
            var matches = (0, _match3.default)(label, query);
            var parts = (0, _parse2.default)(label, matches);
            var _this$props3 = _this.props,
                _this$props3$classes = _this$props3.classes,
                classes = _this$props3$classes === undefined ? {} : _this$props3$classes,
                suggestionComponent = _this$props3.suggestionComponent;


            return _react2.default.createElement(
                _MenuItem2.default,
                {
                    selected: isHighlighted,
                    component: suggestionComponent || _this.renderSuggestionComponent,
                    suggestion: suggestion,
                    query: query,
                    isHighlighted: isHighlighted
                },
                _react2.default.createElement(
                    'div',
                    null,
                    parts.map(function (part, index) {
                        return part.highlight ? _react2.default.createElement(
                            'span',
                            {
                                key: index,
                                className: classes.highlightedSuggestionText
                            },
                            part.text
                        ) : _react2.default.createElement(
                            'strong',
                            {
                                key: index,
                                className: classes.suggestionText
                            },
                            part.text
                        );
                    })
                )
            );
        }, _this.handleBlur = function () {
            var _this$state = _this.state,
                dirty = _this$state.dirty,
                searchText = _this$state.searchText,
                selectedItem = _this$state.selectedItem;
            var _this$props4 = _this.props,
                allowEmpty = _this$props4.allowEmpty,
                input = _this$props4.input;

            if (dirty) {
                if (searchText === '' && allowEmpty) {
                    input && input.onBlur && input.onBlur(null);
                } else {
                    input && input.onBlur && input.onBlur(_this.state.inputValue);
                    _this.setState({
                        dirty: false,
                        searchText: _this.getSuggestionText(selectedItem),
                        suggestions: _this.props.limitChoicesToValue && selectedItem ? [selectedItem] : _this.props.choices
                    });
                }
            } else {
                input && input.onBlur && input.onBlur(_this.state.inputValue);
            }
        }, _this.handleFocus = function () {
            var input = _this.props.input;

            input && input.onFocus && input.onFocus();
        }, _this.updateFilter = function (value) {
            var _this$props5 = _this.props,
                setFilter = _this$props5.setFilter,
                choices = _this$props5.choices;

            if (_this.previousFilterValue !== value) {
                if (setFilter) {
                    setFilter(value);
                } else {
                    _this.setState({
                        suggestions: choices.filter(function (choice) {
                            return _this.getSuggestionText(choice).toLowerCase().includes(value.toLowerCase());
                        })
                    });
                }
            }
            _this.previousFilterValue = value;
        }, _this.shouldRenderSuggestions = function () {
            return true;
        }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    (0, _createClass3.default)(AutocompleteInput, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            var selectedItem = this.getSelectedItem(this.props, this.props.input.value);
            this.setState({
                selectedItem: selectedItem,
                inputValue: this.props.input.value,
                searchText: this.getSuggestionText(selectedItem),
                suggestions: this.props.limitChoicesToValue && selectedItem ? [selectedItem] : this.props.choices
            });
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            var _this2 = this;

            var choices = nextProps.choices,
                input = nextProps.input,
                limitChoicesToValue = nextProps.limitChoicesToValue;

            if (input.value !== this.state.inputValue) {
                var selectedItem = this.getSelectedItem(nextProps, input.value);
                this.setState({
                    selectedItem: selectedItem,
                    inputValue: input.value,
                    searchText: this.getSuggestionText(selectedItem),
                    dirty: false,
                    suggestions: limitChoicesToValue && selectedItem ? [selectedItem] : this.props.choices,
                    prevSuggestions: false
                });
                // Ensure to reset the filter
                this.updateFilter('');
            } else if (!(0, _isEqual2.default)(choices, this.props.choices)) {
                var _selectedItem = this.getSelectedItem(nextProps, this.state.inputValue);
                this.setState(function (_ref8) {
                    var dirty = _ref8.dirty,
                        searchText = _ref8.searchText;
                    return {
                        selectedItem: _selectedItem,
                        searchText: dirty ? searchText : _this2.getSuggestionText(_selectedItem),
                        suggestions: limitChoicesToValue && !dirty && _selectedItem ? [_selectedItem] : choices,
                        prevSuggestions: false
                    };
                });
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                alwaysRenderSuggestions = _props.alwaysRenderSuggestions,
                _props$classes = _props.classes,
                classes = _props$classes === undefined ? {} : _props$classes,
                isRequired = _props.isRequired,
                label = _props.label,
                meta = _props.meta,
                resource = _props.resource,
                source = _props.source,
                className = _props.className,
                options = _props.options;
            var _state = this.state,
                suggestions = _state.suggestions,
                searchText = _state.searchText;


            return _react2.default.createElement(_reactAutosuggest2.default, {
                theme: {
                    container: classes.container,
                    suggestionsContainerOpen: classes.suggestionsContainerOpen,
                    suggestionsList: classes.suggestionsList,
                    suggestion: classes.suggestion
                },
                renderInputComponent: this.renderInput,
                suggestions: suggestions,
                alwaysRenderSuggestions: alwaysRenderSuggestions,
                onSuggestionSelected: this.handleSuggestionSelected,
                onSuggestionsFetchRequested: this.handleSuggestionsFetchRequested,
                onSuggestionsClearRequested: this.handleSuggestionsClearRequested,
                renderSuggestionsContainer: this.renderSuggestionsContainer,
                getSuggestionValue: this.getSuggestionText,
                renderSuggestion: this.renderSuggestion,
                shouldRenderSuggestions: this.shouldRenderSuggestions,
                inputProps: {
                    className: className,
                    classes: classes,
                    isRequired: isRequired,
                    label: label,
                    meta: meta,
                    onChange: this.handleChange,
                    resource: resource,
                    source: source,
                    value: searchText,
                    onBlur: this.handleBlur,
                    onFocus: this.handleFocus,
                    options: options
                }
            });
        }
    }]);
    return AutocompleteInput;
}(_react2.default.Component);

AutocompleteInput.propTypes = {
    allowEmpty: _propTypes2.default.bool,
    alwaysRenderSuggestions: _propTypes2.default.bool, // used only for unit tests
    choices: _propTypes2.default.arrayOf(_propTypes2.default.object),
    classes: _propTypes2.default.object,
    className: _propTypes2.default.string,
    InputProps: _propTypes2.default.object,
    input: _propTypes2.default.object,
    isRequired: _propTypes2.default.bool,
    label: _propTypes2.default.string,
    limitChoicesToValue: _propTypes2.default.bool,
    meta: _propTypes2.default.object,
    options: _propTypes2.default.object,
    optionText: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.func]).isRequired,
    optionValue: _propTypes2.default.string.isRequired,
    resource: _propTypes2.default.string,
    setFilter: _propTypes2.default.func,
    source: _propTypes2.default.string,
    suggestionComponent: _propTypes2.default.func,
    translate: _propTypes2.default.func.isRequired,
    translateChoice: _propTypes2.default.bool.isRequired,
    inputValueMatcher: _propTypes2.default.func
};

AutocompleteInput.defaultProps = {
    choices: [],
    options: {},
    optionText: 'name',
    optionValue: 'id',
    limitChoicesToValue: false,
    translateChoice: true,
    inputValueMatcher: function inputValueMatcher(input, suggestion, getOptionText) {
        return getOptionText(suggestion).toLowerCase().trim().includes(input.toLowerCase().trim());
    }
};

exports.default = (0, _compose2.default)(_raCore.addField, _raCore.translate, (0, _styles.withStyles)(styles))(AutocompleteInput);
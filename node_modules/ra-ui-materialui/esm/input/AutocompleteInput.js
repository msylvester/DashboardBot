import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import isEqual from 'lodash/isEqual';
import Autosuggest from 'react-autosuggest';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
import compose from 'recompose/compose';
import classnames from 'classnames';

import { addField, translate, FieldTitle } from 'ra-core';

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
export var AutocompleteInput = function (_React$Component) {
    _inherits(AutocompleteInput, _React$Component);

    function AutocompleteInput() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, AutocompleteInput);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = AutocompleteInput.__proto__ || Object.getPrototypeOf(AutocompleteInput)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
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
            return get(suggestion, _this.props.optionValue);
        }, _this.getSuggestionText = function (suggestion) {
            if (!suggestion) return '';

            var _this$props = _this.props,
                optionText = _this$props.optionText,
                translate = _this$props.translate,
                translateChoice = _this$props.translateChoice;

            var suggestionLabel = typeof optionText === 'function' ? optionText(suggestion) : get(suggestion, optionText);

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
                options = _objectWithoutProperties(_inputProps$options, ['InputProps']),
                other = _objectWithoutProperties(inputProps, ['autoFocus', 'className', 'classes', 'isRequired', 'label', 'meta', 'onChange', 'resource', 'source', 'value', 'ref', 'options']);

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

            return React.createElement(TextField, _extends({
                label: React.createElement(FieldTitle, {
                    label: label,
                    source: source,
                    resource: resource,
                    isRequired: isRequired
                }),
                value: value,
                onChange: onChange,
                autoFocus: autoFocus,
                margin: 'normal',
                className: classnames(classes.root, className),
                inputRef: storeInputRef,
                error: !!(touched && error),
                helperText: touched && error || helperText,
                name: input.name
            }, options, {
                InputProps: _extends({
                    classes: {
                        input: classes.input
                    }
                }, InputProps, other)
            }));
        }, _this.renderSuggestionsContainer = function (options) {
            var _options$containerPro = options.containerProps,
                className = _options$containerPro.className,
                containerProps = _objectWithoutProperties(_options$containerPro, ['className']),
                children = options.children;

            return React.createElement(
                Popper,
                {
                    className: className,
                    open: true,
                    anchorEl: _this.inputEl,
                    placement: 'bottom-start'
                },
                React.createElement(
                    Paper,
                    _extends({ square: true }, containerProps),
                    children
                )
            );
        }, _this.renderSuggestionComponent = function (_ref6) {
            var suggestion = _ref6.suggestion,
                query = _ref6.query,
                isHighlighted = _ref6.isHighlighted,
                props = _objectWithoutProperties(_ref6, ['suggestion', 'query', 'isHighlighted']);

            return React.createElement('div', props);
        }, _this.renderSuggestion = function (suggestion, _ref7) {
            var query = _ref7.query,
                isHighlighted = _ref7.isHighlighted;

            var label = _this.getSuggestionText(suggestion);
            var matches = match(label, query);
            var parts = parse(label, matches);
            var _this$props3 = _this.props,
                _this$props3$classes = _this$props3.classes,
                classes = _this$props3$classes === undefined ? {} : _this$props3$classes,
                suggestionComponent = _this$props3.suggestionComponent;


            return React.createElement(
                MenuItem,
                {
                    selected: isHighlighted,
                    component: suggestionComponent || _this.renderSuggestionComponent,
                    suggestion: suggestion,
                    query: query,
                    isHighlighted: isHighlighted
                },
                React.createElement(
                    'div',
                    null,
                    parts.map(function (part, index) {
                        return part.highlight ? React.createElement(
                            'span',
                            {
                                key: index,
                                className: classes.highlightedSuggestionText
                            },
                            part.text
                        ) : React.createElement(
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
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(AutocompleteInput, [{
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
            } else if (!isEqual(choices, this.props.choices)) {
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


            return React.createElement(Autosuggest, {
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
}(React.Component);

AutocompleteInput.propTypes = {
    allowEmpty: PropTypes.bool,
    alwaysRenderSuggestions: PropTypes.bool, // used only for unit tests
    choices: PropTypes.arrayOf(PropTypes.object),
    classes: PropTypes.object,
    className: PropTypes.string,
    InputProps: PropTypes.object,
    input: PropTypes.object,
    isRequired: PropTypes.bool,
    label: PropTypes.string,
    limitChoicesToValue: PropTypes.bool,
    meta: PropTypes.object,
    options: PropTypes.object,
    optionText: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
    optionValue: PropTypes.string.isRequired,
    resource: PropTypes.string,
    setFilter: PropTypes.func,
    source: PropTypes.string,
    suggestionComponent: PropTypes.func,
    translate: PropTypes.func.isRequired,
    translateChoice: PropTypes.bool.isRequired,
    inputValueMatcher: PropTypes.func
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

export default compose(addField, translate, withStyles(styles))(AutocompleteInput);
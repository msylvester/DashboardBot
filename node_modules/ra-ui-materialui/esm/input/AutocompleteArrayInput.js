import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import _toConsumableArray from 'babel-runtime/helpers/toConsumableArray';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import isEqual from 'lodash/isEqual';
import Autosuggest from 'react-autosuggest';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
import blue from '@material-ui/core/colors/blue';
import compose from 'recompose/compose';
import classNames from 'classnames';

import { addField, translate, FieldTitle } from 'ra-core';

import AutocompleteArrayInputChip from './AutocompleteArrayInputChip';

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
        },
        chip: {
            marginRight: theme.spacing.unit
        },
        chipDisabled: {
            pointerEvents: 'none'
        },
        chipFocused: {
            backgroundColor: blue[300]
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
export var AutocompleteArrayInput = function (_React$Component) {
    _inherits(AutocompleteArrayInput, _React$Component);

    function AutocompleteArrayInput() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, AutocompleteArrayInput);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = AutocompleteArrayInput.__proto__ || Object.getPrototypeOf(AutocompleteArrayInput)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
            dirty: false,
            inputValue: null,
            searchText: '',
            suggestions: []
        }, _this.inputEl = null, _this.getSuggestionValue = function (suggestion) {
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
        }, _this.handleSuggestionSelected = function (event, _ref2) {
            var suggestion = _ref2.suggestion,
                method = _ref2.method;
            var input = _this.props.input;


            input.onChange([].concat(_toConsumableArray(_this.state.inputValue), [_this.getSuggestionValue(suggestion)]));

            if (method === 'enter') {
                event.preventDefault();
            }
        }, _this.handleSuggestionsFetchRequested = function () {
            var _this$props2 = _this.props,
                choices = _this$props2.choices,
                inputValueMatcher = _this$props2.inputValueMatcher;


            _this.setState(function (_ref3) {
                var searchText = _ref3.searchText;
                return {
                    suggestions: choices.filter(function (suggestion) {
                        return inputValueMatcher(searchText, suggestion, _this.getSuggestionText);
                    })
                };
            });
        }, _this.handleSuggestionsClearRequested = function () {
            _this.updateFilter('');
        }, _this.handleMatchSuggestionOrFilter = function (inputValue) {
            _this.setState({
                dirty: true,
                searchText: inputValue
            });
            _this.updateFilter(inputValue);
        }, _this.handleChange = function (event, _ref4) {
            var newValue = _ref4.newValue,
                method = _ref4.method;

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
                classes = inputProps.classes,
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

            return React.createElement(AutocompleteArrayInputChip, _extends({
                clearInputValueOnChange: true,
                onUpdateInput: onChange,
                onAdd: _this.handleAdd,
                onDelete: _this.handleDelete,
                value: input.value,
                inputRef: storeInputRef,
                error: touched && error,
                helperText: touched && error && helperText,
                chipRenderer: _this.renderChip,
                label: React.createElement(FieldTitle, { label: label })
            }, other, options));
        }, _this.renderChip = function (_ref5, key) {
            var _classNames;

            var value = _ref5.value,
                isFocused = _ref5.isFocused,
                isDisabled = _ref5.isDisabled,
                handleClick = _ref5.handleClick,
                handleDelete = _ref5.handleDelete;
            var _this$props3 = _this.props,
                _this$props3$classes = _this$props3.classes,
                classes = _this$props3$classes === undefined ? {} : _this$props3$classes,
                choices = _this$props3.choices;


            var suggestion = choices.find(function (choice) {
                return _this.getSuggestionValue(choice) === value;
            });

            return React.createElement(Chip, {
                key: key,
                className: classNames(classes.chip, (_classNames = {}, _defineProperty(_classNames, classes.chipDisabled, isDisabled), _defineProperty(_classNames, classes.chipFocused, isFocused), _classNames)),
                onClick: handleClick,
                onDelete: handleDelete,
                label: _this.getSuggestionText(suggestion)
            });
        }, _this.handleAdd = function (chip) {
            var _this$props4 = _this.props,
                choices = _this$props4.choices,
                input = _this$props4.input,
                limitChoicesToValue = _this$props4.limitChoicesToValue,
                inputValueMatcher = _this$props4.inputValueMatcher;


            var filteredChoices = choices.filter(function (choice) {
                return inputValueMatcher(chip, choice, _this.getSuggestionText);
            });

            var choice = filteredChoices.length === 1 ? filteredChoices[0] : filteredChoices.find(function (c) {
                return _this.getSuggestionValue(c) === chip;
            });

            if (choice) {
                return input.onChange([].concat(_toConsumableArray(_this.state.inputValue), [_this.getSuggestionValue(choice)]));
            }

            if (limitChoicesToValue) {
                // Ensure to reset the filter
                _this.updateFilter('');
                return;
            }

            input.onChange([].concat(_toConsumableArray(_this.state.inputValue), [chip]));
        }, _this.handleDelete = function (chip) {
            var input = _this.props.input;


            input.onChange(_this.state.inputValue.filter(function (value) {
                return value !== chip;
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
            var _this$props5 = _this.props,
                _this$props5$classes = _this$props5.classes,
                classes = _this$props5$classes === undefined ? {} : _this$props5$classes,
                suggestionComponent = _this$props5.suggestionComponent;


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
        }, _this.handleFocus = function () {
            var input = _this.props.input;

            input && input.onFocus && input.onFocus();
        }, _this.updateFilter = function (value) {
            var _this$props6 = _this.props,
                setFilter = _this$props6.setFilter,
                choices = _this$props6.choices;

            if (_this.previousFilterValue !== value) {
                if (setFilter) {
                    setFilter(value);
                } else {
                    _this.setState({
                        searchText: value,
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

    _createClass(AutocompleteArrayInput, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            this.setState({
                inputValue: this.props.input.value,
                suggestions: this.props.choices
            });
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            var _this2 = this;

            var choices = nextProps.choices,
                input = nextProps.input,
                inputValueMatcher = nextProps.inputValueMatcher;

            if (!isEqual(input.value, this.state.inputValue)) {
                this.setState({
                    inputValue: input.value,
                    dirty: false,
                    suggestions: this.props.choices
                });
                // Ensure to reset the filter
                this.updateFilter('');
            } else if (!isEqual(choices, this.props.choices)) {
                this.setState(function (_ref8) {
                    var searchText = _ref8.searchText;
                    return {
                        suggestions: choices.filter(function (suggestion) {
                            return inputValueMatcher(searchText, suggestion, _this2.getSuggestionText);
                        })
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
                    blurBehavior: 'add',
                    className: className,
                    classes: classes,
                    isRequired: isRequired,
                    label: label,
                    meta: meta,
                    onChange: this.handleChange,
                    resource: resource,
                    source: source,
                    value: searchText,
                    onFocus: this.handleFocus,
                    options: options
                }
            });
        }
    }]);

    return AutocompleteArrayInput;
}(React.Component);

AutocompleteArrayInput.propTypes = {
    allowEmpty: PropTypes.bool,
    alwaysRenderSuggestions: PropTypes.bool, // used only for unit tests
    choices: PropTypes.arrayOf(PropTypes.object),
    classes: PropTypes.object,
    className: PropTypes.string,
    InputProps: PropTypes.object,
    input: PropTypes.object,
    inputValueMatcher: PropTypes.func,
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
    translateChoice: PropTypes.bool.isRequired
};

AutocompleteArrayInput.defaultProps = {
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

export default compose(addField, translate, withStyles(styles))(AutocompleteArrayInput);
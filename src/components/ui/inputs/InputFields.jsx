import React, { useEffect, useMemo, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { X } from "lucide-react";

export const InputField = ({
    id,
    name,
    label,
    type = "text",
    placeholder = "",
    value = "",
    onChange,
    onClear,
    error = "",
    hint = "",
    required = false,
    disabled = false,
    readOnly = false,
    className = "",
    labelClassName = "",
    inputWrapperClassName = "",
    inputClassName = "",
    isClear = false,
    ...rest
}) => {
    const fieldId = id || name;
    const messageId = `${fieldId}-message`;

    const showClear =
        isClear &&
        Boolean(value) &&
        !disabled &&
        !readOnly &&
        typeof onChange === "function";

    const handleClear = () => {
        if (onClear) {
            onClear();
            return;
        }

        // Fallback: simulate input clear for controlled components
        if (onChange) {
            onChange({
                target: {
                    name: fieldId,
                    value: "",
                },
            });
        }
    };

    return (
        <div className={`form-field ${className}`}>
            {label && (
                <label
                    htmlFor={fieldId}
                    className={`form-title-label ${labelClassName}`}
                >
                    {label}
                    {required && <span className="form-required">*</span>}
                </label>
            )}

            <div className={`form-input-wrapper ${inputWrapperClassName}`}>
                <input
                    id={fieldId}
                    name={fieldId}
                    type={type}
                    className={`form-input ${error ? "is-error" : ""} ${inputClassName}`}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    disabled={disabled}
                    readOnly={readOnly}
                    aria-invalid={!!error}
                    aria-describedby={error || hint ? messageId : undefined}
                    {...rest}
                />

                {showClear && (
                    <button
                        type="button"
                        className="form-clear-btn"
                        onClick={handleClear}
                        aria-label="Clear input"
                    >
                        <X size={16} strokeWidth={2} />
                    </button>
                )}
            </div>

            {error ? (
                <span id={messageId} className="form-error">
                    {error}
                </span>
            ) : hint ? (
                <span id={messageId} className="form-hint">
                    {hint}
                </span>
            ) : null}
        </div>
    );
};

export const TextareaField = ({
    id,
    name,
    label,
    placeholder = "",
    value,
    onChange,
    error = "",
    hint = "",
    required = false,
    disabled = false,
    readOnly = false,
    rows = 4,
    className = "",
}) => {
    const idx = id || name;
    return (
        <div className={`form-field ${className}`}>
            {label && (
                <label htmlFor={id} className="form-title-label">
                    {label}
                    {required && <span className="form-required">*</span>}
                </label>
            )}

            <textarea
                id={idx}
                name={idx}
                rows={rows}
                className={`form-input form-textarea ${error ? "is-error" : ""}`}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                disabled={disabled}
                readOnly={readOnly}
            />

            {error ? (
                <span className="form-error">{error}</span>
            ) : hint ? (
                <span className="form-hint">{hint}</span>
            ) : null}
        </div>
    );
};

export const SelectField = ({
    id,
    name,
    label,
    options = [],
    value,
    onClear,
    onChange,
    placeholder,
    error = "",
    hint = "",
    required = false,
    disabled = false,
    readOnly = false,
    className = "",
    isClear = false,
    ...rest
}) => {
    const idx = id || name;

    const showClear =
        isClear &&
        Boolean(value) &&
        !disabled &&
        !readOnly &&
        typeof onChange === "function";

    const handleClear = () => {
        if (onClear) {
            onClear();
            return;
        }
        // Fallback: simulate input clear for controlled components
        if (onChange) {
            onChange({
                target: {
                    name: idx,
                    value: "",
                },
            });
        }
    };

    return (
        <div className={`form-field ${className}`}>
            {label && (
                <label htmlFor={idx} className="form-title-label">
                    {label}
                    {required && <span className="form-required">*</span>}
                </label>
            )}

            <div className="form-input-wrapper">
                <select
                    id={idx}
                    name={idx}
                    className={`form-input form-select ${
                        error ? "is-error" : ""
                    }`}
                    value={value || ""}
                    onChange={onChange}
                    disabled={disabled}
                    readOnly={readOnly}
                    aria-invalid={!!error}
                    {...rest}
                >
                    <option value="" disabled hidden>
                        {placeholder ?? `Select an ${label ?? "options"}`}
                    </option>

                    {options.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>
                {showClear && (
                    <button
                        type="button"
                        className="form-clear-btn"
                        onClick={handleClear}
                        aria-label="Clear input"
                    >
                        <X size={16} strokeWidth={2} />
                    </button>
                )}
            </div>

            {error ? (
                <span className="form-error">{error}</span>
            ) : hint ? (
                <span className="form-hint">{hint}</span>
            ) : null}
        </div>
    );
};

export const CheckboxGroupField = ({
    id,
    name,
    label,
    options = [],
    value = [], // array of selected values
    onChange,
    error = "",
    hint = "",
    required = false,
    disabled = false,
    readOnly = false,
    className = "",
    direction = "column", // "column" | "row"
}) => {
    const groupName = name || id;

    const handleCheckboxChange = (e) => {
        if (readOnly) {
            e.preventDefault();
            return;
        }

        const { checked, value: optionValue } = e.target;

        let updatedValues = [...value];

        if (checked) {
            updatedValues.push(optionValue);
        } else {
            updatedValues = updatedValues.filter(
                (item) => item !== optionValue,
            );
        }

        onChange?.(updatedValues, e);
    };

    return (
        <div className={`form-field ${className}`}>
            <fieldset className="form-fieldset">
                {label && (
                    <legend className="form-title-label form-legend">
                        {label}
                        {required && <span className="form-required">*</span>}
                    </legend>
                )}

                <div
                    className={`form-check-group ${direction === "row" ? "inline" : ""}`}
                >
                    {options.map((opt) => {
                        const optionId = `${groupName}-${opt.value}`;
                        const isChecked = value.includes(opt.value);
                        const isDisabled = disabled || opt.disabled;

                        return (
                            <label
                                key={opt.value}
                                htmlFor={optionId}
                                className={`form-check-option ${isDisabled ? "is-disabled" : ""}`}
                            >
                                <input
                                    id={optionId}
                                    name={groupName}
                                    type="checkbox"
                                    value={opt.value}
                                    checked={isChecked}
                                    onChange={handleCheckboxChange}
                                    disabled={isDisabled}
                                    className={`form-check-input form-checkbox ${
                                        error ? "is-error" : ""
                                    }`}
                                    aria-invalid={!!error}
                                />

                                <div className="form-check-content">
                                    <span className="form-check-label">
                                        {opt.label}
                                    </span>
                                    {opt.description && (
                                        <span className="form-check-description">
                                            {opt.description}
                                        </span>
                                    )}
                                </div>
                            </label>
                        );
                    })}
                </div>
            </fieldset>

            {error ? (
                <span className="form-error">{error}</span>
            ) : hint ? (
                <span className="form-hint">{hint}</span>
            ) : null}
        </div>
    );
};

export const RadioGroupField = ({
    id,
    name,
    label,
    options = [],
    value = "",
    onChange,
    error = "",
    hint = "",
    required = false,
    disabled = false,
    readOnly = false,
    className = "",
    direction = "column", // "column" | "row"
}) => {
    const groupName = name || id;

    const handleChange = (e) => {
        if (readOnly) {
            e.preventDefault();
            return;
        }

        onChange?.(e.target.value, e);
    };

    return (
        <div className={`form-field ${className}`}>
            <fieldset className="form-fieldset">
                {label && (
                    <legend className="form-title-label form-legend">
                        {label}
                        {required && <span className="form-required">*</span>}
                    </legend>
                )}

                <div
                    className={`form-check-group ${direction === "row" ? "inline" : ""}`}
                    role="radiogroup"
                    aria-invalid={!!error}
                    aria-required={required}
                >
                    {options.map((opt) => {
                        const optionId = `${groupName}-${opt.value}`;
                        const isDisabled = disabled || opt.disabled;

                        return (
                            <label
                                key={opt.value}
                                htmlFor={optionId}
                                className={`form-check-option ${isDisabled ? "is-disabled" : ""}`}
                            >
                                <input
                                    id={optionId}
                                    name={groupName}
                                    type="radio"
                                    value={opt.value}
                                    checked={value === opt.value}
                                    onChange={handleChange}
                                    disabled={isDisabled}
                                    className={`form-check-input form-radio ${
                                        error ? "is-error" : ""
                                    }`}
                                />

                                <div className="form-check-content">
                                    <span className="form-check-label">
                                        {opt.label}
                                    </span>
                                    {opt.description && (
                                        <span className="form-check-description">
                                            {opt.description}
                                        </span>
                                    )}
                                </div>
                            </label>
                        );
                    })}
                </div>
            </fieldset>

            {error ? (
                <span className="form-error">{error}</span>
            ) : hint ? (
                <span className="form-hint">{hint}</span>
            ) : null}
        </div>
    );
};

export const DateField = ({
    id,
    name,
    label,
    placeholder = "Select date",
    value = null,
    onChange,
    onClear,
    error = "",
    hint = "",
    required = false,
    disabled = false,
    readOnly = false,
    className = "",
    labelClassName = "",
    inputWrapperClassName = "",
    inputClassName = "",
    isClear = false,
    showIcon = false,
    dateFormat = "dd/MM/yyyy",
    minDate,
    maxDate,
    ...rest
}) => {
    const fieldId = id || name;
    const messageId = `${fieldId}-message`;

    const showClearBtn =
        isClear &&
        Boolean(value) &&
        !disabled &&
        !readOnly &&
        typeof onChange === "function";

    const handleDateChange = (date) => {
        if (onChange) {
            onChange({
                target: {
                    name: fieldId,
                    value: date,
                },
            });
        }
    };

    const handleClear = () => {
        if (onClear) {
            onClear();
            return;
        }

        handleDateChange(null);
    };

    return (
        <div className={`form-field ${className}`}>
            {label && (
                <label
                    htmlFor={fieldId}
                    className={`form-title-label ${labelClassName}`}
                >
                    {label}
                    {required && <span className="form-required">*</span>}
                </label>
            )}

            <div
                className={`form-input-wrapper date-field-wrapper ${inputWrapperClassName}`}
            >
                {showIcon && (
                    <span className="form-date-icon">
                        <CalendarDays size={16} strokeWidth={2} />
                    </span>
                )}

                <DatePicker
                    id={fieldId}
                    name={fieldId}
                    selected={value}
                    onChange={handleDateChange}
                    placeholderText={placeholder}
                    dateFormat={dateFormat}
                    disabled={disabled}
                    readOnly={readOnly}
                    minDate={minDate}
                    maxDate={maxDate}
                    autoComplete="off"
                    className={`form-input ${error ? "is-error" : ""} ${showIcon ? "has-icon" : ""} ${inputClassName}`}
                    aria-invalid={!!error}
                    aria-describedby={error || hint ? messageId : undefined}
                    wrapperClassName="date-picker-full"
                    {...rest}
                />

                {showClearBtn && (
                    <button
                        type="button"
                        className="form-clear-btn"
                        onClick={handleClear}
                        aria-label="Clear date"
                    >
                        <X size={16} strokeWidth={2} />
                    </button>
                )}
            </div>

            {error ? (
                <span id={messageId} className="form-error">
                    {error}
                </span>
            ) : hint ? (
                <span id={messageId} className="form-hint">
                    {hint}
                </span>
            ) : null}
        </div>
    );
};


export const DatalistField = ({
    id,
    name,
    label,
    options = [],
    value,
    onChange,
    onClear,
    onSelectOption, // <-- added
    placeholder,
    error = "",
    hint = "",
    required = false,
    disabled = false,
    readOnly = false,
    className = "",
    isClear = false,
    optionLabelKey = "label",
    optionValueKey = "value",
    noOptionsText = "No options found",
    ...rest
}) => {
    const idx = id || name;
    const wrapperRef = useRef(null);

    const [isOpen, setIsOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(-1);

    const normalizedOptions = useMemo(() => {
        return options.map((item, index) => {
            if (typeof item === "string") {
                return {
                    key: `${item}-${index}`,
                    label: item,
                    value: item,
                    raw: item,
                };
            }

            return {
                key: `${item?.[optionValueKey] ?? item?.value ?? index}-${index}`,
                label:
                    item?.[optionLabelKey] ??
                    item?.label ??
                    item?.value ??
                    "",
                value:
                    item?.[optionValueKey] ??
                    item?.value ??
                    item?.label ??
                    "",
                raw: item,
            };
        });
    }, [options, optionLabelKey, optionValueKey]);

    const filteredOptions = useMemo(() => {
        const search = String(value || "").trim().toLowerCase();

        if (!search) return normalizedOptions;

        return normalizedOptions.filter((item) => {
            const labelText = String(item.label || "").toLowerCase();
            const valueText = String(item.value || "").toLowerCase();
            return labelText.includes(search) || valueText.includes(search);
        });
    }, [normalizedOptions, value]);

    const showClear =
        isClear &&
        Boolean(value) &&
        !disabled &&
        !readOnly &&
        typeof onChange === "function";

    const handleEmitChange = (nextValue) => {
        if (typeof onChange === "function") {
            onChange({
                target: {
                    name: idx,
                    value: nextValue,
                },
            });
        }
    };

    const handleClear = () => {
        if (typeof onClear === "function") {
            onClear();
        } else {
            handleEmitChange("");
        }

        setIsOpen(false);
        setActiveIndex(-1);
    };

    const handleSelect = (selectedItem) => {
        handleEmitChange(selectedItem.value);

        if (typeof onSelectOption === "function") {
            onSelectOption(selectedItem.value, idx); 
            // 1st param = selected value
            // 2nd param = full selected option object
        }

        setIsOpen(false);
        setActiveIndex(-1);
    };

    const handleInputChange = (e) => {
        if (typeof onChange === "function") {
            onChange(e);
        }
        setIsOpen(true);
        setActiveIndex(-1);
    };

    const handleKeyDown = (e) => {
        if (disabled || readOnly) return;

        if (e.key === "ArrowDown") {
            e.preventDefault();
            if (!isOpen) setIsOpen(true);
            setActiveIndex((prev) => {
                if (!filteredOptions.length) return -1;
                return prev < filteredOptions.length - 1 ? prev + 1 : 0;
            });
        }

        if (e.key === "ArrowUp") {
            e.preventDefault();
            if (!isOpen) setIsOpen(true);
            setActiveIndex((prev) => {
                if (!filteredOptions.length) return -1;
                return prev > 0 ? prev - 1 : filteredOptions.length - 1;
            });
        }

        if (e.key === "Enter") {
            if (isOpen && activeIndex >= 0 && filteredOptions[activeIndex]) {
                e.preventDefault();
                handleSelect(filteredOptions[activeIndex]);
            }
        }

        if (e.key === "Escape") {
            setIsOpen(false);
            setActiveIndex(-1);
        }
    };

    const handleFocus = () => {
        if (!disabled && !readOnly) {
            setIsOpen(true);
        }
    };

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (!wrapperRef.current) return;
            if (!wrapperRef.current.contains(event.target)) {
                setIsOpen(false);
                setActiveIndex(-1);
            }
        };

        document.addEventListener("mousedown", handleOutsideClick);
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, []);

    return (
        <div className={`form-field ${className}`}>
            {label && (
                <label htmlFor={idx} className="form-title-label">
                    {label}
                    {required && <span className="form-required">*</span>}
                </label>
            )}

            <div className="form-input-wrapper" ref={wrapperRef}>
                <input
                    type="text"
                    id={idx}
                    name={idx}
                    className={`form-input ${error ? "is-error" : ""} ${showClear ? "has-clear" : ""}`}
                    value={value || ""}
                    onChange={handleInputChange}
                    onFocus={handleFocus}
                    onKeyDown={handleKeyDown}
                    placeholder={placeholder ?? `Choose or type ${label ?? "an option"}`}
                    disabled={disabled}
                    readOnly={readOnly}
                    aria-invalid={!!error}
                    aria-expanded={isOpen}
                    aria-autocomplete="list"
                    autoComplete="off"
                    {...rest}
                />

                {showClear && (
                    <button
                        type="button"
                        className="form-clear-btn"
                        onClick={handleClear}
                        aria-label="Clear input"
                    >
                        <X size={16} strokeWidth={2} />
                    </button>
                )}

                {isOpen && !disabled && !readOnly && (
                    <ul className="form-datalist-menu" role="listbox">
                        {filteredOptions.length > 0 ? (
                            filteredOptions.map((item, index) => (
                                <li
                                    key={item.key}
                                    className={`form-datalist-option ${activeIndex === index ? "active" : ""}`}
                                    onMouseDown={(e) => {
                                        e.preventDefault();
                                        handleSelect(item);
                                    }}
                                    role="option"
                                    aria-selected={String(value || "") === String(item.value)}
                                >
                                    <span className="form-datalist-option-label">
                                        {item.label}
                                    </span>

                                    {item.label !== item.value && (
                                        <span className="form-datalist-option-value">
                                            {item.value}
                                        </span>
                                    )}
                                </li>
                            ))
                        ) : (
                            <li className="form-datalist-empty">{noOptionsText}</li>
                        )}
                    </ul>
                )}
            </div>

            {error ? (
                <span className="form-error">{error}</span>
            ) : hint ? (
                <span className="form-hint">{hint}</span>
            ) : null}
        </div>
    );
};

export const InputBox = ({
    id,
    name,
    label,
    type = "text",
    placeholder = "",
    value = "",
    onChange,
    onClear,
    error = "",
    hint = "",
    required = false,
    disabled = false,
    readOnly = false,
    addOns,
    className = "",
    ...rest
}) => {
    const fieldId = id || name;
    const messageId = `${fieldId}-message`;

    return (
        <div className={`form-field ${className}`}>
            {label && (
                <label
                    htmlFor={fieldId}
                    className={`form-title-label`}
                >
                    {label}
                    {required && <span className="form-required">*</span>}
                </label>
            )}

            <div className="input-group">
                <input
                    id={fieldId}
                    name={fieldId}
                    type={type}
                    className={`form-control ${error ? "is-error" : ""}`}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    disabled={disabled}
                    readOnly={readOnly}
                    aria-invalid={!!error}
                    aria-describedby={error || hint ? messageId : undefined}
                    {...rest}
                />
               { addOns && <span className="input-group-text">{addOns}</span>}
            </div>
            {error ? (
                <span id={messageId} className="form-error">
                    {error}
                </span>
            ) : hint ? (
                <span id={messageId} className="form-hint">
                    {hint}
                </span>
            ) : null}
        </div>
    )
}
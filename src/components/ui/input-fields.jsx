import React, { forwardRef, useImperativeHandle } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PropTypes from "prop-types";
import clsx from "clsx";

/* ---------- InputField ---------- */
export const InputField = forwardRef(({
  label, type = "text", id, name,
  error, addOns, onChange, onClear,
  disabled, readOnly, placeholder,
  value, isClear = false, ...rest
}, ref) => {
    const idx = id || name;
    const messageId = `${idx}-message`;

    useImperativeHandle(ref, () => ({}));
    const handleClear = () => {
      if (onClear) {
        onClear();
        return;
      }
      if (onChange) {
        onChange({
          target: { name: idx, value: "" },
        });
      }
    };

    return (
      <div className="form-field">
        {label && (
          <label
            htmlFor={idx}
            className={clsx(`form-title-label`)}
          >
            {label}
          </label>
        )}

        <div className="form-input-wrapper">
          <div className="input-group flex-nowrap">
            <input
              type={type}
              id={idx}
              name={name || idx}
              className={clsx("form-input", error && "is-error")}
              placeholder={placeholder}
              value={value}
              onChange={onChange}
              disabled={disabled}
              readOnly={readOnly}
              {...rest}
            />
            {addOns &&
              (typeof addOns == "string" ? (
                <span className="input-group-text">{addOns}</span>
              ) : (
                { addOns }
              ))}
          </div>
          {isClear && (
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
        {error && <span id={messageId} className="form-error">{error}</span>}
      </div>
    );
  },
);


/* ---------- TextareaField ---------- */
export const TextareaField = forwardRef(({
  label, id, name, error, onChange,
  disabled, readOnly, placeholder,
  value, rows = 3, ...rest
}, ref) => {
    const idx = id || name;
    const messageId = `${idx}-message`;
    useImperativeHandle(ref, () => ({}));
    return (
      <div className="form-field">
        {label && (
          <label
            htmlFor={idx}
            className={clsx(`form-title-label`)}
          >
            {label}
          </label>
        )}
        <div className="form-input-wrapper">
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
            {...rest}
          />
        </div>
        {error && <span id={messageId} className="form-error">{error}</span>}
      </div>
    );
  },
);


/*------------- SelectField -------------- */
export const SelectField = forwardRef(({
  label, id, name, error, onChange,
  onClear, disabled, readOnly,
  placeholder, options, value,
  isClear = false, ...rest
}, ref) => {
    const idx = id || name;
    const messageId = `${idx}-message`;
    useImperativeHandle(ref, () => ({}));
    const handleClear = () => {
      if (onClear) {
        onClear();
        return;
      }
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
      <div className="form-field">
        {label && (
          <label
            htmlFor={idx}
            className={clsx(`form-title-label`)}
          >
            {label}
          </label>
        )}
        <div className="form-input-wrapper">
          <select
            id={idx}
            name={name || idx}
            className={clsx("form-input", error && "is-error")}
            value={value}
            onChange={onChange}
            disabled={disabled}
            readOnly={readOnly}
            {...rest}
          >
            <option value="" disabled hidden>
              {placeholder ?? `Select an ${label ?? "options"}`}
            </option>
            {(options ?? []).map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          {isClear && (
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
        {error && <span id={messageId} className="form-error">{error}</span>}
      </div>
    );
  },
);


/*------------- CheckBox -------------- */
export const CheckBox = forwardRef(({
  label, id, name, error, onChange,
  disabled, readOnly, value, ...rest
}, ref)=>{
    const idx = id || name;
    const messageId = `${idx}-message`;
    useImperativeHandle(ref, () => ({}));

    
    const handleChange = (e) => {
      if (readOnly || disabled) return;
      onChange?.(e);
    };

    return (
      <div className="form-field">
        <div className={`form-check`}>
          <input 
            className={clsx(
              `form-check-input form-checkbox`,
              error ? "is-error" : ""
            )} 
            type="checkbox" 
            value={value} 
            id={idx}
            name={idx}
            disabled={disabled}
            readOnly={readOnly}
            onChange={handleChange}
            {...rest}
          />
          <label className={clsx(`form-check-label`)} htmlFor={idx}>{label}</label>
        </div>
        {error && <span id={messageId} className="form-error">{error}</span>}
      </div>
    )
})


/*------------- CheckBoxGroup -------------- */
export const CheckBoxGroup = forwardRef(({
  label, name, id, options = [], value = [],
  error, onChange, disabled, readOnly,
  inline = true, className, ...rest
}, ref) => {
    const groupId = id || name;
    const messageId = error ? `${groupId}-message` : undefined;

    const handleChange = (optionValue) => (e) => {
      if (disabled || readOnly) return;

      let nextValue = Array.isArray(value) ? [...value] : [];

      if (e.target.checked) {
        if (!nextValue.includes(optionValue)) {
          nextValue.push(optionValue);
        }
      } else {
        nextValue = nextValue.filter((item) => item !== optionValue);
      }

      onChange?.(nextValue, e);
    };

    return (
      <div className={clsx("form-field", className)}>
        <fieldset
          className="form-fieldset"
          aria-invalid={!!error}
          aria-describedby={clsx({
            [messageId]: !!error,
          })}
        >
          {label && (
            <legend
              className={clsx("form-title-label form-legend")}
            >
              {label}
            </legend>
          )}

          <div className={clsx("form-check-group", inline && "inline")}>
            {(options ?? []).map((option, index) => {
              const optionId =
                option.id || `${groupId}-${String(option.value)}-${index}`;
              const isChecked = Array.isArray(value)
                ? value.includes(option.value)
                : false;

              const optionDisabled = disabled || option.disabled;

              return (
                <label
                  key={optionId}
                  htmlFor={optionId}
                  className={clsx(
                    "form-check-option",
                    optionDisabled && "is-disabled"
                  )}
                >
                  <input
                    ref={index === 0 ? ref : null}
                    id={optionId}
                    name={name}
                    type="checkbox"
                    className={clsx(
                      "form-check-input form-checkbox",
                      error && "is-error"
                    )}
                    value={option.value}
                    checked={isChecked}
                    disabled={optionDisabled}
                    onChange={handleChange(option.value)}
                    {...rest}
                  />

                  <span className="form-check-content">
                    <span className="form-check-label">{option.label}</span>

                    {option.description && (
                      <span className="form-check-description">
                        {option.description}
                      </span>
                    )}
                  </span>
                </label>
              );
            })}
          </div>
        </fieldset>
        {error && <span id={messageId} className="form-error">{error}</span>}
      </div>
    );
  }
);

/*------------- RadioGroup -------------- */
export const RadioGroup = forwardRef(({
  label, name, id, options = [], value,
  error, onChange, disabled, readOnly,
  inline = true, className, ...rest
}, ref) => {
    const groupId = id || name;
    const messageId = error ? `${groupId}-message` : undefined;

    const handleChange = (optionValue) => (e) => {
      if (disabled || readOnly) return;
      onChange?.(optionValue, e);
    };

    return (
      <div className={clsx("form-field", className)}>
        <fieldset className="form-fieldset" disabled={disabled}>
          {label && (
            <legend className={clsx("form-title-label form-legend", error && "error-label")}>
              {label}
            </legend>
          )}

          <div className={clsx("form-check-group", inline && "inline")}>
            {(options || []).map((option, index) => {
              const optionId =
                option.id || `${groupId}-${String(option.value)}-${index}`;
              const isChecked = value === option.value;
              const optionDisabled = disabled || option.disabled;

              return (
                <label
                  key={optionId}
                  htmlFor={optionId}
                  className={clsx(
                    "form-check-option",
                    optionDisabled && "is-disabled"
                  )}
                >
                  <input
                    ref={index === 0 ? ref : null}
                    id={optionId}
                    name={name}
                    type="radio"
                    className={clsx(
                      "form-check-input form-radio",
                      error && "is-error"
                    )}
                    value={option.value}
                    checked={isChecked}
                    disabled={optionDisabled}
                    onChange={handleChange(option.value)}
                    {...rest}
                  />

                  <span className="form-check-content">
                    <span className="form-check-label">{option.label}</span>

                    {option.description && (
                      <span className="form-check-description">
                        {option.description}
                      </span>
                    )}
                  </span>
                </label>
              );
            })}
          </div>
        </fieldset>
        {error && <span id={messageId} className="form-error">{error}</span>}
      </div>
    );
  }
);


/*------------- DateField -------------- */

export const DateField = forwardRef(({
  label, id, name, value,
  error, onChange, onClear,
  disabled = false, readOnly = false,
  placeholder = "Select date", dateFormat = "dd/MM/yyyy",
  minDate, maxDate, showClearButton = true,
  ...rest
}, ref) => {

  const idx = id || name || `date-field-${Math.random().toString(36).slice(2, 9)}`;
  const messageId = `${idx}-message`;

  useImperativeHandle(ref, () => ({}));


  const handleDateChange = (date) => {
    onChange?.(date);   // pass raw date
  };


  const handleClear = () => {
    if (onClear) {
      onClear();
      return;
    }
    handleDateChange(null);
  };

  return(
    <div className={clsx("form-field")}>
      {label && <label htmlFor={idx} className={clsx(`form-title-label`)}>{label}</label>}
      <div className="form-input-wrapper date-field-wrapper">
        <DatePicker 
          id={idx}
          name={idx}
          className={clsx(`form-input`, error && "is-error" )}
          selected={value}
          onChange={handleDateChange}
          placeholderText={placeholder}
          dateFormat={dateFormat}
          disabled={disabled}
          readOnly={readOnly}
          minDate={minDate}
          maxDate={maxDate}
          wrapperClassName="date-picker-full"
          {...rest}
        />
        
        {showClearButton && value && !disabled && !readOnly && (
          <button
            type="button"
            className="form-clear-btn"
            onClick={handleClear}
            aria-label={`Clear ${label || name || "date"}`}
          >
            ×
          </button>
        )}
      </div>
      {error && <span id={messageId} className="form-error">{error}</span>}
    </div>
  )

});


/* ---------- prop types ---------- */

const commonFieldPropTypes = {
  label: PropTypes.node,
  id: PropTypes.string,
  name: PropTypes.string,
  error: PropTypes.bool,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  value: PropTypes.oneOfType[(
    PropTypes.string, 
    PropTypes.number, 
    PropTypes.bool, 
    PropTypes.instanceOf(Date)
  )],
  placeholder: PropTypes.string,
  className: PropTypes.string,
};

InputField.PropTypes = {
  ...commonFieldPropTypes,
  type: PropTypes.string,
  addOns: PropTypes.oneOfType[(PropTypes.string, PropTypes.node)],
  isClear: PropTypes.bool,
  onClear: PropTypes.func,
};

TextareaField.PropTypes = {
  ...commonFieldPropTypes,
  rows: PropTypes.number,
};

SelectField.PropTypes = {
  ...commonFieldPropTypes,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      label: PropTypes.node.isRequired,
      value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.bool,
      ])
    })
  )
};

CheckBox.PropTypes = {
  ...commonFieldPropTypes,
}


CheckBoxGroup.PropTypes = {
  ...commonFieldPropTypes,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      label: PropTypes.node.isRequired,
      value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.bool,
      ])
    })
  ),
  inline: PropTypes.bool,
};


RadioGroup.PropTypes = {
  ...commonFieldPropTypes,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      label: PropTypes.node.isRequired,
      value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.bool,
      ])
    })
  ),
  inline: PropTypes.bool,
};


DateField.PropTypes = {
  ...commonFieldPropTypes,
  dateFormat: PropTypes.string,
  minDate: PropTypes.instanceOf(Date),
  maxDate: PropTypes.instanceOf(Date),
  showClearButton: PropTypes.bool,
  onClear: PropTypes.func,
};

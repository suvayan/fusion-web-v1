import PropTypes from "prop-types";
const btnVariants = {
    primary: "btn-primary",
    secondary: "btn-secondary",
    success: "btn-success",
    danger: "btn-danger",
    warning: "btn-warning",
    info: "btn-info",
    light: "btn-light",
    dark: "btn-dark",
};

const Button = ({
  type = "button",
  title,
  variant = "primary",
  valuePass,
  onClick,
  className = "",
  disabled = false,
  children,
}) => {
    const handleOnClick = () => {
        if (disabled || typeof onClick !== "function") return;

        if (valuePass === undefined) {
            onClick();
        } else {
            onClick(valuePass);
        }
    };

    return (
        <button
            type={type}
            className={`btn ${btnVariants[variant] || btnVariants.primary} ${className}`}
            onClick={handleOnClick}
            disabled={disabled}
            title={title}
        >
            {children || title}
        </button>
    );
};

Button.propTypes = {
    type: PropTypes.string,
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    variant: PropTypes.string,
    valuePass: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool, PropTypes.array,PropTypes.element]),
    onClick: PropTypes.func,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    children: PropTypes.node,
};

export default Button;
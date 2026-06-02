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

export const Button = ({
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

        if (valuePass !== undefined) {
            onClick(valuePass);
        } else {
            onClick();
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


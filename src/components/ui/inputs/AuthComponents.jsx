import React from 'react'

export const InputBox = React.forwardRef(({
    label,
    type="text",
    id,
    name,
    value,
    onChange,
    isShowPasswordToggle = false,
    error,
    showPassword,
    setShowPassword,
    ...props
}, ref) => {
    return (
        <div className="col-12">
            <label htmlFor={id} className="form-label">{label}</label>
            <div className="input-group">
                <input 
                    ref={ref}
                    type={showPassword ? "text" : type}
                    className={`form-control ${type === "password" && isShowPasswordToggle ? "border-end-0" : ""} ${error ? "is-invalid" : ""}`}
                    id={id}
                    name={name}
                    value={value}
                    placeholder={`Enter ${label}`}
                    onChange={onChange}
                    {...props}
                />
                {isShowPasswordToggle && (
                    <span
                        className="input-group-text bg-transparent border-start-0 cursor-pointer"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        <i className={showPassword ? "bx bx-show" : "bx bx-hide"} />
                    </span>
                )}
            </div>
            {error && <div className="invalid-feedback d-block">{error}</div>}
        </div>
    )
})


export const Button = ({
    label,
    type = "button",
    variant = "btn-primary",
    className = "",
    children,
    ...props
}) => {
    return (
        <button
            type={type}
            className={className ? `btn ${variant} ${className}` : `btn ${variant}`}
            {...props}
        >
            {label && label}
            {children && children}
        </button>
    )
}
import {MoveLeft} from "lucide-react";
import PropTypes from "prop-types";

const FormWrapper =({
    title,
    subtitle,
    isBack = false,
    backTitle,
    children,
    handleBack = () => {},
}) => {
    return (
        <div className="card border-0 shadow-sm form-card">
            <div className="card-body p-4 p-md-5">
                <div className="mb-4">
                    {title &&
                        (typeof title === "string" ? (
                            <h5 className="mb-1 fw-semibold text-dark form-card-title">
                                {title}
                            </h5>
                        ) : (
                            title
                        ))}

                    {subtitle && (
                        <p className="text-muted mb-0 form-card-sub-title">
                            {subtitle}
                        </p>
                    )}

                    {isBack && (
                        <button
                            type="button"
                            className="text-muted cursor-pointer d-flex align-items-center gap-2 border-0 bg-transparent p-0 mt-2"
                            onClick={handleBack}
                        >
                            <MoveLeft size={16} />
                            <span className="form-card-sub-title">
                                {backTitle ?? "Back"}
                            </span>
                        </button>
                    )}
                </div>

                {children}
            </div>
        </div>
    );
};

FormWrapper.propTypes = {
    title: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.node,
    ]),
    subtitle: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.node,
    ]),
    isBack: PropTypes.bool,
    backTitle: PropTypes.string,
    children: PropTypes.node,
    handleBack: PropTypes.func,
};

export default FormWrapper;


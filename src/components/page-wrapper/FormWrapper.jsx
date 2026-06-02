import {MoveLeft} from "lucide-react";

const FormWrapper = ({title, subtitle, isBack, backTitle, children, handleBack=()=>{}}) => {
    return (
        <div className="card border-0 shadow-sm form-card">
            <div className="card-body p-4 p-md-5">
                <div className="mb-4">
                    {title && <h5 className="mb-1 fw-semibold text-dark form-card-title">{title}</h5>}
                    {subtitle && <p className="text-muted mb-0 form-card-sub-title">{subtitle}</p>}
                    {isBack && (
                        <span className="text-muted cursor-pointer d-flex align-items-center gap-2" onClick={handleBack}>
                            <MoveLeft size={16} />
                            <span className="form-card-sub-title">{backTitle ?? "Back"}</span>
                        </span>
                    )}
                </div>
                {children}
            </div>
        </div>
    )
}

export default FormWrapper;
import { pageIcon } from "@/constants/page-icon";

const MainLayoutWrapper = ({  title, children,}) => {
    const icon = pageIcon?.[title] ?? "bx bx-file";

    return (
        <div className="page-wrapper">
            <div className="main-page">
                {/* Page Header */}
                <div className="page-header mb-3">
                    <div className="d-flex align-items-center justify-content-start gap-3">
                        <div className="page-header-icon">
                            <i className={icon}></i>
                        </div>
                        <div className="page-header-text">
                            <h4 className="page-title mb-0">{title}</h4>
                            <small className="page-subtitle">IIF Fusion {title}</small>
                        </div>
                    </div>
                </div>
            
                {/* Content */}
                {/* <div className="card border-0 shadow-sm radius-10 mb-4">
                    <div className="card-body p-4">
                        
                    </div>
                </div> */}
                {children}
            </div>
        </div>
    )
}

export default MainLayoutWrapper;
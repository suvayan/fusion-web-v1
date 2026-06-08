import PropTypes from "prop-types";

const AuthLayoutWrapper = ({ title, subtitle, children }) => {
    return (
        <div className="wrapper" style={{ minHeight: '100vh' }}>
            <div className="section-authentication d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
                <div className="container">
                    <div className="row row-cols-1 row-cols-lg-2 row-cols-xl-3">
                        <div className="col mx-auto">
                            <div className="card mb-0">
                                <div className="card-body">
                                    <div className="p-4">
                                        <div className="text-center mb-4">
                                            <h5 className="">{title || "Rocker Admin"}</h5>
                                            {subtitle && <p className="mb-0">{subtitle}</p>}
                                        </div>
                                        {children}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


AuthLayoutWrapper.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  subtitle: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  children: PropTypes.node,
};


export default AuthLayoutWrapper;
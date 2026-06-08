import React from 'react'
import AuthLayoutWrapper from '../../components/page-wrapper/AuthLayoutWrapper'

const ForgotPassword = () => {
    return (
        <AuthLayoutWrapper title="Forgot Password?" subtitle="Enter your registered email ID to reset the password">
            <div className="my-4">
                <label className="form-label">Email id</label>
                <input type="text" className="form-control" placeholder="example@user.com" />
            </div>
            <div className="d-grid gap-2">
                <button type="button" className="btn btn-primary">Send</button>
                <a href="auth-basic-signin.html" className="btn btn-light"><i className="bx bx-arrow-back me-1" />Back to Login</a>
            </div>
        </AuthLayoutWrapper>
    )
}


export default ForgotPassword;
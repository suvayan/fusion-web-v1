import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import { useForm } from "react-hook-form";
import authServices from "@/services/authServices";
import AuthLayoutWrapper from "@/components/page-wrapper/AuthLayoutWrapper";
// import { InputBox, Button } from "@/components/inputs/AuthComponents";
import {showToast} from "@/components/toastify/Toastify";
import {loadingToggling, setLoggedIn} from "@/slices/authSlice";
// import {setUser} from "@/slices/userSlice";

const Login = () => {
    // navigate
    const navigate = useNavigate();
    const location = useLocation();
    // dispatch
    const dispatch = useDispatch();
    // user state from redux store
    // const {loading} = useSelector(state => state.auth);

    // Get the page user was trying to access before login
    const from = location.state?.from?.pathname || "/";

    const {register, handleSubmit, formState: { errors }} = useForm({
        defaultValues: {
            userid: "",
            password: ""
        }
    })
    const [showPassword, setShowPassword] = useState(false);


    const signInHandler = async (data) => {
        try{
            dispatch(loadingToggling(true));
            const response = await authServices.login(data);
            if(response.success && response.status==="OK"){
                dispatch(setLoggedIn(true));
                // dispatch(setUser(response.data.user));
                navigate(from, { replace: true });
            }
        }catch(err){
            showToast.error(err.message);
        }finally{
            dispatch(loadingToggling(false));
        }
    }

    return (
        <AuthLayoutWrapper title="Fusion App" subtitle="Please log in to your account">
            <div className="form-body">
                {/* <form className="row g-3" onSubmit={handleSubmit(signInHandler)}>
                    <InputBox 
                        label="User ID"
                        id="userid"
                        name="userid"
                        {...register("userid", { 
                            required: "User ID is required",
                            minLength: {
                                value: 3,
                                message: "User ID must be at least 3 characters"
                            }
                        })}
                        error={errors.userid?.message}
                    />
                    <InputBox 
                        label="Password"
                        type="password"
                        id="password"
                        name="password"
                        {...register("password", { 
                            required: "Password is required",
                            minLength: {
                                value: 6,
                                message: "Password must be at least 6 characters"
                            }
                        })}
                        error={errors.password?.message}
                        isShowPasswordToggle={true}
                        showPassword={showPassword}
                        setShowPassword={setShowPassword}
                    />
                    <div className="col-12">
                        <div className="d-grid">
                            <Button 
                                type="submit" 
                                variant="btn-primary"
                                label={!loading && "Sign in"}
                                disabled={loading}
                            >
                                {loading && (
                                    <>
                                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                        Signing in...
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>
                </form> */}
            </div>
        </AuthLayoutWrapper>
    )
}


export default Login;
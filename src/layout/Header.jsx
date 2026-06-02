import "./Header.css";
import {useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch} from "react-redux";
import { useSidebar, useDropdown } from "@/hooks/useAppFunctionality";
import {setLoggedIn} from "@/slices/authSlice";
import {setUser, fetchUserDetails} from "@/slices/userSlice";
import authServices from "@/services/authServices";
import {showToast} from "@/components/toastify/Toastify";

const Header = () => {
    const navigate = useNavigate();
    const { handleMobileToggle } = useSidebar();
    const dropdown = useDropdown();
    const dispatch = useDispatch();
    const {user} = useSelector(state => state.user);
    
    useEffect(() => {
        dispatch(fetchUserDetails());
    }, [dispatch]);

    const handleLogout = async () => {
        try {
            const response = await authServices.logout();
            if(response.success && response.status==="OK"){
                dispatch(setLoggedIn(false));
                dispatch(setUser(null));
                navigate('/auth/login');
            }
        } catch (error) {
            showToast.error("Logout failed: " + error.message);
        }
    }

    const handleMobileToggleClick = () => {
        handleMobileToggle()
    }

    return (
        <header>
            <div className="topbar d-flex align-items-center">
                <nav className="navbar navbar-expand gap-3 w-100">
                    <div className="mobile-toggle-menu" onClick={handleMobileToggleClick}>
                        <i className='bx bx-menu'></i>
                    </div>                    
                    <div className="ms-auto">
                        <div className="user-box dropdown px-3 header-user-dropdown">
                            <a 
                                className="d-flex align-items-center nav-link dropdown-toggle gap-3 dropdown-toggle-nocaret" 
                                href="#" 
                                role="button" 
                                onClick={(e) => {
                                    e.preventDefault()
                                    dropdown.toggle()
                                }}
                                aria-expanded={dropdown.isOpen}
                            >
                                <div className="user-img d-flex align-items-center justify-content-center">
                                    <span className="user-initials">{user?.user_name?.charAt(0)}</span>
                                </div>
                                <div className="user-info">
                                    <p className="user-name mb-0">{user?.user_name}</p>
                                </div>
                            </a>
                            <ul className={`dropdown-menu dropdown-menu-end ${dropdown.isOpen ? 'show' : ''}`}>
                                {/* <li><a className="dropdown-item d-flex align-items-center" href="#"><i className="bx bx-user fs-5" /><span>Profile</span></a>
                                </li>
                                <li><a className="dropdown-item d-flex align-items-center" href="#"><i className="bx bx-cog fs-5" /><span>Settings</span></a>
                                </li>
                                <li><a className="dropdown-item d-flex align-items-center" href="/dashboard"><i className="bx bx-home-circle fs-5" /><span>Dashboard</span></a>
                                </li>
                                <li><a className="dropdown-item d-flex align-items-center" href="#"><i className="bx bx-dollar-circle fs-5" /><span>Earnings</span></a>
                                </li>
                                <li><a className="dropdown-item d-flex align-items-center" href="#"><i className="bx bx-download fs-5" /><span>Downloads</span></a>
                                </li>
                                <li>
                                    <div className="dropdown-divider mb-0" />
                                </li> */}
                                <li>
                                    <button 
                                        className="dropdown-item d-flex align-items-center logout-button" 
                                        onClick={handleLogout}
                                    >
                                        <i className="bx bx-log-out-circle" />
                                        <span>Logout</span>
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        </header>
    )
}

export default Header;
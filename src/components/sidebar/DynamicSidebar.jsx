import { Link, useLocation } from "react-router-dom";
import { pagesConfig } from "@/config/page-config";
import { useMetisMenu } from "@/hooks/useMetisMenu";
import { useSidebar } from "@/hooks/useAppFunctionality";

const DynamicSidebar = () => {
    const location = useLocation()
    const { isActive, isExpanded, toggleMenu, closeNonActiveMenus } = useMetisMenu(pagesConfig)
    const { isToggled, toggleSidebar, handleSidebarHover } = useSidebar()

    // Recursive function to render menu items
    const renderMenuItem = (item, level = 0) => {
        const hasChildren = item.children && item.children.length > 0
        const isCurrentActive = location.pathname === item.path
        const menuActive = isActive(item.id)
        const menuExpanded = isExpanded(item.id)

        if (hasChildren) {
            return (
                <li key={item.id} className={menuActive ? 'mm-active' : ''}>
                    <a
                        className={`has-arrow`}
                        href="#"
                        aria-expanded={menuExpanded}
                        onClick={(e) => {
                            e.preventDefault()
                            toggleMenu(item.id)
                        }}
                    >
                        {level > 0 ? (
                            <i className={item.icon}></i>
                        ) : (
                            <div className="parent-icon">
                                <i className={item.icon}></i>
                            </div>
                        )}
                        {level > 0 ? (
                            <span className="ms-2 sub-menu-title">{item.title}</span>
                        ) : (
                            <div className="menu-title">{item.title}</div>
                        )}
                    </a>
                    <ul className={menuExpanded ? 'mm-show' : 'mm-collapse'}>
                        {item.children.map(child => renderMenuItem(child, level + 1))}
                    </ul>
                </li>
            )
        }

        return (
            <li key={item.id} className={isCurrentActive ? 'mm-active' : ''}>
                <Link
                    to={item.path}
                    className={`d-flex align-items-center ${level > 0 ? '' : ''}`}
                    onClick={() => {
                        // Close non-active expanded menus when navigating to single menu
                        closeNonActiveMenus()

                        // Close mobile sidebar on navigation
                        if (window.innerWidth <= 768) {
                            // Add slight delay to allow navigation to complete
                            setTimeout(() => toggleSidebar(), 100)
                        }
                    }}
                >
                    {level > 0 ? (
                        <i className={item.icon}></i>
                    ) : (
                        <div className="parent-icon">
                            <i className={item.icon}></i>
                        </div>
                    )}
                    {level > 0 ? (
                        <span className="ms-2 sub-menu-title">{item.title}</span>
                    ) : (
                        <div className="menu-title">{item.title}</div>
                    )}
                </Link>
            </li>
        )
    }

    return (
        <div
            className="sidebar-wrapper"
            data-simplebar="true"
            onMouseEnter={() => handleSidebarHover(true)}
            onMouseLeave={() => handleSidebarHover(false)}
        >
            <div className="sidebar-header">
                <div className="sidebar-brand">
                    <div className="logo-badge">
                        <img src="/images/image.png" className="logo-icon" alt="logo icon" />
                    </div>

                    <div className="brand-text">
                        <h4 className="logo-text">IIF FUSION</h4>
                        <span className="logo-subtext">Admin Panel</span>
                    </div>
                </div>

                <button
                    type="button"
                    className="toggle-icon ms-auto"
                    onClick={toggleSidebar}
                    aria-label="Toggle sidebar"
                >
                    <i className={isToggled ? "bx bx-right-arrow-alt" : "bx bx-left-arrow-alt"} />
                </button>
            </div>
            <ul className="metismenu" id="menu">
                {pagesConfig.map(item => renderMenuItem(item))}
            </ul>
        </div>
    )
}

export default DynamicSidebar
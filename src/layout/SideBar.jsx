import React from "react";
import { Link } from "react-router-dom";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";

const SideBar = () => {
  return (
    <div className="sidebar-wrapper" data-simplebar="true">
      <div className="sidebar-header">
        <div>
          <img src="/images/logo-icon.png" className="logo-icon" alt="logo" />
        </div>
        <div>
          <h4 className="logo-text">Rocker</h4>
        </div>
        <div className="toggle-icon ms-auto">
          <i className="bx bx-arrow-back" />
        </div>
      </div>
       <SimpleBar style={{ maxHeight: '100vh' }}>
      <ul className="metismenu" id="menu">

        {/* Dashboard */}
        <li>
          <Link to="/dashboard">
            <div className="parent-icon">
              <i className="bx bx-home-alt"></i>
            </div>
            <div className="menu-title">Dashboard</div>
          </Link>
        </li>

        {/* Components */}
        <li>
          <a href="#" onClick={(e) => e.preventDefault()} className="has-arrow">
            <div className="parent-icon">
              <i className="bx bx-cube-alt"></i>
            </div>
            <div className="menu-title">Components</div>
          </a>
          <ul>
            <li><Link to="/components/buttons"><i className="bx bx-radio-circle"></i> Buttons</Link></li>
            <li><Link to="/components/forms"><i className="bx bx-radio-circle"></i> Forms</Link></li>
            <li><Link to="/components/tables"><i className="bx bx-radio-circle"></i> Tables</Link></li>
          </ul>
        </li>

        {/* MemberShip Management */}
        <li>
          <a href="#" onClick={(e) => e.preventDefault()} className="has-arrow">
            <div className="parent-icon">
              <i className="bx bx-group"></i>
            </div>
            <div className="menu-title">MemberShip Management</div>
          </a>
          <ul>
            <li><Link to="/memberShip-management/edit-member"><i className="bx bx-radio-circle"></i> Edit Member</Link></li>
            <li><Link to="/memberShip-management/cancel-memberShip"><i className="bx bx-radio-circle"></i> Cancel MemberShip</Link></li>
            <li><Link to="/memberShip-management/edit-ind-member"><i className="bx bx-radio-circle"></i> Edit ind. Member</Link></li>
          </ul>
        </li>

        {/* Examination Management */}
        <li>
          <a href="#" onClick={(e) => e.preventDefault()} className="has-arrow">
            <div className="parent-icon">
              <i className="bx bx-book"></i>
            </div>
            <div className="menu-title">Examination Management</div>
          </a>
          <ul>
            <li><Link to="/Examination-Management/Exiting-Student"><i className="bx bx-radio-circle"></i> Exiting Student</Link></li>
            <li><Link to="/Examination-Management/Search-Student"><i className="bx bx-radio-circle"></i> Search Student</Link></li>
            <li><Link to="/Examination-Management/Confirmation-Letter"><i className="bx bx-radio-circle"></i> Confirmation Letter</Link></li>
            <li><Link to="/Examination-Management/Admit-Card"><i className="bx bx-radio-circle"></i> Admit Card</Link></li>
            <li><Link to="/Examination-Management/Marks-Entry"><i className="bx bx-radio-circle"></i> Marks Entry</Link></li>
            <li><Link to="/Examination-Management/Result"><i className="bx bx-radio-circle"></i> Result</Link></li>
          </ul>
        </li>

        {/* Account Management */}
        <li>
          <a href="#" onClick={(e) => e.preventDefault()} className="has-arrow">
            <div className="parent-icon">
              <i className="bx bx-wallet"></i>
            </div>
            <div className="menu-title">Account Management</div>
          </a>
          <ul>
            <li><Link to="/Account-Management/Payment-Receive"><i className="bx bx-radio-circle"></i> Payment Receive</Link></li>
            <li><Link to="/Account-Management/Payment-Process"><i className="bx bx-radio-circle"></i> Payment Process</Link></li>
            <li><Link to="/Account-Management/Modify-Receipt"><i className="bx bx-radio-circle"></i> Modify Receipt</Link></li>
            <li><Link to="/Account-Management/Performance-Invoice"><i className="bx bx-radio-circle"></i> Performance Invoice</Link></li>
          </ul>
        </li>

        {/* Publication Management */}
        <li>
          <a href="#" onClick={(e) => e.preventDefault()} className="has-arrow">
            <div className="parent-icon">
              <i className="bx bx-book-content"></i>
            </div>
            <div className="menu-title">Publication Management</div>
          </a>
          <ul>
            <li><Link to="/Publication-Management/Postal-Registration"><i className="bx bx-radio-circle"></i> Postal Registration</Link></li>
            <li><Link to="/Publication-Management/Generate-issue"><i className="bx bx-radio-circle"></i> Generate Issue</Link></li>
          </ul>
        </li>

         {/* Reports*/}
        <li>
          <a href="#" onClick={(e) => e.preventDefault()} className="has-arrow">
            <div className="parent-icon">
              <i className="bx bx-book-content"></i>
            </div>
            <div className="menu-title">Reports</div>
          </a>
          <ul>
            <li><Link to="/Publication-Management/Postal-Registration"><i className="bx bx-radio-circle"></i> Membership Report</Link></li>
            <li><Link to="/Publication-Management/Generate-issue"><i className="bx bx-radio-circle"></i> Publication Report</Link></li>
          </ul>
        </li>

        {/* User Management */}
        <li>
          <a href="#" onClick={(e) => e.preventDefault()} className="has-arrow">
            <div className="parent-icon">
              <i className="bx bx-user"></i>
            </div>
            <div className="menu-title">User Management</div>
          </a>
          <ul>
            <li>
              <Link to="/user-management/user-roles">
                <i className="bx bx-radio-circle"></i> User Roles
              </Link>
            </li>
            <li>
              <Link to="/user-management/user-profile">
                <i className="bx bx-radio-circle"></i> User Profile
              </Link>
            </li>
          </ul>
        </li>

      </ul>
      </SimpleBar>
    </div>
  );
};

export default SideBar;
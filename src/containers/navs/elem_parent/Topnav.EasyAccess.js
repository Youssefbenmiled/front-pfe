import React from "react";
import { UncontrolledDropdown, DropdownToggle, DropdownMenu } from "reactstrap";
import { NavLink } from "react-router-dom";
import IntlMessages from "../../../helpers/IntlMessages";
// import "./app.css";

const TopnavEasyAccess = () => {
  return (
    <div className="position-relative d-none d-sm-inline-block">
      <UncontrolledDropdown className="dropdown-menu-right">


        <NavLink
          to={"/parent/chat"}
          location={{}}
          className="icon-menu-item m-0">

          <DropdownToggle className="header-icon m-0" color="empty">
            <i className="simple-icon-bubble d-block"
              style={{ fontSize: '22px' }} />
          </DropdownToggle>
        </NavLink>

      </UncontrolledDropdown>
    </div>
  );
};

export default TopnavEasyAccess;

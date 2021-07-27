import React from "react";
import { UncontrolledDropdown, DropdownToggle, DropdownMenu } from "reactstrap";
import { NavLink } from "react-router-dom";
import IntlMessages from "../../../helpers/IntlMessages";

const TopnavEasyAccess = ({ history }) => {
  return (
    <div className="position-relative d-inline-block">
      <UncontrolledDropdown className="dropdown-menu-right">
        <NavLink
          to={"/enseignant/gst_chat"}
          location={{}}
          className="icon-menu-item m-0">

          <DropdownToggle className="header-icon m-0" color="empty">
            <i className="simple-icon-bubble d-block"
              style={{ fontSize: '22px' }} />
          </DropdownToggle>
        </NavLink>

        {/*
        <DropdownMenu
          className="position-absolute mt-3"
          right
          id="iconMenuDropdown"
        >
          <NavLink to="/app/accueil" className="icon-menu-item">
            <i className="iconsminds-shop-4 d-block" />
            <IntlMessages id="Accueil" />
          </NavLink>

          <NavLink to="/app/res_mat" className="icon-menu-item">
            <i className="iconsminds-shop-4 d-block" />
            <IntlMessages id="Résultats" />
          </NavLink>

          <NavLink to="/app/consultation" className="icon-menu-item">
            <i className="iconsminds-pantone d-block" />{" "}
            <IntlMessages id="Consultation" />
          </NavLink>
          <NavLink to="/app/calendrier" className="icon-menu-item">
            <i className="iconsminds-bar-chart-4 d-block" />{" "}
            <IntlMessages id="Dates et" /> <IntlMessages id="heures" />
          </NavLink>
          <NavLink to="/app/chat" className="icon-menu-item">
            <i className="iconsminds-speach-bubble d-block" />{" "}
            <IntlMessages id="Chat" />
          </NavLink>
        </DropdownMenu>
               */}
      </UncontrolledDropdown>
    </div>
  );
};

export default TopnavEasyAccess;

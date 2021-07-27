import React from "react";
import { UncontrolledDropdown, DropdownToggle, DropdownMenu } from "reactstrap";
import { NavLink } from "react-router-dom";
import IntlMessages from "../../../helpers/IntlMessages";

const TopnavEasyAccess = () => {
  return (
    <div className="position-relative d-none d-sm-inline-block">
      {/*
      <UncontrolledDropdown className="dropdown-menu-right">
      <DropdownToggle className="header-icon" color="empty">
      <i className="simple-icon-grid" />
      </DropdownToggle>
      <DropdownMenu
          className="position-absolute mt-3"
          right
          id="iconMenuDropdown"
          >
          <NavLink to="/ecole/gst_ecole" className="icon-menu-item">
            <i className="iconsminds-shop-4 d-block" />
            <IntlMessages id="Gestion " /> <IntlMessages id="Ecole" />
            </NavLink>
          <NavLink to="/ecole/accueil" className="icon-menu-item">
          <i className="iconsminds-shop-4 d-block" />
            <IntlMessages id="Accueil" />
            </NavLink>
            
            <NavLink to="/ecole/gst_emplois" className="icon-menu-item">
            <i className="iconsminds-pantone d-block" />{" "}
            <IntlMessages id="Emplois" />
            </NavLink>
            <NavLink to="/ecole/organiser" className="icon-menu-item">
            <i className="iconsminds-bar-chart-4 d-block" />{" "}
            <IntlMessages id="Organiser" />
          </NavLink>
          <NavLink to="/ecole/notes" className="icon-menu-item">
          <i className="iconsminds-speach-bubble d-block" />{" "}
          <IntlMessages id="Notes" />
          </NavLink>
          <NavLink to="/ecole/confirmer" className="icon-menu-item">
            <i className="iconsminds-speach-bubble d-block" />{" "}
            <IntlMessages id="Confirmation " />{" "}
            <IntlMessages id="Administrative" />
            </NavLink>
            <NavLink to="/ecole/actualites" className="icon-menu-item">
            <i className="iconsminds-speach-bubble d-block" />{" "}
            <IntlMessages id="Actualites" />
            </NavLink>
        </DropdownMenu>
        </UncontrolledDropdown>
      */}
    </div>
  );
};

export default TopnavEasyAccess;

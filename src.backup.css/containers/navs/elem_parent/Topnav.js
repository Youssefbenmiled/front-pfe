import React, { Component } from "react";
import { injectIntl } from "react-intl";
import {
  UncontrolledDropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
  Input,
  ButtonDropdown,
} from "reactstrap";

import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import Select from "react-select";
import IntlMessages from "../../../helpers/IntlMessages";
import {
  setContainerClassnames,
  clickOnMobileMenu,
  logoutUser,
  changeLocale
} from "../../../redux/actions";

import {
  menuHiddenBreakpoint,
  searchPath,
  localeOptions,
  isDarkSwitchActive
} from "../../../constants/defaultValues";

import { MobileMenuIcon, MenuIcon } from "../../../components/svg";
import TopnavEasyAccess from "./Topnav.EasyAccess";
import TopnavNotifications from "./Topnav.Notifications";
import TopnavDarkSwitch from "./Topnav.DarkSwitch";
// import "./app.css";
import Modal from "./Modal";

import { getDirection, setDirection } from "../../../helpers/Utils";

class TopNav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalOpenParam: false,
      isInFullScreen: false,
    };
  }
  componentWillMount() {
    //this.getTuteurs();
    //api nab3athlou tuteur ya3tini l'eleves mte3ou
  }

  handleChangeLocale = (locale, direction) => {
    this.props.changeLocale(locale);

    const currentDirection = getDirection().direction;
    if (direction !== currentDirection) {
      setDirection(direction);
      setTimeout(() => {
        window.location.reload();
      }, 500);
    }
  };

  isInFullScreen = () => {
    return (
      (document.fullscreenElement && document.fullscreenElement !== null) ||
      (document.webkitFullscreenElement &&
        document.webkitFullscreenElement !== null) ||
      (document.mozFullScreenElement &&
        document.mozFullScreenElement !== null) ||
      (document.msFullscreenElement && document.msFullscreenElement !== null)
    );
  };


  toggleFullScreen = () => {
    const isInFullScreen = this.isInFullScreen();

    var docElm = document.documentElement;
    if (!isInFullScreen) {
      if (docElm.requestFullscreen) {
        docElm.requestFullscreen();
      } else if (docElm.mozRequestFullScreen) {
        docElm.mozRequestFullScreen();
      } else if (docElm.webkitRequestFullScreen) {
        docElm.webkitRequestFullScreen();
      } else if (docElm.msRequestFullscreen) {
        docElm.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
    this.setState({
      isInFullScreen: !isInFullScreen
    });
  };

  handleLogout = () => {
    this.props.logoutUser(this.props.history);
  };

  menuButtonClick = (e, menuClickCount, containerClassnames) => {
    e.preventDefault();

    setTimeout(() => {
      var event = document.createEvent("HTMLEvents");
      event.initEvent("resize", false, false);
      window.dispatchEvent(event);
    }, 350);
    this.props.setContainerClassnames(
      ++menuClickCount,
      containerClassnames,
      this.props.selectedMenuHasSubItems
    );
  };
  mobileMenuButtonClick = (e, containerClassnames) => {
    e.preventDefault();
    this.props.clickOnMobileMenu(containerClassnames);
  };
  toggleModalParam = () => {
    this.setState({
      modalOpenParam: !this.state.modalOpenParam
    });

  };
  render() {
    const { containerClassnames, menuClickCount, locale } = this.props;

    return (
      <nav className="navbar fixed-top">
        <div className="d-flex align-items-center navbar-left">
          <NavLink
            to="#"
            location={{}}
            className="menu-button d-none d-md-block"
            onClick={e =>
              this.menuButtonClick(e, menuClickCount, containerClassnames)
            }
          >
            <MenuIcon />
          </NavLink>



          <NavLink
            to="#"
            location={{}}
            className="menu-button-mobile d-xs-block d-sm-block d-md-none"
            onClick={e => this.mobileMenuButtonClick(e, containerClassnames)}
          >
            <MobileMenuIcon />
          </NavLink>
        </div>
        <Modal
          modalOpenParam={this.state.modalOpenParam}
          toggleModalParam={this.toggleModalParam}
          src={"/assets/img/tuteur.jpg"}
          username={""}
        />

        <div className="navbar-right">
          {isDarkSwitchActive && <TopnavDarkSwitch />}

          <div className="header-icons d-inline-block align-middle">

            <TopnavEasyAccess />
            <TopnavNotifications />
          </div>
          <span style={{ top: "10px" }}>
            <button
              className="header-icon btn btn-empty d-none d-sm-inline-block"
              type="button"
              id="fullScreenButton"
              onClick={this.toggleFullScreen}
            >
              {this.state.isInFullScreen ? (
                <i className="simple-icon-size-actual d-block" />
              ) : (
                  <i
                    className="simple-icon-size-fullscreen d-block"
                    style={{ top: "10px" }}
                  />
                )}
            </button>
          </span>

          <div className="user d-inline-block">
            <UncontrolledDropdown className="dropdown-menu-right">
              <DropdownToggle className="p-0" color="empty">
                <span className="name mr-1">Ben issa Karim</span>
                <span>
                  <img alt="Photo de profil" src="/assets/img/tuteur.jpg" />
                </span>
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem onClick={this.toggleModalParam}>Paramètres utilisateur</DropdownItem>
                <DropdownItem>Eleve1</DropdownItem>
                <NavLink to={"/parent/accueil"}
                  location={{}}>
                  <DropdownItem >Accueil</DropdownItem>
                </NavLink>
                <DropdownItem divider />
                <DropdownItem onClick={() => this.handleLogout()}>
                  Se Déconnecter{" "}
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = ({ menu, settings }) => {
  const { containerClassnames, menuClickCount, selectedMenuHasSubItems } = menu;
  const { locale } = settings;
  return {
    containerClassnames,
    menuClickCount,
    selectedMenuHasSubItems,
    locale
  };
};
export default injectIntl(
  connect(mapStateToProps, {
    setContainerClassnames,
    clickOnMobileMenu,
    logoutUser,
    changeLocale
  })(TopNav)
);
// handleSearchIconClick = e => {
//   if (window.innerWidth < menuHiddenBreakpoint) {
//     let elem = e.target;
//     if (!e.target.classList.contains("search")) {
//       if (e.target.parentElement.classList.contains("search")) {
//         elem = e.target.parentElement;
//       } else if (
//         e.target.parentElement.parentElement.classList.contains("search")
//       ) {
//         elem = e.target.parentElement.parentElement;
//       }
//     }

//     if (elem.classList.contains("mobile-view")) {
//       this.search();
//       elem.classList.remove("mobile-view");
//       this.removeEventsSearch();
//     } else {
//       elem.classList.add("mobile-view");
//       this.addEventsSearch();
//     }
//   } else {
//     this.search();
//   }
// };
// addEventsSearch = () => {
//   document.addEventListener("click", this.handleDocumentClickSearch, true);
// };
// removeEventsSearch = () => {
//   document.removeEventListener("click", this.handleDocumentClickSearch, true);
// };

// handleDocumentClickSearch = e => {
//   let isSearchClick = false;
//   if (
//     e.target &&
//     e.target.classList &&
//     (e.target.classList.contains("navbar") ||
//       e.target.classList.contains("simple-icon-magnifier"))
//   ) {
//     isSearchClick = true;
//     if (e.target.classList.contains("simple-icon-magnifier")) {
//       this.search();
//     }
//   } else if (
//     e.target.parentElement &&
//     e.target.parentElement.classList &&
//     e.target.parentElement.classList.contains("search")
//   ) {
//     isSearchClick = true;
//   }

//   if (!isSearchClick) {
//     const input = document.querySelector(".mobile-view");
//     if (input && input.classList) input.classList.remove("mobile-view");
//     this.removeEventsSearch();
//     this.setState({
//       searchKeyword: ""
//     });
//   }
// };
// handleSearchInputChange = e => {
//   this.setState({
//     searchKeyword: e.target.value
//   });
// };
// handleSearchInputKeyPress = e => {
//   if (e.key === "Enter") {
//     this.search();
//   }
// };

// search = () => {
//   this.props.history.push(searchPath + "/" + this.state.searchKeyword);
//   this.setState({
//     searchKeyword: ""
//   });
// };
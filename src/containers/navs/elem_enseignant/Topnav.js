import React, { Component } from "react";
import { injectIntl } from "react-intl";
import {
  UncontrolledDropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
  Input
} from "reactstrap";

import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

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
import axios from "axios";
import { MobileMenuIcon, MenuIcon } from "../../../components/svg";
import TopnavEasyAccess from "./Topnav.EasyAccess";
import TopnavNotifications from "./Topnav.Notifications";
import TopnavDarkSwitch from "./Topnav.DarkSwitch";
import Modal from "./Modal";
import { getDirection, setDirection } from "../../../helpers/Utils";

class TopNav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // isInFullScreen: false,
      modalOpenParam: false,
      data: []

    };
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
  componentWillMount() {
    try {
      axios
        .get("http://api.onyx.inedit-gd.tn/enseignant/get/" + parseInt(localStorage.getItem('user_id')))
        .then(res => res.data)
        .then(data => {
          this.setState({ data }, this.verifData(data));



        }, error => {
          return this.handleLogout();

        })
    } catch (error) {
      return this.handleLogout();
    }

  }







  verifData(ens) {




    if (parseInt(ens.id) != parseInt(localStorage.getItem('user_id')))
      return this.handleLogout();

    // if ((localStorage.getItem('user_role') && localStorage.getItem('user_role').toString().localeCompare(ens.roles.toString()) != 0))
    //   return this.handleLogout();

    if (ens.statut === "inactif" || ens.firstlogin === 0)
      return this.handleLogout();

    if ((localStorage.getItem('accueil') && localStorage.getItem('accueil').localeCompare('/enseignant/accueil') != 0))
      return this.handleLogout();


  }
  // isInFullScreen = () => {
  //   return (
  //     (document.fullscreenElement && document.fullscreenElement !== null) ||
  //     (document.webkitFullscreenElement &&
  //       document.webkitFullscreenElement !== null) ||
  //     (document.mozFullScreenElement &&
  //       document.mozFullScreenElement !== null) ||
  //     (document.msFullscreenElement && document.msFullscreenElement !== null)
  //   );
  // };

  // toggleFullScreen = () => {
  //   const isInFullScreen = this.isInFullScreen();

  //   var docElm = document.documentElement;
  //   if (!isInFullScreen) {
  //     if (docElm.requestFullscreen) {
  //       docElm.requestFullscreen();
  //     } else if (docElm.mozRequestFullScreen) {
  //       docElm.mozRequestFullScreen();
  //     } else if (docElm.webkitRequestFullScreen) {
  //       docElm.webkitRequestFullScreen();
  //     } else if (docElm.msRequestFullscreen) {
  //       docElm.msRequestFullscreen();
  //     }
  //   } else {
  //     if (document.exitFullscreen) {
  //       document.exitFullscreen();
  //     } else if (document.webkitExitFullscreen) {
  //       document.webkitExitFullscreen();
  //     } else if (document.mozCancelFullScreen) {
  //       document.mozCancelFullScreen();
  //     } else if (document.msExitFullscreen) {
  //       document.msExitFullscreen();
  //     }
  //   }
  //   this.setState({
  //     isInFullScreen: !isInFullScreen
  //   });
  // };

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
    const { messages } = this.props.intl;
    const { modalOpenParam, data } = this.state
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
          modalOpenParam={modalOpenParam}
          toggleModalParam={this.toggleModalParam}
          src={"/assets/img/ens.jpg"}
          data={data}
          handleLogout={this.handleLogout}
        />
        <div className="navbar-right">
          {isDarkSwitchActive && <TopnavDarkSwitch />}

          <div className="header-icons d-inline-block align-middle">
            <TopnavEasyAccess history={this.props.history} />
            <TopnavNotifications />
          </div>
          {/* <span className="mr-3">
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

                  />
                )}
            </button>
          </span> */}

          <div className="user d-inline-block">
            <UncontrolledDropdown className="dropdown-menu-right">
              <DropdownToggle className="p-0" color="empty">
                <span className="name mr-1">{data.nom + " " + data.prenom}</span>
                <span>
                  <img alt="Profile" src="/assets/img/ens.jpg" />
                </span>
              </DropdownToggle>
              <DropdownMenu right>
                <NavLink to={"/enseignant/accueil"}
                  location={{}}>
                  <DropdownItem >Accueil</DropdownItem>
                </NavLink>
                <DropdownItem onClick={this.toggleModalParam}>Paramètres utilisateur</DropdownItem>
                <DropdownItem divider />
                <DropdownItem onClick={() => this.handleLogout()}>
                  Se Déconnecter
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

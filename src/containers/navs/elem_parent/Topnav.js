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
import Modal from "./Modal";
import axios from "axios";

class TopNav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalOpenParam: false,
      data: null,
      eleve: null,
    };
  }
  componentWillMount() {
    try {
      axios
        .get("http://api.onyx.inedit-gd.tn/tuteur/get/" + parseInt(localStorage.getItem('user_id')))
        .then(res => res.data)
        .then(data => {
          this.setState({ data })


        }, error => {
          return this.handleLogout();

        })
    } catch (error) {
      return this.handleLogout();
    }
  }
  componentWillReceiveProps(nextProps) {
    try {
      axios
        .get("http://api.onyx.inedit-gd.tn/tuteur/get/" + parseInt(localStorage.getItem('user_id')))
        .then(res => res.data)
        .then(data => {
          this.verifData(data);


        }, error => {
          return this.handleLogout();

        })
    } catch (error) {
      return this.handleLogout();
    }

  }




  verifData(tuteur) {

    if (tuteur.statut === "inactif" || tuteur.firstlogin === 0) {
      return this.handleLogout();
    }

    if ((localStorage.getItem('accueil') && localStorage.getItem('accueil').localeCompare('/parent/accueil') != 0) || parseInt(tuteur.id) != parseInt(localStorage.getItem('user_id')))
      return this.handleLogout();


  }


  ChangeData = (id) => {
    // localStorage.setItem('eleve', JSON.stringify(JSON.parse(localStorage.getItem('eleves')).find(element => element.id === id)))
    this.setState({ eleve: this.state.data.eleves.find(eleve => parseInt(eleve.id) === parseInt(id)) })
    localStorage.setItem('id_eleve', id)

    window.location.reload();

  }


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
    const { data } = this.state;
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
          handleLogout={this.handleLogout}

        />

        <div className="navbar-right">
          {isDarkSwitchActive && <TopnavDarkSwitch />}

          <div className="header-icons d-inline-block align-middle">

            <TopnavEasyAccess />
            <TopnavNotifications />
          </div>


          <div className="user d-inline-block">
            <UncontrolledDropdown className="dropdown-menu-right">
              <DropdownToggle className="p-0" color="empty">
                <span className="name mr-1">{data && data.nom + " " + data.prenom}</span>
                <span>
                  <img alt="Photo de profil" src="/assets/img/tuteur.jpg" />
                </span>
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem onClick={this.toggleModalParam}>Paramètres utilisateur</DropdownItem>
                {
                  this.state.data &&
                  this.state.data.eleves.map(eleve => {
                    return (
                      <DropdownItem
                        key={eleve.id}
                        onClick={() => this.ChangeData(eleve.id)}
                      >
                        {eleve.Nom + " " + eleve.prenom + " " + eleve.classe.niveau + " " + eleve.classe.nom}
                      </DropdownItem>
                    )
                  })
                }
                <NavLink to={"/parent/accueil"}
                  location={{}}>
                  <DropdownItem >Accueil</DropdownItem>
                </NavLink>
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
{/* [
                  { "id": 50, "Nom": "ali", "prenom": "Ben salah", "dateNaissance": "1997-12-24T00:00:00+01:00", "sexe": "Masculin", "classe": { "id": 32, "niveau": "2", "eleve": [49, { "id": 50, "Nom": "aaaaaaaa", "prenom": "aaaaaaaaa", "dateNaissance": "2020-07-03T00:00:00+02:00", "sexe": "Masculin", "classe": 32, "tuteurs": [], "notes": [] }, { "id": 51, "Nom": "eeee", "prenom": "eeeeeeeee", "dateNaissance": "2020-06-17T00:00:00+02:00", "sexe": "Masculin", "classe": 32, "tuteurs": [], "notes": [] }, { "id": 52, "Nom": "ddddddddddddd", "prenom": "ddddddddddddd", "dateNaissance": "2020-06-09T00:00:00+02:00", "sexe": "Masculin", "classe": 32, "tuteurs": [], "notes": [] }], "enseignants": [{ "id": 27, "nom": "aaaaa", "prenom": "aaaaaaaaaa", "email": "bilelbho94@gmail.com", "adresse": "tuniss", "numTel": 58233463, "password": "7befb69ce7e974ec191aa5a58e76d7d7", "statut": "actif", "roles": "ENS", "token": "aa814a8138179e56487b75e968082796", "firstlogin": 1, "classe": [32], "domaine": [{ "id": 18, "niveau": 2, "nom": "francais", "enseignants": [27] }] }], "nom": "A", "exams": [], "evenements": [{ "id": 11, "titre": "piscine", "image": "https://127.0.0.1:8000/uploads/event/b798abe6e1b1318ee36b0dcb3fb9e4d3-5ee09be9a9032.jpeg", "dateDebut": "2020-12-23T00:00:00+01:00", "dateFin": "2020-12-23T00:00:00+01:00", "lieu": "megrine", "description": "abc", "url": "https://127.0.0.1:8000/uploads/event/8c7dd922ad47494fc02c388e12c00eac-5ee09be9a111d.pdf", "type": "privé", "Classe": [32] }], "travailAfaires": [], "evaluations": [], "__initializer__": null, "__cloner__": null, "__isInitialized__": true }, "tuteurs": [{ "id": 18, "nom": "ghassen", "prenom": "riahi", "email": "ghassenr44iahi190@gmail.com", "adresse": "tunis", "numTel": "27143939", "password": "dvPM2cyh", "statut": "inactif", "roles": "TUTEUR", "token": "d84b3b60ab2af6e76303655a900d9bb3", "firstlogin": 1, "eleves": [49] }, 19, { "id": 20, "nom": "bilel", "prenom": "ben houssine", "email": "bilelbho94@gmail.com", "adresse": "tunis", "numTel": "78547855", "password": "7623208f410208cb01ce534002324154", "statut": "actif", "roles": "TUTEUR", "token": "076b25c32126e5bfb20898afa3eaebf3", "firstlogin": 0, "eleves": [49] }, { "id": 23, "nom": "ali", "prenom": "ben salah", "email": "aliben_salah@gmail.com", "adresse": "tunis", "numTel": "22527466", "password": "48d6f50909b58cacf9c95e16e7cb199a", "statut": "actif", "roles": "TUTEUR", "token": "06fc6a0b0e2318002b158dbe8af39566", "firstlogin": 0, "eleves": [49] }], "notes": [] },
                  { "id": 51, "Nom": "feth", "prenom": "Ben sami", "dateNaissance": "1997-12-24T00:00:00+01:00", "sexe": "Masculin", "classe": { "id": 32, "niveau": "2", "eleve": [49, { "id": 50, "Nom": "aaaaaaaa", "prenom": "aaaaaaaaa", "dateNaissance": "2020-07-03T00:00:00+02:00", "sexe": "Masculin", "classe": 32, "tuteurs": [], "notes": [] }, { "id": 51, "Nom": "eeee", "prenom": "eeeeeeeee", "dateNaissance": "2020-06-17T00:00:00+02:00", "sexe": "Masculin", "classe": 32, "tuteurs": [], "notes": [] }, { "id": 52, "Nom": "ddddddddddddd", "prenom": "ddddddddddddd", "dateNaissance": "2020-06-09T00:00:00+02:00", "sexe": "Masculin", "classe": 32, "tuteurs": [], "notes": [] }], "enseignants": [{ "id": 27, "nom": "aaaaa", "prenom": "aaaaaaaaaa", "email": "bilelbho94@gmail.com", "adresse": "tuniss", "numTel": 58233463, "password": "7befb69ce7e974ec191aa5a58e76d7d7", "statut": "actif", "roles": "ENS", "token": "aa814a8138179e56487b75e968082796", "firstlogin": 1, "classe": [32], "domaine": [{ "id": 18, "niveau": 2, "nom": "francais", "enseignants": [27] }] }], "nom": "A", "exams": [], "evenements": [{ "id": 11, "titre": "piscine", "image": "https://127.0.0.1:8000/uploads/event/b798abe6e1b1318ee36b0dcb3fb9e4d3-5ee09be9a9032.jpeg", "dateDebut": "2020-12-23T00:00:00+01:00", "dateFin": "2020-12-23T00:00:00+01:00", "lieu": "megrine", "description": "abc", "url": "https://127.0.0.1:8000/uploads/event/8c7dd922ad47494fc02c388e12c00eac-5ee09be9a111d.pdf", "type": "privé", "Classe": [32] }], "travailAfaires": [], "evaluations": [], "__initializer__": null, "__cloner__": null, "__isInitialized__": true }, "tuteurs": [{ "id": 18, "nom": "ghassen", "prenom": "riahi", "email": "ghassenr44iahi190@gmail.com", "adresse": "tunis", "numTel": "27143939", "password": "dvPM2cyh", "statut": "inactif", "roles": "TUTEUR", "token": "d84b3b60ab2af6e76303655a900d9bb3", "firstlogin": 1, "eleves": [49] }, 19, { "id": 20, "nom": "bilel", "prenom": "ben houssine", "email": "bilelbho94@gmail.com", "adresse": "tunis", "numTel": "78547855", "password": "7623208f410208cb01ce534002324154", "statut": "actif", "roles": "TUTEUR", "token": "076b25c32126e5bfb20898afa3eaebf3", "firstlogin": 0, "eleves": [49] }, { "id": 23, "nom": "ali", "prenom": "ben salah", "email": "aliben_salah@gmail.com", "adresse": "tunis", "numTel": "22527466", "password": "48d6f50909b58cacf9c95e16e7cb199a", "statut": "actif", "roles": "TUTEUR", "token": "06fc6a0b0e2318002b158dbe8af39566", "firstlogin": 0, "eleves": [49] }], "notes": [] },
                  { "id": 49, "Nom": "Youssef", "prenom": "Ben miled", "dateNaissance": "1997-12-24T00:00:00+01:00", "sexe": "Masculin", "classe": { "id": 32, "niveau": "2", "eleve": [49, { "id": 50, "Nom": "aaaaaaaa", "prenom": "aaaaaaaaa", "dateNaissance": "2020-07-03T00:00:00+02:00", "sexe": "Masculin", "classe": 32, "tuteurs": [], "notes": [] }, { "id": 51, "Nom": "eeee", "prenom": "eeeeeeeee", "dateNaissance": "2020-06-17T00:00:00+02:00", "sexe": "Masculin", "classe": 32, "tuteurs": [], "notes": [] }, { "id": 52, "Nom": "ddddddddddddd", "prenom": "ddddddddddddd", "dateNaissance": "2020-06-09T00:00:00+02:00", "sexe": "Masculin", "classe": 32, "tuteurs": [], "notes": [] }], "enseignants": [{ "id": 27, "nom": "aaaaa", "prenom": "aaaaaaaaaa", "email": "bilelbho94@gmail.com", "adresse": "tuniss", "numTel": 58233463, "password": "7befb69ce7e974ec191aa5a58e76d7d7", "statut": "actif", "roles": "ENS", "token": "aa814a8138179e56487b75e968082796", "firstlogin": 1, "classe": [32], "domaine": [{ "id": 18, "niveau": 2, "nom": "francais", "enseignants": [27] }] }], "nom": "A", "exams": [], "evenements": [{ "id": 11, "titre": "piscine", "image": "https://127.0.0.1:8000/uploads/event/b798abe6e1b1318ee36b0dcb3fb9e4d3-5ee09be9a9032.jpeg", "dateDebut": "2020-12-23T00:00:00+01:00", "dateFin": "2020-12-23T00:00:00+01:00", "lieu": "megrine", "description": "abc", "url": "https://127.0.0.1:8000/uploads/event/8c7dd922ad47494fc02c388e12c00eac-5ee09be9a111d.pdf", "type": "privé", "Classe": [32] }], "travailAfaires": [], "evaluations": [], "__initializer__": null, "__cloner__": null, "__isInitialized__": true }, "tuteurs": [{ "id": 18, "nom": "ghassen", "prenom": "riahi", "email": "ghassenr44iahi190@gmail.com", "adresse": "tunis", "numTel": "27143939", "password": "dvPM2cyh", "statut": "inactif", "roles": "TUTEUR", "token": "d84b3b60ab2af6e76303655a900d9bb3", "firstlogin": 1, "eleves": [49] }, 19, { "id": 20, "nom": "bilel", "prenom": "ben houssine", "email": "bilelbho94@gmail.com", "adresse": "tunis", "numTel": "78547855", "password": "7623208f410208cb01ce534002324154", "statut": "actif", "roles": "TUTEUR", "token": "076b25c32126e5bfb20898afa3eaebf3", "firstlogin": 0, "eleves": [49] }, { "id": 23, "nom": "ali", "prenom": "ben salah", "email": "aliben_salah@gmail.com", "adresse": "tunis", "numTel": "22527466", "password": "48d6f50909b58cacf9c95e16e7cb199a", "statut": "actif", "roles": "TUTEUR", "token": "06fc6a0b0e2318002b158dbe8af39566", "firstlogin": 0, "eleves": [49] }], "notes": [] }
                ] */}
// handleChangeLocale = (locale, direction) => {
//   this.props.changeLocale(locale);

//   const currentDirection = getDirection().direction;
//   if (direction !== currentDirection) {
//     setDirection(direction);
//     setTimeout(() => {
//       window.location.reload();
//     }, 500);
//   }
// };

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
{/* <span style={{ top: "10px" }}>
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
          </span> */}
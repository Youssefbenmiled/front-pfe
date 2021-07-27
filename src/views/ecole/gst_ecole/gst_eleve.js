import React, { Component, Fragment } from "react";
import { Row, Card, CardBody, CardTitle, Table, Label } from "reactstrap";
import IntlMessages from "../../../helpers/IntlMessages";
import { Colxx, Separator } from "../../../components/common/CustomBootstrap";
import Breadcrumb from "../../../containers/navs/elem_parent/Breadcrumb";
// import "./table.css";
import axios from "axios";
import { levelselv } from "../../../constants/defaultValues";
import Select from "react-select";
import DataListView from "../../../containers/ecole/gestion_eleve/DataListView";
import Pagination from "../../../containers/Pagination";
import ContextMenuContainer from "../../../containers/ContextMenuContainer";
import ListPageHeading from "../../../containers/ecole/gestion_eleve/ListPageHeading";
import AddNewModal from "../../../containers/ecole/gestion_eleve/AddNewModal";
import UpdateModal from "../../../containers/ecole/gestion_eleve/UpdateModal";
import DeleteModal from "../../../containers/ecole/gestion_eleve/DeleteModal";
import Modal from "../../../containers/ecole/gestion_eleve/Modal";
import {
  logoutUser,
} from "../../../redux/actions";
import { Route, withRouter, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
function collect(props) {
  return { data: props.data };
}

class gst_eleve extends Component {
  constructor(props) {
    super(props);
    this.mouseTrap = require("mousetrap");

    this.state = {
      displayMode: "list",

      selectedPageSize: 10,
      orderOptions: [
        { column: "id", label: "Identifiant" },
        { column: "nom", label: "Nom" },
        { column: "prenom", label: "Prénom" },
        { column: "niveau", label: "Niveau" },
      ],
      orderOptions2: [
        { column: "id", label: "Identifiant" },
        { column: "nom", label: "Nom" },
        { column: "prenom", label: "Prénom" },
      ],
      pageSizes: [1, 2, 5, 10, 20, 30, 50, 100],




      selectedOrderOption: { column: "niveau", label: "Niveau" },
      selectedOrderOption2: { column: "nom", label: "Nom" },


      modalOpen: false,
      modalOpenUpdate: false,
      modalOpenDelete: false,
      currentPage: 1,
      totalItemCount: 0,
      totalPage: 1,
      search: "",
      selectedItems: [],
      isLoading: true,
      elevet: [],
      eleve: [],
      valueNiveau: { label: "Tous les niveaux", value: "*" },
      valueClasse: null,
      items: [],
      modalOpenVoir: false,
      classet: []

    };
  }
  componentWillMount() {
    try {
      axios
        .get("http://api.onyx.inedit-gd.tn/admins/get/" + parseInt(localStorage.getItem('user_id')))
        .then(res => res.data)
        .then(data => {
          if (data.roles.includes('ROLE_GESTION_ECOLE'))
            this.dataListRender();
          else
            this.props.history.push('/ecole/accueil');
        });
    } catch (error) {
      return error;
    }
  }



  changeOrderBy = column => {
    if (this.state.classe) {
      this.setState(
        {
          selectedOrderOption2: this.state.orderOptions2.find(
            x => x.column === column
          )
        },
        () => this.dataListRender()
      );
    }
    else {
      this.setState(
        {
          selectedOrderOption: this.state.orderOptions.find(
            x => x.column === column
          )
        },
        () => this.dataListRender()
      );
    }
  };
  changePageSize = size => {
    this.setState(
      {
        selectedPageSize: size,
        currentPage: 1
      },
      () => this.dataListRender()
    );
  };
  changeDisplayMode = mode => {
    this.setState({
      displayMode: mode
    });
    return false;
  };
  onChangePage = page => {
    this.setState(
      {
        currentPage: page
      },
      () => this.dataListRender()
    );
  };

  onSearchKey = e => {
    this.setState(
      {
        search: e.target.value.toLowerCase()
      },
      () => this.dataListRender()
    );

  };

  onCheckItem = (event, id) => {

    let selectedItems = this.state.selectedItems;
    if (selectedItems.includes(id)) {
      selectedItems = selectedItems.filter(x => x !== id);
    } else {
      selectedItems.push(id);
    }
    this.setState({
      selectedItems
    });

  }

  // getIndex(value, arr, prop) {
  //   for (var i = 0; i < arr.length; i++) {
  //     if (arr[i][prop] === value) {
  //       return i;
  //     }
  //   }
  //   return -1;
  // }
  // handleChangeSelectAll = isToggle => {
  //   if (this.state.selectedItems.length >= this.state.items.length) {
  //     if (isToggle) {
  //       this.setState({
  //         selectedItems: []
  //       });
  //     }
  //   } else {
  //     this.setState({
  //       selectedItems: this.state.items.map(x => x.id)
  //     });
  //   }
  //   document.activeElement.blur();
  //   return false;
  // };



  onContextMenuClick = (e, data, target) => {
    if (data.action === "details") {
      this.toggleModalVoir()
    } else if (data.action === "edit") {
      this.toggleModalUpdate()
    } else if (data.action === "delete") {
      this.toggleModalDelete();
    }
  };

  onContextMenu = (e, data) => {
    const clickedProductId = data.data;
    if (!this.state.selectedItems.includes(clickedProductId)) {
      this.setState({
        selectedItems: [clickedProductId]
      });
    }

    return true;
  };


  setEleve = eleve => {
    this.setState({ eleve });
  };


  classes(niveau) {
    try {
      axios
        .get(
          "http://api.onyx.inedit-gd.tn/classe/classe/" + niveau)
        .then(res => {
          return res.data;
        })
        .then(data => {
          this.setState({
            classet: data,

          });
        }, error => {
          return error;
        });
    }
    catch (error) {
      return error;
    }
  }
  handleChangeNiveau = value => {
    this.setState({
      valueNiveau: value,
      valueClasse: null,
      items: [],
      selectedItems: []
    }, this.dataListRender);

  };
  handleChangeClasse = value => {
    this.setState({
      valueClasse: value,
      selectedItems: []
    }, this.dataListRender);

  };



  toggleModalVoir = () => {
    this.setState({
      modalOpenVoir: !this.state.modalOpenVoir
    });
  };


  toggleModal = () => {
    this.setState({
      modalOpen: !this.state.modalOpen
    });
  };
  toggleModalUpdate = () => {
    this.setState({
      modalOpenUpdate: !this.state.modalOpenUpdate
    });
  };
  toggleModalDelete = () => {
    this.setState({
      modalOpenDelete: !this.state.modalOpenDelete
    });
  };




  dataListRender() {
    const {
      selectedPageSize,
      currentPage,
      selectedOrderOption,
      selectedOrderOption2,
      search,
      valueClasse,
      valueNiveau
    } = this.state;

    if (valueNiveau.value !== "*" && !valueClasse && valueNiveau.value !== "!") {
      this.classes(valueNiveau.value)
      this.setState({ items: [] });
      return;
    }
    var query = "http://api.onyx.inedit-gd.tn/eleve/getAll?";
    query += "count=" + selectedPageSize
    query += "&page=" + currentPage
    query += "&search=" + search;

    if (valueClasse && valueClasse.value) {
      query += "&classe=" + valueClasse.value
      query += "&order=" + selectedOrderOption2.column

    }
    else {
      query += "&order=" + selectedOrderOption.column

    }

    try {
      axios
        .get(query)
        .then(res => {
          return res.data;
        })
        .then(data => {
          this.setState({
            totalItemCount: data.count,
            totalPage: Math.ceil(data.count / selectedPageSize),
            items: data.list,
            selectedItems: [],
            isLoading: false
          });
        }, error => {
          return error;
        });
    }
    catch (error) {
      return error;
    }
  }
  setST = () => {
    this.setState({ selectedItems: [] })
  }

  handleLogout = () => {
    this.props.logoutUser(this.props.history);
  };

  render() {


    const classet = this.state.classet.map((classe, i) => {
      return { label: classe.Nom, value: classe.id };
    })
    const {
      currentPage,
      items,
      displayMode,
      selectedPageSize,
      totalItemCount,
      selectedOrderOption,
      selectedOrderOption2,
      selectedItems,
      orderOptions,
      orderOptions2,
      pageSizes,
      modalOpen,
      modalOpenUpdate,
      modalOpenDelete,
      modalOpenVoir,

      valueNiveau,
      valueClasse
    } = this.state;
    const { match } = this.props;
    const startIndex = (currentPage - 1) * selectedPageSize;
    const endIndex = currentPage * selectedPageSize;

    return this.state.isLoading ? (
      <div className="loading" />
    ) : (
        <Fragment>

          <Label>
            <h3>Niveau :</h3>
          </Label>
          <Select
            onChange={this.handleChangeNiveau}
            value={valueNiveau}
            options={levelselv}
            className="react-select"
            placeholder="Sélectionner le niveau..."
            classNamePrefix="react-select"
            name="form-field-name"
            required
          />

          {valueNiveau.value !== "*" && valueNiveau.value !== "!" &&
            <>
              <br></br>
              <Label>
                <h3>Classe :</h3>
              </Label>
              <Select
                onChange={this.handleChangeClasse}
                value={valueClasse}
                options={classet}
                className="react-select"
                placeholder="Sélectionner une classe..."
                classNamePrefix="react-select"
                name="form-field-name"
                errorMessage="Vous devez sélectionner une classe"
                required
              />
              <br></br>
            </>
          }

          <div className="disable-text-selection">
            <br></br>
            {(valueNiveau.value === "*") || (valueClasse) || (valueNiveau.value === "!") ?
              <ListPageHeading
                heading={valueClasse && items.length > 0 ? "Liste des éléves de la classe " + valueNiveau.value + "" + valueClasse.label : valueNiveau.value === "*" && items.length > 0 ? "Tous les éléves" : "aucun éléve"}
                displayMode={displayMode}
                changeDisplayMode={this.changeDisplayMode}
                changeOrderBy={this.changeOrderBy}
                changePageSize={this.changePageSize}
                selectedPageSize={selectedPageSize}
                totalItemCount={totalItemCount}
                selectedOrderOption={valueClasse ? selectedOrderOption2 : selectedOrderOption}
                match={match}
                startIndex={startIndex}
                endIndex={endIndex}
                selectedItemsLength={selectedItems ? selectedItems.length : 0}
                itemsLength={items ? items.length : 0}
                onSearchKey={this.onSearchKey}
                orderOptions={valueClasse ? orderOptions2 : orderOptions}
                pageSizes={pageSizes}
                toggleModal={this.toggleModal}
                toggleModalVoir={this.toggleModalVoir}
                toggleModalUpdate={this.toggleModalUpdate}
                toggleModalDelete={this.toggleModalDelete}
                classe={valueClasse ? valueClasse : null}
                niveau={valueNiveau.value === "*" && valueNiveau.value}



              />
              : null}
            <UpdateModal
              modalOpen={modalOpenUpdate}
              toggleModal={this.toggleModalUpdate}
              selectedItems={this.state.selectedItems.length == 1}
              eleve={this.state.eleve}
              setST={this.setST}
              idclasse={valueClasse ? valueClasse.value : null}
              callback={() => this.dataListRender()}
              handleLogout={this.handleLogout}

            />
            <DeleteModal
              modalOpen={modalOpenDelete}
              toggleModal={this.toggleModalDelete}
              selectedItems={this.state.selectedItems}
              eleve={this.state.eleve}
              setST={this.setST}
              callback={() => this.dataListRender()}
              idclasse={this.state.valueClasse ? this.state.valueClasse.value : null}
              handleLogout={this.handleLogout}

            />

            <AddNewModal
              modalOpen={modalOpen}
              toggleModal={this.toggleModal}
              setST={this.setST}
              callback={() => this.dataListRender()}
              idclasse={this.state.valueClasse ? this.state.valueClasse.value : null}
              handleLogout={this.handleLogout}

            />
            <Row>
              {/* {(valueNiveau.value === "*") || (valueClasse) ?

                <div className="search-sm d-inline-block float-md-left mr-1 mb-1 align-top">
                  <input
                    type="text"
                    name="keyword"
                    id="search"
                    placeholder="Rechercher"
                    value={search}
                    onChange={this.chercher}
                  />
                </div>
                : null} */}

              {this.state.items.map((eleve, i) => {
                return (

                  <DataListView
                    key={eleve.id}
                    eleve={eleve}
                    isSelect={this.state.selectedItems.includes(eleve.id)}
                    onCheckItem={this.onCheckItem}
                    setEleve={this.setEleve}
                    collect={collect}
                    classe={valueClasse ? valueClasse : null}
                    niveau={valueNiveau.value === "*" && valueNiveau.value}
                    toggleModal={this.toggleModalVoir}
                    handleLogout={this.handleLogout}

                  />
                );
              })
              }

              <Pagination
                currentPage={this.state.currentPage}
                totalPage={this.state.totalPage}
                onChangePage={i => this.onChangePage(i)}
              />
              {valueClasse &&
                <ContextMenuContainer
                  onContextMenuClick={this.onContextMenuClick}
                  onContextMenu={this.onContextMenu}
                  toggleModalUpdate={this.toggleModalUpdate}
                  toggleModalDelete={this.toggleModalDelete}
                  selectedItems={this.state.selectedItems}
                  toggleModalVoir={this.toggleModalVoir}

                />
              }
              <Modal
                modalOpenVoir={modalOpenVoir}
                toggleModal={this.toggleModalVoir}
                eleve={this.state.eleve}
                handleLogout={this.handleLogout}

              />
            </Row>
          </div>
        </Fragment>
      );
  }
}

const mapStateToProps = ({ menu }) => {
  const { containerClassnames } = menu;
  return { containerClassnames };
};

export default withRouter(connect(mapStateToProps, { logoutUser })(gst_eleve));

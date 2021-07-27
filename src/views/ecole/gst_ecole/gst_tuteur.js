import React, { Component, Fragment } from "react";
import { Row, Label } from "reactstrap";
import axios from "axios";
import { levelstuteur, levels } from "../../../constants/defaultValues";
import Select from "react-select";

import DataListView from "../../../containers/ecole/gestion_tuteur/DataListView"
import Pagination from "../../../containers/Pagination";
import ContextMenuContainer from "../../../containers/ContextMenuContainer";
import ListPageHeading from "../../../containers/ecole/gestion_tuteur/ListPageHeading";
import AddNewModal from "../../../containers/ecole/gestion_tuteur/AddNewModal";
import UpdateModal from "../../../containers/ecole/gestion_tuteur/UpdateModal";
import DeleteModal from "../../../containers/ecole/gestion_tuteur/DeleteModal";
import Modal from "../../../containers/ecole/gestion_tuteur/Modal";
import {
  logoutUser,
} from "../../../redux/actions";
import { Route, withRouter, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";

function collect(props) {
  return { data: props.data };
}
class gst_tuteur extends Component {
  constructor(props) {
    super(props);



    this.state = {

      displayMode: "list",
      tuteur: null,
      selectedPageSize: 10,
      orderOptions: [
        { column: "id", label: "Identifiant" },
        { column: "nom", label: "Nom" },
        { column: "prenom", label: "Prénom" }
      ],
      pageSizes: [1, 2, 5, 10, 20, 30, 50, 100],



      selectedOrderOption: { column: "nom", label: "Nom" },
      dropdownSplitOpen: false,
      modalOpen: false,
      modalOpenUpdate: false,
      modalOpenDelete: false,


      currentPage: 1,
      totalItemCount: 0,
      totalPage: 1,
      search: "",
      selectedItems: [],

      isLoading: true,
      items: [],
      classet: [],
      elevet: [],

      valueType: { label: "Tous les tuteurs", value: "*" },
      valueClasse: null,
      valueEleve: null,
      modalOpenVoir: false,

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
  toggleModalVoir = () => {

    this.setState({
      modalOpenVoir: !this.state.modalOpenVoir
    });

  };
  toggleModalDelete = () => {
    this.setState({
      modalOpenDelete: !this.state.modalOpenDelete
    });
  };

  changeOrderBy = column => {
    this.setState(
      {
        selectedOrderOption: this.state.orderOptions.find(
          x => x.column === column
        )
      },
      () => this.dataListRender()
    );
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
    // if (
    //   event.target.tagName === "A" ||
    //   (event.target.parentElement && event.target.parentElement.tagName === "A")
    // ) {
    //   return true;
    // }
    // if (this.state.lastChecked === null) {
    //   this.setState({
    //     lastChecked: id
    //   });
    // }

    let selectedItems = this.state.selectedItems;
    if (selectedItems.includes(id)) {
      selectedItems = selectedItems.filter(x => x !== id);
    } else {
      selectedItems.push(id);
    }
    this.setState({
      selectedItems
    });

    // if (event.shiftKey) {
    //   var items = this.state.items;
    //   var start = this.getIndex(id, items, "id");
    //   var end = this.getIndex(this.state.lastChecked, items, "id");
    //   items = items.slice(Math.min(start, end), Math.max(start, end) + 1);
    //   selectedItems.push(
    //     ...items.map(item => {
    //       return item.id;
    //     })
    //   );
    //   selectedItems = Array.from(new Set(selectedItems));
    //   this.setState({
    //     selectedItems
    //   });
    // }
    // document.activeElement.blur();
  };





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

  setTuteur = tuteur => {
    this.setState({ tuteur });
  };

  handleChangeType = value => {
    if (value.value != "*")
      this.classes(value.value)
    this.setState({
      valueType: value,
      valueClasse: null,
      valueEleve: null,
      selectedItems: []
    }, this.dataListRender);

  };

  handleChangeClasse = value => {
    this.setState({
      valueClasse: value,
      valueEleve: null,
      selectedItems: []

    }, this.eleves(value.value));

  };
  handleChangeEleve = value => {
    this.setState({
      valueEleve: value,
      selectedItems: []

    }, this.dataListRender);
  };


  setTuteur = tuteur => {
    this.setState({ tuteur });
  };

  setST = () => {
    this.setState({ selectedItems: [] })
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
            items: []

          });
        }, error => {
          return error;
        });
    }
    catch (error) {
      return error;
    }
  };


  eleves(idclasse) {
    try {
      axios
        .get("http://api.onyx.inedit-gd.tn/eleve/filtre/classe/" + idclasse)
        .then(res => {
          return res.data;
        })
        .then(data => {

          this.setState({
            elevet: data,
            items: []

          });
        }, error => {
          return error;
        });
    }
    catch (error) {
      return error;
    }
  };


  dataListRender() {
    const {
      selectedPageSize,
      currentPage,
      selectedOrderOption,
      valueEleve,
      search,
      valueType
    } = this.state;

    if (valueType && valueType.value != "*" && !valueEleve) {
      this.setState({ items: [] })
      return;
    }

    var query = "http://api.onyx.inedit-gd.tn/tuteur/getAll?";
    query += "count=" + selectedPageSize
    query += "&page=" + currentPage
    query += "&order=" + selectedOrderOption.column
    query += "&search=" + search

    if (valueEleve && valueEleve.value) {
      query += "&eleve=" + valueEleve.value
    }
    try {
      axios
        .get(query)
        .then(res => res.data)
        .then(data => {
          this.setState({
            totalItemCount: data.count,
            totalPage: Math.ceil(data.count / selectedPageSize),
            items: data.list,
            selectedItems: [],
            isLoading: false
          });
        });
    } catch (error) {
      return error;
    }
  };

  handleLogout = () => {
    this.props.logoutUser(this.props.history);
  };



  render() {





    const {
      currentPage,
      items,
      displayMode,
      selectedPageSize,
      totalItemCount,
      selectedOrderOption,
      selectedItems,
      orderOptions,
      pageSizes,
      modalOpen,
      modalOpenUpdate,
      modalOpenDelete,
      modalOpenVoir,
      valueType,
      valueClasse,
      valueEleve,
      tuteur
    } = this.state



    const cs = this.state.classet.map((c, i) => {
      return { label: c.Nom, value: c.id };
    })
    const elvs = this.state.elevet.map((eleve, i) => {
      return { label: eleve.nameEleve + " " + eleve.prenom, value: eleve.id };
    })
    const { match } = this.props;
    const startIndex = (currentPage - 1) * selectedPageSize;
    const endIndex = currentPage * selectedPageSize;
    return this.state.isLoading ? (
      <div className="loading" />
    ) : (
        <Fragment>
          <Label>
            <h3>Tuteurs :</h3>
          </Label>
          <Select
            onChange={this.handleChangeType}
            value={valueType}
            options={levelstuteur}
            className="react-select"
            classNamePrefix="react-select"
            name="form-field-name"
          />



          {valueType && valueType.value != "*" &&
            <>
              <br></br>
              <Label>
                <h3>Classe :</h3>
              </Label>
              <Select
                onChange={this.handleChangeClasse}
                value={valueClasse}
                options={cs}
                className="react-select"
                placeholder="Sélectionner une classe ..."
                classNamePrefix="react-select"
                name="form-field-name"

              />
            </>
          }
          <br></br>

          {valueClasse &&
            <>
              <Label>
                <h3>Eleve :</h3>
              </Label>
              <Select
                onChange={this.handleChangeEleve}
                value={valueEleve}
                options={elvs}
                className="react-select"
                placeholder="Sélectionner l'éléve..."
                classNamePrefix="react-select"
                name="form-field-name"

              />
            </>
          }


          <div className="disable-text-selection">
            {(valueEleve || valueClasse) &&
              <br></br>
            }
            <ListPageHeading
              heading={valueType.value === '*' && items.length > 0 ? "Tous les tuteurs" : valueEleve && items.length > 0 ? "Tuteur de l'éléve " + valueEleve.label : 'Aucun tuteur'}
              displayMode={displayMode}
              changeDisplayMode={this.changeDisplayMode}
              changeOrderBy={this.changeOrderBy}
              changePageSize={this.changePageSize}
              selectedPageSize={selectedPageSize}
              totalItemCount={totalItemCount}
              selectedOrderOption={selectedOrderOption}
              match={match}
              startIndex={startIndex}
              endIndex={endIndex}
              selectedItemsLength={selectedItems ? selectedItems.length : 0}
              onSearchKey={this.onSearchKey}
              orderOptions={orderOptions}
              pageSizes={pageSizes}
              toggleModal={this.toggleModal}
              toggleModalUpdate={this.toggleModalUpdate}
              toggleModalDelete={this.toggleModalDelete}
              valueEleve={valueEleve ? valueEleve : null}
              type={valueType.value === "*" && valueType.value}
              toggleModalVoir={this.toggleModalVoir}
              items={items && items}

            />


            <AddNewModal
              modalOpen={modalOpen}
              toggleModal={this.toggleModal}
              callback={() => this.dataListRender()}
              handleLogout={this.handleLogout}

            />


            <UpdateModal
              modalOpen={modalOpenUpdate}
              toggleModal={this.toggleModalUpdate}
              setST={this.setST}
              tuteur={tuteur}
              callback={() => this.dataListRender()}
              levels={levels}
              handleLogout={this.handleLogout}


            />


            <DeleteModal
              modalOpen={modalOpenDelete}
              toggleModal={this.toggleModalDelete}
              setST={this.setST}
              selectedItems={this.state.selectedItems}
              tuteur={tuteur}
              callback={() => this.dataListRender()}
              handleLogout={this.handleLogout}


            />

            <Row>

              {this.state.items.map((tuteur, i) => {
                return (


                  <DataListView
                    key={tuteur[0].id}
                    tuteur={tuteur[0]}
                    isSelect={this.state.selectedItems.includes(tuteur[0].id)}
                    onCheckItem={this.onCheckItem}
                    setTuteur={this.setTuteur}
                    collect={collect}
                    eleve={valueEleve ? valueEleve : null}
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

              {valueType.value === "*" &&
                <ContextMenuContainer
                  onContextMenuClick={this.onContextMenuClick}
                  onContextMenu={this.onContextMenu}
                  selectedItems={this.state.selectedItems}
                  toggleModalUpdate={this.toggleModalUpdate}
                  toggleModalDelete={this.toggleModalDelete}
                  toggleModalVoir={this.toggleModalVoir}
                />
              }
              <Modal
                modalOpenVoir={modalOpenVoir}
                toggleModalVoir={this.toggleModalVoir}
                tuteur={tuteur}
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

export default withRouter(connect(mapStateToProps, { logoutUser })(gst_tuteur));
// export default gst_tuteur;




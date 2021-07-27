
import React, { Component, Fragment } from "react";
import { Row } from "reactstrap";

import axios from "axios";
import Select from "react-select";
import DataListView from "../../../containers/ecole/gestion_classe/DataListView";
import Pagination from "../../../containers/Pagination";
import ContextMenuContainer from "../../../containers/ecole/gestion_classe/ContextMenuContainer";
import ListPageHeading from "../../../containers/ecole/gestion_classe/ListPageHeading";
import AddNewModal from "../../../containers/ecole/gestion_classe/AddNewModal";
import UpdateModal from "../../../containers/ecole/gestion_classe/UpdateModal";
import DeleteModal from "../../../containers/ecole/gestion_classe/DeleteModal";
import { levelscls } from "../../../constants/defaultValues";
import {
  logoutUser,
} from "../../../redux/actions";
import { Route, withRouter, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";

function collect(props) {
  return { data: props.data };
}

class gst_classe extends Component {
  constructor(props) {
    super(props);

    this.state = {
      displayMode: "list",

      selectedPageSize: 10,

      orderOptions: [
        { column: "id", label: "Identifiant" },
        { column: "niveau", label: "Niveau" },
        { column: "nbEleves", label: "Nombre d'éléves" }
      ],
      orderOptions2: [
        { column: "id", label: "Identifiant" },
        { column: "nbEleves", label: "Nombre d'éléves" }
      ],
      pageSizes: [1, 2, 5, 10, 20, 30, 50, 100],

      selectedOrderOption: { column: "niveau", label: "Niveau" },
      selectedOrderOption2: { column: "nbEleves", label: "Nombre d'éléves" },

      modalOpen: false,
      modalOpenUpdate: false,
      modalOpenDelete: false,
      currentPage: 1,
      totalItemCount: 0,
      totalPage: 1,

      selectedItems: [],

      isLoading: true,
      items: [],
      classe: [],
      valueNiveau: { label: "Tous les niveaux", value: "*" },




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
    // if (
    //   localStorage.getItem('user_id') &&
    //   ['ROLE_GESTION_ECOLE', 'ROLE_EMPLOI', 'ROLE_NOTES', 'ROLE_CALENDRIER_EXAMENS', 'ROLE_ORGANISATION']
    //     .includes(localStorage.getItem('user_role').trim().split(' ')[0]) === false &&
    //   localStorage.getItem('accueil')
    // ) {
    //   return this.props.history.push(localStorage.getItem('accueil'));

    // }

    // if (!localStorage.getItem('user_id') || parseInt(localStorage.getItem('firstlogin')) === 0)
    //   return this.props.history.push('/user/login');

    // this.dataListRender();

  }



  toggleModal = () => {
    this.setState({
      modalOpen: !this.state.modalOpen
    }, this.setST);

  };

  toggleModalUpdate = () => {
    this.setState({
      modalOpenUpdate: !this.state.modalOpenUpdate
    });

  };
  setST = () => {
    this.setState({ selectedItems: [] })
  }

  toggleModalDelete = () => {
    this.setState({

      modalOpenDelete: !this.state.modalOpenDelete
    });
  };

  changeOrderBy = column => {
    if (this.state.valueNiveau.value === "*")
      this.setState(
        {
          selectedOrderOption: this.state.orderOptions.find(
            x => x.column === column
          )
        },
        () => this.dataListRender()
      );
    else
      this.setState(
        {
          selectedOrderOption2: this.state.orderOptions2.find(
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
  // changeDisplayMode = mode => {
  //   this.setState({
  //     displayMode: mode
  //   });
  //   return false;
  // };
  onChangePage = page => {
    this.setState(
      {
        currentPage: page
      },
      () => this.dataListRender()
    );
  };


  onCheckItem = (event, id) => {
    if (this.state.valueNiveau.value != '*') {
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
  };


  onContextMenuClick = (e, data, target) => {
    if (data.action === "edit") {
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

  setClasse = classe => {
    this.setState({ classe: classe });
  };

  handleChangeNiveau = value => {
    this.setState({
      valueNiveau: value,
      selectedItems: []
    }, this.dataListRender);

  };
  dataListRender() {
    const {
      selectedPageSize,
      currentPage,
      selectedOrderOption,
      selectedOrderOption2,
      valueNiveau
    } = this.state;


    var query = "http://api.onyx.inedit-gd.tn/classe/getAll?";
    query += "count=" + selectedPageSize
    query += "&page=" + currentPage


    if (valueNiveau.value !== "*") {
      query += "&order=" + selectedOrderOption2.column
      query += "&ids=" + valueNiveau.value

    }
    else {
      query += "&order=" + selectedOrderOption.column

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
  }
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
      selectedOrderOption2,
      selectedItems,
      orderOptions,
      orderOptions2,
      pageSizes,
      modalOpen,
      modalOpenUpdate,
      modalOpenDelete,
      valueNiveau,

    } = this.state;
    const { match } = this.props;
    const startIndex = (currentPage - 1) * selectedPageSize;
    const endIndex = currentPage * selectedPageSize;


    return this.state.isLoading ? (
      <div className="loading" />
    ) : (
        <Fragment>

          <label>
            <h3>Niveau :</h3>
          </label>

          <Select
            onChange={this.handleChangeNiveau}
            value={valueNiveau}
            options={levelscls}
            className="react-select"
            placeholder="Sélectionner un niveau..."
            classNamePrefix="react-select"
            name="form-field-name"
            required
          />



          <div className="disable-text-selection">


            <ListPageHeading
              heading={valueNiveau.value === "*" && items.length > 0 ? "Toutes les classes" : valueNiveau.value != "*" && items.length > 0 ? "Liste des classes " + valueNiveau.label : "Aucune classe"}
              displayMode={displayMode}
              changeOrderBy={this.changeOrderBy}
              changePageSize={this.changePageSize}
              selectedPageSize={selectedPageSize}
              totalItemCount={totalItemCount}
              selectedOrderOption={valueNiveau.value === "*" ? selectedOrderOption : selectedOrderOption2}
              match={match}
              startIndex={startIndex}
              endIndex={endIndex}
              selectedItemsLength={selectedItems ? selectedItems.length : 0}
              orderOptions={valueNiveau.value === "*" ? orderOptions : orderOptions2}
              pageSizes={pageSizes}
              toggleModal={this.toggleModal}
              toggleModalUpdate={this.toggleModalUpdate}
              toggleModalDelete={this.toggleModalDelete}
              niveau={valueNiveau && valueNiveau.value}

            />

            <AddNewModal
              modalOpen={modalOpen}
              toggleModal={this.toggleModal}
              callback={() => this.dataListRender()}
              niveau={valueNiveau ? valueNiveau.value : null}
              handleLogout={this.handleLogout}

            />

            <UpdateModal
              modalOpen={modalOpenUpdate}
              toggleModal={this.toggleModalUpdate}
              classe={this.state.classe}
              callback={() => this.dataListRender()}
              setST={this.setST}
              handleLogout={this.handleLogout}

            />

            <DeleteModal
              modalOpen={modalOpenDelete}
              toggleModal={this.toggleModalDelete}
              callback={() => this.dataListRender()}
              classe={this.state.classe}
              selectedItems={this.state.selectedItems}
              setST={this.setST}
              handleLogout={this.handleLogout}

            />
            <Row>



              {this.state.items.map((classe, i) => {
                return (

                  <DataListView
                    key={classe.id}
                    classe={classe}
                    isSelect={this.state.selectedItems.includes(classe.id)}
                    onCheckItem={this.onCheckItem}
                    setClasse={this.setClasse}
                    collect={collect}
                    niveau={valueNiveau && valueNiveau.value}
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
              {valueNiveau.value !== "*" &&
                <ContextMenuContainer
                  onContextMenuClick={this.onContextMenuClick}
                  onContextMenu={this.onContextMenu}
                  selectedItems={this.state.selectedItems}
                  toggleModalUpdate={this.toggleModalUpdate}
                  toggleModalDelete={this.toggleModalDelete}

                />
              }
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

export default withRouter(connect(mapStateToProps, { logoutUser })(gst_classe));

// export default gst_classe;
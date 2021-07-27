import React, { Component, Fragment } from "react";
import { Row, Card, CardBody, CardTitle, Table, Label } from "reactstrap";
import axios from "axios";
import Select from "react-select";
import DataListView from "../../../containers/ecole/carnet/DataListView";
import Pagination from "../../../containers/Pagination";
import ListPageHeading from "../../../containers/ecole/carnet/ListPageHeading";
import AddNewModal from "../../../containers/ecole/carnet/AddNewModal";
import DeleteModal from "../../../containers/ecole/carnet/DeleteModal";
import { levelscarnet } from "../../../constants/defaultValues";
// import Modal from "../../../containers/ecole/carnet/EtatModal";
import {
  logoutUser,
} from "../../../redux/actions";
import { Route, withRouter, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";

class carnet extends Component {
  constructor(props) {
    super(props);

    this.state = {

      classet: [],
      elevet: [],

      // modalOpenEtat: false,
      selectedPageSize: 10,
      orderOptions: [
        { column: "id", label: "Identifiant" },
        { column: "niveau", label: "Niveau" },
        { column: "semestre", label: "Trimestre" },
        { column: "Nom", label: "Nom" },
        { column: "prenom", label: "Prénom" },


      ],

      orderOptions2: [
        { column: "id", label: "Identifiant" },
        { column: "semestre", label: "Trimestre" }
      ],


      pageSizes: [1, 2, 5, 10, 20, 30, 50, 100],




      selectedOrderOption: { column: "niveau", label: "Niveau" },
      selectedOrderOption2: { column: "semestre", label: "Trimestre" },


      modalOpen: false,
      modalOpenUpdate: false,
      modalOpenDelete: false,
      currentPage: 1,
      totalItemCount: 0,
      totalPage: 1,
      search: "",
      selectedItems: [],

      isLoading: false,

      carnet: [],
      valueType: { label: "Tous les carnets de notes", value: "*" },
      valueClasse: null,
      valueEleve: null,
      items: [],

    };
  }
  componentWillMount() {


    try {
      axios
        .get("http://api.onyx.inedit-gd.tn/admins/get/" + parseInt(localStorage.getItem('user_id')))
        .then(res => res.data)
        .then(data => {

          if (data.roles.includes('ROLE_NOTES')) {
            this.dataListRender();
            // this.profet();
          }
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
  // toggleModalEtat = () => {
  //   this.setState({
  //     modalOpenEtat: !this.state.modalOpenEtat
  //   });

  // };

  changeOrderBy = column => {
    if (!this.state.valueEleve) {
      this.setState(
        {
          selectedOrderOption: this.state.orderOptions.find(
            x => x.column === column
          )
        },
        () => this.dataListRender()
      );
    }
    else {
      this.setState(
        {
          selectedOrderOption2: this.state.orderOptions2.find(
            x => x.column === column
          )
        },
        () => this.dataListRender()
      );
    };
  }
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
  dataListRender() {
    const {
      selectedPageSize,
      currentPage,
      selectedOrderOption,
      selectedOrderOption2,
      valueEleve,
      valueType,
      valueClasse,
      search
    } = this.state;

    if (!valueEleve && valueType.value !== "*") {
      this.classes(valueType.value)
      this.setState({ items: [] });
      if (valueClasse)

        this.eleves(valueClasse.value)
      return;
    }


    var query = "http://api.onyx.inedit-gd.tn/note/getAll?";
    query += "count=" + selectedPageSize
    query += "&page=" + currentPage
    query += "&search=" + search

    if (valueEleve && valueEleve.value) {
      query += "&eleve=" + valueEleve.value
      query += "&order=" + selectedOrderOption2.column

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
            isLoading: true
          });
        });
    } catch (error) {
      return error;
    }
  }

  handleChangeType = value => {
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
    }, this.dataListRender);
  };

  handleChangeEleve = value => {
    this.setState({
      valueEleve: value,
      selectedItems: []
    }, this.dataListRender);
  };

  eleves(idclasse) {
    if (idclasse) {
      try {
        axios
          .get("http://api.onyx.inedit-gd.tn/eleve/filtre/classe/" + idclasse)
          .then(res => {
            return res.data;
          })
          .then(data => {

            this.setState({
              elevet: data,

            });
          }, error => {
            return error;
          });
      }
      catch (error) {
        return error;
      }
    }
  }


  toggleModalDelete = () => {
    this.setState({
      modalOpenDelete: !this.state.modalOpenDelete
    });
  };


  setST = (selectedItems) => {
    this.setState({ selectedItems })
  }
  handleLogout = () => {
    this.props.logoutUser(this.props.history);
  };

  render() {

    const cls = this.state.classet.map(classe => {
      return { label: classe.Nom, value: classe.id };
    })

    const elvs = this.state.elevet.map(e => {
      return { label: e.nameEleve + " " + e.prenom, value: e.id };
    })



    const {
      currentPage,
      items,
      selectedPageSize,
      totalItemCount,
      selectedOrderOption,
      selectedOrderOption2,
      selectedItems,
      orderOptions,
      orderOptions2,
      pageSizes,
      modalOpen,
      modalOpenDelete,
      valueType,
      valueClasse,
      valueEleve,
    } = this.state;
    // const { match } = this.props;
    const startIndex = (currentPage - 1) * selectedPageSize;
    const endIndex = currentPage * selectedPageSize;

    return !this.state.isLoading ? (
      <div className="loading" />
    ) : (
        <Fragment>
          <Label>
            <h3>Niveau :</h3>
          </Label>
          <Select
            onChange={this.handleChangeType}
            value={this.state.valueType}
            options={levelscarnet}
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
                value={this.state.valueClasse}
                options={cls}
                className="react-select"
                placeholder="Sélectionner une classe..."
                classNamePrefix="react-select"
                name="form-field-name"

              />
            </>
          }
          {valueClasse &&
            <>
              <br></br>
              <Label>
                <h3>Eleve :</h3>
              </Label>
              <Select
                onChange={this.handleChangeEleve}
                value={this.state.valueEleve}
                options={elvs}
                className="react-select"
                placeholder="Sélectionner un éléve..."
                classNamePrefix="react-select"
                name="form-field-name"

              />
            </>
          }
          <div className="disable-text-selection">
            <br></br>
            {(valueType.value === "*") || (valueEleve) ?
              <ListPageHeading
                heading={valueEleve && items.length > 0 ? "Carnets de notes de " + valueEleve.label : !valueClasse && items.length > 0 ? "Tous les carnets de notes" : "Aucun carnet de note"}
                changeOrderBy={this.changeOrderBy}
                changePageSize={this.changePageSize}
                selectedPageSize={selectedPageSize}
                totalItemCount={totalItemCount}
                selectedOrderOption={valueEleve ? selectedOrderOption2 : selectedOrderOption}
                startIndex={startIndex}
                endIndex={endIndex}
                selectedItemsLength={selectedItems ? selectedItems.length : 0}
                orderOptions={!valueEleve ? orderOptions : orderOptions2}
                pageSizes={pageSizes}
                toggleModal={this.toggleModal}
                toggleModalDelete={this.toggleModalDelete}
                eleve={this.state.valueEleve ? this.state.valueEleve : null}
                items={items && items}
                toggleModalEtat={this.toggleModalEtat}
                type={valueType.value === "*" && valueType.value}
                onSearchKey={this.onSearchKey}

              />
              : null}

            <DeleteModal
              modalOpen={modalOpenDelete}
              toggleModal={this.toggleModalDelete}
              selectedItems={this.state.selectedItems}
              setSt={this.setST}
              callback={() => this.dataListRender()}
              eleve={this.state.valueEleve ? this.state.valueEleve : null}
              handleLogout={this.handleLogout}


            />


            <AddNewModal
              modalOpen={modalOpen}
              toggleModal={this.toggleModal}
              callback={() => this.dataListRender()}
              eleve={this.state.valueEleve ? this.state.valueEleve : null}
              handleLogout={this.handleLogout}

            />


            <Row>

              {this.state.items.map((carnet, i) => {
                return (

                  <DataListView
                    key={carnet.id}
                    carnet={carnet}
                    isSelect={this.state.selectedItems.includes(carnet.id)}
                    onCheckItem={this.onCheckItem}
                    eleve={this.state.valueEleve ? this.state.valueEleve : null}
                    classe={valueClasse ? valueClasse : null}
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

              {/* <Modal
                modalOpen={modalOpenEtat}
                toggleModalEtat={this.toggleModalEtat}
              /> */}


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

export default withRouter(connect(mapStateToProps, { logoutUser })(carnet));
// export default carnet;

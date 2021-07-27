import React, { Component, Fragment } from "react";
import { Row, Label } from "reactstrap";
import axios from "axios";
import { empcls } from "../../../constants/defaultValues";
import Select from "react-select";
import DataListView from "../../../containers/ecole/emplois_eleves/DataListView";
import Pagination from "../../../containers/Pagination";
import ListPageHeading from "../../../containers/ecole/emplois_eleves/ListPageHeading";
import AddNewModal from "../../../containers/ecole/emplois_eleves/AddNewModal";
import DeleteModal from "../../../containers/ecole/emplois_eleves/DeleteModal";
import {
  logoutUser,
} from "../../../redux/actions";
import { Route, withRouter, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";

class emploi_eleve extends Component {
  constructor(props) {
    super(props);

    this.state = {
      classet: [],

      displayMode: "list",

      selectedPageSize: 10,
      orderOptions: [
        { column: "id", label: "Identifiant" },
        { column: "niveau", label: "Niveau" },
        { column: "classe", label: "Classe" }
      ],
      pageSizes: [1, 2, 5, 10, 20, 30, 50, 100],




      selectedOrderOption: { column: "niveau", label: "Niveau" },

      modalOpen: false,
      modalOpenDelete: false,
      currentPage: 1,
      totalItemCount: 0,
      totalPage: 1,
      isLoading: true,
      emploi: [],
      valueType: { label: "Tous les emplois", value: "*" },
      valueNiveau: null,
      valueClasse: null,
      items: [],

    };
  }
  componentWillMount() {
    try {
      axios
        .get("http://api.onyx.inedit-gd.tn/admins/get/" + parseInt(localStorage.getItem('user_id')))
        .then(res => res.data)
        .then(data => {
          if (data.roles.includes('ROLE_EMPLOI'))
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
      valueClasse,
      valueType
    } = this.state;

    if (valueType.value != "*" && !valueClasse) {
      this.classes(valueType.value)
      this.setState({ items: [] });
      return;
    }
    var query = "http://api.onyx.inedit-gd.tn/emploi/getAll?";
    query += "count=" + selectedPageSize
    query += "&page=" + currentPage
    query += "&order=" + selectedOrderOption.column

    if (valueClasse && valueClasse.value) {
      query += "&classe=" + valueClasse.value
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
            isLoading: false
          });
        });
    } catch (error) {
      return error;
    }
  }



  setEmploi = emploi => {
    this.setState({ emploi });
  };

  handleChangeType = value => {
    this.setState({
      valueType: value,
      valueNiveau: null,
      valueClasse: null,

    }, this.dataListRender);


  };

  handleChangeClasse = value => {
    this.setState({
      valueClasse: value,
    }, this.dataListRender);
  };
  handleLogout = () => {
    this.props.logoutUser(this.props.history);
  };


  render() {



    const cls = this.state.classet.map((classe, i) => {
      return { label: classe.Nom, value: classe.id };
    })


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
      modalOpenDelete,
      valueType,
      valueClasse,
      emploi
    } = this.state;

    const { match } = this.props;
    const startIndex = (currentPage - 1) * selectedPageSize;
    const endIndex = currentPage * selectedPageSize;
    return this.state.isLoading ? (
      <div className="loading" />
    ) : (
        <Fragment>
          <Label>
            <h3>Niveau : </h3>
          </Label>
          <Select
            onChange={this.handleChangeType}
            value={this.state.valueType}
            options={empcls}
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
          <div className="disable-text-selection">
            <ListPageHeading
              heading={!valueClasse && items.length > 0 ? "Tous les emplois" : valueClasse && items.length > 0 ? "Emploi de la classe " + this.state.valueType.label + " " + this.state.valueClasse.label : "Aucun emploi"}
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
              itemsLength={items ? items.length : 0}
              orderOptions={orderOptions}
              pageSizes={pageSizes}
              toggleModal={this.toggleModal}
              toggleModalDelete={this.toggleModalDelete}
              classe={this.state.valueClasse ? this.state.valueClasse : null}
              items={items ? items : null}

            />


            <DeleteModal
              modalOpen={modalOpenDelete}
              toggleModal={this.toggleModalDelete}
              setSt={this.setST}
              classe={this.state.valueClasse ? this.state.valueClasse : null}
              niveau={this.state.valueClasse ? this.state.valueType.value : null}
              items={items ? items : null}
              callback={() => this.dataListRender()}
              handleLogout={this.handleLogout}

            />

            <AddNewModal
              modalOpen={modalOpen}
              toggleModal={this.toggleModal}
              classe={this.state.valueClasse ? this.state.valueClasse : null}
              niveau={this.state.valueClasse ? this.state.valueType.value : null}
              callback={() => this.dataListRender()}
              handleLogout={this.handleLogout}

            />


            <Row>


              {this.state.items.map((emploi, i) => {
                return (

                  <DataListView
                    key={emploi.id}
                    emploi={emploi}
                    setEmploi={this.setEmploi}
                    classe={this.state.valueClasse ? this.state.valueClasse : null}
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

export default withRouter(connect(mapStateToProps, { logoutUser })(emploi_eleve));
// export default emploi_eleve;

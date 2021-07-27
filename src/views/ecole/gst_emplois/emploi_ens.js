import React, { Component, Fragment } from "react";
import { Row, Card, CardBody, CardTitle, Table, Label } from "reactstrap";
import axios from "axios";
import Select from "react-select";
import DataListView from "../../../containers/ecole/emplois_ens/DataListView";
import Pagination from "../../../containers/Pagination";
import ListPageHeading from "../../../containers/ecole/emplois_ens/ListPageHeading";
import AddNewModal from "../../../containers/ecole/emplois_ens/AddNewModal";
import DeleteModal from "../../../containers/ecole/emplois_ens/DeleteModal";
import {
  logoutUser,
} from "../../../redux/actions";
import { Route, withRouter, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";

class emploi_ens extends Component {
  constructor(props) {
    super(props);

    this.state = {

      classet: [],

      displayMode: "list",

      selectedPageSize: 10,
      orderOptions: [
        { column: "id", label: "Identifiant" },
        { column: "nom", label: "Nom" },
        { column: "prenom", label: "Prénom" },


      ],
      pageSizes: [1, 2, 5, 10, 20, 30, 50, 100],




      selectedOrderOption: { column: "nom", label: "Nom" },

      modalOpen: false,
      modalOpenDelete: false,
      currentPage: 1,
      totalItemCount: 0,
      totalPage: 1,
      search: "",
      isLoading: true,
      emploi: [],
      valueEns: { label: "Tous les emplois", value: -1 },
      profet: [{ nom: "Tous les emplois", prenom: "", id: -1 }],
      items: [],

    };
  }
  componentWillMount() {
    try {
      axios
        .get("http://api.onyx.inedit-gd.tn/admins/get/" + parseInt(localStorage.getItem('user_id')))
        .then(res => res.data)
        .then(data => {
          if (data.roles.includes('ROLE_EMPLOI')) {
            this.dataListRender();
            this.profet();
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


  dataListRender() {


    const {
      selectedPageSize,
      currentPage,
      selectedOrderOption,
      valueEns,
      search
    } = this.state;
    let query = "";


    if (valueEns.value == -1) {
      query += "http://api.onyx.inedit-gd.tn/emploiEns/getAll?";
      query += "count=" + selectedPageSize
      query += "&page=" + currentPage
      query += "&order=" + selectedOrderOption.column
      query += "&search=" + search;

    }

    if (valueEns && valueEns.value != -1) {
      query = "http://api.onyx.inedit-gd.tn/emploiEns/getAll?enseignant=" + valueEns.value
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
      console.log("failed" + error)
    }

  }


  setEmploi = emploi => {
    this.setState({ emploi });
  };

  profet() {

    var query = "http://api.onyx.inedit-gd.tn/enseignant/getAll";

    this.setState({ profet: [{ nom: "Tous les emplois", prenom: "", id: -1 }] })

    try {
      axios
        .get(query)
        .then(res => {
          return res.data;
        })
        .then(data => {

          this.setState({

            profet: this.state.profet.concat(data.list),
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


  handleChangeEns = value => {
    this.setState({
      valueEns: value,
    },
      () => this.dataListRender());

  };



  onSearchKey = e => {
    this.setState(
      {
        search: e.target.value.toLowerCase()
      },
      () => this.dataListRender()
    );

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
      orderOptions,
      pageSizes,
      modalOpen,
      modalOpenDelete,
      search,
      valueEns,
      emploi
    } = this.state;
    const { match } = this.props;
    const startIndex = (currentPage - 1) * selectedPageSize;
    const endIndex = currentPage * selectedPageSize;


    const ens =
      this.state.profet.map((ens, i) => {
        return { label: ens.nom + " " + ens.prenom, value: ens.id };
      })



    return this.state.isLoading ? (
      <div className="loading" />
    ) : (
        <Fragment>
          <Label>
            <h3>Enseignant :</h3>
          </Label>
          <Select
            onChange={this.handleChangeEns}
            value={valueEns}
            options={ens}
            className="react-select"
            classNamePrefix="react-select"
            name="form-field-name"

          />


          <div className="disable-text-selection">
            <ListPageHeading
              heading={valueEns.value === -1 && items.length > 0 ? "Tous les emplois" : valueEns.value > 0 && items.length > 0 ? "Emploi de Mr/Mme " + valueEns.label : "Aucun emploi"}
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
              ens={valueEns && valueEns}
              items={items ? items : null}
              valueEns={valueEns.value == -1 && valueEns.value}
              onSearchKey={this.onSearchKey}
            />

            <DeleteModal
              modalOpen={modalOpenDelete}
              toggleModal={this.toggleModalDelete}
              callback={() => this.dataListRender()}
              items={items ? items : null}
              ens={valueEns && valueEns}
              handleLogout={this.handleLogout}

            />

            <AddNewModal
              modalOpen={modalOpen}
              toggleModal={this.toggleModal}
              ens={valueEns && valueEns}
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
                    ens={valueEns && valueEns}
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

export default withRouter(connect(mapStateToProps, { logoutUser })(emploi_ens));
// export default emploi_ens;
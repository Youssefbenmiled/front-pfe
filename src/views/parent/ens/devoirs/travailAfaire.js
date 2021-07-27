import React, { Component, Fragment } from "react";
import { Row, Card, CardBody, CardTitle, Table } from "reactstrap";
import axios from "axios";
import Select from "react-select";
import DataListView from "../../../../containers/tuteur/enseignement/gst_devoir/DataListView";
import Pagination from "../../../../containers/Pagination";
import ListPageHeading from "../../../../containers/tuteur/enseignement/gst_devoir/ListPageHeading";
import Modal from "../../../../containers/tuteur/enseignement/gst_devoir/Modal";
import {
  logoutUser,
} from "../../../../redux/actions";
import { Route, withRouter, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";

class gst_devoir extends Component {
  constructor(props) {
    super(props);

    this.state = {

      selectedPageSize: 5,

      orderOptions: [
        { column: "dateEnvoi", label: "Date d'envoi" },
        { column: "dateEcheance", label: "Date d'échéance" },
        { column: "trimestre", label: "Trimestre" },

      ],
      pageSizes: [1, 2, 5, 10, 20, 30, 50, 100],

      selectedOrderOption: { column: "dateEcheance", label: "Date d'échéance" },

      currentPage: 1,
      totalItemCount: 0,
      totalPage: 1,
      search: "",
      isLoading: true,
      items: [],
      devoir: [],
      classet: [],
      modalOpenVoir: false,
      eleve: [],

    };
  }


  componentWillMount() {

    try {
      axios
        .get("http://api.onyx.inedit-gd.tn/tuteur/get/" + parseInt(localStorage.getItem('user_id')))
        .then(res => res.data)
        .then(data => {
          this.setState({ eleve: data.eleves.find(eleve => parseInt(eleve.id) === parseInt(localStorage.getItem('id_eleve'))) })

          // this.state.eleve = data.eleves.find(eleve => parseInt(eleve.id) === parseInt(localStorage.getItem('id_eleve')))
          this.dataListRender(this.state.eleve)
        }, error => {

        })
    } catch (error) {

    }
  }

  toggleModalVoir = () => {
    this.setState({
      modalOpenVoir: !this.state.modalOpenVoir
    });

  };
  changeOrderBy = column => {
    this.setState(
      {
        selectedOrderOption: this.state.orderOptions.find(
          x => x.column === column
        )
      },
      () => this.dataListRender(this.state.eleve)
    );

  };
  changePageSize = size => {
    this.setState(
      {
        selectedPageSize: size,
        currentPage: 1
      },
      () => this.dataListRender(this.state.eleve)
    );
  };

  onChangePage = page => {
    this.setState(
      {
        currentPage: page
      },
      () => this.dataListRender(this.state.eleve)
    );
  };

  setClasse = classe => {
    this.setState({ classe });
  };

  dataListRender(eleve) {
    const {
      selectedPageSize,
      currentPage,
      selectedOrderOption,
      search
    } = this.state;

    var query = "http://api.onyx.inedit-gd.tn/travail/getAll?";
    query += "count=" + selectedPageSize
    query += "&page=" + currentPage
    query += "&order=" + selectedOrderOption.column
    query += "&search=" + search
    query += "&travail=" + eleve.classe.id


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
      this.setState({
        isLoading: false
      });
      return error;
    }
  }

  setDevoir = (devoir) => {
    this.setState({ devoir })
  }


  onSearchKey = e => {
    this.setState(
      {
        search: e.target.value.toLowerCase()
      },
      () => this.dataListRender(this.state.eleve)
    );

  };


  handleLogout = () => {
    this.props.logoutUser(this.props.history);
  };

  render() {


    const {
      currentPage,
      selectedPageSize,
      totalItemCount,
      selectedOrderOption,
      orderOptions,
      pageSizes,
      valueNiveau,
      modalOpenVoir,
      eleve,
      items,

    } = this.state;
    const startIndex = (currentPage - 1) * selectedPageSize;
    const endIndex = currentPage * selectedPageSize;



    return this.state.isLoading ? (
      <div className="loading" />
    ) : (
        <Fragment>




          <div className="disable-text-selection">

            <ListPageHeading
              heading={items.length > 0 ? "Les travaux à faire de la classe " + eleve.classe.niveau + " " + eleve.classe.nom : "Aucun travail à faire"}
              changeOrderBy={this.changeOrderBy}
              changePageSize={this.changePageSize}
              selectedPageSize={selectedPageSize}
              totalItemCount={totalItemCount}
              selectedOrderOption={selectedOrderOption}
              startIndex={startIndex}
              endIndex={endIndex}
              orderOptions={orderOptions}
              pageSizes={pageSizes}
              onSearchKey={this.onSearchKey}


            />


            <Row>
              {this.state.items.map((devoir, i) => {

                return (


                  <DataListView
                    key={devoir.id}
                    devoir={devoir}
                    isSelect={this.state.selectedItems.includes(devoir.id)}
                    onCheckItem={this.onCheckItem}
                    setDevoir={this.setDevoir}
                    toggleModalVoir={this.toggleModalVoir}
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

              <Modal
                modalOpenVoir={modalOpenVoir}
                toggleModal={this.toggleModalVoir}
                devoir={this.state.devoir}
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

export default withRouter(connect(mapStateToProps, { logoutUser })(gst_devoir));
// export default gst_devoir;
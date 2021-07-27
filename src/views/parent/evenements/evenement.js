import React, { Component, Fragment } from "react";
import { Row, Label } from "reactstrap";

import axios from "axios";
import DataListView from "../../../containers/tuteur/gst_event/DataListView";
import Pagination from "../../../containers/Pagination";
import ListPageHeading from "../../../containers/tuteur/gst_event/ListPageHeading";
import Modal from "../../../containers/tuteur/gst_event/Modal";
import {
  logoutUser,
} from "../../../redux/actions";
import { Route, withRouter, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";

class event extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],

      evenement: [],
      displayMode: "list",

      selectedPageSize: 10,
      orderOptions: [
        { column: "id", label: "Identifiant" },
        { column: "dateDebut", label: "Date début" },
        { column: "dateFin", label: "Date fin" },

      ],
      pageSizes: [1, 2, 5, 10, 20, 30, 50, 100],
      selectedOrderOption: { column: "dateFin", label: "Date fin" },

      modalOpen: false,
      currentPage: 1,
      totalItemCount: 0,
      totalPage: 3,
      search: "",
      isLoading: true,
      modalOpenVoir: false,
      eleve: []

    };
  }
  componentWillMount() {

    try {
      axios
        .get("http://api.onyx.inedit-gd.tn/tuteur/get/" + parseInt(localStorage.getItem('user_id')))
        .then(res => res.data)
        .then(data => {
          this.setState({ eleve: data.eleves.find(eleve => parseInt(eleve.id) === parseInt(localStorage.getItem('id_eleve'))) })

          this.dataListRender(this.state.eleve)

        }, error => {

        })
    } catch (error) {

    }
  }


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
      () => this.dataListRender(this.state.eleve)
    );
  };

  dataListRender(eleve) {
    const {
      selectedPageSize,
      currentPage,
      selectedOrderOption,
      search,

    } = this.state;

    var query = "http://api.onyx.inedit-gd.tn/event/getAll?";
    query += "count=" + selectedPageSize
    query += "&page=" + currentPage
    query += "&order=" + selectedOrderOption.column
    query += "&search=" + search;
    // query += "&event=" + eleve.classe.id;

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
            isLoading: false
          });
        }, error => {
          return error;
        });
    }
    catch (error) {
      this.setState({
        isLoading: false
      });
      return error;
    }
  }




  toggleModalVoir = () => {
    this.setState({
      modalOpenVoir: !this.state.modalOpenVoir
    });

  };
  setEvent = evenement => {
    this.setState({ evenement });
  };
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
      items,
      displayMode,
      selectedPageSize,
      totalItemCount,
      selectedOrderOption,
      orderOptions,
      pageSizes,
      modalOpenVoir,
      eleve,
    } = this.state;


    const startIndex = (currentPage - 1) * selectedPageSize;
    const endIndex = currentPage * selectedPageSize;

    return this.state.isLoading ? (
      <div className="loading" />
    ) : (
        <Fragment>


          <div className="disable-text-selection">
            <br></br>
            <ListPageHeading
              heading={items.length > 0 ? "Evénements de la classe " + eleve.classe.niveau + " " + eleve.classe.nom : "Aucun événement"}
              displayMode={displayMode}
              changeDisplayMode={this.changeDisplayMode}
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
              {this.state.items.map((evenement, i) => {
                return (
                  <DataListView
                    key={evenement.id}
                    evenement={evenement}
                    toggleModalVoir={this.toggleModalVoir}
                    setEvent={this.setEvent}
                    idClasse={parseInt(eleve.classe.id)}
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
                toggleModalVoir={this.toggleModalVoir}
                evenement={this.state.evenement}
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

export default withRouter(connect(mapStateToProps, { logoutUser })(event));
// export default event;

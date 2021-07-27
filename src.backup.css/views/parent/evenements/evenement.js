import React, { Component, Fragment } from "react";
import { Row, Label } from "reactstrap";

import axios from "axios";
// import "./table.css"
import DataListView from "../../../containers/tuteur/gst_event/DataListView";
import Pagination from "../../../containers/tuteur/gst_event/Pagination";
import ListPageHeading from "../../../containers/tuteur/gst_event/ListPageHeading";
import Modal from "../../../containers/tuteur/gst_event/Modal";


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
      dropdownSplitOpen: false,
      modalOpen: false,
      currentPage: 1,
      totalItemCount: 0,
      totalPage: 3,
      search: "",
      lastChecked: null,
      isLoading: true,

      modalOpenVoir: false,

    };
  }
  componentWillMount() {
    this.dataListRender();

  }


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
      search,

    } = this.state;

    var query = "http://api.onyx.inedit-gd.tn/event/getAll?";
    query += "count=" + selectedPageSize
    query += "&page=" + currentPage
    query += "&order=" + selectedOrderOption.column
    query += "&search=" + search;
    // query += "&event=" + 34;

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
          console.log(error)
        });
    }
    catch (error) {
      console.log("failed" + error)
    }
  }




  chercher = (event) => {
    this.setState({ search: event.target.value }, this.dataListRender)
  }


  toggleModalVoir = () => {
    this.setState({
      modalOpenVoir: !this.state.modalOpenVoir
    });

  };
  setEvent = evenement => {
    this.setState({ evenement });
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
      search,
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
              heading={"Tous les événements"}
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

            />



            <Row>

              <div className="search-sm d-inline-block float-md-left mr-1 mb-1 align-top">
                <input
                  type="text"
                  name="keyword"
                  id="search"
                  placeholder="Rechercher un titre"
                  value={search}
                  onChange={this.chercher}
                />
              </div>




              {this.state.items.map((evenement, i) => {
                return (
                  <DataListView
                    key={evenement.id}
                    evenement={evenement}
                    toggleModalVoir={this.toggleModalVoir}
                    setEvent={this.setEvent}
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
              />

            </Row>
          </div>

        </Fragment>
      );
  }
}
export default event;

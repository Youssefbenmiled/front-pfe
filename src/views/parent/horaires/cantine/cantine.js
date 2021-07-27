
import React, { Component, Fragment } from "react";
import { Row, Card, CardBody, CardTitle, Table } from "reactstrap";
import axios from "axios";
import DataListView from "../../../../containers/tuteur/horaires/gst_cantine/DataListView";
import Pagination from "../../../../containers//Pagination";
import ListPageHeading from "../../../../containers/tuteur/horaires/gst_cantine/ListPageHeading";
import {
  logoutUser,
} from "../../../../redux/actions";
import { Route, withRouter, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";



class gst_cantine extends Component {
  constructor(props) {
    super(props);

    this.state = {
      exam: [],
      selectedPageSize: 10,


      orderOptions: [
        { column: "id", label: "Identifiant" },
        { column: "delaisDebut", label: "Date début" },
        { column: "delaisFin", label: "Date fin" },


      ],

      pageSizes: [1, 2, 5, 10, 20, 30, 50, 100],

      selectedOrderOption: { column: "delaisDebut", label: "Date début" },




      currentPage: 1,
      totalItemCount: 0,
      totalPage: 1,
      isLoading: true,
      items: [],
      cantine: [],




    };
  }


  componentWillMount() {

    try {
      axios
        .get("http://api.onyx.inedit-gd.tn/tuteur/get/" + parseInt(localStorage.getItem('user_id')))
        .then(res => res.data)
        .then(data => {
          this.dataListRender();

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
    } = this.state;


    var query = "http://api.onyx.inedit-gd.tn/cantine/getAll?";
    query += "count=" + selectedPageSize
    query += "&page=" + currentPage
    query += "&order=" + selectedOrderOption.column



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
      this.setState({
        isLoading: false
      });
      return error;
    }
  }
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
      items

    } = this.state;
    const startIndex = (currentPage - 1) * selectedPageSize;
    const endIndex = currentPage * selectedPageSize;


    return this.state.isLoading ? (
      <div className="loading" />
    ) : (
        <Fragment>

          <div className="disable-text-selection">
            <ListPageHeading
              heading={items.length > 0 ? "Tous les menus de la cantine" : "Aucun menu"}
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
              {this.state.items.map((cantine, i) => {

                return (
                  <DataListView
                    key={cantine.id}
                    cantine={cantine}
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

export default withRouter(connect(mapStateToProps, { logoutUser })(gst_cantine));
// export default gst_cantine;
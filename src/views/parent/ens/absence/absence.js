import React, { Component, Fragment } from "react";
import { Row } from "reactstrap";
import axios from "axios";
import DataListView from "../../../../containers/tuteur/enseignement/gst_abs/DataListView";
import Pagination from "../../../../containers/Pagination";
import ListPageHeading from "../../../../containers/tuteur/enseignement/gst_abs/ListPageHeading";
import {
  logoutUser,
} from "../../../../redux/actions";
import { Route, withRouter, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";

class absence extends Component {
  constructor(props) {
    super(props);

    this.state = {

      feuille: [],
      selectedPageSize: 10,


      orderOptions: [
        { column: "dateB", label: "Dates proches" },
        { column: "dateA", label: "Dates anciennes" },
      ],


      pageSizes: [1, 2, 5, 10, 20, 30, 50, 100],

      selectedOrderOption: { column: "dateB", label: "Dates proches" },

      currentPage: 1,
      totalItemCount: 0,
      totalPage: 1,

      isLoading: true,
      items: [],
      classe: [],
      modalOpenVoir: false,
      eleve: [],
      data: []

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



  setFeuille = (feuille) => {
    this.setState({ feuille })
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
  toggleModalVoir = () => {
    // if (feuille)
    //   this.setState({
    //     modalOpenVoir: !this.state.modalOpenVoir, feuille
    //   });
    // else
    this.setState({
      modalOpenVoir: !this.state.modalOpenVoir
    });

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
    } = this.state;


    var query = "http://api.onyx.inedit-gd.tn/feuille/presence/getAll?";
    query += "count=" + selectedPageSize
    query += "&page=" + currentPage
    query += "&order=" + selectedOrderOption.column
    query += "&eleve=" + parseInt(eleve.id)


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
      modalOpenVoir,
      eleve,
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
              heading={items.length > 0 && eleve ? "Les absences de l'éléve " + eleve.Nom + " " + eleve.prenom : "Aucune absence"}
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
              {this.state.items.map((feuille, i) => {

                return (
                  <DataListView
                    key={feuille.id}
                    feuille={feuille}
                    setFeuille={this.setFeuille}
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

export default withRouter(connect(mapStateToProps, { logoutUser })(absence));
// export default absence;

import React, { Component, Fragment } from "react";
import { Row, Card, CardBody, CardTitle, Table } from "reactstrap";
import axios from "axios";
import Select from "react-select";
import DataListView from "../../../../containers/tuteur/enseignement/gst_date/DataListView";
import Pagination from "../../../../containers/Pagination";
import ListPageHeading from "../../../../containers/tuteur/enseignement/gst_date/ListPageHeading";
import Modal from "../../../../containers/tuteur/enseignement/gst_date/Modal";
import {
  logoutUser,
} from "../../../../redux/actions";
import { Route, withRouter, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";


class gst_evaluation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: "",
      exam: [],
      selectedPageSize: 10,


      orderOptions: [
        // { column: "id", label: "Identifiant" },
        { column: "trimestre", label: "Trimestre" },
        { column: "date", label: "Date d'évaluation" },

      ],
      pageSizes: [1, 2, 5, 10, 20, 30, 50, 100],

      selectedOrderOption: { column: "date", label: "Date d'évaluation" },


      currentPage: 1,
      totalItemCount: 0,
      totalPage: 1,

      isLoading: true,
      items: [],
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
          this.getEns(this.state.eleve)

        }, error => {

        })
    } catch (error) {

    }
  }


  onSearchKey = e => {
    this.setState(
      {
        search: e.target.value.toLowerCase()
      },
      () => this.dataListRender(this.state.eleve)
    );

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

  toggleModalVoir = () => {
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



  getEns(eleve) {

    var query = "http://api.onyx.inedit-gd.tn/enseignant/getAll?niveau=" + parseInt(eleve.classe.niveau);

    try {
      axios
        .get(query)
        .then(res => {
          return res.data;
        })
        .then(data => {
          this.setState({

            ensts: data.list
          }, () => this.dataListRender(eleve));
        }, error => {
          return error;
        });
    }
    catch (error) {
      return error;
    }
  }

  dataListRender(eleve) {
    const {
      selectedPageSize,
      currentPage,
      selectedOrderOption,
      search,
    } = this.state;


    var query = "http://api.onyx.inedit-gd.tn/evaluation/getAll?";
    query += "count=" + selectedPageSize
    query += "&page=" + currentPage
    query += "&order=" + selectedOrderOption.column
    query += "&search=" + search
    query += "&classe=" + eleve.classe.id



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
  setExam = (exam) => {
    this.setState({ exam })
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
      items,
      eleve

    } = this.state;
    const startIndex = (currentPage - 1) * selectedPageSize;
    const endIndex = currentPage * selectedPageSize;


    // const ens = ensts.map(e => {
    //   return { label: e.nom + " " + e.prenom, value: e.id }
    // })


    return this.state.isLoading ? (
      <div className="loading" />
    ) : (
        <Fragment>
          <div className="disable-text-selection">

            <ListPageHeading
              heading={items.length > 0 ? "Les dates d'évaluation de la classe " + eleve.classe.niveau + " " + eleve.classe.nom : "Aucune date d'évaluation"}
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
              {this.state.items.map((exam, i) => {

                return (
                  <DataListView
                    key={exam.id}
                    exam={exam}
                    setExam={this.setExam}
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
                exam={this.state.exam}
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

export default withRouter(connect(mapStateToProps, { logoutUser })(gst_evaluation));
// export default gst_evaluation;




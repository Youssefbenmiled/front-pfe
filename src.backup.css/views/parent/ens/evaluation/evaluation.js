
import React, { Component, Fragment } from "react";
import { Row, Card, CardBody, CardTitle, Table } from "reactstrap";
// import "./table.css";
import axios from "axios";
import Select from "react-select";
import DataListView from "../../../../containers/tuteur/enseignement/gst_date/DataListView";
import Pagination from "../../../../containers/tuteur/enseignement/gst_date/Pagination";
import ListPageHeading from "../../../../containers/tuteur/enseignement/gst_date/ListPageHeading";
import Modal from "../../../../containers/tuteur/enseignement/gst_date/Modal";



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
        { column: "date", label: "Date" },

      ],
      pageSizes: [1, 2, 5, 10, 20, 30, 50, 100],

      selectedOrderOption: { column: "date", label: "Date" },

      dropdownSplitOpen: false,
      ensts: [],
      currentPage: 1,
      totalItemCount: 0,
      totalPage: 1,
      search: "",
      selectedItems: [],
      isLoading: true,
      items: [],
      dates: [],
      modalOpenVoir: false,
      valueNiveau: { label: "Toutes les dates d'évaluation", value: -1 },




    };
  }


  componentWillMount() {
    this.dataListRender();
    this.getEns();

  }

  chercher = event => {
    this.setState({ search: event.target.value }, this.dataListRender)
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
      () => this.dataListRender()
    );
  };



  getEns() {

    var query = "http://api.onyx.inedit-gd.tn/enseignant/getAll?niveau=" + 1;

    try {
      axios
        .get(query)
        .then(res => {
          return res.data;
        })
        .then(data => {
          this.setState({

            dates: [{ id: -1, nom: "Toutes les dates d'évaluation", prenom: "" }].concat(data.list),

          });
        }, error => {
          console.log(error)
        });
    }
    catch (error) {
      console.log("failed" + error)
    }
  }

  dataListRender() {
    const {
      selectedPageSize,
      currentPage,
      selectedOrderOption,
      search
    } = this.state;



    var query = "http://api.onyx.inedit-gd.tn/evaluation/getAll?";
    query += "count=" + selectedPageSize
    query += "&page=" + currentPage
    query += "&order=" + selectedOrderOption.column
    query += "&search=" + search
    query += "&classe=" + 31



    this.setState({ items: [] })

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
      console.log("failed" + error)
    }
  }
  setExam = (exam) => {
    this.setState({ exam })
  }
  handleChangeNiveau = value => {
    this.setState({
      valueNiveau: value,
    }, this.dataListRender);

  };
  getEns() {

    var query = "http://api.onyx.inedit-gd.tn/enseignant/getAll?niveau=" + 1;




    try {
      axios
        .get(query)
        .then(res => {
          return res.data;
        })
        .then(data => {
          this.setState({

            ensts: [{ id: -1, nom: "Toutes les dates d'évaluation", prenom: "" }].concat(data.list),

          });
        }, error => {
          console.log(error)
        });
    }
    catch (error) {
      console.log("failed" + error)
    }
  }


  render() {




    const {
      currentPage,
      selectedPageSize,
      totalItemCount,
      selectedOrderOption,
      orderOptions,
      pageSizes,
      modalOpenVoir,
      search,
      valueNiveau,
      ensts
    } = this.state;
    const startIndex = (currentPage - 1) * selectedPageSize;
    const endIndex = currentPage * selectedPageSize;
    const devs = ensts.map((e, i) => {
      return { label: e.nom + " " + e.prenom, value: e.id }
    })
    return this.state.isLoading ? (
      <div className="loading" />
    ) : (
        <Fragment>


          <label>
            <h3>Affichage :</h3>
          </label>

          <Select
            onChange={this.handleChangeNiveau}
            value={valueNiveau}
            options={devs}
            className="react-select"
            classNamePrefix="react-select"
            name="form-field-name"
            required
          />


          <div className="disable-text-selection">

            <ListPageHeading
              heading={valueNiveau.value == -1 ? "Toues Les dates d'évaluation de la classe 1 B" : "Les dates d'évaluation de Mr/Mme " + valueNiveau.label}
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
                  placeholder="Rechercher domaine"
                  value={search}
                  onChange={this.chercher}
                />
              </div>

              {this.state.items.map((exam, i) => {

                return (


                  <DataListView
                    key={exam.id}
                    exam={exam}
                    setExam={this.setExam}
                    toggleModalVoir={this.toggleModalVoir}
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

              />
            </Row>
          </div>






        </Fragment>
      );
  }
}
export default gst_evaluation;




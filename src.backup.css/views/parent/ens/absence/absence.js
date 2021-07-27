
import React, { Component, Fragment } from "react";
import { Row } from "reactstrap";
// import "./table.css";
import axios from "axios";
import Select from "react-select";
import DataListView from "../../../../containers/tuteur/enseignement/gst_abs/DataListView";
import Pagination from "../../../../containers/tuteur/enseignement/gst_abs/Pagination";
import ListPageHeading from "../../../../containers/tuteur/enseignement/gst_abs/ListPageHeading";
import Modal from "../../../../containers/tuteur/enseignement/gst_abs/Modal";

class absence extends Component {
  constructor(props) {
    super(props);
    let nb = (new Date().getMonth());
    let ochhra = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
    let chhar = ochhra[nb];
    this.state = {
      displayMode: "list",
      feuille: [],
      selectedPageSize: 10,


      orderOptions: [
        { column: "semestre", label: "Trimestre" },
        { column: "dateEnvoi", label: "Date d'envoi" },
        { column: 1, label: "Janvier" },
        { column: 2, label: "Février" },
        { column: 3, label: "Mars" },
        { column: 4, label: "Avril" },
        { column: 5, label: "Mai" },
        { column: 6, label: "Juin" },
        { column: 7, label: "Juillet" },
        { column: 8, label: "Août" },
        { column: 9, label: "Septembre" },
        { column: 10, label: "Octobre" },
        { column: 11, label: "Novembre" },
        { column: 12, label: "Décembre" },

      ],


      pageSizes: [1, 2, 5, 10, 20, 30, 50, 100],

      selectedOrderOption: { column: 6, label: chhar },
      dropdownSplitOpen: false,

      currentPage: 1,
      totalItemCount: 0,
      totalPage: 1,
      search: "",
      selectedItems: [],
      lastChecked: null,
      isLoading: true,
      items: [],
      classe: [],
      valueEns: { label: "Toutes les absences", value: -1, niveau: -1 },
      feuils: [],
      modalOpenVoir: false,
    };
  }


  componentWillMount() {
    this.dataListRender();
    this.getEns();


  }

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

            feuils: [{ id: -1, nom: "Toutes les absences", prenom: "" }].concat(data.list),

          });
        }, error => {
          console.log(error)
        });
    }
    catch (error) {
      console.log("failed" + error)
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
  toggleModalVoir = (feuille) => {
    if (feuille)
      this.setState({
        modalOpenVoir: !this.state.modalOpenVoir, feuille
      });
    else
      this.setState({
        modalOpenVoir: !this.state.modalOpenVoir
      });

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

  handleChangeEns = value => {
    this.setState({
      valueEns: value,

    }, this.dataListRender);

  };
  dataListRender() {
    const {
      selectedPageSize,
      currentPage,
      selectedOrderOption,
      valueEns
    } = this.state;


    var query = "http://api.onyx.inedit-gd.tn/classe/getAll?";
    query += "count=" + selectedPageSize
    query += "&page=" + currentPage
    query += "&order=" + selectedOrderOption.column

    if (valueEns && valueEns.value > -1) {
      query += "&ids=" + valueEns.value
    }
    try {
      axios
        .get(query)
        .then(res => res.data)
        .then(data => {
          this.setState({
            totalItemCount: data.count,
            totalPage: Math.ceil(data.count / selectedPageSize),
            items: this.state.items.concat(data.list),
            isLoading: false
          });
        });
    } catch (error) {
      console.log("failed" + error)
    }
  }


  render() {




    const {
      currentPage,
      displayMode,
      selectedPageSize,
      totalItemCount,
      selectedOrderOption,
      selectedItems,
      orderOptions,
      pageSizes,
      valueEns,
      feuils,
      modalOpenVoir,

    } = this.state;
    const { match } = this.props;
    const startIndex = (currentPage - 1) * selectedPageSize;
    const endIndex = currentPage * selectedPageSize;

    const devs = feuils.map(f => {
      return { label: f.nom + " " + f.prenom, value: f.id }
    })

    return this.state.isLoading ? (
      <div className="loading" />
    ) : (
        <Fragment>

          <label>
            <h3>Affichage :</h3>
          </label>

          <Select
            onChange={this.handleChangeEns}
            value={valueEns}
            options={devs}
            className="react-select"
            classNamePrefix="react-select"
            name="form-field-name"
            required
          />



          <div className="disable-text-selection">

            <ListPageHeading
              heading={valueEns.value === -1 ? "Toutes les absences" : "Les absences marquées par " + valueEns.label}
              // displayMode={displayMode}
              // changeDisplayMode={this.changeDisplayMode}
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
                    idEns={valueEns && valueEns.value}
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
                toggleModalVoir={this.toggleModalVoir}
                feuille={this.state.feuille}

              />


            </Row>
          </div>






        </Fragment>
      );
  }
}
export default absence;
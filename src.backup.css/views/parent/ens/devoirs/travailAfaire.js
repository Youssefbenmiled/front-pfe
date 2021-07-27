import React, { Component, Fragment } from "react";
import { Row, Card, CardBody, CardTitle, Table } from "reactstrap";
import { Colxx, Separator } from "../../../../components/common/CustomBootstrap";
// import "./table.css";
import axios from "axios";
import Select from "react-select";
import DataListView from "../../../../containers/tuteur/enseignement/gst_devoir/DataListView";
import Pagination from "../../../../containers/tuteur/enseignement/gst_devoir/Pagination";
import ListPageHeading from "../../../../containers/tuteur/enseignement/gst_devoir/ListPageHeading";
import Modal from "../../../../containers/tuteur/enseignement/gst_devoir/Modal";


class gst_devoir extends Component {
  constructor(props) {
    super(props);

    this.state = {

      selectedPageSize: 5,

      orderOptions: [
        // { column: "id", label: "Identifiant" },
        { column: "dateEnvoi", label: "Date d'envoi" },
        { column: "dateEcheance", label: "Date d'échéance" },
        { column: "trimestre", label: "Trimestre" },

      ],
      pageSizes: [1, 2, 5, 10, 20, 30, 50, 100],

      selectedOrderOption: { column: "dateEcheance", label: "Date d'échéance" },
      dropdownSplitOpen: false,
      currentPage: 1,
      totalItemCount: 0,
      totalPage: 1,
      search: "",
      isLoading: true,
      items: [],
      devoir: [],
      valueNiveau: { label: "Tous les travaux à faire", value: -1, niveau: -1 },
      classet: [],
      ensts: [],
      modalOpenVoir: false,



    };
  }


  componentWillMount() {
    this.dataListRender();
    this.getEns()

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

  setClasse = classe => {
    this.setState({ classe });
  };

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

            ensts: [{ id: -1, nom: "Tous les travaux à faire", prenom: "" }].concat(data.list),

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
      valueNiveau,
      search
    } = this.state;
    this.setState({ items: [] })

    var query = "http://api.onyx.inedit-gd.tn/travail/getAll?";
    query += "count=" + selectedPageSize
    query += "&page=" + currentPage
    query += "&order=" + selectedOrderOption.column
    query += "&search=" + search

    if (valueNiveau.value > -1) {
      query += "&travail=" + valueNiveau.value
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
            selectedItems: [],
            isLoading: false
          });
        });
    } catch (error) {
      console.log("failed" + error)
    }
  }

  setDevoir = (devoir) => {
    this.setState({ devoir })
  }


  chercher = (event) => {
    this.setState({ search: event.target.value }, this.dataListRender)
  }
  render() {



    const {
      currentPage,
      selectedPageSize,
      totalItemCount,
      selectedOrderOption,
      orderOptions,
      pageSizes,
      valueNiveau,
      search,
      modalOpenVoir,
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
              heading={valueNiveau.value === -1 ? "Tous les travaux à faire" : "Les travaux à faire de Mr/Mme " + valueNiveau.label}
              changeOrderBy={this.changeOrderBy}
              changePageSize={this.changePageSize}
              selectedPageSize={selectedPageSize}
              totalItemCount={totalItemCount}
              selectedOrderOption={selectedOrderOption}
              startIndex={startIndex}
              endIndex={endIndex}
              orderOptions={orderOptions}
              pageSizes={pageSizes}
              idClasse={valueNiveau && valueNiveau.value}

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



              {this.state.items.map((devoir, i) => {

                return (


                  <DataListView
                    key={devoir.id}
                    devoir={devoir}
                    isSelect={this.state.selectedItems.includes(devoir.id)}
                    onCheckItem={this.onCheckItem}
                    setDevoir={this.setDevoir}
                    idClasse={valueNiveau && valueNiveau.value}
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
                devoir={this.state.devoir}

              />

            </Row>
          </div>






        </Fragment>
      );
  }
}
export default gst_devoir;
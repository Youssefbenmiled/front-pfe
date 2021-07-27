import React, { Component, Fragment } from "react";
import { Row, Card, CardBody, CardTitle, Table, Label } from "reactstrap";
// import "./table.css";
import axios from "axios";
import { levels, empcls } from "../../../../constants/defaultValues";
import Select from "react-select";
import DataListView from "../../../../containers/ens/gestion_notes/DataListView";
import Pagination from "../../../../containers/ens/gestion_notes/Pagination";
import ListPageHeading from "../../../../containers/ens/gestion_notes/ListPageHeading";
import AddNewModal from "../../../../containers/ens/gestion_notes/AddNewModal";
import DeleteModal from "../../../../containers/ens/gestion_notes/DeleteModal";

function collect(props) {
  return { data: props.data };
}

class notes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      classet: [],

      displayMode: "list",

      selectedPageSize: 10,
      orderOptions: [
        { column: "id", label: "Identifiant" },
        { column: "niveau", label: "Niveau" },
      ],
      pageSizes: [1, 2, 5, 10, 20, 30, 50, 100],




      selectedOrderOption: { column: "id", label: "Identifiant" },
      dropdownSplitOpen: false,
      modalOpen: false,
      modalOpenUpdate: false,
      modalOpenDelete: false,
      currentPage: 1,
      totalItemCount: 0,
      totalPage: 1,
      selectedItems: [],
      lastChecked: null,
      isLoading: false,

      emploi: [],
      valueType: { label: "Toutes les notes", value: "*" },
      valueNiveau: null,
      valueClasse: null,
      items: [],

    };
  }
  componentWillMount() {
    this.dataListRender();

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

  onCheckItem = (event, id) => {


    let selectedItems = this.state.selectedItems;
    if (selectedItems.includes(id)) {
      selectedItems = selectedItems.filter(x => x !== id);
    } else {
      selectedItems.push(id);
    }
    this.setState({
      selectedItems
    });


  };



  classes(niveau) {
    try {
      axios
        .get(
          "http://api.onyx.inedit-gd.tn/classe/classe/" + niveau)
        .then(res => {
          console.log(res)
          return res.data;
        })
        .then(data => {
          this.setState({
            classet: data,

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
      valueClasse,
      valueType
    } = this.state;

    if (valueType.value != "*" && !valueClasse) {
      this.classes(valueType.value)
      this.setState({ items: [] });
      return;
    }
    var query = "http://api.onyx.inedit-gd.tn/emploi/getAll?";
    query += "count=" + selectedPageSize
    query += "&page=" + currentPage
    query += "&order=" + selectedOrderOption.column

    if (valueClasse && valueClasse.value) {
      query += "&classe=" + valueClasse.value
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
            isLoading: true
          });
        });
    } catch (error) {
      console.log("failed" + error)
    }
  }

  onContextMenuClick = (e, data, target) => {
    // console.log(
    //   "onContextMenuClick - selected items",
    //   this.state.selectedItems
    // );
    // console.log("onContextMenuClick - action : ", data.action);
  };

  onContextMenu = (e, data) => {
    const clickedProductId = data.data;
    if (!this.state.selectedItems.includes(clickedProductId)) {
      this.setState({
        selectedItems: [clickedProductId]
      });
    }

    return true;
  };


  setEmploi = emploi => {
    this.setState({ emploi });
  };
  handleChangeType = value => {
    this.setState({
      valueType: value,
      valueNiveau: null,
      valueClasse: null,
      selectedItems: []

    }, this.dataListRender);


  };

  handleChangeClasse = value => {
    this.setState({
      valueClasse: value,
      selectedItems: []
    }, this.dataListRender);
  };

  setST = (selectedItems) => {
    this.setState({ selectedItems })
  }
  render() {



    const cls = this.state.classet.map((classe, i) => {
      return { label: classe.Nom, value: classe.id };
    })


    const {
      currentPage,
      items,
      displayMode,
      selectedPageSize,
      totalItemCount,
      selectedOrderOption,
      selectedItems,
      orderOptions,
      pageSizes,
      modalOpen,
      modalOpenDelete,
      valueType,
      valueClasse,
      emploi
    } = this.state;

    const { match } = this.props;
    const startIndex = (currentPage - 1) * selectedPageSize;
    const endIndex = currentPage * selectedPageSize;
    return !this.state.isLoading ? (
      <div className="loading" />
    ) : (
        <Fragment>
          <Label>
            <h3>Affichage :</h3>
          </Label>
          <Select
            onChange={this.handleChangeType}
            value={this.state.valueType}
            options={empcls}
            className="react-select"
            classNamePrefix="react-select"
            name="form-field-name"

          />

          {valueType && valueType.value != "*" &&
            <>
              <br></br>
              <Label>
                <h3>Classe :</h3>
              </Label>
              <Select
                onChange={this.handleChangeClasse}
                value={this.state.valueClasse}
                options={cls}
                className="react-select"
                placeholder="Sélectionner une classe..."
                classNamePrefix="react-select"
                name="form-field-name"

              />
            </>
          }
          <div className="disable-text-selection">
            <ListPageHeading
              heading={!valueClasse ? "Toutes les notes" : "Les notes de " + this.state.valueType.label + " " + this.state.valueClasse.label}
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
              selectedItemsLength={selectedItems ? selectedItems.length : 0}
              itemsLength={items ? items.length : 0}
              orderOptions={orderOptions}
              pageSizes={pageSizes}
              toggleModal={this.toggleModal}
              toggleModalDelete={this.toggleModalDelete}
              selectedItemsUpdate={this.state.selectedItems.length == 1}
              selectedItemsDelete={this.state.selectedItems.length > 0}
              classe={this.state.valueClasse ? this.state.valueClasse : null}
              items={items ? items : null}
              isSelect={this.state.selectedItems.includes(this.state.emploi.id)}

            />


            <DeleteModal
              modalOpen={modalOpenDelete}
              toggleModal={this.toggleModalDelete}
              selectedItems={this.state.selectedItems.length == 1}
              setSt={this.setST}
              classe={this.state.valueClasse ? this.state.valueClasse : null}
              niveau={this.state.valueClasse ? this.state.valueType.value : null}
              items={items ? items : null}
              callback={() => this.dataListRender()}

            />

            <AddNewModal
              modalOpen={modalOpen}
              toggleModal={this.toggleModal}
              classe={this.state.valueClasse ? this.state.valueClasse : null}
              niveau={this.state.valueClasse ? this.state.valueType.value : null}
              callback={() => this.dataListRender()}
            />

            <Row>


              {this.state.items.map((emploi, i) => {
                return (

                  <DataListView
                    key={emploi.id}
                    emploi={emploi}
                    isSelect={this.state.selectedItems.includes(emploi.id)}
                    onCheckItem={this.onCheckItem}
                    setEmploi={this.setEmploi}
                    collect={collect}
                    classe={this.state.valueClasse ? this.state.valueClasse : null}

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
export default notes;

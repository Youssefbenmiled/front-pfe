
import React, { Component, Fragment } from "react";
import { Row, Card, CardBody, CardTitle, Table } from "reactstrap";
import { Colxx, Separator } from "../../../../components/common/CustomBootstrap";
import axios from "axios";
import Select from "react-select";
import DataListView from "../../../../containers/ens/travailAfaire/DataListView";
import Pagination from "../../../../containers/Pagination";
import ContextMenuContainer from "../../../../containers/ContextMenuContainer";
import ListPageHeading from "../../../../containers/ens/travailAfaire/ListPageHeading";
import AddNewModal from "../../../../containers/ens/travailAfaire/AddNewModal";
import UpdateModal from "../../../../containers/ens/travailAfaire/UpdateModal";
import DeleteModal from "../../../../containers/ens/travailAfaire/DeleteModal";
import Modal from "../../../../containers/ens/travailAfaire/Modal";
import {
  logoutUser,
} from "../../../../redux/actions";
import { Route, withRouter, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
function collect(props) {
  return { data: props.data };
}

class gst_devoir extends Component {
  constructor(props) {
    super(props);

    this.state = {
      displayMode: "list",

      selectedPageSize: 10,

      // orderOptions: [
      //   { column: "id", label: "Identifiant" },
      //   { column: "niveau", label: "Niveau" },
      //   { column: "trimestre", label: "Trimestre" },
      //   { column: "dateEcheance", label: "Date d'échéance" },
      //   { column: "dateEnvoi", label: "Date d'envoi" },

      // ],

      orderOptions2: [
        { column: "dateEnvoi", label: "Date d'envoi" },
        { column: "dateEcheance", label: "Date d'échéance" },
        { column: "trimestre", label: "Trimestre" },

      ],
      pageSizes: [1, 2, 5, 10, 20, 30, 50, 100],

      selectedOrderOption: { column: "trimestre", label: "Trimestre" },

      modalOpen: false,
      modalOpenUpdate: false,
      modalOpenDelete: false,
      currentPage: 1,
      totalItemCount: 0,
      totalPage: 1,
      search: "",
      selectedItems: [],
      isLoading: true,
      items: [],
      devoir: [],
      valueNiveau: {},
      classet: [],

      modalOpenVoir: false,



    };
  }


  componentWillMount() {

    try {
      axios
        .get("http://api.onyx.inedit-gd.tn/enseignant/get/" + parseInt(localStorage.getItem('user_id')))
        .then(res => res.data)
        .then(data => {

          this.setState({ classet: data.classe })
          this.dataListRender(data.classe);

        }, error => {

        })
    } catch (error) {
    }
  }



  toggleModal = () => {
    this.setState({
      modalOpen: !this.state.modalOpen
    }, this.setST);

  };

  toggleModalUpdate = () => {
    this.setState({
      modalOpenUpdate: !this.state.modalOpenUpdate
    });

  };
  setST = () => {
    this.setState({ selectedItems: [] })
  }

  toggleModalDelete = () => {
    this.setState({

      modalOpenDelete: !this.state.modalOpenDelete
    });
  };
  toggleModalVoir = () => {
    this.setState({
      modalOpenVoir: !this.state.modalOpenVoir
    });

  };
  changeOrderBy = column => {

    this.setState(
      {
        selectedOrderOption: this.state.orderOptions2.find(
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

  onSearchKey = e => {
    this.setState(
      {
        search: e.target.value.toLowerCase()
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


  onContextMenuClick = (e, data, target) => {
    if (data.action === "details") {
      this.toggleModalVoir()
    } else if (data.action === "edit") {
      this.toggleModalUpdate()
    } else if (data.action === "delete") {
      this.toggleModalDelete();
    }
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

  setClasse = classe => {
    this.setState({ classe });
  };

  handleChangeNiveau = value => {
    this.setState({
      valueNiveau: value,
      selectedItems: [],

    }, this.dataListRender);

  };


  dataListRender(param) {
    const {
      selectedPageSize,
      currentPage,
      selectedOrderOption,
      valueNiveau,
      search
    } = this.state;

    if (param) {
      this.setState({
        valueNiveau: { label: param[0].niveau + " " + param[0].Nom, value: param[0].id, niveau: parseInt(param[0].niveau) },
      })
    }

    var query = "http://api.onyx.inedit-gd.tn/travail/getAll?";
    query += "count=" + selectedPageSize
    query += "&page=" + currentPage
    query += "&order=" + selectedOrderOption.column
    query += "&search=" + search

    if (param)
      query += "&travail=" + param[0].id
    else
      query += "&travail=" + valueNiveau.value

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
            isLoading: false,
          });
        });
    } catch (error) {
      return error;
    }
  }

  setDevoir = (devoir) => {
    this.setState({ devoir })
  }
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
      selectedItems,
      orderOptions2,
      pageSizes,
      modalOpen,
      modalOpenUpdate,
      modalOpenDelete,
      valueNiveau,
      classet,
      modalOpenVoir
    } = this.state;


    const { match } = this.props;
    const startIndex = (currentPage - 1) * selectedPageSize;
    const endIndex = currentPage * selectedPageSize;

    const cls = classet.map((classe, i) => {
      return { label: classe.niveau + " " + classe.Nom, value: classe.id, niveau: parseInt(classe.niveau) }
    })
    return this.state.isLoading ? (
      <div className="loading" />
    ) : (
        <Fragment>

          <label>
            <h3>Classe :</h3>
          </label>

          <Select
            onChange={this.handleChangeNiveau}
            value={valueNiveau}
            options={cls}
            className="react-select"
            classNamePrefix="react-select"
            name="form-field-name"
            required
          />



          <div className="disable-text-selection">

            {cls.length > 0 &&
              <ListPageHeading
                heading={valueNiveau.value && items.length > 0 ? "Les travaux à faire de la classe " + valueNiveau.label : "Aucun travail à faire"}
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
                onSearchKey={this.onSearchKey}
                orderOptions={orderOptions2}
                pageSizes={pageSizes}
                toggleModal={this.toggleModal}
                toggleModalUpdate={this.toggleModalUpdate}
                toggleModalDelete={this.toggleModalDelete}
                idClasse={cls.length > 0 && valueNiveau && valueNiveau.value}
                toggleModalVoir={this.toggleModalVoir}

              />
            }

            <AddNewModal
              modalOpen={modalOpen}
              toggleModal={this.toggleModal}
              callback={() => this.dataListRender()}
              niveau={valueNiveau.value > 0 && valueNiveau.niveau}
              idClasse={valueNiveau.value > 0 && valueNiveau.value}
              handleLogout={this.handleLogout}

            />


            <UpdateModal
              modalOpen={modalOpenUpdate}
              toggleModal={this.toggleModalUpdate}
              callback={() => this.dataListRender()}
              setST={this.setST}
              devoir={this.state.devoir}
              niveau={valueNiveau.value > 0 && valueNiveau.niveau}
              idClasse={valueNiveau.value > 0 && valueNiveau.value}
              handleLogout={this.handleLogout}

            />

            <DeleteModal
              modalOpen={modalOpenDelete}
              toggleModal={this.toggleModalDelete}
              callback={() => this.dataListRender()}
              selectedItems={this.state.selectedItems}
              setST={this.setST}
              devoir={this.state.devoir}
              handleLogout={this.handleLogout}

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
                    collect={collect}
                    // idClasse={valueNiveau.value > 0 && valueNiveau.value}
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

              <ContextMenuContainer
                onContextMenuClick={this.onContextMenuClick}
                onContextMenu={this.onContextMenu}
                selectedItems={this.state.selectedItems}
                toggleModalUpdate={this.toggleModalUpdate}
                toggleModalDelete={this.toggleModalDelete}
                toggleModalVoir={this.toggleModalVoir}

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
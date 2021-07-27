
import React, { Component, Fragment } from "react";
import { Row, Card, CardBody, CardTitle, Table } from "reactstrap";
import axios from "axios";
import Select from "react-select";
import DataListView from "../../../../containers/ens/gestion_abs/DataListView";
import Pagination from "../../../../containers/Pagination";
import ContextMenuContainer from "../../../../containers/ContextMenuContainer";
import ListPageHeading from "../../../../containers/ens/gestion_abs/ListPageHeading";
import AddNewModal from "../../../../containers/ens/gestion_abs/AddNewModal";
import UpdateModal from "../../../../containers/ens/gestion_abs/UpdateModal";
import DeleteModal from "../../../../containers/ens/gestion_abs/DeleteModal";
import Modal from "../../../../containers/ens/gestion_abs/Modal";
import {
  logoutUser,
} from "../../../../redux/actions";
import { Route, withRouter, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";

function collect(props) {
  return { data: props.data };
}




class gst_abs extends Component {
  constructor(props) {
    super(props);
    // let nb = (new Date().getMonth());
    // let ochhra = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
    // let chhar = ochhra[nb];
    this.state = {

      feuille: [],
      selectedPageSize: 10,

      orderOptions2: [
        { column: "date", label: "Dates proches" },
        { column: "date", label: "Dates anciennes" },
      ],


      pageSizes: [1, 2, 5, 10, 20, 30, 50, 100],

      selectedOrderOption: { column: "date", label: "Dates proches" },

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
      classe: [],
      classet: [],
      data: [],
      modalOpenVoir: false,
    };
  }


  componentWillMount() {

    try {
      axios
        .get("http://api.onyx.inedit-gd.tn/enseignant/get/" + parseInt(localStorage.getItem('user_id')))
        .then(res => res.data)
        .then(data => {

          this.setState({ data })

          this.dataListRender(data.id);

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
  setFeuille = (feuille) => {
    this.setState({ feuille })
  }
  toggleModalDelete = () => {
    this.setState({

      modalOpenDelete: !this.state.modalOpenDelete
    });
  };

  changeOrderBy = column => {
    // if (this.state.valueNiveau.value === -1)
    //   this.setState(
    //     {
    //       selectedOrderOption: this.state.orderOptions.find(
    //         x => x.column === column
    //       )
    //     },
    //     () => this.dataListRender()
    //   );
    // else
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
  toggleModalVoir = (idc) => {
    if (idc)
      this.getEleves(idc)
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
    if (data.action === "details")
      this.toggleModalVoir()
    else if (data.action === "edit")
      this.toggleModalUpdate()
    else if (data.action === "delete")
      this.toggleModalDelete();

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


  dataListRender(idEns) {
    const {
      selectedPageSize,
      currentPage,
      selectedOrderOption,
    } = this.state;


    var query = "http://api.onyx.inedit-gd.tn/feuille/presence/getAll?";
    query += "count=" + selectedPageSize
    query += "&page=" + currentPage
    query += "&order=" + selectedOrderOption.column
    query += "&enseignant=" + idEns
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
      this.setState({

        isLoading: false
      });
      return error;
    }
  }
  getEleves(idClasse) {


    var query = "http://api.onyx.inedit-gd.tn/eleve/getAll?classe=" + idClasse;

    try {
      axios
        .get(query)
        .then(res => {
          return res.data;
        })
        .then(data => {
          this.setState({
            eleves: data.list,
          });
        }, error => {
          return error;
        });
    }
    catch (error) {
      return error;
    }
  }


  handleLogout = () => {
    this.props.logoutUser(this.props.history);
  };


  render() {


    const {
      currentPage,
      items,

      selectedPageSize,
      totalItemCount,
      selectedOrderOption,
      selectedItems,
      orderOptions2,
      pageSizes,
      modalOpen,
      modalOpenUpdate,
      modalOpenDelete,
      modalOpenVoir,
      data
    } = this.state;
    const { match } = this.props;
    const startIndex = (currentPage - 1) * selectedPageSize;
    const endIndex = currentPage * selectedPageSize;


    return this.state.isLoading ? (
      <div className="loading" />
    ) : (
        <Fragment>



          <div className="disable-text-selection">


            <ListPageHeading
              heading={items && items.length > 0 ? "Toutes Les feuilles d'appel" : "Aucune feuille d'appel"}


              changeOrderBy={this.changeOrderBy}
              changePageSize={this.changePageSize}
              selectedPageSize={selectedPageSize}
              totalItemCount={totalItemCount}
              selectedOrderOption={selectedOrderOption}
              match={match}
              startIndex={startIndex}
              endIndex={endIndex}
              selectedItemsLength={selectedItems ? selectedItems.length : 0}
              orderOptions={orderOptions2}
              pageSizes={pageSizes}
              toggleModal={this.toggleModal}
              toggleModalVoir={this.toggleModalVoir}
              toggleModalUpdate={this.toggleModalUpdate}
              toggleModalDelete={this.toggleModalDelete}


            />


            <AddNewModal
              modalOpen={modalOpen}
              toggleModal={this.toggleModal}
              callback={() => this.dataListRender(data.id)}
              classes={data.classe}
              domaines={data.domaine}
              handleLogout={this.handleLogout}

            />


            <UpdateModal
              modalOpen={modalOpenUpdate}
              toggleModal={this.toggleModalUpdate}
              callback={() => this.dataListRender(data.id)}
              setST={this.setST}
              classes={data.classe}
              domaines={data.domaine}
              feuille={this.state.feuille}
              handleLogout={this.handleLogout}

            />

            <DeleteModal
              modalOpen={modalOpenDelete}
              toggleModal={this.toggleModalDelete}
              callback={() => this.dataListRender(data.id)}
              selectedItems={this.state.selectedItems}
              setST={this.setST}
              feuille={this.state.feuille}
              handleLogout={this.handleLogout}

            />
            <Row>
              {items && items.map((feuille, i) => {

                return (


                  <DataListView
                    key={feuille.id}
                    feuille={feuille}
                    isSelect={this.state.selectedItems.includes(feuille.id)}
                    onCheckItem={this.onCheckItem}
                    setFeuille={this.setFeuille}
                    collect={collect}
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
                toggleModalVoir={this.toggleModalVoir}
                feuille={this.state.feuille}
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

export default withRouter(connect(mapStateToProps, { logoutUser })(gst_abs));
// export default gst_abs;
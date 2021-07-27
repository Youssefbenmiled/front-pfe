import React, { Component, Fragment } from "react";
import { Row, Card, CardBody, CardTitle, Table, Label } from "reactstrap";
import axios from "axios";
import Select from "react-select";
import DataListView from "../../../../containers/ecole/gestion_bus/DataListView";
import Pagination from "../../../../containers/Pagination";
import ContextMenuContainer from "../../../../containers/ContextMenuContainer";
import ListPageHeading from "../../../../containers/ecole/gestion_bus/ListPageHeading";
import AddNewModal from "../../../../containers/ecole/gestion_bus/AddNewModal";
import UpdateModal from "../../../../containers/ecole/gestion_bus/UpdateModal";
import DeleteModal from "../../../../containers/ecole/gestion_bus/DeleteModal";
import Modal from "../../../../containers/ecole/gestion_bus/Modal";
import {
  logoutUser,
} from "../../../../redux/actions";
import { Route, withRouter, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
function collect(props) {
  return { data: props.data };
}

class gst_bus extends Component {
  constructor(props) {
    super(props);

    this.state = {
      displayMode: "list",

      selectedPageSize: 10,
      orderOptions: [
        { column: "id", label: "Identifiant" },
        { column: "nbplace", label: "Nombre de places" },
      ],
      pageSizes: [1, 2, 5, 10, 20, 30, 50, 100],




      selectedOrderOption: { column: "nbplace", label: "Nombre de places" },
      dropdownSplitOpen: false,
      modalOpen: false,
      modalOpenUpdate: false,
      modalOpenDelete: false,
      currentPage: 1,
      totalItemCount: 0,
      totalPage: 1,
      search: "",
      selectedItems: [],
      lastChecked: null,
      isLoading: true,

      bus: [],

      items: [],
      modalOpenVoir: false

    };
  }
  componentWillMount() {
    try {
      axios
        .get("http://api.onyx.inedit-gd.tn/admins/get/" + parseInt(localStorage.getItem('user_id')))
        .then(res => res.data)
        .then(data => {
          if (data.roles.includes('ROLE_ORGANISATION'))
            this.dataListRender();
          else
            this.props.history.push('/ecole/accueil')
        });
    } catch (error) {
      return error;
    }

  }



  toggleModal = () => {
    this.setState({
      modalOpen: !this.state.modalOpen
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



  dataListRender() {
    const {
      selectedPageSize,
      currentPage,
      selectedOrderOption,
      search
    } = this.state;


    var query = "http://api.onyx.inedit-gd.tn/transport/getAll?";
    query += "count=" + selectedPageSize
    query += "&page=" + currentPage
    query += "&order=" + selectedOrderOption.column
    query += "&search=" + search



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
      return error;
    }
  }


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


  setBus = bus => {
    this.setState({ bus });
  };





  toggleModalVoir = () => {
    this.setState({
      modalOpenVoir: !this.state.modalOpenVoir
    });

  };
  toggleModalUpdate = () => {
    this.setState({
      modalOpenUpdate: !this.state.modalOpenUpdate
    });
  };
  toggleModalDelete = () => {
    this.setState({
      modalOpenDelete: !this.state.modalOpenDelete
    });
  };
  setST = () => {
    this.setState({ selectedItems: [] })
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
      orderOptions,
      pageSizes,
      modalOpen,
      modalOpenUpdate,
      modalOpenDelete,
      search,
      modalOpenVoir
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
              heading={items.length > 0 ? "Tous les bus" : "Aucun bus"}
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
              orderOptions={orderOptions}
              pageSizes={pageSizes}
              toggleModal={this.toggleModal}
              toggleModalUpdate={this.toggleModalUpdate}
              toggleModalDelete={this.toggleModalDelete}
              toggleModalVoir={this.toggleModalVoir}

            />


            <UpdateModal
              modalOpen={modalOpenUpdate}
              toggleModal={this.toggleModalUpdate}
              selectedItems={this.state.selectedItems}
              callback={() => this.dataListRender()}
              setST={this.setST}
              bus={this.state.bus}
              handleLogout={this.handleLogout}

            />


            <DeleteModal
              modalOpen={modalOpenDelete}
              toggleModal={this.toggleModalDelete}
              selectedItems={this.state.selectedItems}
              setST={this.setST}
              callback={() => this.dataListRender()}
              bus={this.state.bus}
              handleLogout={this.handleLogout}

            />

            <AddNewModal
              modalOpen={modalOpen}
              toggleModal={this.toggleModal}
              callback={() => this.dataListRender()}
              setST={this.setST}
              handleLogout={this.handleLogout}

            />
            <Row>


              {this.state.items.map((bus, i) => {
                return (

                  <DataListView
                    key={bus.id}
                    bus={bus}
                    isSelect={this.state.selectedItems.includes(bus.id)}
                    onCheckItem={this.onCheckItem}
                    setBus={this.setBus}
                    toggleModalVoir={this.toggleModalVoir}
                    collect={collect}
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
                toggleModalUpdate={this.toggleModalUpdate}
                toggleModalDelete={this.toggleModalDelete}
                selectedItems={this.state.selectedItems}
                toggleModalVoir={this.toggleModalVoir}

              />
              <Modal
                modalOpenVoir={modalOpenVoir}
                toggleModal={this.toggleModalVoir}
                bus={this.state.bus}
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

export default withRouter(connect(mapStateToProps, { logoutUser })(gst_bus));
// export default gst_bus;

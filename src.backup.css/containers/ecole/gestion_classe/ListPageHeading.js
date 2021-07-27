import React, { Component } from "react";
import {
  Row,
  Button,
  ButtonDropdown,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  CustomInput,
  Collapse
} from "reactstrap";
import { injectIntl } from "react-intl";

import { Colxx, Separator } from "../../../components/common/CustomBootstrap";
import IntlMessages from "../../../helpers/IntlMessages";

import {
  DataListIcon,
  ThumbListIcon,
  ImageListIcon
} from "../../../components/svg";
class ListPageHeading extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownSplitOpen: false,
      displayOptionsIsOpen: false,
      modalOpenUpdate: false,
      chercher: ""
    };
  }
  chercher = (event) => {
    this.setState({ chercher: event.target.value })
    this.props.setChercher(this.state.chercher)
  }

  toggleDisplayOptions = () => {
    this.setState(prevState => ({
      displayOptionsIsOpen: !prevState.displayOptionsIsOpen
    }));
  };
  toggleSplit = () => {
    this.setState(prevState => ({
      dropdownSplitOpen: !prevState.dropdownSplitOpen
    }));
  };
  tgu = () => {
    //console.log("aaa")
    return this.props.toggleModalUpdateList;
  };
  tgd = () => {
    return this.props.toggleModalDelete;
  };

  render() {

    const { messages } = this.props.intl;
    const {
      displayMode,
      changeDisplayMode,

      changeOrderBy,
      changePageSize,
      selectedPageSize,
      totalItemCount,
      selectedOrderOption,
      match,
      startIndex,
      endIndex,
      selectedItemsLength,
      itemsLength,
      onSearchKey,
      orderOptions,
      pageSizes,
      toggleModal,
      toggleModalUpdate,
      toggleModalDelete,
      heading,
      niveau,

    } = this.props;
    const { displayOptionsIsOpen, dropdownSplitOpen, } = this.state;
    return (
      <Row>
        <Colxx xxs="12">
          <div className="mb-2">
            <br></br>

            <h1>
              <IntlMessages id={heading} />
            </h1>
            {niveau !== "*" &&
              <div className="text-zero top-right-button-container">
                <Button
                  color="primary"
                  size="lg"
                  className="top-right-button"
                  onClick={toggleModal}
                >
                  <IntlMessages id="Ajouter une classe" />
                </Button>

                {selectedItemsLength === 1 &&
                  <ButtonDropdown
                    isOpen={dropdownSplitOpen}
                    toggle={this.toggleSplit}
                  >
                    {/* 
                  <div className="btn btn-primary btn-lg pl-4 pr-0 check-button check-all">
                    <CustomInput
                      className="custom-checkbox mb-0 d-inline-block"
                      type="checkbox"
                      id="checkAll"
                      checked={selectedItemsLength >= itemsLength}
                      onChange={() => handleChangeSelectAll(true)}
                      label={
                        <span
                          className={`custom-control-label ${
                            selectedItemsLength > 0 &&
                              selectedItemsLength < itemsLength
                              ? "indeterminate"
                              : ""
                            }`}
                        />
                      }
                    /> 
                  </div>
                    */}
                    <DropdownToggle
                      caret
                      color="primary"
                      className="dropdown-toggle-split btn-lg"
                    />



                    <DropdownMenu right>
                      <DropdownItem id="modif"
                        onClick={() => toggleModalUpdate()}
                      >
                        Modifier{" "}
                      </DropdownItem>
                      <DropdownItem id="supp"
                        onClick={() => toggleModalDelete()} >
                        Supprimer{" "}
                      </DropdownItem>
                    </DropdownMenu>

                  </ButtonDropdown>
                }
              </div>
            }

          </div>

          <div className="mb-2">
            <Button
              color="empty"
              className="pt-0 pl-0 d-inline-block d-md-none"
              onClick={this.toggleDisplayOptions}
            >
              <IntlMessages id="Options d'affichage" />{" "}
              <i className="simple-icon-arrow-down align-middle" />
            </Button>
            <Collapse
              isOpen={displayOptionsIsOpen}
              className="d-md-block"
              id="displayOptions"
            >
              {niveau &&
                <>
                  <div className="d-block d-md-inline-block pt-1">
                    <UncontrolledDropdown className="mr-1 float-md-left btn-group mb-1">
                      <DropdownToggle caret color="outline-dark" size="xs">

                        Trier par : {selectedOrderOption.label}
                      </DropdownToggle>
                      <DropdownMenu>
                        {orderOptions.map((order, index) => {
                          return (
                            <DropdownItem
                              key={index}
                              onClick={() => changeOrderBy(order.column)}
                            >
                              {order.label}
                            </DropdownItem>
                          );
                        })}
                      </DropdownMenu>
                    </UncontrolledDropdown>


                  </div>

                  <div className="float-md-right pt-1">
                    <span className="text-muted text-small mr-1">{`${startIndex}-${endIndex} de ${totalItemCount} `}</span>
                    <UncontrolledDropdown className="d-inline-block">
                      <DropdownToggle caret color="outline-dark" size="xs">
                        {selectedPageSize}
                      </DropdownToggle>

                      <DropdownMenu right>
                        {pageSizes.map((size, index) => {
                          return (
                            <DropdownItem
                              key={index}
                              onClick={() => changePageSize(size)}
                            >
                              {size}
                            </DropdownItem>
                          );
                        })}
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </div>
                </>
              }
            </Collapse>
          </div>
          <Separator className="mb-5" />
        </Colxx>

      </Row>
    );
  }
}

export default injectIntl(ListPageHeading);
{/*
              <span className="mr-3 d-inline-block float-md-left">
              <a
              href="#/"
              className={`mr-2 view-icon ${
                displayMode === "list" ? "active" : ""
              }`}
              onClick={() => changeDisplayMode("list")}
                >
                <DataListIcon />
                </a>
                
                <a
                href="#/"
                  className={`mr-2 view-icon ${
                    displayMode === "thumblist" ? "active" : ""
                  }`}
                  onClick={() => changeDisplayMode("thumblist")}
                  >
                  <ThumbListIcon />
                  </a>
                  <a
                  href="#/"
                  className={`mr-2 view-icon ${
                    displayMode === "imagelist" ? "active" : ""
                  }`}
                  onClick={() => changeDisplayMode("imagelist")}
                  >
                  <ImageListIcon />
                  </a>
                  </span>
                  
                */}
{/* <div className="search-sm d-inline-block float-md-left mr-1 mb-1 align-top">
                  <input
                    type="text"
                    name="keyword"
                    id="search"
                    placeholder={messages["menu.search"]}
                    onKeyPress={e => onSearchKey(e)}
                  />
                </div> */}
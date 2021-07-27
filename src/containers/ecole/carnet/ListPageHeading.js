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
//import Breadcrumb from "../navs/Breadcrumb";
import IntlMessages from "../../../helpers/IntlMessages";

import {
  DataListIcon,
  ThumbListIcon,
  ImageListIcon
} from "../../../components/svg";
// import "./pageheading.css"

class ListPageHeading extends Component {
  constructor(props) {
    super(props);
    this.state = {

      displayOptionsIsOpen: false
    };
  }

  toggleDisplayOptions = () => {
    this.setState(prevState => ({
      displayOptionsIsOpen: !prevState.displayOptionsIsOpen
    }));
  };



  render() {
    const {

      changeOrderBy,
      changePageSize,
      selectedPageSize,
      totalItemCount,
      selectedOrderOption,
      startIndex,
      endIndex,
      selectedItemsLength,
      orderOptions,
      pageSizes,
      toggleModal,
      heading,
      toggleModalEtat,
      toggleModalDelete,
      eleve,
      type,
      items,
      onSearchKey
    } = this.props;
    const { displayOptionsIsOpen, dropdownSplitOpen, } = this.state;
    return (
      <Row>
        <Colxx xxs="12">
          <div className="mb-2">
            <h1>
              <IntlMessages id={heading} />
            </h1>
            {eleve && selectedItemsLength === 0 && items.length < 3 &&
              <div className="text-zero top-right-button-container">
                <Button
                  color="primary"
                  size="lg"
                  className="top-right-button"
                  onClick={() => toggleModal()}
                >
                  <IntlMessages id="Insérer un carnet" />
                </Button>

              </div>

            }
            {selectedItemsLength > 0 &&
              <div className="text-zero top-right-button-container">
                <Button
                  color="primary"
                  size="lg"
                  className="top-right-button"
                  onClick={() => toggleModalDelete()}
                >
                  <IntlMessages id="Supprimer" />
                </Button>
              </div>
            }
            {/* {eleve && selectedItemsLength === 0 && items.length === 3 &&
              <div className="text-zero top-right-button-container">
                <Button
                  color="primary"
                  size="lg"
                  className="top-right-button"
                  onClick={() => toggleModalEtat()}
                >
                  <IntlMessages id="Moyenne et décision" />
                </Button>
              </div>
            } */}

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
                {type &&
                  <div className="search-sm d-inline-block float-md-left ml-2 mb-1 align-top">
                    <input
                      type="text"
                      name="keyword"
                      id="search"
                      placeholder="Rechercher"
                      onChange={e => onSearchKey(e)}
                    />
                  </div>
                }

              </div>

              <div className="float-md-right pt-1">
                <span className="text-muted text-small mr-1">{`${startIndex}-${totalItemCount} de ${endIndex} `}</span>
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


            </Collapse>
          </div>
          <Separator className="mb-5" />
        </Colxx>
      </Row>
    );
  }
}

export default injectIntl(ListPageHeading);
{/* <ButtonDropdown
                  isOpen={dropdownSplitOpen}
                  toggle={this.toggleSplit}
                >
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
                  <DropdownToggle
                    caret
                    color="primary"
                    className="dropdown-toggle-split btn-lg"
                  /> */}
{/* {selectedItemsDelete &&
                    <DropdownMenu right>                    
                      <DropdownItem id="supp"
                        onClick={() => toggleModalDelete()} >
                        Supprimer{" "}
                      </DropdownItem>
                    </DropdownMenu>
                  } */}
{/* </ButtonDropdown> */ }
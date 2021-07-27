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
// import "./pageheading.css"
class ListPageHeading extends Component {
  constructor(props) {
    super();
    this.state = {
      dropdownSplitOpen: false,
      displayOptionsIsOpen: false,


    };
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


  render() {

    const { messages } = this.props.intl;
    const {

      changeOrderBy,
      changePageSize,
      selectedPageSize,
      totalItemCount,
      selectedOrderOption,
      startIndex,
      endIndex,
      orderOptions,
      pageSizes,
      toggleModal,
      toggleModalUpdate,
      toggleModalDelete,
      heading,
      niveau,
      itemsLength,
      onSearchKey
    } = this.props;
    const { displayOptionsIsOpen, dropdownSplitOpen } = this.state;
    return (
      <Row>
        <Colxx xxs="12">
          <div className="mb-2">
            <br></br>
            <h1>
              <IntlMessages id={heading} />
            </h1>
            {niveau.value != "*" &&
              <div className="text-zero top-right-button-container">
                <Button
                  color="primary"
                  size="lg"
                  className="top-right-button"
                  onClick={() => toggleModal()}
                >
                  <IntlMessages id="Ajouter un domaine" />
                </Button>


                {itemsLength > 0 &&
                  <ButtonDropdown
                    isOpen={dropdownSplitOpen}
                    toggle={this.toggleSplit}
                  >

                    <DropdownToggle
                      caret
                      color="primary"
                      className="dropdown-toggle-split btn-lg"
                    />


                    <DropdownMenu right  >
                      {itemsLength === 1 &&
                        <DropdownItem
                          onClick={() => toggleModalUpdate()}
                        >
                          <i className="simple-icon-pencil ml-2"></i> Modifier
                        </DropdownItem>}
                      <DropdownItem
                        onClick={() => toggleModalDelete()} >

                        <i className="simple-icon-trash ml-2"></i> Supprimer

                      </DropdownItem>
                    </DropdownMenu>
                  </ButtonDropdown>
                }
              </div>
            }
          </div>
          {niveau &&
            <div className="mb-2">
              <Button
                color="empty"
                className="pt-0 pl-0 d-inline-block d-md-none"
                onClick={this.toggleDisplayOptions}
              >
                <IntlMessages id="Options d'affichage" />
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
                  <div className="search-sm d-inline-block float-md-left ml-2 mb-1 align-top">
                    <input
                      type="text"
                      name="keyword"
                      id="search"
                      placeholder="Rechercher"
                      onChange={e => onSearchKey(e)}
                    />
                  </div>



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
          }
          <Separator className="mb-5" />
        </Colxx>

      </Row>
    );
  }
}

export default injectIntl(ListPageHeading);

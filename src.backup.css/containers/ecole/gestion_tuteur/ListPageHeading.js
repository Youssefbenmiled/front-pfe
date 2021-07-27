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
import { NotificationManager } from "../../../components/common/react-notifications";

import { Colxx, Separator } from "../../../components/common/CustomBootstrap";
import IntlMessages from "../../../helpers/IntlMessages";
import "./pageheading.css"

class ListPageHeading extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownSplitOpen: false,
      displayOptionsIsOpen: false
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
    const {

      changeOrderBy,
      changePageSize,
      selectedPageSize,
      totalItemCount,
      selectedOrderOption,
      startIndex,
      endIndex,
      selectedItemsLength,
      onSearchKey,
      orderOptions,
      pageSizes,
      toggleModal,
      heading,
      toggleModalVoir,
      toggleModalUpdate,
      toggleModalDelete,
      valueEleve,
      type,
      tuteur,
      items
    } = this.props;

    const { displayOptionsIsOpen, dropdownSplitOpen } = this.state;
    return (
      <Row>
        <Colxx xxs="12">
          <div className="mb-2">
            <h1>
              <IntlMessages id={heading} />
            </h1>

            {type &&
              <div className="text-zero top-right-button-container">

                <Button
                  color="primary"
                  size="lg"
                  className="top-right-button"
                  onClick={() => toggleModal()}
                >
                  <IntlMessages id="Insértion" />

                </Button>
                {selectedItemsLength > 0 &&
                  <ButtonDropdown
                    isOpen={dropdownSplitOpen}
                    toggle={this.toggleSplit}
                  >

                    <DropdownToggle
                      caret
                      color="primary"
                      className="dropdown-toggle-split btn-lg"
                    />

                    <DropdownMenu right>
                      {selectedItemsLength === 1 &&
                        <>
                          <DropdownItem id="modif"
                            onClick={() => toggleModalVoir()}
                            className="iconsminds-file-edit">
                            Détails{" "}
                          </DropdownItem>
                          <DropdownItem id="modif"
                            onClick={() => toggleModalUpdate()}
                            className="iconsminds-file-edit">
                            Modifier{" "}
                          </DropdownItem>
                        </>
                      }

                      <DropdownItem id="supp"
                        onClick={() => toggleModalDelete()}
                        className="simple-icon-trash">
                        Supprimer
                        </DropdownItem>
                    </DropdownMenu>
                  </ButtonDropdown>
                }
              </div>
            }
            {valueEleve && items.length === 1 &&
              <div className="text-zero top-right-button-container">

                <Button
                  color="primary"
                  size="lg"
                  className="top-right-button"
                  onClick={() => toggleModalVoir()}
                >
                  <IntlMessages id="Détails" />

                </Button>
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
              {type &&
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
                    {/* 
                    <div className="search-sm d-inline-block float-md-left mr-1 mb-1 align-top">
                    <input
                    type="text"
                    name="keyword"
                    id="search"
                    placeholder={messages["menu.search"]}
                    onKeyPress={e => onSearchKey(e)}
                  />
                </div> */}
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

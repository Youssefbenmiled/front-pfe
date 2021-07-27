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
    super(props);
    this.state = {
      dropdownSplitOpen: false,
      displayOptionsIsOpen: false,
      modalOpenUpdate: false


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
      toggleModalDelete,
      heading,
      ens,
      items
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

            {ens.value != -1 && items.length === 0 &&
              <div className="text-zero top-right-button-container">
                <Button
                  color="primary"
                  size="lg"
                  className="top-right-button"
                  onClick={() => toggleModal()}
                >
                  <IntlMessages id="Insérer un emploi" />
                </Button>
              </div>
            }
            {ens.value != -1 && items.length > 0 &&
              <div className="text-zero top-right-button-container">
                <Button
                  color="primary"
                  size="lg"
                  className="top-right-button"
                  onClick={() => toggleModalDelete()}
                >
                  <IntlMessages id="Supprimer l'emploi" />
                </Button>
              </div>
            }


          </div>
          {ens.value == -1 &&
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

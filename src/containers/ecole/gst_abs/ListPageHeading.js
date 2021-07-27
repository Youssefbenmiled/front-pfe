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
      orderOptions,
      pageSizes,
      heading,
    } = this.props;

    const { displayOptionsIsOpen } = this.state;
    return (
      <Row>
        <Colxx xxs="12">
          <div className="mb-2">
            <h1>
              <IntlMessages id={heading} />
            </h1>


          </div>

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
{/* <div className="text-zero top-right-button-container">
              <Button
                color="primary"
                size="lg"
                className="top-right-button"
                onClick={() => toggleModal()}
              >
                <IntlMessages id="Créer un évenement" />
              </Button>
              {"  "}
              <ButtonDropdown
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
                />

                <DropdownMenu right  >
                  {this.props.selectedItemsUpdate && (<DropdownItem id="modif"
                    onClick={() => toggleModalUpdate()}
                  //    id="ddm"
                  >
                    Modifier{" "}
                  </DropdownItem>)}
                  {this.props.selectedItemsDelete && (
                    <DropdownItem id="supp"
                      onClick={() => toggleModalDelete()} >
                      Supprimer{" "}
                    </DropdownItem>)}
                </DropdownMenu>
              </ButtonDropdown>
            </div> */}
import React, { Component, Fragment } from "react";

import { Card, CustomInput, Badge, Button, Tooltip } from "reactstrap";
import { NavLink } from "react-router-dom";
import classnames from "classnames";
import { ContextMenuTrigger } from "react-contextmenu";
import { Colxx } from "../../../components/common/CustomBootstrap";

class DataListView extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentWillReceiveProps(nextProps) {
    if (!localStorage.getItem('user_id'))
      return this.props.handleLogout();

  }
  mv = () => {
    if (this.props.isSelect) {
      this.props.setBus(this.props.bus)
    }
  }

  render() {
    const { bus, isSelect, collect, onCheckItem } = this.props;
    return (
      <Colxx xxs="12" className="mb-3" onMouseOver={this.mv}>
        <ContextMenuTrigger id="menu_id" data={bus.id} collect={collect}>
          <Card
            onClick={event => onCheckItem(event, bus.id)}
            className={classnames("d-flex flex-row", {
              active: isSelect
            })}
          >
            <div className="pl-2 d-flex flex-grow-1 min-width-zero" id={bus.id} >
              <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
                <p className="w-100 w-md-33 m-0 text-left ellipsis-wrap" >
                  Matricule: {bus.matricule}
                </p>
                <h5 className="w-100 w-md-33 m-0 text-left  text-md-center ellipsis-wrap">
                  <a href={bus.fileHorraire} target="_blank">
                    Horaires
                </a>
                </h5>
                <p className="w-100 w-md-33 m-0 text-left text-md-right ellipsis-wrap">
                  {bus.nbplace} places
                </p>


              </div>
            </div>



            {isSelect == true
              ? this.props.setBus(this.props.bus)
              : null}



            <div className="custom-control custom-checkbox pl-1 align-self-center pr-4">
              <CustomInput
                className="item-check mb-0"
                type="checkbox"
                id={`check_${bus.id}`}
                checked={isSelect}
                onChange={() => { }}
                label=""
              />
            </div>

          </Card>
        </ContextMenuTrigger>
      </Colxx>
    );

  }
}
/* React.memo detail : https://reactjs.org/docs/react-api.html#reactpurecomponent  */
export default React.memo(DataListView);

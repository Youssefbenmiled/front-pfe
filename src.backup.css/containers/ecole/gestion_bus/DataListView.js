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
                {/* <img src={bus.photobus} alt="Photo bus" className="w-33 w-sm-100 m-0 text-left" /> */}
                <p className="w-33 w-sm-100 m-0 text-left">
                  Matricule: {bus.matricule}
                </p>
                <h5 className="w-33 w-sm-100 m-0 text-center">
                  <a href={bus.fileHorraire} target="_blank">
                    Horaires
                </a>
                </h5>
                <p className="w-33 w-sm-100 m-0 text-right">
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

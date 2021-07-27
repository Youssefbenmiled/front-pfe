import React, { Component, Fragment } from "react";

import { Card, CustomInput, Badge, Button, Tooltip } from "reactstrap";
import { NavLink } from "react-router-dom";
import classnames from "classnames";
import { ContextMenuTrigger } from "react-contextmenu";
import { Colxx } from "../../../components/common/CustomBootstrap";
import IntlMessages from "../../../helpers/IntlMessages";


class DataListView extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  mv = () => {

    this.props.setAbs(this.props.abs)

  }

  render() {
    const { abs, toggleModalVoir } = this.props;
    return (
      <Colxx xxs="12" className="mb-3" onMouseOver={this.mv}>
        <Card
          className={classnames("d-flex flex-row", {})}
        >
          <div className="pl-2 d-flex flex-grow-1 min-width-zero" id={abs.id} >
            <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
              <p className="w-33 w-sm-100 m-0 text-left" >
                Date et heure séance :
                </p>
              <p className="w-33 w-sm-100 m-0 text-center">
                Classe :{' __ '}
              </p>
              <h5 className="w-33 w-sm-100 m-0 text-right"
                onClick={() => toggleModalVoir(33)}>
                {/* <a href={() => toggleModalVoir(33)} > */}
                  Ouvrir
                {/* </a> */}
              </h5>

            </div>
          </div>

        </Card>
      </Colxx>
    );

  }
}
/* React.memo detail : https://reactjs.org/docs/react-api.html#reactpurecomponent  */
export default React.memo(DataListView);

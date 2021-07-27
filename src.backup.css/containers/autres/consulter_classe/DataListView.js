import React, { Component, Fragment } from "react";

import {
  Card, CustomInput, Badge, Button, Tooltip, Collapse
} from "reactstrap";
import { NavLink } from "react-router-dom";
import classnames from "classnames";
import { ContextMenuTrigger } from "react-contextmenu";
import { Colxx } from "../../../components/common/CustomBootstrap";
import IntlMessages from "../../../helpers/IntlMessages";


class DataListView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tooltipOpen: false

    };
  }

  toggle = () => {
    this.setState(prevState => ({
      tooltipOpen: !prevState.tooltipOpen
    }));
    this.props.setClasse(this.props.classe)
  };


  render() {
    const { classe, isSelect, collect, onCheckItem, toggleModalImp } = this.props;

    return (
      <Colxx xxs="12" className="mb-3" >
        <ContextMenuTrigger id="menu_id" data={classe.id} collect={collect}>
          <Card
            onClick={event => onCheckItem(event, classe.id)}
            className={classnames("d-flex flex-row", {
              active: isSelect
            })}
          >
            <div className="pl-2 d-flex flex-grow-1 min-width-zero"
              id={"Tooltip-" + classe.id}
              onClick={() => toggleModalImp()}
            >
              <div
                className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">

                <NavLink
                  to={`?p=${classe.id}`} className="w-40 w-sm-100"
                  onClick={() => toggleModalImp()}
                >
                  <p
                    className="list-item-heading mb-1 truncate"
                    id={"Tooltip-" + classe.id}
                  >
                    Niveau : {classe.niveau}{" "}

                  </p>
                </NavLink>
                {/* <p className="w-40 w-sm-100 list-item-heading mb-1 truncate"
                  onClick={() => toggleModalImp()}
                //id={"Tooltip-" + product.id}

                >
                  {product.title}{" "}{product.title}

                </p> */}
                <Tooltip
                  placement="bottom"
                  isOpen={this.state.tooltipOpen}
                  target={"Tooltip-" + classe.id}
                  toggle={this.toggle}
                  id="tltp"
                >
                  <p className="list-item-heading mb-1 truncate">
                    {classe.niveau} &nbsp; {classe.Nom}&nbsp;&nbsp;
                   </p>


                </Tooltip>
                <NavLink
                  to={`?p=${classe.id}`} className="w-40 w-sm-100"
                  onClick={() => toggleModalImp()}
                >
                  <p
                    className="list-item-heading mb-1 truncate"
                    id={"Tooltip-" + classe.id}
                  >
                    Classe : {classe.Nom}{" "}

                  </p>
                </NavLink>

                <h2 className="mb-1 text-muted text-small w-15 w-sm-100">
                  {classe.nbEleves === 1 ?

                    (<NavLink
                      to={`?p=${classe.id}`} className="w-40 w-sm-100"
                      onClick={() => toggleModalImp()}
                    >
                      <p
                        className="list-item-heading mb-1 truncate"
                        id={"Tooltip-" + classe.id}
                      >
                        {classe.nbEleves} éléve
                  </p>
                    </NavLink>)
                    :
                    (<NavLink
                      to={`?p=${classe.id}`} className="w-40 w-sm-100"
                      onClick={() => toggleModalImp()}
                    >
                      <p
                        className="list-item-heading mb-1 truncate"
                        id={"Tooltip-" + classe.id}
                      >
                        {classe.nbEleves} éléves
                  </p>
                    </NavLink>)}
                </h2>

              </div>

            </div>
          </Card>
        </ContextMenuTrigger>
      </Colxx>
    );
  }
}
export default React.memo(DataListView);

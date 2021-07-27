import React, { Component, Fragment } from "react";

import { Card, CustomInput, Badge, Button, Tooltip } from "reactstrap";
import { NavLink } from "react-router-dom";
import classnames from "classnames";
import { ContextMenuTrigger } from "react-contextmenu";
import { Colxx } from "../../../components/common/CustomBootstrap";
import IntlMessages from "../../../helpers/IntlMessages";
// import "./classe.css";

class DataListView extends Component {
  constructor(props) {
    super(props);
    this.state = {


    };
  }
  tgv = () => {
    if (this.props.type > -1) {
      this.props.setEns(this.props.ens)
      return this.props.toggleModalVoir
    }
  }
  mv = () => {
    if (this.props.isSelect) {
      this.props.setEns(this.props.ens)
    }
  }

  render() {
    const { ens, isSelect, onCheckItem, collect, type } = this.props;
    return (
      <Colxx xxs="12" className="mb-3" onMouseOver={this.mv} onClick={this.tgv()}>
        <ContextMenuTrigger id="menu_id" data={ens.id} collect={collect}>
          <Card
            onMouseOver={this.mv}
            onClick={event => onCheckItem(event, ens.id)}
            className={classnames("d-flex flex-row", {
              active: isSelect
            })}
          >
            <div className="pl-2 d-flex flex-grow-1 min-width-zero" id={ens.id} >
              <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
                <p className="w-33 w-sm-100 m-0 text-left" >
                  Nom complet : {ens.prenom}{" "}{ens.nom}
                </p>
                <p className="w-33 w-sm-100 m-0 text-center">
                  Email : {ens.email}
                </p>
                <p className="w-33 w-sm-100 m-0 text-right">
                  {/* Adresse : {ens.adresse} */}
                  Statut : {ens.statut}
                </p>

              </div>
            </div>


            {isSelect == true
              ? this.props.setEns(this.props.ens)
              : null}
            {type === -1 &&
              <div className="custom-control custom-checkbox pl-1 align-self-center pr-4">
                <CustomInput
                  className="item-check mb-0"
                  type="checkbox"
                  id={`check_${ens.id}`}
                  checked={isSelect}
                  onChange={() => { }}
                  label=""
                />
              </div>
            }

          </Card>
        </ContextMenuTrigger>
      </Colxx>
    );
  }
}


/* React.memo detail : https://reactjs.org/docs/react-api.html#reactpurecomponent  */
export default React.memo(DataListView);
{/* <div className="pl-2 d-flex flex-grow-1 min-width-zero">
  <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
    <NavLink to={`?p=${ens.id}`} className="w-40 w-sm-100" onClick={() => toggleModalVoir()}>

      <p className="list-item-heading mb-1 truncate" id={"Tooltip-" + ens.id}>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    Nom complet : {ens.nom}{" "}{ens.prenom}
      </p>
    </NavLink>

                &nbsp;&nbsp;&nbsp;&nbsp;
                <NavLink to={`?p=${ens.id}`} className="w-40 w-sm-100" onClick={() => toggleModalVoir()}>

      <p className="list-item-heading mb-1 truncate" id={"Tooltip-" + ens.id}>
        Email : {ens.email}
      </p>
    </NavLink>
                &nbsp;&nbsp;&nbsp;&nbsp;

                &nbsp;&nbsp;&nbsp;&nbsp;
                <a href="" className="w-40 w-sm-100" onClick={() => toggleModalVoir()}>

      <p className="list-item-heading mb-1 truncate" id={"Tooltip-" + ens.id}>
        Adresse : {ens.adresse}
      </p>
    </a>              </div>
</div> */}

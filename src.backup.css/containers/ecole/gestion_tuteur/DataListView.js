import React, { Component, Fragment } from "react";

import { Card, CustomInput, Badge, Button, Tooltip } from "reactstrap";
import classnames from "classnames";
import { ContextMenuTrigger } from "react-contextmenu";
import { Colxx } from "../../../components/common/CustomBootstrap";
// import "./classe.css";

class DataListView extends Component {
  constructor(props) {
    super(props);
    this.state = {};

  }


  tgv = () => {
    if (this.props.eleve) {
      this.props.setTuteur(this.props.tuteur)
      return this.props.toggleModal
    }
  }

  mv = () => {
    if (this.props.isSelect == true) {
      this.props.setTuteur(this.props.tuteur)
      console.log(this.props.tuteur)

    }
  }

  render() {
    const { tuteur, isSelect, onCheckItem, collect, eleve } = this.props;
    return (
      <Colxx xxs="12" className="mb-3" onMouseOver={this.mv} onClick={this.tgv()}>
        <ContextMenuTrigger id="menu_id" data={tuteur.id} collect={collect}>
          <Card
            onClick={event => onCheckItem(event, tuteur.id)}
            className={classnames("d-flex flex-row", {
              active: isSelect
            })}
          >

            <div className="pl-2 d-flex flex-grow-1 min-width-zero" id={tuteur.id}>
              <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
                <p className="w-33 w-sm-100 m-0 text-left">
                  Nom complet : {tuteur.nom}{' '}{tuteur.prenom}
                </p>
                <p className="w-33 w-sm-100 m-0 text-center" >
                  Email : {tuteur.email}
                </p>
                <p className="w-33 w-sm-100 m-0 text-right" >
                  {/* Adresse : {tuteur.adresse} */}
                  Statut : {tuteur.statut}
                </p>


                {isSelect == true ?
                  this.props.setTuteur(this.props.tuteur)
                  : null}
              </div>
              {!eleve &&
                <div className="custom-control custom-checkbox pl-1 align-self-center pr-4">
                  <CustomInput
                    className="item-check mb-0"
                    type="checkbox"
                    id={`check_${tuteur.id}`}
                    checked={isSelect}
                    onChange={() => { }}
                    label=""
                  />
                </div>
              }
            </div>
          </Card>
        </ContextMenuTrigger>
      </Colxx>
    );
  }
}

/* React.memo detail : https://reactjs.org/docs/react-api.html#reactpurecomponent  */
export default React.memo(DataListView);

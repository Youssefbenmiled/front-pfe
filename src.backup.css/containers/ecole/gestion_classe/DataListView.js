import React, { Component, Fragment } from "react";

import { Card, CustomInput, Badge, Button, Tooltip } from "reactstrap";
import { NavLink } from "react-router-dom";
import classnames from "classnames";
import { ContextMenuTrigger } from "react-contextmenu";
import { Colxx } from "../../../components/common/CustomBootstrap";
// import "./classe.css";

class DataListView extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  mv = () => {
    if (this.props.isSelect === true) {
      this.props.setClasse(this.props.classe)
    }
  }


  render() {
    const { classe, isSelect, onCheckItem, collect, niveau } = this.props;
    return (


      <Colxx xxs="12" className="mb-3"
        onMouseOver={this.mv}
      >
        <ContextMenuTrigger id="menu_id" data={classe.id} collect={collect}>
          <Card
            onMouseOver={this.mv}
            onClick={event => onCheckItem(event, classe.id)}
            className={classnames("d-flex flex-row", {
              active: isSelect
            })}
          >
            <div className="pl-2 d-flex flex-grow-1 min-width-zero" id={classe.id} >
              <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
                <p className="w-33 w-sm-100 m-0 ">
                  Niveau : {classe.niveau}{" "}
                </p>
                <p className="w-33 w-sm-100 m-0 text-center" >
                  Classe : {classe.Nom.slice(0, 1).toUpperCase() + classe.Nom.slice(1, classe.Nom.length)}
                </p>
                <p className="w-33 w-sm-100 m-0 text-right" >
                  Nombre d'éléves : {classe.nbEleves}
                </p>
                {isSelect == true
                  ? this.props.setClasse(this.props.classe)

                  : null}
              </div>
              {niveau !== "*" &&
                <div className="custom-control custom-checkbox pl-1 align-self-center pr-4">
                  <CustomInput
                    className="item-check mb-0"
                    type="checkbox"
                    id={`check_${classe.id}`}
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
export default React.memo(DataListView);


/* React.memo detail : https://reactjs.org/docs/react-api.html#reactpurecomponent  */

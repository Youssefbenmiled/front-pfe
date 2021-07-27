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



  render() {
    const { emploi, classe } = this.props;
    return (
      <Colxx xxs="12" className="mb-3"
      >
        <Card
          className={classnames("d-flex flex-row", {
          })}
        >
          {!classe &&
            <div className="pl-2 d-flex flex-grow-1 min-width-zero" id={emploi.id} >
              <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
                <p className="w-33 w-sm-100 m-0 text-left" >
                  Niveau : {emploi.niveau}
                </p>
                <p className="w-33 w-sm-100 m-0 text-center">
                  Classe : {emploi.NomClasse}
                </p>
                <h5 className="w-33 w-sm-100 m-0 text-right">

                  <a href={emploi.url} target="_blank">
                    Voir emploi
                </a>
                </h5>
              </div>
            </div>
          }
          {classe &&
            <div className="pl-2 d-flex flex-grow-1 min-width-zero" id={emploi.id} >
              <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
                <h5 className="w-100 w-sm-100 m-0 text-center">

                  <a href={emploi.url} target="_blank">
                    Voir emploi
                </a>
                </h5>
              </div>
            </div>
          }



        </Card>
      </Colxx>
    );
  }
}


/* React.memo detail : https://reactjs.org/docs/react-api.html#reactpurecomponent  */
export default React.memo(DataListView);

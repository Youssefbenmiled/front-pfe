import React, { Component, Fragment } from "react";

import { Card, CustomInput, Badge, Button, Tooltip } from "reactstrap";
import { NavLink } from "react-router-dom";
import classnames from "classnames";
import { ContextMenuTrigger } from "react-contextmenu";
import { Colxx } from "../../../../components/common/CustomBootstrap";
import IntlMessages from "../../../../helpers/IntlMessages";
// import "./classe.css";

class DataListView extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }




  render() {
    const { carnet } = this.props;
    return (
      <Colxx xxs="12" className="mb-3" >
        <Card
          className={classnames("d-flex flex-row", {
          })}
        >
          <div className="pl-2 d-flex flex-grow-1 min-width-zero" id={carnet.id} >
            <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
              <p className="w-25 w-sm-100 m-0 text-left" >
                Eleve : {carnet.Nom} {' '}{carnet.prenom}

              </p>
              <p className="w-25 w-sm-100 m-0 text-center" >
                Classe : {carnet.niveau}{' '}{carnet.nomClasse}

              </p>

              <p className="w-25 w-sm-100 m-0 text-center">
                Trimestre : {carnet.semestre}
              </p>
              <h5 className="w-25 w-sm-100 m-0 text-right">
                <a href={carnet.url} target="_blank" >
                  Voir carnet
                </a>
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

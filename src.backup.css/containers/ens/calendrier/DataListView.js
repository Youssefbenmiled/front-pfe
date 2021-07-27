import React, { Component, Fragment } from "react";

import { Card, CustomInput, Badge, Button, Tooltip } from "reactstrap";
import { NavLink } from "react-router-dom";
import classnames from "classnames";
import { Colxx } from "../../../components/common/CustomBootstrap";
// import "./classe.css";

class DataListView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }



  render() {
    const { calendrier } = this.props;
    return (
      <Colxx xxs="12" className="mb-3">
        <Card
          className={classnames("d-flex flex-row", {
          })}
        >
          <div className="pl-2 d-flex flex-grow-1 min-width-zero">

            <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">

              <p className="w-33 w-sm-100 m-0 text-left" >
                Classe : {calendrier.niveauClasse}{' '}{calendrier.nomClasse}
              </p>

              <p className="w-33 w-sm-100 m-0 text-center" >
                Trimestre : {calendrier.semestre}
              </p>
              <h5 className="w-33 w-sm-100 m-0 text-right">
                <a href={calendrier.url} target="_blank" >
                  Voir calendrier
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

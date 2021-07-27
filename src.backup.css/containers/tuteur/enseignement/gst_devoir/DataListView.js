import React, { Component, Fragment } from "react";

import { Card, CustomInput, Badge, Button, Tooltip } from "reactstrap";
import { NavLink } from "react-router-dom";
import classnames from "classnames";
import { ContextMenuTrigger } from "react-contextmenu";
import { Colxx } from "../../../../components/common/CustomBootstrap";
// import "./classe.css";
import moment from 'moment';

class DataListView extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  mv = () => {
    if (this.props.isSelect === true && this.props.idClasse > -1) {
      this.props.setDevoir(this.props.devoir)
    }
    else {
      this.props.setDevoir(this.props.devoir)

    }
  }
  tgv = () => {
    if (this.props.idClasse == -1) {
      return this.props.toggleModalVoir
    }
  }

  render() {
    const { devoir } = this.props;

    var d1 = moment(devoir.dateEnvoi, 'YYYY-MM-DD').format();
    var d2 = moment(devoir.dateEcheance, 'YYYY-MM-DD').format("DD-MM-YYYY");

    var td = moment(new Date(), 'YYYY-MM-DD').format('YYYY-MM-DD');
    var d44 = moment(devoir.dateEcheance, 'YYYY-MM-DD').format('YYYY-MM-DD');
    console.log(td.localeCompare(d44), td, d44)

    return (


      <Colxx xxs="12"
        className="mb-3"
        onMouseOver={this.mv}
        onClick={this.tgv()}
      >
        <Card

          className={classnames("d-flex flex-row", {
          })}
        >
          <div className="pl-2 d-flex flex-grow-1 min-width-zero" id={devoir.id} >

            <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
              {/* <p className="w-20 w-sm-100 m-0 text-left">
                Classe : {devoir.niveau}{" "}{devoir.nomClasse}
              </p> */}
              <p className="w-33 w-sm-100 m-0 text-left" >
                Trimestre: {devoir.trimestre}
              </p>
              <p className="w-33 w-sm-100 m-0 text-center" >
                Domaine: {devoir.domaine}
              </p>
              {devoir.dateEcheance && td.localeCompare(d44) < 1 &&

                <p className="w-33 w-sm-100 m-0 text-right" >
                  Date d'échéance : {d2}
                </p>
              }
              {devoir.dateEcheance && td.localeCompare(d44) === 1 &&

                <p className="w-33 w-sm-100 m-0 text-right" >
                  Date dépassée
                  </p>
              }

            </div>


          </div>



        </Card>
      </Colxx>


    );
  }
}
export default React.memo(DataListView);


/* React.memo detail : https://reactjs.org/docs/react-api.html#reactpurecomponent  */
{/* <p className="w-20 w-sm-100 m-0 text-center" >
                  <a href={devoir.url} target="_blank" >
                    Voir fichier
                  </a>
                </p> */}

{/* {devoir.dateEnvoi !== undefined && devoir.dateEcheance !== undefined &&

                  <p className="w-20 w-sm-100 m-0 text-center" >
                    Période : {moment(d1).format("DD-MM-YYYY")}{'  __  '}{moment(d2).format("DD-MM-YYYY")}
                  </p>
                } */}

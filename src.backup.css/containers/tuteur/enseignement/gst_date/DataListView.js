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
      lyoum: new Date().getUTCFullYear() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate(),

    };
  }

  mv = () => {

    this.props.setExam(this.props.exam)
  }


  render() {
    const { idClasse, exam } = this.props;

    var d2 = moment(exam.date, 'YYYY-MM-DD').format("DD-MM-YYYY");

    var td = moment(new Date(), 'YYYY-MM-DD').format('YYYY-MM-DD');
    var d44 = moment(exam.date, 'YYYY-MM-DD').format('YYYY-MM-DD');

    return (

      <Colxx xxs="12"
        className="mb-3"
        onMouseOver={this.mv}
      >
        <Card
          className={classnames("d-flex flex-row", {
          })}
        >
          <div className="pl-2 d-flex flex-grow-1 min-width-zero" id={exam.id} >
            {idClasse > -1 ?

              <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
                <p className="w-33 w-sm-100 m-0 text-left">
                  Trimestre : {exam.trimestre}
                </p>
                <p className="w-33 w-sm-100 m-0 text-center" >
                  Domaine : {exam.domaine}
                </p>
                {exam.date && td.localeCompare(d44) < 1 &&
                  <p className="w-33 w-sm-100 m-0 text-right" >
                    Date : {d2}
                  </p>
                }
                {exam.date && td.localeCompare(d44) === 1 &&
                  <p className="w-33 w-sm-100 m-0 text-right" >
                    Date dépassée
                    </p>
                }
              </div>
              :
              <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">

                {/* <p className="w-25 w-sm-100 m-0 text-left" >
                  Classe : {exam.niveauClasse}{' '}{exam.nomClasse}
                </p> */}
                <p className="w-33 w-sm-100 m-0 text-center">
                  Trimestre : {exam.trimestre}
                </p>
                <p className="w-33 w-sm-100 m-0 text-center" >
                  Domaine : {exam.domaine}
                </p>
                {exam.date && td.localeCompare(d44) < 1 &&
                  <p className="w-33 w-sm-100 m-0 text-right" >
                    Date : {d2}
                  </p>
                }
                {exam.date && td.localeCompare(d44) === 1 &&
                  <p className="w-33 w-sm-100 m-0 text-right" >
                    Date dépassée
                </p>
                }
              </div>
            }



          </div>



        </Card>
      </Colxx>


    );
  }
}
export default React.memo(DataListView);


/* React.memo detail : https://reactjs.org/docs/react-api.html#reactpurecomponent  */

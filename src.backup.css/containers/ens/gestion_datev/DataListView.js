import React, { Component, Fragment } from "react";

import { Card, CustomInput, Badge, Button, Tooltip } from "reactstrap";
import { NavLink } from "react-router-dom";
import classnames from "classnames";
import { ContextMenuTrigger } from "react-contextmenu";
import { Colxx } from "../../../components/common/CustomBootstrap";
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
      this.props.setExam(this.props.exam)
    }
  }

  tgv = () => {
    if (this.props.idClasse === -1) {
      return this.props.toggleModalVoir
    }
  }
  render() {
    const { idClasse, isSelect, onCheckItem, collect, exam } = this.props;

    var d2 = moment(exam.date, 'YYYY-MM-DD').format("DD-MM-YYYY");

    var td = moment(new Date(), 'YYYY-MM-DD').format('YYYY-MM-DD');
    var d44 = moment(exam.date, 'YYYY-MM-DD').format('YYYY-MM-DD');

    return (

      <Colxx xxs="12"
        className="mb-3"
        onMouseOver={this.mv}
        onClick={this.tgv()}
      >
        <ContextMenuTrigger id="menu_id" data={exam.id} collect={collect}>
          <Card
            onMouseOver={this.mv}
            onClick={event => onCheckItem(event, exam.id)}
            className={classnames("d-flex flex-row", {
              active: isSelect
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

                  <p className="w-33 w-sm-100 m-0 text-left" >
                    Classe : {exam.niveauClasse}{' '}{exam.nomClasse}
                  </p>
                  {/* <p className="w-25 w-sm-100 m-0 text-center">
                    Trimestre : {exam.trimestre}
                  </p> */}
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

              {isSelect == true
                ? this.props.setExam(this.props.exam)

                : null}


              {idClasse > -1 &&
                <div className="custom-control custom-checkbox pl-1 align-self-center pr-4">
                  <CustomInput
                    className="item-check mb-0"
                    type="checkbox"
                    id={`check_${exam.id}`}
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

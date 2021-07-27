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

    this.state = {};
  }

  mv = () => {
    if (this.props.isSelect === true) {
      this.props.setFeuille(this.props.feuille)
    }
  }
  tgv = () => {
    if (this.props.idClasse === -1)
      return this.props.toggleModalVoir(33)

  }

  render() {
    const { feuille, isSelect, onCheckItem, collect, idClasse } = this.props;
    var d2 = moment(feuille.date, 'YYYY-MM-DD').format("DD-MM-YYYY");
    var td = moment(new Date(), 'YYYY-MM-DD').format('YYYY-MM-DD');
    var d44 = moment(feuille.date, 'YYYY-MM-DD').format('YYYY-MM-DD');


    const classet = ['1A', '3B', '1B']
    const domainet = ['العربية', 'francais', 'anglais']
    const dates = ['20-09-2020', '30-09-2020', '05-09-2020', '01-09-2021', '03-09-2021']
    const trimestres = [1, 2, 3]

    return (



      <Colxx
        xxs="12"
        className="mb-3"
        onMouseOver={this.mv}
        onClick={this.tgv}
      >
        <ContextMenuTrigger id="menu_id" data={feuille.id} collect={collect}>
          <Card
            onMouseOver={this.mv}
            onClick={event => onCheckItem(event, feuille.id)}
            className={classnames("d-flex flex-row", {
              active: isSelect
            })}
          >
            <div className="pl-2 d-flex flex-grow-1 min-width-zero" id={feuille.id} >
              {idClasse === -1 ?
                <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
                  <p className="w-33 w-sm-100 m-0 text-left">
                    {/* Classe : {feuille.classe} */}
                    Classe : {classet[Math.ceil(Math.random() * 3) - 1]}
                  </p>
                  <p className="w-33 w-sm-100 m-0 text-center" >
                    {/* Trimestre : {feuille.trimestre} */}
                    Trimestre : {trimestres[Math.ceil(Math.random() * 3) - 1]}

                  </p>
                  <p className="w-33 w-sm-100 m-0 text-right" >
                    Date d'échéance : {dates[Math.ceil(Math.random() * 4) - 1]}
                  </p>
                  {/* {feuille.date && td.localeCompare(d44) < 1 &&
                    <p className="w-33 w-sm-100 m-0 text-right" >
                      Date : {d2}
                    </p>
                  } */}
                  {feuille.date && td.localeCompare(d44) === 1 &&
                    <p className="w-33 w-sm-100 m-0 text-right" >
                      Date dépassée
                  </p>
                  }
                </div>
                :
                <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
                  <p className="w-33 w-sm-100 m-0 text-left">
                    {/* Trimestre : {feuille.trimestre} */}
                    Trimestre : {trimestres[Math.ceil(Math.random() * 3) - 1]}

                  </p>
                  <p className="w-33 w-sm-100 m-0 text-center" >
                    {/* Domaine : {feuille.domaine} */}
                    Domaine : {domainet[Math.ceil(Math.random() * 3) - 1]}

                  </p>
                  <p className="w-33 w-sm-100 m-0 text-right" >
                    Date d'échéance : {dates[Math.ceil(Math.random() * 4) - 1]}
                  </p>
                  {/* {feuille.date && td.localeCompare(d44) < 1 &&
                    <p className="w-33 w-sm-100 m-0 text-right" >
                      Date : {d2}
                    </p>
                  } */}
                  {feuille.date && td.localeCompare(d44) === 1 &&
                    <p className="w-33 w-sm-100 m-0 text-right" >
                      Date dépassée
                  </p>
                  }



                </div>
              }

              {isSelect == true
                ? this.props.setFeuille(this.props.feuille)

                : null}
              {idClasse !== -1 &&
                <div className="custom-control custom-checkbox pl-1 align-self-center pr-4">
                  <CustomInput
                    className="item-check mb-0"
                    type="checkbox"
                    id={`check_${feuille.id}`}
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

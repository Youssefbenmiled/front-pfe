import React, { Component, Fragment } from "react";

import { Card, CustomInput, Badge, Button, Tooltip } from "reactstrap";
import { NavLink } from "react-router-dom";
import classnames from "classnames";
import { ContextMenuTrigger } from "react-contextmenu";
import { Colxx } from "../../../components/common/CustomBootstrap";
import moment from 'moment';

class DataListView extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  componentWillReceiveProps(nextProps) {
    if (!localStorage.getItem('user_id'))
      return this.props.handleLogout();

  }
  mv = () => {
    if (!localStorage.getItem('user_id'))
      return this.props.handleLogout();

    if (this.props.isSelect === true)
      this.props.setFeuille(this.props.feuille)

  }


  render() {
    const { feuille, isSelect, onCheckItem, collect } = this.props;



    return (
      <Colxx
        xxs="12"
        className="mb-3"
        onMouseOver={this.mv}
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

              <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
                <p className="w-100 w-md-33 m-0 text-left ellipsis-wrap" >

                  Séance : {feuille.seance}
                </p>
                <p className="w-100 w-md-33 m-0 text-left  text-md-center ellipsis-wrap">
                  Date et heure : {moment(feuille.date, 'YYYY-MM-DD').format("DD-MM-YYYY") + " " + feuille.heure}
                </p>
                <p className="w-100 w-md-33 m-0 text-left text-md-right ellipsis-wrap">
                  Classe : {feuille.niveauClasse + " " + feuille.nomClasse}
                </p>
              </div>


              {isSelect == true
                ? this.props.setFeuille(this.props.feuille)
                : null}
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


            </div>



          </Card>
        </ContextMenuTrigger>
      </Colxx>



    );
  }
}
export default React.memo(DataListView);


/* React.memo detail : https://reactjs.org/docs/react-api.html#reactpurecomponent  */

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

    this.state = {

    };
  }

  mv = () => {
    if (this.props.isSelect === true) {
      this.props.setDevoir(this.props.devoir)
    }

  }

  componentWillReceiveProps(nextProps) {
    if (!localStorage.getItem('user_id'))
      return this.props.handleLogout();

  }
  render() {
    const { devoir, isSelect, onCheckItem, collect } = this.props;




    var td = moment(new Date(), 'YYYY-MM-DD').format('YYYY-MM-DD');
    var d44 = moment(devoir.dateEcheance, 'YYYY-MM-DD').format('YYYY-MM-DD');

    return (


      <Colxx xxs="12"
        className="mb-3"
        onMouseOver={this.mv}
      >
        <ContextMenuTrigger id="menu_id" data={devoir.id} collect={collect}>
          <Card
            onMouseOver={this.mv}
            onClick={event => onCheckItem(event, devoir.id)}
            className={classnames("d-flex flex-row", {
              active: isSelect
            })}
          >
            <div className="pl-2 d-flex flex-grow-1 min-width-zero" id={devoir.id} >

              <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">

                <p className="w-100 w-md-33 m-0 text-left ellipsis-wrap" >
                  Trimestre: {devoir.trimestre}

                </p>
                <p className="w-100 w-md-33 m-0 text-left  text-md-center ellipsis-wrap">
                  Domaine: {devoir.domaine}
                </p>


                {devoir.dateEcheance && td.localeCompare(d44) < 1 &&
                  <p className="w-100 w-md-33 m-0 text-left text-md-right ellipsis-wrap">
                    Date d'échéance : {moment(devoir.dateEcheance, 'YYYY-MM-DD').format("DD-MM-YYYY")}
                  </p>
                }
                {devoir.dateEcheance && td.localeCompare(d44) === 1 &&
                  <p className="w-100 w-md-33 m-0 text-left text-md-right ellipsis-wrap">
                    Date dépassée
                    </p>
                }

              </div>


              {isSelect == true
                ? this.props.setDevoir(this.props.devoir)

                : null}
              <div className="custom-control custom-checkbox pl-1 align-self-center pr-4">
                <CustomInput
                  className="item-check mb-0"
                  type="checkbox"
                  id={`check_${devoir.id}`}
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

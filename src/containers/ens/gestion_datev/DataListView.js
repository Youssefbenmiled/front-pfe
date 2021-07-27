import React, { Component, Fragment } from "react";

import { Card, CustomInput, Badge, Button, Tooltip } from "reactstrap";
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
  componentWillReceiveProps(nextProps) {
    if (!localStorage.getItem('user_id'))
      return this.props.handleLogout();

  }

  mv = () => {
    if (!localStorage.getItem('user_id'))
      return this.props.handleLogout();

    if (this.props.isSelect === true) {
      this.props.setExam(this.props.exam)
    }
  }

  // tgv = () => {
  //   if (this.props.idClasse === -1) {
  //     return this.props.toggleModalVoir
  //   }
  // }
  render() {
    const { isSelect, onCheckItem, collect, exam } = this.props;

    var d2 = moment(exam.date, 'YYYY-MM-DD').format("DD-MM-YYYY");

    var td = moment(new Date(), 'YYYY-MM-DD').format('YYYY-MM-DD');
    var d44 = moment(exam.date, 'YYYY-MM-DD').format('YYYY-MM-DD');

    return (

      <Colxx xxs="12"
        className="mb-3"
        onMouseOver={this.mv}
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

              <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">

                {exam.date && td.localeCompare(d44) < 1 &&
                  <p className="w-100 w-md-33 m-0 text-left ellipsis-wrap" >
                    Date : {d2}
                  </p>
                }
                {exam.date && td.localeCompare(d44) === 1 &&
                  <p className="w-100 w-md-33 m-0 text-left ellipsis-wrap" >
                    Date dépassée
                  </p>
                }
                <p className="w-100 w-md-33 m-0 text-left  text-md-center ellipsis-wrap">
                  Horaire : {exam.HeureDebut + "__" + exam.heureFin}
                </p>
                <p className="w-100 w-md-33 m-0 text-left text-md-right ellipsis-wrap">
                  Domaine : {exam.domaine}
                </p>

              </div>



              {isSelect == true
                ? this.props.setExam(this.props.exam)
                : null}


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

            </div>



          </Card>
        </ContextMenuTrigger>
      </Colxx>


    );
  }
}
export default React.memo(DataListView);


/* React.memo detail : https://reactjs.org/docs/react-api.html#reactpurecomponent  */

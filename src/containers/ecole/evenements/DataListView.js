import React, { Component, Fragment } from "react";

import { Card, CustomInput, Badge, Button, Tooltip } from "reactstrap";
import classnames from "classnames";
import { ContextMenuTrigger } from "react-contextmenu";
import { Colxx } from "../../../components/common/CustomBootstrap";
import moment from "moment";


class DataListView extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  mv = () => {
    if (this.props.isSelect)
      this.props.setEvent(this.props.evenement)

  }
  voir = () => {
    if (this.props.type != '*')

      return this.props.toggleModalVoir()

  }

  render() {

    const { evenement, isSelect, collect, onCheckItem, type } = this.props;



    // var debut = moment(evenement.dateDebut, 'YYYY-MM-DD').format('DD-MM-YYYY');
    // var fin = moment(evenement.dateFin, 'YYYY-MM-DD').format('DD-MM-YYYY');
    var d44 = moment(evenement.dateFin, 'YYYY-MM-DD').format('YYYY-MM-DD');
    var lyoum = moment(new Date(), 'YYYY-MM-DD').format('YYYY-MM-DD');

    return (


      <Colxx
        xxs="12"
        className="mb-3"
        onMouseOver={this.mv}
        onClick={this.voir}
      >
        <ContextMenuTrigger id="menu_id" data={evenement.id} collect={collect}>
          <Card
            onClick={event => onCheckItem(event, evenement.id)}
            className={classnames("d-flex flex-row", {
              active: isSelect
            })}
          >
            <div className="pl-2 d-flex flex-grow-1 min-width-zero" id={evenement.id} >
              <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
                <p className="w-100 w-md-33 m-0 text-left ellipsis-wrap" >
                  Titre : {evenement.titre}
                </p>
                <p className="w-100 w-md-33 m-0 text-left  text-md-center ellipsis-wrap">
                  Type : {evenement.type}
                </p>
                {lyoum.localeCompare(d44) <= 0 ?
                  <p className="w-100 w-md-33 m-0 text-left text-md-right ellipsis-wrap">
                    Période : {moment(evenement.dateDebut, 'YYYY-MM-DD').format('DD-MM-YYYY')}{'__'}{moment(evenement.dateFin, 'YYYY-MM-DD').format('DD-MM-YYYY')}
                  </p>
                  :
                  <p className="w-100 w-md-33 m-0 text-left text-md-right ellipsis-wrap">
                    Date dépassée
                  </p>
                }
              </div>
            </div>



            {isSelect == true
              ? this.props.setEvent(this.props.evenement)
              : null}


            {type === '*' &&
              <div className="custom-control custom-checkbox pl-1 align-self-center pr-4">
                <CustomInput
                  className="item-check mb-0"
                  type="checkbox"
                  id={`check_${evenement.id}`}
                  checked={isSelect}
                  onChange={() => { }}
                  label=""
                />
              </div>
            }

          </Card>
        </ContextMenuTrigger>
      </Colxx>


    );

  }
}
/* React.memo detail : https://reactjs.org/docs/react-api.html#reactpurecomponent  */
export default React.memo(DataListView);

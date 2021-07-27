import React, { Component, Fragment } from "react";

import { Card, CustomInput, Badge, Button, Tooltip } from "reactstrap";
import classnames from "classnames";
import { Colxx } from "../../../components/common/CustomBootstrap";
import moment from "moment";


class DataListView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lyoum: new Date().getUTCFullYear() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate(),

    };
  }


  voir = () => {
    this.props.setEvent(this.props.evenement)
    return this.props.toggleModalVoir()

  }


  render() {
    const { evenement } = this.props;
    var debut = moment(evenement.dateDebut, 'YYYY-MM-DD').format('DD-MM-YYYY');
    var fin = moment(evenement.dateFin, 'YYYY-MM-DD').format('DD-MM-YYYY');
    var d44 = moment(evenement.dateFin, 'YYYY-MM-DD').format('YYYY-MM-DD');
    var lyoum = moment(this.state.lyoum, 'YYYY-MM-DD').format('YYYY-MM-DD');

    return (
      <Colxx
        xxs="12"
        className="mb-3"
        onClick={this.voir}
      >
        <Card
          className={classnames("d-flex flex-row")}
        >
          <div className="pl-2 d-flex flex-grow-1 min-width-zero" id={evenement.id} >
            <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
              <p className="w-33 w-sm-100 m-0 text-left" >
                Titre : {evenement.titre}
              </p>
              <p className="w-33 w-sm-100 m-0 text-center">
                Lieu : {evenement.lieu}
              </p>
              {lyoum.localeCompare(d44) <= 0 ?
                <p className="w-33 w-sm-100 m-0 text-right">
                  Période : {debut}{'__'}{fin}
                </p>
                :
                <p className="w-33 w-sm-100 m-0 text-right">
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
/* React.memo detail : https://reactjs.org/docs/react-api.html#reactpurecomponent  */
export default React.memo(DataListView);

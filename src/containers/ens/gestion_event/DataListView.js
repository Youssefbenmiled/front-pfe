import React, { Component, Fragment } from "react";

import { Card, CustomInput, Badge, Button, Tooltip } from "reactstrap";
import classnames from "classnames";
import { Colxx } from "../../../components/common/CustomBootstrap";
import moment from "moment";


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
  voir = () => {
    this.props.setEvent(this.props.evenement)
    return this.props.toggleModalVoir()
  }


  render() {
    const { evenement } = this.props;

    var d44 = moment(evenement.dateFin, 'YYYY-MM-DD').format('YYYY-MM-DD');
    var lyoum = moment(new Date(), 'YYYY-MM-DD').format('YYYY-MM-DD');

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
              <p className="w-100 w-md-33 m-0 text-left ellipsis-wrap" >
                Titre : {evenement.titre}
              </p>
              <p className="w-100 w-md-33 m-0 text-left  text-md-center ellipsis-wrap">
                Lieu : {evenement.lieu}
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
        </Card>
      </Colxx>
    );

  }
}
/* React.memo detail : https://reactjs.org/docs/react-api.html#reactpurecomponent  */
export default React.memo(DataListView);

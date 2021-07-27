import React, { Component } from "react";

import { Card, CustomInput } from "reactstrap";
import classnames from "classnames";
import { Colxx } from "../../../../components/common/CustomBootstrap";
import moment from "moment";

class DataListView extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }


  componentWillReceiveProps(nextProps) {
    if (!localStorage.getItem('user_id'))
      return this.props.handleLogout();

  }



  render() {

    const { feuille } = this.props;
    return (
      <Colxx xxs="12"
        className="mb-3"

      >
        <Card
          className={classnames("d-flex flex-row", {
          })}
        >
          <div className="pl-2 d-flex flex-grow-1 min-width-zero" id={feuille.id} >

            <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">

              <p className="w-100 w-md-33 m-0 text-left ellipsis-wrap" >
                Enseignant : {feuille.nomEnseignant + " " + feuille.prenomEnseignant}
              </p>

              <p className="w-100 w-md-33 m-0 text-left  text-md-center ellipsis-wrap">
                Date d'envoi : {moment(feuille.date, 'YYYY-MM-DD').format('DD-MM-YYYY') + " " + feuille.heure}
              </p>

              <p className="w-100 w-md-33 m-0 text-left text-md-right ellipsis-wrap">
                Séance : {feuille.seance}
              </p>



            </div>
          </div>



        </Card>
      </Colxx>



    );
  }
}
export default React.memo(DataListView);


/* React.memo detail : https://reactjs.org/docs/react-api.html#reactpurecomponent  */

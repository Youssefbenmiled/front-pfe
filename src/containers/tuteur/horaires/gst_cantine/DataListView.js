import React, { Component, Fragment } from "react";

import { Card, CustomInput, Badge, Button, Tooltip } from "reactstrap";
import { NavLink } from "react-router-dom";
import classnames from "classnames";
import { ContextMenuTrigger } from "react-contextmenu";
import { Colxx } from "../../../../components/common/CustomBootstrap";
// import "./classe.css";
import moment from 'moment'

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

  render() {
    const { cantine } = this.props;


    var td = moment(new Date(), 'YYYY-MM-DD').format('YYYY-MM-DD');
    var d44 = moment(cantine.delaisFin, 'YYYY-MM-DD').format('YYYY-MM-DD');



    return (


      <Colxx xxs="12"
        className="mb-3"
      >
        <Card
          className={classnames("d-flex flex-row", {
          })}
        >
          <div className="pl-2 d-flex flex-grow-1 min-width-zero" id={cantine.id} >

            <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">

              {cantine.delaisFin && td.localeCompare(d44) < 1 &&

                <p className="w-100 w-md-33 m-0 text-left ellipsis-wrap" >
                  Période : {moment(cantine.delaiDebut, 'YYYY-MM-DD').format("DD-MM-YYYY")}{"___"}{moment(cantine.delaisFin, 'YYYY-MM-DD').format("DD-MM-YYYY")}
                </p>
              }
              {cantine.delaisFin && td.localeCompare(d44) === 1 &&

                <p className="w-100 w-md-33 m-0 text-left ellipsis-wrap" >
                  Période dépassée
                </p>
              }
              <h5 className="w-100 w-md-33 m-0 text-left  text-md-center ellipsis-wrap">

                <a href={cantine.url} target="_blank">
                  Menu
                  </a>
              </h5>


              <p className="w-100 w-md-33 m-0 text-left text-md-right ellipsis-wrap">

                Horaires : {cantine.heureDebut}{"___"}{cantine.heureFin}
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

import React, { Component, Fragment } from "react";

import { Card, CustomInput, Button, Tooltip } from "reactstrap";
import classnames from "classnames";
import { ContextMenuTrigger } from "react-contextmenu";
import { Colxx } from "../../../components/common/CustomBootstrap";
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

  mouseover = () => {
    if (!localStorage.getItem('user_id'))
      return this.props.handleLogout();

    if (this.props.isSelect) {
      this.props.setAdmin(this.props.admin)

    }

  }


  voir = () => {
    if ((this.props.role != '*') ||
      (this.props.admin && this.props.role === '*' && this.props.admin.roles.trim().split(' ')
        .filter(x => x.localeCompare('ROLE_GESTION_ADMINISTRATEUR') != 0).length === 5)
    ) {
      this.props.setAdmin(this.props.admin)
      return this.props.toggleModalVoir();
    }
  }

  render() {
    const { admin, isSelect, onCheckItem, toggleModalVoir, role, collect } = this.props;
    var dt = moment(admin.dateCreation, 'YYYY-MM-DD').format("DD-MM-YYYY");
    const id = localStorage.getItem('user_id');


    return (
      <>
        {(
          (role === "*") ||
          (admin.roles.trim().split(' ').filter(x => x.localeCompare('ROLE_GESTION_ADMINISTRATEUR') != 0).length < 5 && (admin.roles.trim().split(' ').filter(x => x.localeCompare('ROLE_GESTION_ADMINISTRATEUR') != 0).includes(role))) ||
          (admin.roles.trim().split(' ').filter(x => x.localeCompare('ROLE_GESTION_ADMINISTRATEUR') != 0).length === 5 && role.localeCompare('ROLE_SUPER_ADMINISTRATEUR') === 0)
        )
          ?

          <Colxx xxs="12" className="mb-3"
            onClick={this.voir}
            onMouseOver={this.mouseover}
          >
            <ContextMenuTrigger id="menu_id" data={admin.id} collect={collect}>
              <Card
                onClick={event => onCheckItem(admin.id)}
                className={classnames("d-flex flex-row", {
                  active: isSelect
                })}
              >
                <div className="pl-2 d-flex flex-grow-1 min-width-zero"
                  id={admin.id}

                >
                  <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">

                    <p className="w-100 w-md-33 m-0 text-left ellipsis-wrap" >
                      Nom Complet : {admin.nomPrenom}
                    </p>
                    <p className="w-100 w-md-33 m-0 text-left  text-md-center ellipsis-wrap">
                      {admin.email}
                    </p>
                    <p className="w-100 w-md-33 m-0 text-left text-md-right ellipsis-wrap">
                      Statut : {admin.statut}
                    </p>

                    {isSelect == true ?
                      this.props.setAdmin(this.props.admin)
                      : null
                    }

                  </div>
                  {role === '*' && admin.id != id && admin.roles.trim().split(' ').filter(x => x.localeCompare('ROLE_GESTION_ADMINISTRATEUR') != 0).length < 5 &&
                    <div className="custom-control custom-checkbox pl-1 align-self-center pr-4">
                      <CustomInput
                        className="item-check mb-0"
                        type="checkbox"
                        id={`check_${admin.id}`}
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
          : null}



      </>
    );

  }
}


/* React.memo detail : https://reactjs.org/docs/react-api.html#reactpurecomponent  */
export default React.memo(DataListView);

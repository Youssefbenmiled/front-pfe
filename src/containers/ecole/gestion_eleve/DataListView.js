import React, { Component, Fragment } from "react";
import { Card, CustomInput, Badge, Button, Tooltip } from "reactstrap";
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
  tgv = () => {
    if (this.props.niveau === "*")
      return this.props.toggleModal

  }
  mouseover = () => {
    if (this.props.isSelect === true)
      this.props.setEleve(this.props.eleve)

  }

  render() {
    const { eleve, isSelect, onCheckItem, collect, classe } = this.props;

    return (

      <Colxx xxs="12" className="mb-3" onMouseOver={this.mouseover} onClick={this.tgv()}>
        <ContextMenuTrigger id="menu_id" data={eleve.id} collect={collect}>
          <Card
            onClick={event => onCheckItem(event, eleve.id)}
            className={classnames("d-flex flex-row", {
              active: isSelect
            })}
          >
            <div className="pl-2 d-flex flex-grow-1 min-width-zero" id={eleve.id}>

              <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">

                <p className="w-100 w-md-33 m-0 text-left ellipsis-wrap" >
                  Nom : {eleve.nameEleve}
                </p>

                <p className="w-100 w-md-33 m-0 text-left  text-md-center ellipsis-wrap">
                  Prénom : {eleve.prenom}
                </p>

                {!classe ?

                  <p className="w-100 w-md-33 m-0 text-left text-md-right ellipsis-wrap">
                    Classe : {eleve.niveau}{" "}{eleve.nomClasse}
                  </p>

                  :
                  eleve.dateNaissance !== undefined &&
                  <p className="w-100 w-md-33 m-0 text-left text-md-right ellipsis-wrap">
                    Naissance : {moment(eleve.dateNaissance, 'YYYY-MM-DD').format("DD-MM-YYYY")}
                  </p>
                }
              </div>



              {isSelect == true
                ? this.props.setEleve(this.props.eleve)
                : null}

              {classe &&
                <div className="custom-control custom-checkbox pl-1 align-self-center pr-4">
                  <CustomInput
                    className="item-check mb-0"
                    type="checkbox"
                    id={`check_${eleve.id}`}
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

/* React.memo detail : https://reactjs.org/docs/react-api.html#reactpurecomponent  */
export default React.memo(DataListView);

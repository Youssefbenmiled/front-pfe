import React, { Component, Fragment } from "react";
import axios from "axios"
import { Card, CustomInput, Badge, Button, Tooltip } from "reactstrap";
import classnames from "classnames";
import { ContextMenuTrigger } from "react-contextmenu";
import { Colxx } from "../../../components/common/CustomBootstrap";
// import "./classe.css";

class DataListView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
  }



  mouseover = () => {
    if (this.props.isSelect) {
      this.props.setDomaine(this.props.domaine)
    }
  }

  render() {
    const { domaine, isSelect, onCheckItem, collect, niveau } = this.props;
    return (
      <Colxx xxs="12" className="mb-3">
        <ContextMenuTrigger id="menu_id" data={domaine.id} collect={collect}>
          <Card
            onMouseOver={this.mouseover}
            onClick={event => onCheckItem(event, domaine.id)}
            className={classnames("d-flex flex-row", {
              active: isSelect
            })}
          >
            <div className="pl-2 d-flex flex-grow-1 min-width-zero" id={domaine.id} >
              <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
                <p className="w-50 w-sm-100 m-0 text-center" >
                  Niveau :{domaine.niveau}
                </p>

                <p className="w-50 w-sm-100 m-0 text-center">
                  {domaine.nom}
                </p>

              </div>
            </div>

            {isSelect == true
              ? this.props.setDomaine(domaine)
              : null}
            {niveau.value != "*" &&
              <div className="custom-control custom-checkbox pl-1 align-self-center pr-4">
                <CustomInput
                  className="item-check mb-0"
                  type="checkbox"
                  id={`check_${domaine.id}`}
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

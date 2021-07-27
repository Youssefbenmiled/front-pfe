import React, { Component, Fragment } from "react";

import { Card, CustomInput, Badge, Button, Tooltip } from "reactstrap";
import { NavLink } from "react-router-dom";
import classnames from "classnames";
import { ContextMenuTrigger } from "react-contextmenu";
import { Colxx } from "../../../components/common/CustomBootstrap";
// import "./classe.css";

class DataListView extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }




  mouseover = () => {
    if (this.props.isSelect) {
      this.props.setMat(this.props.mat)
    }
  }
  render() {
    const { mat, isSelect, onCheckItem, collect, domaine } = this.props;
    return (


      <Colxx xxs="12" className="mb-3" onMouseOver={this.mouseover} >
        <ContextMenuTrigger id="menu_id" data={mat.id} collect={collect}>
          <Card
            onMouseOver={this.MouseOver}
            onClick={event => onCheckItem(event, mat.id)}
            className={classnames("d-flex flex-row", {
              active: isSelect
            })}
          >
            <div className="pl-2 d-flex flex-grow-1 min-width-zero" id={mat.id} >
              {!domaine ?
                <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
                  <p className="w-25 w-sm-100 m-0 text-left" >
                    Niveau :{mat.niveau}
                  </p>
                  <p className="w-25 w-sm-100 m-0 text-left" >
                    Domaine :{mat.nomDomaine}
                  </p>
                  <p className="w-25 w-sm-100 m-0 text-center">
                    Matiére : {mat.nom}
                  </p>
                  <p className="w-25 w-sm-100 m-0 text-right">
                    Coefficient : {mat.coeficient}
                  </p>
                </div>
                :
                <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">

                  <p className="w-50 w-sm-100 m-0 text-center">
                    Matiére : {mat.nom}
                  </p>
                  <p className="w-50 w-sm-100 m-0 text-center">
                    Coefficient : {mat.coeficient}
                  </p>
                </div>
              }
            </div>

            {isSelect == true
              ? this.props.setMat(this.props.mat)
              : null}


            {domaine &&
              <div className="custom-control custom-checkbox pl-1 align-self-center pr-4">
                <CustomInput
                  className="item-check mb-0"
                  type="checkbox"
                  id={`check_${mat.id}`}
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
export default React.memo(DataListView);


/* React.memo detail : https://reactjs.org/docs/react-api.html#reactpurecomponent  */

import React, { Component } from "react";

import { Card, CustomInput } from "reactstrap";
import classnames from "classnames";
import { ContextMenuTrigger } from "react-contextmenu";
import { Colxx } from "../../../../components/common/CustomBootstrap";
// import "./classe.css";

class DataListView extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  mv = () => {
    if (this.props.isSelect === true) {
      this.props.setFeuille(this.props.feuille)
    }
  }


  render() {
    const { feuille, toggleModalVoir } = this.props;
    return (
      <Colxx xxs="12"
        className="mb-3"
        onMouseOver={this.mv}
      >
        <Card
          onClick={() => toggleModalVoir(feuille)}
          className={classnames("d-flex flex-row", {
          })}
        >
          <div className="pl-2 d-flex flex-grow-1 min-width-zero" id={feuille.id} >

            <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">

              <p className="w-33 w-sm-100 m-0 w-sm-100 text-left">
                Trimestre : {1}
              </p>

              <p className="w-33 w-sm-100 m-0 w-sm-100 text-center">
                Séance : {'date et heure'}
              </p>

              <p className="w-33 w-sm-100 m-0 w-sm-100 text-right">
                Domaine : {'arabe'}
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

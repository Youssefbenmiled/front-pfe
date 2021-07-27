import React, { Component } from "react";

import { Card } from "reactstrap";
import classnames from "classnames";
import { Colxx } from "../../../../components/common/CustomBootstrap";
import IntlMessages from "../../../../helpers/IntlMessages";
// import "./classe.css";

class DataListView extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }




  render() {
    const { emploi } = this.props;
    return (
      <Colxx xxs="12" className="mb-3"
      >

        <Card
          className={classnames("d-flex flex-row", {

          })}
        >


          <div className="pl-2 d-flex flex-grow-1 min-width-zero" id={emploi.id} >
            <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
              <h5 className="w-100 w-sm-100 m-0 text-center">

                <a href={emploi.url} target="_blank">
                  Voir emploi
                </a>
              </h5>
            </div>
          </div>




        </Card>
      </Colxx>
    );
  }
}


/* React.memo detail : https://reactjs.org/docs/react-api.html#reactpurecomponent  */
export default React.memo(DataListView);

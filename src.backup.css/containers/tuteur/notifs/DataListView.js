import React, { Component } from "react";

import { Card } from "reactstrap";
import classnames from "classnames";
import { Colxx } from "../../../components/common/CustomBootstrap";
import IntlMessages from "../../../helpers/IntlMessages";
// import "./classe.css";
import { NavLink } from "react-router-dom";

class DataListView extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }



  render() {
    const { notif } = this.props;
    return (

      <Colxx xxs="12" className="mb-3">
        <NavLink
          to={"/parent/evenements"}
          location={{}}
        >
          <Card
            className={classnames("d-flex flex-row", {
            })}
          >

            <div className="pl-2 d-flex flex-grow-1 min-width-zero" id={notif.id} >
              <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
                <p className="w-100 w-sm-100 m-0 text-left">
                  aasdqjlkazljkaezjkljkazelkjaezjkazhaekjzhabjkfdhkfdhjdfkhjfdlkjskdfhksdflksdfhk
                </p>
              </div>
            </div>




          </Card>
        </NavLink>
      </Colxx>
    );
  }
}


/* React.memo detail : https://reactjs.org/docs/react-api.html#reactpurecomponent  */
export default React.memo(DataListView);

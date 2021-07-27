import React, { Component, Fragment } from "react";

import { Card, CustomInput, Button, Tooltip } from "reactstrap";
import classnames from "classnames";
import { ContextMenuTrigger } from "react-contextmenu";
import { Colxx } from "../../../components/common/CustomBootstrap";
import moment from 'moment'

class DataListView extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }



  mouseover = () => {
    if (this.props.isSelect === true) {
      return this.props.setYear(this.props.year)

    }

  }




  render() {
    const { year, isSelect, onCheckItem } = this.props;
    const id = localStorage.getItem('user_id');


    return (


      <Colxx xxs="12" className="mb-3"
        onMouseOver={this.mouseover}
      >
        <ContextMenuTrigger id="menu_id" data={year.id}>
          <Card
            onClick={event => onCheckItem(event, year.id)}
            className={classnames("d-flex flex-row", {
              active: isSelect
            })}
          >
            <div className="pl-2 d-flex flex-grow-1 min-width-zero"
              id={year.id}

            >
              <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">

                <p className="w-100 w-sm-100 m-0 w-sm-100 text-center">
                  2020/2021
                </p>


                {isSelect == true ?
                  this.props.setYear(this.props.year)
                  : null
                }

              </div>
              <div className="custom-control custom-checkbox pl-1 align-self-center pr-4">
                <CustomInput
                  className="item-check mb-0"
                  type="checkbox"
                  id={`check_${year.id}`}
                  checked={isSelect}
                  onChange={() => { }}
                  label=""
                />
              </div>

            </div>
          </Card>
        </ContextMenuTrigger>
      </Colxx>

    );

  }
}


/* React.memo detail : https://reactjs.org/docs/react-api.html#reactpurecomponent  */
export default React.memo(DataListView);

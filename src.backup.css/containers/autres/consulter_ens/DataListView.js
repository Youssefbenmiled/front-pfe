import React, { Component, Fragment } from "react";

import {
  Card, CustomInput, Badge, Tooltip
} from "reactstrap";
import { NavLink } from "react-router-dom";
import classnames from "classnames";
import { ContextMenuTrigger } from "react-contextmenu";
import { Colxx } from "../../../components/common/CustomBootstrap";
import IntlMessages from "../../../helpers/IntlMessages";



class DataListView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tooltipOpen: false

    };
  }

  toggle = () => {
    this.setState(prevState => ({
      tooltipOpen: !prevState.tooltipOpen
    }));
    this.props.setProduct(this.props.product)
  };



  render() {
    const { product, isSelect, collect, onCheckItem, toggleModalImp } = this.props;

    return (
      <Colxx xxs="12" className="mb-3" >
        <ContextMenuTrigger id="menu_id" data={product.id} collect={collect}>
          <Card
            onClick={event => onCheckItem(event, product.id)}
            className={classnames("d-flex flex-row", {
              active: isSelect
            })}
          >
            <div className="pl-2 d-flex flex-grow-1 min-width-zero"
              id={"Tooltip-" + product.id}
              onClick={() => toggleModalImp()}

            >
              <div
                className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">

                <NavLink to={`?p=${product.id}`} className="w-40 w-sm-100"  >
                  <p
                    className="list-item-heading mb-1 truncate"
                    id={"Tooltip-" + product.id}
                    onClick={() => toggleModalImp()}
                  >
                    {product.title}{" "}{product.title}

                  </p>
                </NavLink>

                <Tooltip
                  placement="bottom"
                  isOpen={this.state.tooltipOpen}
                  target={"Tooltip-" + product.id}
                  toggle={this.toggle}
                  id="tltp"
                >
                  <h5>Télécharger &nbsp;
                {product.title}&nbsp;&nbsp;</h5>

                </Tooltip>

                <p className="mb-1 text-muted text-small w-15 w-sm-100">
                  {product.category}
                </p>
                <p className="mb-1 text-muted text-small w-15 w-sm-100">
                  {product.date}
                </p>

                <p className="mb-1 text-muted text-small w-15 w-sm-100">
                  {product.description}
                </p>

              </div>

            </div>
          </Card>
        </ContextMenuTrigger>
      </Colxx>
    );
  }
}
export default React.memo(DataListView);

import React, { Component, Fragment } from "react";

import { Card, CustomInput, Badge, Button, Tooltip } from "reactstrap";
import { NavLink } from "react-router-dom";
import classnames from "classnames";
import { ContextMenuTrigger } from "react-contextmenu";
import { Colxx } from "../../../components/common/CustomBootstrap";
import IntlMessages from "../../../helpers/IntlMessages";
import "./classe.css";
import UpdateModal from "./UpdateModal";

class DataListView extends Component {
  constructor(props) {
    super();
    this.state = {
      modalOpenUpdate: false,
      modalOpenDelete: false,
      tooltipOpen: false
    };
  }

  tgu = () => {
    return this.props.toggleModalUpdate;
  };
  tgd = () => {
    return this.props.toggleModalDelete;
  };
  toggle() {
    this.setState({
      tooltipOpen: !this.state.tooltipOpen
    });
  }

  toggle = () => {
    this.setState(prevState => ({
      tooltipOpen: !prevState.tooltipOpen
    }));
    this.props.setProduct(this.props.product)
  };
  render() {
    const { product, isSelect, collect, onCheckItem, toggleModalVoir } = this.props;
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

            >
              <div
                className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">

                <NavLink
                  to={`?p=${product.id}`} className="w-40 w-sm-100"
                  onClick={() => toggleModalVoir()}
                >
                  <p
                    className="list-item-heading mb-1 truncate"
                    id={"Tooltip-" + product.id}
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
                  <h5> {product.description} {product.title}
                    {product.title}&nbsp;&nbsp;</h5>

                </Tooltip>

                <p className="mb-1 text-muted text-small w-15 w-sm-100">
                  {product.category}
                </p>
                <p className="mb-1 text-muted text-small w-15 w-sm-100">
                  {product.date}
                </p>
                {isSelect == true
                  ? this.props.setProduct(this.props.product)
                  : null}

                <p className="mb-1 text-muted text-small w-15 w-sm-100">
                  {product.description}
                </p>

              </div>
              <div className="custom-control custom-checkbox pl-1 align-self-center pr-4">
                <CustomInput
                  className="item-check mb-0"
                  type="checkbox"
                  id={`check_${product.id}`}
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
// const DataListView = ({ product, isSelect, collect, onCheckItem }) => {
//   return (
//     <Colxx xxs="12" className="mb-3">
//       <ContextMenuTrigger id="menu_id" data={product.id} collect={collect}>
//         <Card
//           onClick={event => onCheckItem(event, product.id)}
//           className={classnames("d-flex flex-row", {
//             active: isSelect
//           })}
//         >
//           <div className="pl-2 d-flex flex-grow-1 min-width-zero">
//             <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
//               <NavLink to={`?p=${product.id}`} className="w-40 w-sm-100">
//                 {/*<Tooltip
//                   title={
//                     product.title +
//                     "  " +
//                     product.category +
//                     "  " +
//                     product.status +
//                     "  Description : " +
//                     product.description +
//                     " Sales " +
//                     product.sales +
//                     "  " +
//                     product.stock +
//                     " , Date : " +
//                     product.date
//                   }
//                 >
//                  </Tooltip>
//                 */}
//                 <p className="list-item-heading mb-1 truncate">
//                   {product.title}
//                 </p>
//               </NavLink>
//               <p className="mb-1 text-muted text-small w-15 w-sm-100">
//                 {product.category}
//               </p>
//               <p className="mb-1 text-muted text-small w-15 w-sm-100">
//                 {product.date}
//               </p>
//               <div className="w-15 w-sm-100">
//                 <Badge color={product.statusColor} pill>
//                   {product.status}
//                 </Badge>
//               </div>
//               {isSelect == true ? (
//                 <Fragment>
//                   <div className="w-15 w-sm-100">
//                     <Button
//                       className="iconsminds-file-edit"
//                       color="secondary"
//                       outline
//                       id="modif"
//                       onClick={() => toggleModal()}
//                     >
//                       &nbsp;&nbsp;
//                       <IntlMessages id="Modifier" />
//                     </Button>
//                   </div>
//                   <div className="w-15 w-sm-100">
//                     <Button
//                       className="iconsminds-delete-file"
//                       color="danger"
//                       outline
//                       id="supp"
//                     >
//                       &nbsp;&nbsp;
//                       <IntlMessages id="Supprimer" />
//                     </Button>
//                   </div>
//                 </Fragment>
//               ) : null}
//             </div>
//             <div className="custom-control custom-checkbox pl-1 align-self-center pr-4">
//               <CustomInput
//                 className="item-check mb-0"
//                 type="checkbox"
//                 id={`check_${product.id}`}
//                 checked={isSelect}
//                 onChange={() => {}}
//                 label=""
//               />
//             </div>
//           </div>
//         </Card>
//       </ContextMenuTrigger>
//     </Colxx>
//   );
// };

/* React.memo detail : https://reactjs.org/docs/react-api.html#reactpurecomponent  */
export default React.memo(DataListView);

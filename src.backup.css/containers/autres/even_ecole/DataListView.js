// import React, { Component, Fragment } from "react";
// import { Card, CustomInput, Badge, Button, Tooltip } from "reactstrap";
// import classnames from "classnames";
// import { ContextMenuTrigger } from "react-contextmenu";
// import { Colxx } from "../../../components/common/CustomBootstrap";
// import "./classe.css";
// import moment from 'moment'

// class DataListView extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {

//     };
//   }

//   tgv = () => {
//     // if (this.props.niveau === "*") {
//     // return this.props.toggleModal

//   }
//   mouseover = () => {
//     if (this.props.isSelect == true) {
//       // this.props.setEleve(this.props.event)
//     }
//   }

//   render() {
//     const { event, isSelect, onCheckItem, collect, classe } = this.props;
//     // var dt = moment(eleve.dateNaissance, 'YYYY-MM-DD').format("DD-MM-YYYY");

//     return (

//       <Colxx xxs="12" className="mb-3" onMouseOver={this.mouseover} onClick={this.tgv()}>
//         <ContextMenuTrigger id="menu_id" data={event.id} collect={collect}>
//           <Card
//             onClick={event => onCheckItem(event, eleve.id)}
//             className={classnames("d-flex flex-row", {
//               active: isSelect
//             })}
//           >
//             <div className="pl-2 d-flex flex-grow-1 min-width-zero" id={eleve.id}>
//               {/* {!classe ?
//                 <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">

//                   <p className="w-33 w-sm-100 m-0 w-sm-100 text-left">
//                     Nom  :{eleve.nameEleve}
//                   </p>

//                   <p className="w-33 w-sm-100 m-0 w-sm-100 text-center">
//                     Prénom : {eleve.prenom}
//                   </p>

//                   <p className="w-33 w-sm-100 m-0 w-sm-100 text-right">
//                     Classe : {eleve.niveau}{" "}{eleve.nomClasse}
//                   </p>
//                 </div>
//                 :
//                 <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">

//                   <p className="w-33 w-sm-100 m-0 w-sm-100 text-left">
//                     Nom :{eleve.nameEleve}
//                   </p>
//                   <p className="w-33 w-sm-100 m-0 w-sm-100 text-center">
//                     Prénom : {eleve.prenom}
//                   </p>
//                   {
//                     eleve.dateNaissance !== undefined &&
//                     <p className="w-33 w-sm-100 m-0 w-sm-100 text-right" >
//                       Date de naissance :
//                     {dt}
//                     </p>
//                   }




//                 </div>
//               } */}
//               {isSelect == true
//                 ? this.props.setEleve(this.props.eleve)
//                 : null}

//               <div className="custom-control custom-checkbox pl-1 align-self-center pr-4">
//                 <CustomInput
//                   className="item-check mb-0"
//                   type="checkbox"
//                   id={`check_${eleve.id}`}
//                   checked={isSelect}
//                   onChange={() => { }}
//                   label=""
//                 />
//               </div>


//             </div>



//           </Card>
//         </ContextMenuTrigger>
//       </Colxx>



//     );
//   }
// }

// /* React.memo detail : https://reactjs.org/docs/react-api.html#reactpurecomponent  */
// export default React.memo(DataListView);

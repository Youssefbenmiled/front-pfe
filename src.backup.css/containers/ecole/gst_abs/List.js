import React, { Component, Fragment } from "react";

import { Card, CustomInput, Badge, Button, Tooltip } from "reactstrap";
import { NavLink } from "react-router-dom";
import classnames from "classnames";
import { ContextMenuTrigger } from "react-contextmenu";
import { Colxx } from "../../../components/common/CustomBootstrap";
// import "./classe.css";
import Switch from "rc-switch";

class DataListView extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }




    render() {
        const { eleve } = this.props;
        return (

            <tr
            // className={{
            //     active: isSelect
            // }}

            >


                <td>{eleve.nameEleve}{' '}{eleve.prenom}</td>
                <td>{eleve.prenom}</td>

                <td>
                    <Switch
                        className="custom-switch custom-switch-primary custom-switch-small"
                        checked={false}
                        disabled
                        // onChange={event => onCheckItem(event, eleve.id)}
                        id={`check_${eleve.id}`}
                    />
                </td>
            </tr>




        );
    }
}
export default React.memo(DataListView);
/* React.memo detail : https://reactjs.org/docs/react-api.html#reactpurecomponent  */


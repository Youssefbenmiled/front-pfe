import React, { Component, Fragment } from "react";


//import "./classe.css";
import Switch from "rc-switch";

class DataListView extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }




    render() {
        const { eleve, isSelect, onCheckItem, edit } = this.props;
        return (

            <tr
                className={{
                    active: isSelect
                }}>


                <td>{eleve.nameEleve}</td>
                <td>{eleve.prenom}</td>

                <td>
                    {edit ?
                        <Switch
                            className="custom-switch custom-switch-primary custom-switch-small"
                            checked={isSelect}
                            onChange={() => onCheckItem(eleve.id)}
                            id={`check_${eleve.id}`}
                        />
                        :
                        <Switch
                            className="custom-switch custom-switch-primary custom-switch-small"
                            checked={[57, 60, 65].indexOf(eleve.id) > -1 ? true : false}
                            disabled
                            // onChange={event => onCheckItem(event, eleve.id)}
                            id={`check_${eleve.id}`}
                        />
                    }
                </td>
            </tr>




        );
    }
}
export default React.memo(DataListView);
/* React.memo detail : https://reactjs.org/docs/react-api.html#reactpurecomponent  */


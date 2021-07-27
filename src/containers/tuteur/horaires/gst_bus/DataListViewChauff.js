import React, { Component, Fragment } from "react";

import { Card, CustomInput, Badge, Button, Tooltip } from "reactstrap";
import { NavLink } from "react-router-dom";
import classnames from "classnames";
import { ContextMenuTrigger } from "react-contextmenu";
import { Colxx } from "../../../../components/common/CustomBootstrap";

class DataListView extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }


    render() {
        const { bus } = this.props;
        return (
            <Colxx xxs="12" className="mb-3" >
                <Card
                    className={classnames("d-flex flex-row", {
                    })}
                >
                    <div className="pl-2 d-flex flex-grow-1 min-width-zero" id={bus.id} >
                        <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
                            <p className="w-100 w-md-33 m-0 text-left ellipsis-wrap" >
                                Chauffeur: {bus.nomchauffeur}
                            </p>

                            <img src={bus.photoChauffeur}
                                alt={"Photo " + bus.nomchauffeur}
                                className="w-100 w-md-33 m-0 text-left  text-md-center ellipsis-wrap"
                            />
                            <p className="w-100 w-md-33 m-0 text-left text-md-right ellipsis-wrap">
                                Téléphone: {bus.numtelChauffeur}
                            </p>




                        </div>
                    </div>

                </Card>

            </Colxx>
        );

    }
}
/* React.memo detail : https://reactjs.org/docs/react-api.html#reactpurecomponent  */
export default React.memo(DataListView);

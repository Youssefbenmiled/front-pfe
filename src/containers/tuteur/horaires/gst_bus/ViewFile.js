import React, { Component, Fragment } from "react";

import { Card, CustomInput, Badge, Button, Tooltip } from "reactstrap";
import classnames from "classnames";
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
            <Colxx xxs="12" className="mb-3" onMouseOver={this.mv}>
                <Card
                    className={classnames("d-flex flex-row", {
                    })}
                >
                    <div className="pl-2 d-flex flex-grow-1 min-width-zero" id={bus.id} >
                        <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">

                            <h5 className="w-100 w-sm-100 m-0 text-center">
                                <a href={bus.fileHorraire} target="_blank">
                                    Horaires
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

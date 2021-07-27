import React, { Component, Fragment } from "react";

import {
    Card, CustomInput, Badge, Button, Tooltip, Collapse
} from "reactstrap";
import { NavLink } from "react-router-dom";
import classnames from "classnames";
import { ContextMenuTrigger } from "react-contextmenu";
import { Colxx, Separator } from "../../../components/common/CustomBootstrap";
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
        this.props.setEvent(this.props.event)
    };


    render() {
        const { event, id, rowLength, toggleImp } = this.props;
        //const { modalOpenUpdate } = this.state;

        return (
            <div
                key={id}
                className={`${rowLength !== id + 1 ? "mb-3" : ""}`}
            >

                <NavLink to={`#${event.title}`} className="w-40 w-sm-100" onClick={() => toggleImp()}
                    id={"Tooltip-" + id}
                >
                    <p className="list-item-heading mb-1 color-theme-1" >
                        {event.title}
                    </p>
                </NavLink>
                <Tooltip
                    placement="right"
                    isOpen={this.state.tooltipOpen}
                    target={"Tooltip-" + id}
                    toggle={this.toggle}
                    id="tltp"
                >
                    <h6>{"Télécharger l'évenement " + event.title}</h6>


                </Tooltip>

                <p className="mb-1 text-muted text-small">
                    Products | {event.category}
                </p>
                <p className="mb-4 text-small">{event.description}</p>
                {/* {rowLength !== id + 1 && <Separator />} */}
            </div>
        );
    }
}
export default React.memo(DataListView);

import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { injectIntl } from "react-intl";
import {
    DropdownMenu,
    DropdownItem,
    DropdownToggle,
    ButtonDropdown,
    UncontrolledDropdown
} from "reactstrap"
import PerfectScrollbar from "react-perfect-scrollbar";

class CommentWithLikes extends Component {

    constructor(props) {
        super(props);
        this.getLikeLabel = this.getLikeLabel.bind(this);
        this.state = {
            dropdownSplitOpen: false,
        }
    }

    getLikeLabel(likeCount) {
        if (likeCount === 1) {
            return this.props.intl.messages["pages.like"]
        } else {
            return this.props.intl.messages["pages.likes"]
        }
    }
    toggleSplit = () => {
        this.setState(prevState => ({
            dropdownSplitOpen: !prevState.dropdownSplitOpen
        }));
    };
    modifier = () => {

        return this.props.setModif(true, this.props.data)

    }
    supprimer = () => {
        return this.props.setSupp(true, this.props.data)
    }
    render() {
        const { dropdownSplitOpen } = this.state
        return (
            <div className={"d-flex flex-row mb-3  justify-content-between " + this.props.className}>
                <NavLink to="#" location={{}}>
                    <img src={this.props.data.thumb} alt={this.props.data.name}
                        className="img-thumbnail border-0 rounded-circle list-thumbnail align-self-center xsmall" />
                </NavLink>
                <div className="pl-3 flex-grow-1">
                    {/* <NavLink to="#" location={{}}> */}
                    <h4 className="font-weight-medium mb-0">{this.props.data.name}</h4>
                    <h4 className="text-muted mb-0 text-small">{this.props.data.data}</h4>
                    {/* </NavLink> */}
                    <p className="mt-3">
                        {this.props.data.detail}
                    </p>
                </div>
                <div className="comment-likes">
                    <span className="post-icon">
                        <NavLink to="#" location={{}}>

                            {this.props.edit == true &&
                                (
                                    <UncontrolledDropdown className="dropdown-menu-right">
                                        <DropdownToggle
                                            className="simple-icon-options"
                                            color="empty"
                                        >
                                        </DropdownToggle>
                                        <DropdownMenu
                                            className="position-absolute mt-3 scroll"
                                            right
                                            id="dropdown-content"
                                        >
                                            <DropdownItem onClick={this.modifier}>Modifier</DropdownItem>
                                            <DropdownItem onClick={this.supprimer}>Supprimer</DropdownItem>

                                        </DropdownMenu>
                                    </UncontrolledDropdown>

                                )}


                        </NavLink>

                    </span>
                </div>
            </div >
        );
    }
}

export default injectIntl(CommentWithLikes);
import React from "react";
import { ContextMenu, MenuItem } from "react-contextmenu";
import { Button } from "reactstrap";
class ContextMenuContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  tgd = () => {
    return this.props.toggleModalDelete;
  };

  render() {
    const { onContextMenu, onContextMenuClick } = this.props;
    return (
      <ContextMenu id="menu_id" onShow={e => onContextMenu(e, e.detail.data)}>

        <MenuItem onClick={onContextMenuClick} data={{ action: "delete" }}>
          <Button
            className="simple-icon-trash"
            color="danger"
            outline
            id="supp"
            onClick={this.tgd()}
          >
            &nbsp;&nbsp; Supprimer
            </Button>
        </MenuItem>
      </ContextMenu>
    );
  }
}

export default ContextMenuContainer;

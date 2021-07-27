import React from "react";
import { ContextMenu, MenuItem } from "react-contextmenu";
import { Button } from "reactstrap";
class ContextMenuContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    const { selectedItems, onContextMenu, onContextMenuClick } = this.props;
    return (
      <ContextMenu id="menu_id" onShow={e => onContextMenu(e, e.detail.data)}>
        {selectedItems.length === 1 &&

          <MenuItem onClick={onContextMenuClick} data={{ action: "edit" }}>
            <i className="simple-icon-pencil ml-2"></i> Modifier
        </MenuItem>
        }
        {selectedItems.length > 0 &&
          <MenuItem onClick={onContextMenuClick} data={{ action: "delete" }}>
            <i className="simple-icon-trash ml-2"></i> Supprimer
      </MenuItem>
        }
      </ContextMenu>

    );
  }
}

export default ContextMenuContainer;

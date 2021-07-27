import React from "react";
import { ContextMenu, MenuItem } from "react-contextmenu";
import { Button } from "reactstrap";
import "./context.css"
class ContextMenuContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    const { toggleModalVoir, onContextMenu, onContextMenuClick, toggleModalDelete, toggleModalUpdate, selectedItems } = this.props;
    return (
      <ContextMenu id="menu_id" onShow={e => onContextMenu(e, e.detail.data)}>
        {selectedItems.length === 1 &&
          <>
            <MenuItem onClick={onContextMenuClick} data={{ action: "edit" }}>


              <Button
                className="iconsminds-file-edit"
                color="primary"
                outline
                id="modif"
                onClick={toggleModalVoir}
              >
                &nbsp;&nbsp; Détails
            </Button>

            </MenuItem>
            <MenuItem onClick={onContextMenuClick} data={{ action: "edit" }}>

              <Button
                className="iconsminds-file-edit"
                color="secondary"
                outline
                id="modif"
                onClick={toggleModalUpdate}
              >
                &nbsp;&nbsp; Modifier{" "}
              </Button>
            </MenuItem>
          </>
        }

        <MenuItem onClick={onContextMenuClick} data={{ action: "delete" }}>
          <Button
            className="simple-icon-trash"
            color="danger"
            outline
            id="supp"
            onClick={toggleModalDelete}
          >
            &nbsp;&nbsp; Supprimer
          </Button>
        </MenuItem>
      </ContextMenu>
    );
  }
}

export default ContextMenuContainer;

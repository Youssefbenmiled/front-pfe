import React from "react";
import { ContextMenu, MenuItem } from "react-contextmenu";
import { Button } from "reactstrap";
import "./context.css"
class ContextMenuContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpenUpdate: false,
      modalOpenDelete: false
    };
  }
  tgd = () => {
    return this.props.toggleModalDelete;
  };
  tgu = () => {
    // this.props.setClasse(this.props.produit.title);
    //  this.props.setNiveau(this.props.produit.category);
    // this.props.setNbr(this.props.produit.category);
    return this.props.toggleModalUpdate;
  };
  render() {
    const { onContextMenu, onContextMenuClick, product } = this.props;
    return (
      <ContextMenu id="menu_id" onShow={e => onContextMenu(e, e.detail.data)}>
        <MenuItem onClick={onContextMenuClick} data={{ action: "edit" }}>
          {this.props.selectedItems && (<Button
            className="iconsminds-file-edit"
            color="secondary"
            outline
            id="modif"
            onClick={this.tgu()}
          >
            &nbsp;&nbsp; Modifier{" "}
          </Button>)}

        </MenuItem>
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

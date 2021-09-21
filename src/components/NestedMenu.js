import React, { useState } from "react";
import { Menu, MenuItem, Typography } from "@material-ui/core";

import NestedMenuItem from "material-ui-nested-menu-item";

export const NestedMenu = () => {
  const [menuPosition, setMenuPosition] = useState(null);

  const handleRightClick = (event) => {
    if (menuPosition) {
      return;
    }
    event.preventDefault();
    setMenuPosition({
      top: event.pageY,
      left: event.pageX
    });
  };

  const handleItemClick = (event) => {
    setMenuPosition(null);
  };

  return (
    <div onContextMenu={handleRightClick}>
      <Typography>Right click to open menu</Typography>
      <Menu
        open={!!menuPosition}
        onClose={() => setMenuPosition(null)}
        anchorReference="anchorPosition"
        anchorPosition={menuPosition}
      >
        <MenuItem onClick={handleItemClick}>Button 1</MenuItem>
        <MenuItem onClick={handleItemClick}>Button 2</MenuItem>
        <NestedMenuItem
          label="Button 3"
          parentMenuOpen={false}
          onClick={handleItemClick}
        >
          <MenuItem onClick={handleItemClick}>Sub-Button 1</MenuItem>
          <MenuItem onClick={handleItemClick}>Sub-Button 2</MenuItem>
        </NestedMenuItem>
        <MenuItem onClick={handleItemClick}>Button 4</MenuItem>
        <NestedMenuItem
          label="Button 5"
          parentMenuOpen={!!menuPosition}
          onClick={handleItemClick}
        >
          <MenuItem onClick={handleItemClick}>Sub-Button 1</MenuItem>
          <MenuItem onClick={handleItemClick}>Sub-Button 2</MenuItem>
        </NestedMenuItem>
      </Menu>
    </div>
  );
};

export default NestedMenu;

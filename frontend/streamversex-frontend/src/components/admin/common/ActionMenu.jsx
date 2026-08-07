// src/components/admin/common/ActionMenu.jsx
import { IconButton, Menu, MenuItem, ListItemIcon, ListItemText } from "@mui/material";
import { MoreVertical } from "lucide-react";
import { useState } from "react";

/**
 * Kebab-menu of row actions for DataTable rows.
 *
 * actions: [{ label, icon: LucideIcon, onClick(row), danger?: bool, hidden?: fn(row)=>bool }]
 *
 * Usage inside a DataTable column render:
 *   render: (row) => (
 *     <ActionMenu
 *       row={row}
 *       actions={[
 *         { label: "Block", icon: Ban, onClick: (r) => handleBlock(r), danger: true },
 *       ]}
 *     />
 *   )
 */
export default function ActionMenu({ row, actions = [] }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const visibleActions = actions.filter((a) => !a.hidden?.(row));

  return (
    <>
      <IconButton
        size="small"
        onClick={(e) => {
          e.stopPropagation();
          setAnchorEl(e.currentTarget);
        }}
        sx={{ color: "#94A3B8" }}
      >
        <MoreVertical size={18} />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={(e) => {
          setAnchorEl(null);
        }}
        onClick={(e) => e.stopPropagation()}
        slotProps={{
          paper: {
            sx: {
              bgcolor: "#1E293B",
              border: "1px solid #334155",
              color: "#F8FAFC",
              minWidth: 180,
            },
          },
        }}
      >
        {visibleActions.map((action) => (
          <MenuItem
            key={action.label}
            onClick={() => {
              setAnchorEl(null);
              action.onClick(row);
            }}
            sx={{
              fontSize: 14,
              color: action.danger ? "#F87171" : "#F8FAFC",
              "&:hover": {
                bgcolor: action.danger
                  ? "rgba(239,68,68,0.1)"
                  : "rgba(255,255,255,0.05)",
              },
            }}
          >
            {action.icon && (
              <ListItemIcon>
                <action.icon
                  size={16}
                  color={action.danger ? "#F87171" : "#94A3B8"}
                />
              </ListItemIcon>
            )}
            <ListItemText>{action.label}</ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
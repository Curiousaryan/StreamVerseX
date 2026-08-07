    // src/components/admin/common/ConfirmDialog.jsx
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  CircularProgress,
} from "@mui/material";
import { AlertTriangle } from "lucide-react";

/**
 * Confirmation modal for destructive/critical admin actions
 * (block user, delete review, expire premium, etc.)
 *
 * Props:
 *  - open: bool
 *  - title: string
 *  - message: string
 *  - confirmLabel / cancelLabel: string
 *  - severity: "danger" | "warning" | "default"
 *  - loading: bool — shows spinner on confirm button, disables both
 *  - onConfirm: fn
 *  - onClose: fn
 */
const SEVERITY_COLOR = {
  danger: "#EF4444",
  warning: "#F59E0B",
  default: "#3B82F6",
};

export default function ConfirmDialog({
  open,
  title = "Are you sure?",
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  severity = "danger",
  loading = false,
  onConfirm,
  onClose,
}) {
  const color = SEVERITY_COLOR[severity] ?? SEVERITY_COLOR.default;

  return (
    <Dialog
      open={open}
      onClose={loading ? undefined : onClose}
      slotProps={{
        paper: {
          sx: {
            bgcolor: "#1E293B",
            border: "1px solid #334155",
            borderRadius: "16px",
            minWidth: 380,
          },
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          color: "#F8FAFC",
          fontWeight: 600,
        }}
      >
        <AlertTriangle size={20} color={color} />
        {title}
      </DialogTitle>

      <DialogContent>
        <DialogContentText sx={{ color: "#94A3B8" }}>
          {message}
        </DialogContentText>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2.5 }}>
        <Button
          onClick={onClose}
          disabled={loading}
          sx={{ color: "#94A3B8", textTransform: "none" }}
        >
          {cancelLabel}
        </Button>
        <Button
          onClick={onConfirm}
          disabled={loading}
          variant="contained"
          startIcon={
            loading ? <CircularProgress size={16} color="inherit" /> : null
          }
          sx={{
            textTransform: "none",
            bgcolor: color,
            "&:hover": { bgcolor: color, filter: "brightness(0.9)" },
          }}
        >
          {loading ? "Please wait..." : confirmLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
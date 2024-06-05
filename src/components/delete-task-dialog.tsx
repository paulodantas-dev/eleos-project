import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

interface DeleteTaskDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
}

export function DeleteTaskDialog({
  onClose,
  onConfirm,
  description,
  title,
  open,
}: DeleteTaskDialogProps) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{description}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          size="small"
          variant="text"
          sx={{
            color: "#1e293b",
          }}
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button
          size="small"
          variant="outlined"
          color="error"
          onClick={onConfirm}
          autoFocus
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

import { Dialog } from "@mui/material";
import styles from "./Modal.module.scss";

interface Props {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal({ open, onClose, children }: Props) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        className: styles.modalPaper,
      }}
      slotProps={{
        backdrop: {
          className: styles.modalBackdrop,
        },
      }}
    >
      {children}
    </Dialog>
  );
}

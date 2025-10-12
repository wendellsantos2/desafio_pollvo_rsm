import { Dialog, DialogContent } from "@mui/material";

interface Props {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal({ open, onClose, children }: Props) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
}

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

interface Props {
  open: boolean;
  titulo: string;
  mensagem: string;
  onConfirmar: () => void;
  onCancelar: () => void;
}

export default function ModalConfirmacao({
  open,
  titulo,
  mensagem,
  onConfirmar,
  onCancelar,
}: Props) {
  return (
    <Dialog open={open} onClose={onCancelar}>
      <DialogTitle>{titulo}</DialogTitle>
      <DialogContent>
        <Typography>{mensagem}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancelar}>Cancelar</Button>
        <Button color="error" variant="contained" onClick={onConfirmar}>
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

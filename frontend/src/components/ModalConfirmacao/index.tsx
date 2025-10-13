import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  
  Divider,
  Slide,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import React from "react";

 
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children: React.ReactElement },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

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
    <Dialog
      open={open}
      onClose={onCancelar}
      TransitionComponent={Transition}
      PaperProps={{
        sx: {
          borderRadius: 3,
          p: 2,
          boxShadow: 8,
          maxWidth: 420,
          width: "100%",
        },
      }}
    >
      <DialogTitle sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
        <WarningAmberRoundedIcon color="warning" fontSize="medium" />
        <Typography variant="h6" fontWeight={600}>
          {titulo}
        </Typography>
      </DialogTitle>

      <Divider />

      <DialogContent>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ mt: 1.5, mb: 0.5 }}
        >
          {mensagem}
        </Typography>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2, pt: 0 }}>
        <Button
          onClick={onCancelar}
          variant="outlined"
          sx={{
            borderRadius: 2,
            textTransform: "none",
          }}
        >
          Cancelar
        </Button>

        <Button
          onClick={onConfirmar}
          variant="contained"
          color="error"
          sx={{
            borderRadius: 2,
            textTransform: "none",
            boxShadow: "0 2px 5px rgba(255, 0, 0, 0.2)",
          }}
        >
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

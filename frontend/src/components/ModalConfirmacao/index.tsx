import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Divider,
  Slide,
  Button,
  Stack,
  CircularProgress,
} from "@mui/material";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import { TransitionProps } from "@mui/material/transitions";
import React from "react";
import styles from "./ModalConfirmacao.module.scss";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children: React.ReactElement },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface ModalConfirmacaoProps {
  open: boolean;
  titulo: string;
  mensagem: string;
  onConfirmar: () => void;
  onCancelar: () => void;
  carregando?: boolean;
}

export default function ModalConfirmacao({
  open,
  titulo,
  mensagem,
  onConfirmar,
  onCancelar,
  carregando = false,
}: ModalConfirmacaoProps) {
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={onCancelar}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          p: 2,
          boxShadow: "0 6px 18px rgba(0, 0, 0, 0.12)",
        },
      }}
    >
 
<DialogTitle sx={{ pb: 1 }}>
  <Stack
    direction="row"
    alignItems="center"
    spacing={1.2}
    sx={{
      display: "flex",
      flexWrap: "nowrap",
      alignItems: "center",
      gap: 1,
    }}
  >
    <WarningAmberRoundedIcon color="warning" fontSize="medium" />
    <Typography
      variant="h6"
      fontWeight={600}
      sx={{
        flex: 1,
        fontSize: "1rem",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        "@media (max-width: 420px)": {
          fontSize: "0.9rem",  
        },
      }}
    >
      {titulo}
    </Typography>
  </Stack>
</DialogTitle>



      <Divider sx={{ mb: 1 }} />

    
      <DialogContent sx={{ pb: 1 }}>
        <Typography
          variant="body1"
          color="text.secondary"
          whiteSpace="pre-line"
          sx={{ textAlign: "left", lineHeight: 1.6 }}
        >
          {mensagem}
        </Typography>
      </DialogContent>

     
      <div className={styles.actions}>
        <Button
          onClick={onCancelar}
          variant="outlined"
          color="inherit"
          disabled={carregando}
          className={styles.btnCancelar}
        >
          Cancelar
        </Button>

        <Button
          variant="contained"
          color="error"
          onClick={onConfirmar}
          disabled={carregando}
          className={styles.btnSalvar}
        >
          {carregando ? (
            <CircularProgress size={22} color="inherit" />
          ) : (
            "Confirmar"
          )}
        </Button>
      </div>
    </Dialog>
  );
}

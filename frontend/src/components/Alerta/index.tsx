import { Snackbar, Alert, AlertColor } from "@mui/material";
import { useState, useEffect } from "react";
import styles from "./Alerta.module.scss";

interface AlertaProps {
  mensagem: string;
  tipo?: AlertColor;
  aberto?: boolean;
  onFechar?: () => void;
  duracao?: number;
}

export default function Alerta({
  mensagem,
  tipo = "success",
  aberto = false,
  onFechar,
  duracao = 3000,
}: AlertaProps) {
  const [visivel, setVisivel] = useState(aberto);

 
  useEffect(() => {
    setVisivel(aberto);
  }, [aberto]);

  const handleClose = () => {
    setVisivel(false);
    onFechar?.();
  };

  return (
    <Snackbar
      open={visivel}
      autoHideDuration={duracao}
      onClose={handleClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Alert
        onClose={handleClose}
        severity={tipo}
        variant="filled"
        className={styles.alerta}
      >
        {mensagem}
      </Alert>
    </Snackbar>
  );
}

import { Snackbar, Alert, AlertColor } from "@mui/material";
import { useState } from "react";

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

  const handleClose = () => {
    setVisivel(false);
    if (onFechar) onFechar();
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
        sx={{
          borderRadius: 2,
          fontWeight: 500,
          boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
        }}
      >
        {mensagem}
      </Alert>
    </Snackbar>
  );
}

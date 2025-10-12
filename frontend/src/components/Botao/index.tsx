import { Button, ButtonProps } from "@mui/material";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  tipo?: "primario" | "perigo" | "secundario" | "sucesso";
  onClick?: () => void;
  type?: "button" | "submit";
  fullWidth?: boolean;
  disabled?: boolean;
}
 
export default function Botao({
  children,
  tipo = "primario",
  onClick,
  type = "button",
  fullWidth = false,
  disabled = false,
}: Props) {
  const color: ButtonProps["color"] =
    tipo === "primario" ? "primary" :
    tipo === "perigo" ? "error" :
    tipo === "sucesso" ? "success" :
    "secondary";

  const variant: ButtonProps["variant"] =
    tipo === "primario" || tipo === "sucesso" ? "contained" : "outlined";

  return (
    <Button
      variant={variant}
      color={color}
      onClick={onClick}
      type={type}
      fullWidth={fullWidth}
      disabled={disabled}
      sx={{
        textTransform: "none",
        fontWeight: 600,
        borderRadius: 2,
        px: 2.5,
        py: 1,
      }}
    >
      {children}
    </Button>
  );
}

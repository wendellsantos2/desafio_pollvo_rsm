import { Card, CardContent, Typography } from "@mui/material";

export default function Saldo({ valor }: { valor: number }) {
  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Typography variant="subtitle1" color="text.secondary">
          Saldo Atual
        </Typography>
        <Typography variant="h5" fontWeight={600} color={valor >= 0 ? "success.main" : "error.main"}>
          R$ {valor.toFixed(2)}
        </Typography>
      </CardContent>
    </Card>
  );
}

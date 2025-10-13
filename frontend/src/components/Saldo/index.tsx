import { Card, CardContent, Typography, Box } from "@mui/material";
import { TrendingUp, TrendingDown } from "@mui/icons-material";
import styles from "./Saldo.module.scss";

interface Props {
  valor: number;
}

export default function Saldo({ valor }: Props) {
  const positivo = valor >= 0;
  const Icone = positivo ? TrendingUp : TrendingDown;

  return (
    <Card className={styles.card} elevation={3}>
      <CardContent className={styles.cardContent}>
        <Typography className={styles.titulo}>Saldo Total</Typography>

        <Box className={styles.valorBox}>
          <Icone
            className={`${styles.icone} ${
              positivo ? styles.iconePositivo : styles.iconeNegativo
            }`}
          />
          <Typography
            className={`${styles.valor} ${
              positivo ? styles.valorPositivo : styles.valorNegativo
            }`}
          >
            R$ {valor.toFixed(2)}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

 
import { Lancamento } from "../../../types/lancamento.types";
import styles from "./Item.module.scss";

interface ItemProps {
  lancamento: Lancamento;
  onEditar: (l: Lancamento) => void;
  onExcluir: (id: number) => void;
}

export default function Item({ lancamento, onEditar, onExcluir }: ItemProps) {
  const corValor =
    lancamento.tipo === "Despesa" ? styles.despesa : styles.receita;

  return (
    <tr className={styles.linha}>
      <td>{lancamento.descricao}</td>
      <td className={corValor}>R$ {lancamento.valor.toFixed(2)}</td>
      <td>{lancamento.tipo}</td>
      <td>{new Date(lancamento.data).toLocaleDateString()}</td>
      
    </tr>
  );
}

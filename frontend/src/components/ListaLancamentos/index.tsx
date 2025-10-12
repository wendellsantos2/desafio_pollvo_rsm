 
import { Lancamento } from "../../types/lancamento.types";
import Item from "./Item";
 
import styles from "./ListaLancamentos.module.scss";

interface ListaLancamentosProps {
  lancamentos: Lancamento[];
  onEditar: (l: Lancamento) => void;
  onExcluir: (id: number) => void;
}

export default function ListaLancamentos({
  lancamentos,
  onEditar,
  onExcluir,
}: ListaLancamentosProps) {
  return (
    <table className={styles.tabela}>
      <thead>
        <tr>
          <th>Descrição</th>
          <th>Valor</th>
          <th>Tipo</th>
          <th>Data</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {lancamentos.map((l) => (
          <Item key={l.id} lancamento={l} onEditar={onEditar} onExcluir={onExcluir} />
        ))}
      </tbody>
    </table>
  );
}

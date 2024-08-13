import Table from "components/Table";
import Voltar from "components/Voltar";
import { useEffect, useState } from "react";
import axios from "axios";
import type { Lista } from "../types/table.types";
import { Link } from "react-router-dom";

const fetchInstituicoes = async (): Promise<Lista[]> => {
  try {
    const response = await axios.get("http://localhost:3001/instituicoes");
    const data = response.data;

    const mappedData: Lista[] = data.map((item: any) => ({
      id: item.id,
      nome: item.nome,
      sigla: item.sigla,
      pais: item.pais,
      ativo: item.ativo,
    }));

    return mappedData;
  } catch (error) {
    console.error("Erro ao buscar instituições:", error);
    return [];
  }
};

const Home = () => {
  const [data, setData] = useState<Lista[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const fetchedData = await fetchInstituicoes();
      setData(fetchedData);
    };

    loadData();
  }, []);

  return (
    <div className="relative h-full w-full">
      <Voltar />
      <div className="flex flex-col items-center justify-center h-full">
        <div className="flex justify-between items-center gap-4 p-4">
          <span>Instituição</span>
          <Link to="/cadastro">Adicionar</Link>
        </div>
        <Table data={data} />
      </div>
    </div>
  );
};

export default Home;

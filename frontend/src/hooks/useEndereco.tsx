import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchEndereco = async (cep: string) => {
  const { data } = await axios.get(`http://localhost:3001/enderecos/${cep}`);
  console.log(data);

  return data;
};

export const useEndereco = (cep: string) => {
  return useQuery({
    queryKey: ["endereco", cep],
    queryFn: () => fetchEndereco(cep),
    enabled: !!cep,
  });
};

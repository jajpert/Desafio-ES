// hooks/usePaises.ts
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchPaises = async () => {
  const { data } = await axios.get<string[]>("http://localhost:3001/paises");
  return data;
};

export const usePaises = () => {
  return useQuery<string[]>({
    queryKey: ["paises"],
    queryFn: fetchPaises,
  });
};

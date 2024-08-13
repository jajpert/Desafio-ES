import React, { useRef, useEffect } from "react";
import {
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Box,
  SelectChangeEvent,
} from "@mui/material";
import { useEndereco } from "../hooks/useEndereco";
import { usePaises } from "../hooks/usePaises";

interface PaisOption {
  label: string;
  value: string;
}

interface EnderecoData {
  cep?: string;
  estado?: string;
  logradouro?: string;
  numero?: string;
  pais?: string;
  municipio?: string;
  bairro?: string;
  complemento?: string;
}

interface EnderecoFormProps {
  onDataChange: (data: any) => void;
  editable?: boolean;
  enderecoData?: EnderecoData; // Novo prop opcional
}

const EnderecoForm: React.FC<EnderecoFormProps> = ({
  onDataChange,
  editable = true,
  enderecoData = {}, // Inicializa com um objeto vazio se não for fornecido
}) => {
  const [cep, setCep] = React.useState<string>(enderecoData.cep || "");
  const [pais, setPais] = React.useState<string>(enderecoData.pais || "");

  const formData = useRef<Record<string, string>>({
    cep: enderecoData.cep || "",
    estado: enderecoData.estado || "",
    logradouro: enderecoData.logradouro || "",
    numero: enderecoData.numero || "",
    pais: enderecoData.pais || "",
    municipio: enderecoData.municipio || "",
    bairro: enderecoData.bairro || "",
    complemento: enderecoData.complemento || "",
  });

  const paisOptionsRef = useRef<PaisOption[]>([]);
  const cepRef = useRef<HTMLInputElement>(null);

  const { data: enderecoDataFromAPI } = useEndereco(cep);
  const { data: paisesData } = usePaises();

  useEffect(() => {
    if (paisesData && paisesData.length > 0) {
      paisOptionsRef.current = paisesData.map((pais) => ({
        label: pais,
        value: pais,
      }));
    }
  }, [paisesData]);

  useEffect(() => {
    if (enderecoDataFromAPI) {
      const newData = {
        logradouro: enderecoDataFromAPI.logradouro || "",
        bairro: enderecoDataFromAPI.bairro || "",
        estado: enderecoDataFromAPI.estado || "",
        municipio: enderecoDataFromAPI.municipio || "",
      };
      formData.current = { ...formData.current, ...newData };
      onDataChange(formData.current);
    }
  }, [enderecoDataFromAPI, onDataChange]);

  const handleChangeCep = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newCep = event.target.value;
    if (newCep.length <= 8) {
      setCep(newCep);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    formData.current[name] = value;
    onDataChange(formData.current);
  };

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const { name, value } = event.target;
    formData.current[name] = value;
    if (name === "pais") {
      setPais(value);
    }
    onDataChange(formData.current);
  };

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", gap: 2, width: "80%" }}
    >
      <TextField
        label="CEP"
        name="cep"
        variant="outlined"
        value={cep}
        onChange={handleChangeCep}
        inputRef={cepRef}
        fullWidth
        InputProps={{
          sx: { height: 40, padding: "0 14px" },
        }}
        disabled={!editable}
      />
      <TextField
        label="Logradouro"
        name="logradouro"
        variant="outlined"
        value={formData.current.logradouro}
        onChange={handleInputChange}
        fullWidth
        InputProps={{
          sx: { height: 40, padding: "0 14px" },
        }}
        disabled={!editable}
      />
      <TextField
        label="Bairro"
        name="bairro"
        variant="outlined"
        value={formData.current.bairro}
        onChange={handleInputChange}
        fullWidth
        InputProps={{
          sx: { height: 40, padding: "0 14px" },
        }}
        disabled={!editable}
      />
      <TextField
        label="Estado"
        name="estado"
        variant="outlined"
        value={formData.current.estado}
        onChange={handleInputChange}
        fullWidth
        InputProps={{
          sx: { height: 40, padding: "0 14px" },
        }}
        disabled={!editable}
      />
      <TextField
        label="Município"
        name="municipio"
        variant="outlined"
        value={formData.current.municipio}
        onChange={handleInputChange}
        fullWidth
        InputProps={{
          sx: { height: 40, padding: "0 14px" },
        }}
        disabled={!editable}
      />
      <TextField
        label="Número"
        name="numero"
        variant="outlined"
        value={formData.current.numero}
        onChange={handleInputChange}
        fullWidth
        InputProps={{
          sx: { height: 40, padding: "0 14px" },
        }}
        inputProps={{ maxLength: 8 }}
        disabled={!editable}
      />
      <FormControl fullWidth>
        <InputLabel>País</InputLabel>
        <Select
          label="País"
          name="pais"
          value={pais}
          onChange={handleSelectChange}
          sx={{ height: 40 }}
          disabled={!editable}
        >
          {paisOptionsRef.current.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        label="Complemento"
        name="complemento"
        variant="outlined"
        value={formData.current.complemento}
        onChange={handleInputChange}
        fullWidth
        InputProps={{
          sx: { height: 40, padding: "0 14px" },
        }}
        inputProps={{ maxLength: 16 }}
        disabled={!editable}
      />
    </Box>
  );
};

export default EnderecoForm;

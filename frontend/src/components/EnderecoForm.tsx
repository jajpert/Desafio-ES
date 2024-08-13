import React, { useState, useRef, useEffect } from "react";
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

interface EnderecoFormProps {
  onDataChange: (data: any) => void;
}

const EnderecoForm: React.FC<EnderecoFormProps> = ({ onDataChange }) => {
  const [cep, setCep] = useState<string>("");
  const [formData, setFormData] = useState({
    cep: "",
    estado: "",
    logradouro: "",
    numero: "",
    pais: "",
    municipio: "",
    bairro: "",
    complemento: "",
  });
  const [paisOptions, setPaisOptions] = useState<PaisOption[]>([]);
  const cepRef = useRef<HTMLInputElement>(null);

  const { data: enderecoData } = useEndereco(cep);
  const { data: paisesData } = usePaises();

  useEffect(() => {
    if (paisesData && paisesData.length > 0) {
      const options = paisesData.map((pais) => ({
        label: pais,
        value: pais,
      }));
      setPaisOptions(options);
    }
  }, [paisesData]);

  useEffect(() => {
    if (enderecoData) {
      const newData = {
        logradouro: enderecoData.logradouro || "",
        bairro: enderecoData.bairro || "",
        estado: enderecoData.estado || "",
        municipio: enderecoData.municipio || "",
      };
      setFormData((prevData) => {
        const updatedData = { ...prevData, ...newData };
        onDataChange(updatedData);
        return updatedData;
      });
    }
  }, [enderecoData, onDataChange]);

  const handleChangeCep = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newCep = event.target.value;
    if (newCep.length <= 8) {
      setCep(newCep);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => {
      const updatedData = { ...prevData, [name]: value };
      onDataChange(updatedData);
      return updatedData;
    });
  };

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const { name, value } = event.target;
    setFormData((prevData) => {
      const updatedData = { ...prevData, [name]: value };
      onDataChange(updatedData);
      return updatedData;
    });
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
      />
      <TextField
        label="Logradouro"
        name="logradouro"
        variant="outlined"
        value={formData.logradouro}
        onChange={handleInputChange}
        fullWidth
        InputProps={{
          sx: { height: 40, padding: "0 14px" },
        }}
      />
      <TextField
        label="Bairro"
        name="bairro"
        variant="outlined"
        value={formData.bairro}
        onChange={handleInputChange}
        fullWidth
        InputProps={{
          sx: { height: 40, padding: "0 14px" },
        }}
      />
      <TextField
        label="Estado"
        name="estado"
        variant="outlined"
        value={formData.estado}
        onChange={handleInputChange}
        fullWidth
        InputProps={{
          sx: { height: 40, padding: "0 14px" },
        }}
      />
      <TextField
        label="Município"
        name="municipio"
        variant="outlined"
        value={formData.municipio}
        onChange={handleInputChange}
        fullWidth
        InputProps={{
          sx: { height: 40, padding: "0 14px" },
        }}
      />
      <TextField
        label="Número"
        name="numero"
        variant="outlined"
        value={formData.numero}
        onChange={handleInputChange}
        fullWidth
        InputProps={{
          sx: { height: 40, padding: "0 14px" },
        }}
      />
      <FormControl fullWidth>
        <InputLabel>País</InputLabel>
        <Select
          label="País"
          name="pais"
          value={formData.pais}
          onChange={handleSelectChange}
          sx={{ height: 40 }} // Altura diminuída pela metade
        >
          {paisOptions.map((option) => (
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
        value={formData.complemento}
        onChange={handleInputChange}
        fullWidth
        InputProps={{
          sx: { height: 40, padding: "0 14px" },
        }}
      />
    </Box>
  );
};

export default EnderecoForm;

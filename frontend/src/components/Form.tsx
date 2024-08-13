import React, { useState } from "react";
import { TextField, Box } from "@mui/material";

interface FormProps {
  onDataChange: (data: any) => void;
}

const Form: React.FC<FormProps> = ({ onDataChange }) => {
  const [formData, setFormData] = useState({
    nome: "",
    sigla: "",
    cnpj: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
        label="Nome"
        name="nome"
        variant="outlined"
        value={formData.nome}
        onChange={handleChange}
        fullWidth
      />
      <TextField
        label="Sigla"
        name="sigla"
        variant="outlined"
        value={formData.sigla}
        onChange={handleChange}
        fullWidth
      />
      <TextField
        label="CNPJ"
        name="cnpj"
        variant="outlined"
        value={formData.cnpj}
        onChange={handleChange}
        fullWidth
      />
    </Box>
  );
};

export default Form;

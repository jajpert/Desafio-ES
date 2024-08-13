import React, { useEffect, useState } from "react";
import { TextField, Box } from "@mui/material";

interface FormData {
  nome: string;
  sigla: string;
  cnpj: string;
}

interface FormProps {
  onDataChange: (data: FormData) => void;
  formData?: FormData;
  editable?: boolean;
}

const Form: React.FC<FormProps> = ({
  onDataChange,
  formData = { nome: "", sigla: "", cnpj: "" },
  editable = true,
}) => {
  const [localFormData, setLocalFormData] = useState<FormData>({
    nome: "",
    sigla: "",
    cnpj: "",
  });

  useEffect(() => {
    if (formData) {
      setLocalFormData(formData);
    }
  }, [formData]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setLocalFormData((prevData) => {
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
        value={localFormData.nome}
        onChange={handleChange}
        fullWidth
        disabled={!editable}
        inputProps={{ maxLength: 32 }}
      />
      <TextField
        label="Sigla"
        name="sigla"
        variant="outlined"
        value={localFormData.sigla}
        onChange={handleChange}
        fullWidth
        disabled={!editable}
        inputProps={{ maxLength: 8 }}
      />
      <TextField
        label="CNPJ"
        name="cnpj"
        variant="outlined"
        value={localFormData.cnpj}
        onChange={handleChange}
        fullWidth
        disabled={!editable}
        inputProps={{ maxLength: 14 }}
      />
    </Box>
  );
};

export default Form;

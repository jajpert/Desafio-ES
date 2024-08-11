import React, { useState, useEffect, useRef } from "react";
import { usePaises } from "../hooks/usePaises";
import { useEndereco } from "../hooks/useEndereco";
import { JsonForms } from "@jsonforms/react";
import {
  materialRenderers,
  materialCells,
} from "@jsonforms/material-renderers";

const EnderecoForm: React.FC = () => {
  const {
    data: paises,
    isLoading: isPaisesLoading,
    isError: isPaisesError,
  } = usePaises();

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
  const [fetchAddress, setFetchAddress] = useState(false);
  const cepRef = useRef<HTMLInputElement>(null);

  // UseEffect para chamar useEndereco quando o CEP está completo e outro campo é alterado
  const {
    data: enderecoData,
    isLoading: isEnderecoLoading,
    isError: isEnderecoError,
    refetch,
  } = useEndereco(cep.length === 8 && fetchAddress ? cep : "");

  useEffect(() => {
    if (enderecoData) {
      setFormData((prevData) => ({
        ...prevData,
        logradouro: enderecoData.logradouro || "",
        bairro: enderecoData.bairro || "",
        estado: enderecoData.estado || "",
        municipio: enderecoData.municipio || "",
      }));
    }
  }, [enderecoData]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cepRef.current && !cepRef.current.contains(event.target as Node)) {
        if (cep.length === 8) {
          setFetchAddress(true); // Dispara a requisição
        }
      }
    };

    // Adiciona event listener para cliques fora do campo
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [cep]);

  useEffect(() => {
    if (fetchAddress) {
      refetch(); // Chama a requisição para buscar o endereço
      setFetchAddress(false); // Reseta o estado para não fazer a requisição novamente sem necessidade
    }
  }, [fetchAddress, refetch]);

  const handleChangeCep = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newCep = event.target.value;
    if (newCep.length <= 8) {
      setCep(newCep);
      setFetchAddress(false); // Não dispara a requisição enquanto o usuário está digitando
    }
  };

  const handleFormChange = ({ data }: any) => {
    setFormData(data);
  };

  if (isPaisesLoading) return <div>Loading...</div>;
  if (isPaisesError) return <div>Error loading countries</div>;
  if (isEnderecoLoading) return <div>Loading address...</div>;
  if (isEnderecoError) return <div>Error loading address</div>;

  const paisOptions =
    paises?.map((pais: string) => ({
      label: pais,
      value: pais,
    })) || [];

  const formSchema = {
    type: "object",
    properties: {
      cep: { type: "string", title: "CEP" },
      estado: { type: "string", title: "Estado" },
      logradouro: { type: "string", title: "Logradouro" },
      numero: { type: "string", title: "Número" },
      pais: {
        type: "string",
        title: "País",
        enum: paisOptions.map((p) => p.value),
      },
      municipio: { type: "string", title: "Município" },
      bairro: { type: "string", title: "Bairro" },
      complemento: { type: "string", title: "Complemento" },
    },
    required: ["cep", "estado", "logradouro", "numero", "pais"],
  };

  const formUiSchema = {
    type: "VerticalLayout",
    elements: [
      {
        type: "Control",
        scope: "#/properties/cep",
        options: { "ui:widget": "text" },
        onChange: handleChangeCep,
        ref: cepRef,
      },
      {
        type: "Control",
        scope: "#/properties/estado",
        options: { "ui:widget": "text" },
      },
      {
        type: "Control",
        scope: "#/properties/logradouro",
        options: { "ui:widget": "text" },
      },
      {
        type: "Control",
        scope: "#/properties/numero",
        options: { "ui:widget": "text" },
      },
      {
        type: "Control",
        scope: "#/properties/pais",
        options: {
          "ui:widget": "select",
          "ui:options": { enumOptions: paisOptions },
        },
      },
      {
        type: "Control",
        scope: "#/properties/municipio",
        options: { "ui:widget": "text" },
      },
      {
        type: "Control",
        scope: "#/properties/bairro",
        options: { "ui:widget": "text" },
      },
      {
        type: "Control",
        scope: "#/properties/complemento",
        options: { "ui:widget": "text" },
      },
    ],
  };

  return (
    <JsonForms
      schema={formSchema}
      uischema={formUiSchema}
      data={formData}
      onChange={handleFormChange}
      renderers={materialRenderers}
      cells={materialCells}
    />
  );
};

export default EnderecoForm;

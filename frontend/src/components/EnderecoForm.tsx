import React, { useState, useRef } from "react";
import { JsonForms } from "@jsonforms/react";
import {
  materialRenderers,
  materialCells,
} from "@jsonforms/material-renderers";
import { useEndereco } from "../hooks/useEndereco"; // Atualize o caminho conforme necessário
import { usePaises } from "../hooks/usePaises"; // Atualize o caminho conforme necessário

interface PaisOption {
  label: string;
  value: string;
}

const EnderecoForm: React.FC = () => {
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
  const cepRef = useRef<HTMLInputElement>(null);

  // Usando o hook para buscar o endereço
  const { data: enderecoData, refetch: refetchEndereco } = useEndereco(cep);

  // Usando o hook para buscar os países
  const { data: paisesData } = usePaises();

  // Atualiza o formData com os dados do endereço
  React.useEffect(() => {
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

  // Atualiza as opções de países
  const paisOptions: PaisOption[] = paisesData
    ? paisesData.map((pais) => ({
        label: pais,
        value: pais,
      }))
    : [];

  // Função para lidar com cliques fora do campo cep
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cepRef.current && !cepRef.current.contains(event.target as Node)) {
        if (cep.length === 8) {
          refetchEndereco(); // Dispara a requisição se o CEP estiver completo
          console.log("Clicou fora do campo CEP, disparando requisição");
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [cep, refetchEndereco]);

  const handleChangeCep = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newCep = event.target.value;
    if (newCep.length <= 8) {
      setCep(newCep);
    }
  };

  const handleFormChange = ({ data }: any) => {
    setFormData(data);
  };

  const formSchema = {
    type: "object",
    properties: {
      cep: { type: "string", title: "CEP" },
      estado: { type: "string", title: "Estado" },
      logradouro: { type: "string", title: "Logradouro" },
      numero: { type: "string", title: "Número" },
      pais:
        paisOptions.length > 0
          ? {
              type: "string",
              title: "País",
              enum: paisOptions.map((p) => p.value),
            }
          : { type: "string", title: "País" },
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
          "ui:widget": paisOptions.length > 0 ? "select" : "text",
          "ui:options":
            paisOptions.length > 0 ? { enumOptions: paisOptions } : {},
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
    <div>
      <label>CEP</label>
      <input type="text" value={cep} onChange={handleChangeCep} ref={cepRef} />

      <JsonForms
        schema={formSchema}
        uischema={formUiSchema}
        data={formData}
        onChange={handleFormChange}
        renderers={materialRenderers}
        cells={materialCells}
      />
    </div>
  );
};

export default EnderecoForm;

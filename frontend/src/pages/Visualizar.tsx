import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import Form from "components/Form";
import EnderecoForm from "components/EnderecoForm";
import Voltar from "components/Voltar";
import Icon from "@mdi/react";
import { mdiShoePrint } from "@mdi/js";
import axios from "axios";
import { useParams } from "react-router-dom";

const Visualizar = () => {
  const { id } = useParams<{ id: string }>();
  const [mudaForm, setMudaForm] = useState(true);
  const [formData, setFormData] = useState({
    nome: "",
    sigla: "",
    cnpj: "",
  });
  const [enderecoData, setEnderecoData] = useState({
    cep: "",
    estado: "",
    logradouro: "",
    numero: "",
    pais: "",
    municipio: "",
    bairro: "",
    complemento: "",
  });

  const fetchInstituicaoData = async () => {
    if (!id) return;

    try {
      const idNumber = Number(id);
      const response = await axios.get(
        `http://localhost:3001/instituicao/${idNumber}`,
      );
      const data = response.data[0];

      setFormData({
        nome: data.nome,
        sigla: data.sigla,
        cnpj: data.cnpj,
      });

      setEnderecoData({
        cep: data.cep,
        estado: data.estado,
        logradouro: data.logradouro,
        numero: data.numero.toString(),
        pais: data.pais,
        municipio: data.municipio,
        bairro: data.bairro,
        complemento: data.complemento,
      });
    } catch (error) {
      console.error("Erro ao buscar dados da instituição:", error);
    }
  };

  useEffect(() => {
    fetchInstituicaoData();
  }, [id]);

  const handleFormDataChange = (data: any) => {
    setFormData(data);
  };

  const handleEnderecoDataChange = (data: any) => {
    setEnderecoData(data);
  };

  return (
    <div className="relative h-full w-full">
      <Voltar />

      <div className="flex flex-col items-center justify-center h-full">
        <div className="text-center">
          <div className="text-xl font-semibold">Instituição</div>
          <div className="flex items-center justify-center mt-2">
            <div
              className={`flex items-center justify-center rounded-full ${mudaForm ? "bg-blue-600" : "bg-gray-500"} `}
              style={{ width: "40px", height: "40px" }}
            >
              <Icon path={mdiShoePrint} size={1} color="white" />
            </div>
            <div className="mx-2">Dados da Instituição</div>
            <div
              className={`flex items-center justify-center rounded-full ${mudaForm ? "bg-gray-500" : "bg-blue-600"} `}
              style={{ width: "40px", height: "40px" }}
            >
              <Icon path={mdiShoePrint} size={1} color="white" />
            </div>
            <div className="mx-2">Endereço</div>
          </div>
        </div>

        <div className="w-full flex-grow flex justify-center items-center">
          {mudaForm ? (
            <Form
              onDataChange={handleFormDataChange}
              formData={formData}
              editable={false}
            />
          ) : (
            <EnderecoForm
              onDataChange={handleEnderecoDataChange}
              enderecoData={enderecoData}
              editable={false}
            />
          )}
        </div>

        <div className="w-full flex justify-end mt-4 mb-20 space-x-4">
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#9B23AF",
              "&:hover": { backgroundColor: "#7A1D8A" },
            }}
            disabled={mudaForm}
            onClick={() => setMudaForm(!mudaForm)}
          >
            ANTERIOR
          </Button>

          <Button
            className={`${!mudaForm ? "hidden" : ""}`}
            variant="contained"
            onClick={() => setMudaForm(!mudaForm)}
          >
            PRÓXIMO
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Visualizar;

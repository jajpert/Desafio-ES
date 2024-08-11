import EnderecoForm from "components/EnderecoForm";

const Endereco = () => {
  return (
    <div className="flex h-screen w-screen justify-center items-center">
      <div className="flex flex-col">
        <h1>Formulário de Endereço</h1>
        <EnderecoForm />
      </div>
    </div>
  );
};

export default Endereco;

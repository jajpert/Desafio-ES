const axios = require('axios');

const obterEndereco = async (req, res) => {
	try {
    const { cep } = req.params;
		const response = await axios.get(`https://api.brasilaberto.com/v1/zipcode/${cep}`);

		if (response.status !== 200) {
			return res.status(response.status).json({ mensagem: "Erro ao buscar endereço" });
		}

    const { street, district, state, city } = response.data.result;

		const resposta = {
			logradouro: street,
			bairro: district,
			estado: state,
			municipio: city
		};

		return res.status(200).json(resposta);
	} catch (error) {
		console.error('Erro ao buscar endereço:', error.message);
		return res.status(500).json({ mensagem: "Erro interno do servidor" });
	}
};

module.exports = {
  obterEndereco
}
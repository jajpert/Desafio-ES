const axios = require('axios');

const obterPaises = async (req, res) => {
	try {
		const response = await axios.get('https://servicodados.ibge.gov.br/api/v1/paises/{paises}');

		if (response.status !== 200) {
			return res.status(response.status).json({ mensagem: "Erro ao buscar países" });
		}

		const paises = response.data.map(pais => pais.nome.abreviado);

		// a api está retornando países duplicados
		const paisesUnicos = [...new Set(paises)];

		return res.status(200).json(paisesUnicos);
	} catch (error) {
		console.error('Erro ao detalhar países:', error.message);
		return res.status(500).json({ mensagem: "Erro interno do servidor" });
	}
};

module.exports = {
  obterPaises
}
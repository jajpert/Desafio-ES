const knex = require('../conexao');
const validarCNPJ = require('../utils/validaCnpj');

const cadastrarInst = async (req, res) => {
    const { nome, sigla, pais, cnpj, cep, logradouro, bairro, estado, municipio, numero, complemento } = req.body;

    try {
        const camposObrigatorios = [
            { campo: nome, nomeCampo: "nome" },
            { campo: sigla, nomeCampo: "sigla" },
            { campo: pais, nomeCampo: "pais" },
            { campo: logradouro, nomeCampo: "logradouro" },
            { campo: estado, nomeCampo: "estado" },
            { campo: municipio, nomeCampo: "municipio" }
        ];

        const camposVazio = camposObrigatorios
            .filter(({ campo }) => !campo)
            .map(({ nomeCampo }) => nomeCampo);

        if (camposVazio.length > 0) {
            return res.status(400).json({ mensagem: `Os campos ${camposVazio.join(', ')} são obrigatórios` });
        }

        const jaExisteNome = await knex("instituicao")
            .where({ nome })
            .first();

        if (jaExisteNome) {
            return res.status(400).json({ mensagem: "Uma instituição com esse nome já está cadastrada." });
        }

        // Verifica se a instituição é brasileira
        if(cnpj != null) {
            const camposObrigatoriosBr = [
                { campo: cep, nomeCampo: "CEP" },
                { campo: bairro, nomeCampo: "bairro" },
                { campo: numero, nomeCampo: "numero" }
            ];

            const camposVazioBr = camposObrigatoriosBr
                .filter(({ campo }) => !campo)
                .map(({ nomeCampo }) => nomeCampo);

            if (camposVazioBr.length > 0) {
                return res.status(400).json({ mensagem: `Os campos ${camposVazioBr.join(', ')} são obrigatórios` });
            }

            if(!validarCNPJ(cnpj)) {
                return res.status(400).json({ mensagem: "CNPJ inválido." });
            }

            const jaExiste = await knex("instituicao").where({ cnpj }).first();

            if (jaExiste) {
                return res.status(400).json({ mensagem: "Uma instituição com esse CNPJ já está cadastrada." });
            }

            const instituicao = await knex("instituicao")
			.insert({nome, sigla, pais, cnpj, cep, logradouro, bairro, estado, municipio, numero, complemento, ativo:true})
			.returning("*");

            if (!instituicao) {
                return res.status(400).json("A instituição não foi cadastrada.");
            }

            return res.status(200).json("A instituição foi cadastrada com sucesso!");

        } else {
            const instituicao = await knex("instituicao")
			.insert({nome, sigla, pais, cep, logradouro, estado, municipio, complemento})
			.returning("*");

            if (!instituicao) {
                return res.status(400).json("A instituição não foi cadastrada.");
            }

            return res.status(200).json("A instituição foi cadastrada com sucesso!");
        }
    } catch (error) {
        console.error('Erro ao cadastrar a instituição:', error.message);
        return res.status(500).json({ mensagem: "Erro interno do servidor" });
    }
};

const ativarInst = async(req, res) => {
    const { id } = req.params;
    const { ativo } = req.body;

    try {
        const instExistente = await knex("instituicao").where({ id }).first();

        if (!instExistente) {
            return res.status(404).json({ mensagem: "Instituição não encontrada." });
        }

        if (!('ativo' in req.body)) {
            return res.status(400).json({ mensagem: "O campo 'ativo' é obrigatório." });
        }

        const instituicaoAtualizada = await knex("instituicao")
            .where({ id })
            .update({ ativo })
            .returning("*");

        if (!instituicaoAtualizada) {
            return res.status(400).json("Não foi possível atualizar o status da instituição.");
        }

        return res.status(200).json("Status da instituição atualizado com sucesso!");
    } catch (error) {
        console.error('Erro ao atualizar o status da instituição:', error.message);
        return res.status(500).json({ mensagem: "Erro interno do servidor" });
    }

}

const editarInst = async (req, res) => {
    const { id } = req.params;
    const { nome, sigla, pais, cnpj, cep, logradouro, bairro, estado, municipio, numero, complemento } = req.body;

    try {
        // Verifica se a instituição existe
        const instExistente = await knex("instituicao").where({ id }).first();

        if (!instExistente) {
            return res.status(404).json({ mensagem: "Instituição não encontrada." });
        }

        const camposObrigatorios = [
            { campo: nome, nomeCampo: "nome" },
            { campo: sigla, nomeCampo: "sigla" },
            { campo: pais, nomeCampo: "pais" },
            { campo: logradouro, nomeCampo: "logradouro" },
            { campo: estado, nomeCampo: "estado" },
            { campo: municipio, nomeCampo: "municipio" }
        ];

        const camposVazio = camposObrigatorios
            .filter(({ campo }) => !campo)
            .map(({ nomeCampo }) => nomeCampo);

        if (camposVazio.length > 0) {
            return res.status(400).json({ mensagem: `Os campos ${camposVazio.join(', ')} são obrigatórios` });
        }

        // Verifica se a instituição é brasileira
        let instituicaoAtualizada;

        if (cnpj != null) {
            const camposObrigatoriosBr = [
                { campo: cep, nomeCampo: "CEP" },
                { campo: bairro, nomeCampo: "bairro" },
                { campo: numero, nomeCampo: "numero" }
            ];

            const camposVazioBr = camposObrigatoriosBr
                .filter(({ campo }) => !campo)
                .map(({ nomeCampo }) => nomeCampo);

            if (camposVazioBr.length > 0) {
                return res.status(400).json({ mensagem: `Os campos ${camposVazioBr.join(', ')} são obrigatórios` });
            }

            instituicaoAtualizada = await knex("instituicao")
                .where({ id })
                .update({ nome, sigla, pais, cnpj, cep, logradouro, bairro, estado, municipio, numero, complemento })
                .returning("*");
        } else {
            instituicaoAtualizada = await knex("instituicao")
                .where({ id })
                .update({ nome, sigla, pais, cep, logradouro, estado, municipio, complemento })
                .returning("*");
        }

        if (!instituicaoAtualizada) {
            return res.status(400).json("A instituição não foi atualizada.");
        }

        return res.status(200).json("A instituição foi atualizada com sucesso!");
    } catch (error) {
        console.error('Erro ao atualizar a instituição:', error.message);
        return res.status(500).json({ mensagem: "Erro interno do servidor" });
    }
};


const obterInst = async(req, res) => {
    try {
        const instituicoes = await knex('instituicao');
        return res.status(200).json(instituicoes);
    } catch (error) {
        console.error('Erro ao listar instituições:', error.message);
        return res.status(500).json({ mensagem: "Erro interno do servidor" });
    }
}

module.exports = {
    cadastrarInst,
    ativarInst,
    editarInst,
    obterInst
}
function checkCampoObrigatorio(campo, nomeCampo) {
    return (req, res, next) => {
        if (!req.body[campo]){
            return res.status(400).json({ message: `Por favor envie o campo: ${nomeCampo}`});
        }
        next();
    };
}

const checkNome = checkCampoObrigatorio("nome", "nome");
const checkCpf = checkCampoObrigatorio("cpf", "CPF");
const checkPreco = checkCampoObrigatorio("preco", "preço");
const checkNomePrato = checkCampoObrigatorio("nome", "nome do prato");

module.exports = {
    checkNome,
    checkCpf,
    checkPreco,
    checkNomePrato
};
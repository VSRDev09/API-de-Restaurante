const Cliente = require("../Models/cliente");

function listar(filtro = {}) {
    return Cliente.findAll({ where: filtro});
}

function criar(dados){
    //if(!validarCPF(dados.cpf)){
      //  return Promise.reject(new Error("CPF inválido"));
   // }
    return Cliente.create(dados);
}

function atualizar(id, dados) {
    return Cliente.findByPk(id).then(cliente => {
        if(!cliente) return null;

        return cliente.update(dados);
    });
}

function remover(id) {
    return Cliente.findByPk(id).then(cliente => {
        if (!cliente) return null;

        return cliente.destroy();
    });
}

function validarCPF(cpf) {
   if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)){
       return false;
   }

   let soma = 0;
   for(let i = 0; i < 9; i++){
       soma += parseInt(cpf.charAt(i)) * (10 - i);
   }

   let primeiroDigito = 11 - (soma % 11);
   if (primeiroDigito >= 10) primeiroDigito = 0;
   if (primeiroDigito !== parseInt(cpf.charAt(9))) {
       return false;
   }

   soma = 0;
   for (let i = 0; i < 10; i++) {
       soma += parseInt(cpf.charAt(i)) * (11 - i); // CORRIGIDO AQUI
   }

   let segundoDigito = 11 - (soma % 11);
   if (segundoDigito >= 10) segundoDigito = 0;
   if (segundoDigito !== parseInt(cpf.charAt(10))) {
       return false;
   }

   return true;
}


module.exports = { listar, criar, atualizar, remover };
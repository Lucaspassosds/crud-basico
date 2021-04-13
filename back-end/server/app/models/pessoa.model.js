const mongoose = require('mongoose');

const PessoaSchema = mongoose.Schema({
    nome: String,
    sobrenome: String,
    email: String,
    senha: String,
});

module.exports = mongoose.model('Pessoa', PessoaSchema);

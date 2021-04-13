// create.component.js

import React, { Component } from 'react';
import axios from 'axios';
import '../css/create.css';

export default class Create extends Component {
    constructor(props) {
        super(props);
        this.onChangeNome = this.onChangeNome.bind(this);
        this.onChangeSobrenome = this.onChangeSobrenome.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeSenha = this.onChangeSenha.bind(this);
        this.onChangeSenhaConfirm = this.onChangeSenhaConfirm.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.sumirMsg = this.sumirMsg.bind(this);

        this.state = {
            nome: '',
            nomeAntigo: '',
            sobrenome: '',
            email: '',
            senha: '',
            senhaConfirm: '',
            aparecerMsgSucesso: false,
        };
    }

    onChangeNome(e) {
        this.setState({
            nome: e.target.value,
        });
    }
    onChangeSobrenome(e) {
        this.setState({
            sobrenome: e.target.value,
        });
    }
    onChangeEmail(e) {
        this.setState({
            email: e.target.value,
        });
    }
    onChangeSenha(e){
        this.setState({
            senha: e.target.value,
        });
    }
    onChangeSenhaConfirm(e){
        this.setState({
            senhaConfirm: e.target.value,
        });
    }

    onSubmit(e) {
        e.preventDefault();

        /*  this.setState({
            aparecerMsgSucesso: true,
        }); */
        if(this.state.senha !== this.state.senhaConfirm){
            alert('As senhas nao coincidem!');
            return;
        }

        const obj = {
            nome: this.state.nome,
            sobrenome: this.state.sobrenome,
            email: this.state.email,
            senha: this.state.senha,
        };
        axios
            .post('http://localhost:3001/pessoas', obj)
            .then((res) => {
                console.log(res.data);
                this.setState({
                    nomeAntigo: this.state.nome,
                    nome: '',
                    sobrenome: '',
                    email: '',
                    senha: '',
                    senhaConfirm: '',
                    aparecerMsgSucesso: true,
                });
            })
            .catch((err) => console.log(err));
    }

    sumirMsg() {
        this.setState({
            aparecerMsgSucesso: false,
        });
    }

    render() {
        return (
            <div style={{ marginTop: 10 }}>
                <h3>Adicionar novo Usuário</h3>
                {this.state.aparecerMsgSucesso ? (
                    <div className="success-box">
                        <p className="success-text">
                            A pessoa {this.state.nomeAntigo} foi adicionada com
                            sucesso!
                        </p>
                        <div className="close" onClick={this.sumirMsg} />
                    </div>
                ) : null}
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Nome: </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.nome}
                            onChange={this.onChangeNome}
                            maxLength="60"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Sobrenome: </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.sobrenome}
                            onChange={this.onChangeSobrenome}
                            maxLength="60"
                        />
                    </div>
                    <div className="form-group">
                        <label>Endereço de email: </label>
                        <input
                            type="email"
                            className="form-control"
                            value={this.state.email}
                            onChange={this.onChangeEmail}
                            placeholder="mail@mail.com"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Senha: </label>
                        <input
                            type='password'
                            className="form-control"
                            value={this.state.senha}
                            onChange={this.onChangeSenha}
                            placeholder="Digite uma senha de no maximo 8 digitos"
                            maxLength='8'
                         />
                    </div>
                    <div className="form-group">
                        <label>Confirme sua senha: </label>
                        <input
                            type='password'
                            className="form-control"
                            value={this.state.senhaConfirm}
                            onChange={this.onChangeSenhaConfirm}
                            placeholder="Digite novamente a senha"
                            maxLength='8'
                         />
                    </div>
                    <div className="form-group">
                        <input
                            type="submit"
                            value="Registrar"
                            className="btn btn-primary"
                        />
                    </div>
                </form>
            </div>
        );
    }
}

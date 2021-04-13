/* eslint-disable react/prop-types */
// edit.component.js

import React, { Component } from 'react';
import axios from 'axios';
import '../css/create.css';

export default class Edit extends Component {
    constructor(props) {
        super(props);
        this.onChangeNome = this.onChangeNome.bind(this);
        this.onChangeSobrenome = this.onChangeSobrenome.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeSenhaConfirm = this.onChangeSenhaConfirm.bind(this);
        this.onChangeSenhaNova = this.onChangeSenhaNova.bind(this);
        this.onChangeSenhaNovaConfirm = this.onChangeSenhaNovaConfirm.bind(
            this
        );
        this.onSubmit = this.onSubmit.bind(this);
        this.sumirMsg = this.sumirMsg.bind(this);

        this.state = {
            nome: '',
            sobrenome: '',
            email: '',
            senha: '',
            senhaConfirm: '',
            senhaNova: '',
            senhaNovaConfirm: '',
            aparecerMsgSucesso: false,
        };
    }

    componentDidMount() {
        axios
            .get('http://localhost:3001/pessoas/' + this.props.match.params.id)
            .then((response) => {
                console.log(response);
                this.setState({
                    nome: response.data.nome,
                    sobrenome: response.data.sobrenome,
                    email: response.data.email,
                    senha: response.data.senha,
                });
            })
            .catch(function (error) {
                console.log(error);
            });
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
    onChangeSenhaConfirm(e) {
        this.setState({
            senhaConfirm: e.target.value,
        });
    }
    onChangeSenhaNova(e) {
        this.setState({
            senhaNova: e.target.value,
        });
    }
    onChangeSenhaNovaConfirm(e) {
        this.setState({
            senhaNovaConfirm: e.target.value,
        });
    }
    sumirMsg() {
        this.setState({
            aparecerMsgSucesso: false,
        });
    }

    onSubmit(e) {
        e.preventDefault();

        if (this.state.senhaConfirm !== this.state.senha) {
            alert('Voce precisa digitar a senha cadastrada para poder alterar!');
            return;
        }
        if (this.state.senhaNova !== this.state.senhaNovaConfirm) {
            alert('A senha nova e a confirmação não coincidem!');
            return;
        }

        const obj = {
            nome: this.state.nome,
            sobrenome: this.state.sobrenome,
            email: this.state.email,
            senha: this.state.senhaNova === '' ? this.state.senha : this.state.senhaNova,
        };
        axios
            .put(
                'http://localhost:3001/pessoas/' + this.props.match.params.id,
                obj
            )
            .then((res) => {
                console.log(res.data);
                this.setState({
                    aparecerMsgSucesso: true,
                })
            })
            .catch((err) => {
                console.log(err);
                alert('ERRO!');
            });
    }

    render() {
        return (
            <div style={{ marginTop: 10 }}>
                <h3 align="center">Alterar Usuário</h3>
                {this.state.aparecerMsgSucesso ? (
                    <div className="success-box">
                        <p className="success-text">
                            A pessoa {this.state.nome} foi atualizada com
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
                        <label>Confirme sua Senha: </label>
                        <input
                            type="password"
                            className="form-control"
                            value={this.senhaConfirm}
                            onChange={this.onChangeSenhaConfirm}
                            placeholder="Digite sua senha ja cadastrada"
                            maxLength="8"
                        />
                    </div>
                    <div className="form-group">
                        <label>Senha Nova: </label>
                        <input
                            type="password"
                            className="form-control"
                            value={this.state.senhaNova}
                            onChange={this.onChangeSenhaNova}
                            placeholder="Digite uma senha de no maximo 8 digitos"
                            maxLength="8"
                        />
                    </div>
                    <div className="form-group">
                        <label>Confirme sua senha: </label>
                        <input
                            type="password"
                            className="form-control"
                            value={this.state.senhaNovaConfirm}
                            onChange={this.onChangeSenhaNovaConfirm}
                            placeholder="Digite novamente a senha"
                            maxLength="8"
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="submit"
                            value="Atualizar"
                            className="btn btn-primary"
                        />
                    </div>
                </form>
            </div>
        );
    }
}

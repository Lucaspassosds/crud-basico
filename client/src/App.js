// App.js

import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Create from './components/create.component';
import Edit from './components/edit.component';
import Index from './components/index.component';

class App extends Component {
    render() {
        return (
            <Router>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <Link to={'/'} className="navbar-brand">
                        Aplicação Cliente
                    </Link>
                    <div
                        className="collapse navbar-collapse"
                        id="navbarSupportedContent"
                    >
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <Link to={'/'} className="nav-link">
                                    Home
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to={'/create'} className="nav-link">
                                    Adicionar
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to={'/index'} className="nav-link">
                                    Lista
                                </Link>
                            </li>
                        </ul>
                    </div>
                </nav>{' '}
                <div className="container">
                    <br />
                    <h2>Bem-vindo ao Sistema!</h2> <br />
                    <Switch>
                        <Route exact path="/create" component={Create} />
                        <Route path="/edit/:id" component={Edit} />
                        <Route path="/index" component={Index} />
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;

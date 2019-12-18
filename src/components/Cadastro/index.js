import React, { Component } from 'react';
import ScrollArea from 'react-scrollbar'

import firebase from '../../Firebase';

import './styles.css';

export default class Cadastro extends Component {
  constructor() {
    super();
    this.ref = firebase.firestore().collection('lista-produtos').doc('produtos');
    this.state = {
      userId: '',
      nome: '',
      lista: []

    };
    this.criaLista()
  }
  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }
  onSubmit = (e) => {
    e.preventDefault();

    const { nome, userId } = this.state;
      
    
    this.ref.update({
      produto: firebase.firestore.FieldValue.arrayUnion(
        {
          userId: firebase.auth().currentUser.uid,
          nome: nome,
        }
      )
    }).then((docRef) => {
      this.setState({
        userId: '',
        nome: ''
      });
    })
    .catch((error) => {
      console.error("Erro ao adicionar documento: ", error);
    });
    this.criaLista()
  }

  criaLista() {
    let lista = []
    this.ref.get()
        .then(doc => {
          if(!doc.exists) {
            console.log('O documento não existe!')
          } else {
            lista = doc.data().produto;
            this.setState({lista:lista})
          }
          }).catch(err => {
            console.log('Erro ao pegar o documento', err)
          })
        }

  render() {
    const { nome } = this.state;
    
    return (
      <div className="Cadastro">
        <div className="formulario">
          <form onSubmit={this.onSubmit}>
                <div class="form">
                  
                  <input id="input" type="text" name="nome" value={nome} onChange={this.onChange} placeholder="Nome" />
                </div>
                <button id="botao"
                  
                  disabled={!nome|| nome == NaN} 
                  type="submit" 
                  class="btn btn-success">
                    Cadastrar</button>
          </form>
        </div>
        <div className="lista-produtos">
          <div className="moldura">
            <h2 className="subtitulo">Lista de Produtos Cadastrados</h2>
            <div className="scroll-area">
              <ScrollArea>
                <ul>
                  {
                    this.state.lista.map(produto=>
                    <li>{produto.nome}</li>
                  )}
                </ul>
              </ScrollArea>
            </div>
          </div>
        </div>          
        </div>
  
    )
  }
}

import React, { Component } from 'react';
import ScrollArea from 'react-scrollbar'
import { parseISO, isAfter } from 'date-fns'

import firebase from '../../Firebase';

import './styles.css';

export default class Cadastro extends Component {
  constructor() {
    super();
    this.ref = firebase.firestore().collection('lista-compras').doc('compras');
    this.state = {
      userId: '',
      produto: '',
      quantidade:'',
      precoMedio: '',
      precoCompra: '',
      data: '',
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
    
    const { produto, quantidade, precoCompra, precoMedio, userId } = this.state;
    const tempo = new Date()
    let data = tempo.getHours().toString()  + tempo.getMinutes().toString() +
                tempo.getSeconds().toString() + tempo.getUTCDate().toString() +
                tempo.getUTCMonth().toString() + tempo.getUTCFullYear().toString()
    
    // faz update no banco, colocando no final do Array
    this.ref.update({
      produtos: firebase.firestore.FieldValue.arrayUnion(
        {
          userId: firebase.auth().currentUser.uid,
          produto: produto,
          quantidade:parseInt(quantidade),
          precoCompra:parseFloat(precoCompra),
          precoMedio:precoCompra/quantidade,
          data: data
        }
      )
    }).then((docRef) => {
      this.setState({
        userId: '',
        produto: '',
        quantidade: '',
        precoCompra: '',
        precoMedio: '',
        data: '',
      })
    })
    .catch((error) => {
      console.error('Erro', error)
    })
    this.criaLista()
  }

  criaLista() {
    let lista = []
    this.ref.get()
    .then(doc => {
      if (!doc.exists) {
        console.log('No such document!');
      } else {
        lista = doc.data().produtos;
        this.setState({lista:lista})
      }
    })
  .catch(err => {
    console.log('Error getting document', err);
   });
  
  }
  
  render() {
    const { produto, quantidade, precoCompra } = this.state;
    return (
      <div className="Cadastro">
        <div className="formulario">
          <form onSubmit={this.onSubmit}>
                <div class="form-group">
                  
                  <input className="input" type="text" name="produto" value={produto} onChange={this.onChange} placeholder="Produto" />
                </div>
                <div class="form-group">
                  {/* inputs recebem somente números para evitar erros */}
                  <input className="input" type="number" name="quantidade" value={quantidade} onChange={this.onChange} placeholder="Quantidade" />
                </div>
                <div class="form-group">
                  
                  <input className="input" type="number" name="precoCompra" value={precoCompra} onChange={this.onChange} placeholder="Preço de Compra" />
                </div>
                {/* tratamento de possíveis erros, o botão só será liberado sob essas condições */}
                <button id="botao" 
                disabled={
                  !produto || produto == NaN, 
                  !quantidade || quantidade == 0 || precoCompra == NaN ,
                  !precoCompra || precoCompra == 0 || precoCompra == NaN } 
                type="submit" class="btn btn-success">Cadastrar</button>
          </form>
        </div>
        <div className="lista-produtos">
          <ScrollArea className="scroll">
            <table>
              <thead>
              <tr>
                <th>Produto</th>
                <th>Quantidade</th>
                <th>Preço de Compra</th>
                <th>Preço Médio</th>
              </tr>
            </thead>
            <tbody>
                {this.state.lista.map(produto=>                  
                  <tr>
                  <td>{produto.produto}</td>
                  <td>{produto.quantidade}</td>
                  <td>R$: {produto.precoCompra}</td>
                  <td>R$: {produto.precoMedio}</td>
                  </tr>                
                )}
                </tbody>
              </table>
          </ScrollArea>
        </div>
          
        </div>
  
    )
  }
}

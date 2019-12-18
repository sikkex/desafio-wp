import React, { Component } from 'react';
import ScrollArea from 'react-scrollbar'

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
      lista: []

    };
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
    return (
      <div className="Cadastro">
        <div className="lista-produtos">
          <ScrollArea>
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
                  <td>{produto.precoCompra}</td>
                  <td>{produto.precoMedio}</td>
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

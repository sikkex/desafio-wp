## Desafio WPensar

Foi usado controle de dependências , o yarn.
O projeto foi terminado con sucesso e no prazo, atendendo a todos os requisitos desejados.

no projeto foi utilizado libs públicas, estando todas listadas no package.json

Fiz o projeto com o controle de versão git, subindo no meu github para fazer deploy no netlify.

O Sistema é bem simples, conta com duas páginas, uma de Login e um Dashboard.
No login você encontrará as principais formas de autenticação de hoje em dia,
entretanto, devido a um bugg visual, optei por retirar a autenticação por e-mail,
deixando somente a do Google, Facebook e Github.
O Dashboard conta com uma navegação por abas, seriam 4 campos no total,
mas devido a um erro e ao layout final, optei por deixar essas 2. As abas retiradas
eram a aba de boas vindas, que teria o nome pego no e-mail e a foto do usuário, 
porém devido a um erro de desempenho no meu computador, esse get nas informações
estava dando erro de login. A outra aba seria contendo o histórico de compras, 
achei desnecessário pois seria melhor colocar na aba de compras.

### Iniciar o projeto
Digitar o comando yarn no terminal para download do node_modules e depois usar o comnado yarn start
para iniciar o projeto.

### Deploy do projeto
Foi feito o deploy do projeto no Netlify:
https://sharp-liskov-46bdb4.netlify.com/

### Banco de Dados e Autenticação
Foi feito com o Firebase, usando o banco de dados da Firestore e a Autenticação deles.
Somente usuários autenticados podem manipular e visualizar as informações do banco.
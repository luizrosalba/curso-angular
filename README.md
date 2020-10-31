# Curso Intermediário de Angular - Digital Innovation One

Esse curso foi feito para a plataforma [Digital Innovation One](https://digitalinnovation.one/)

O curso consiste em um sistema de filmes, com a possibilidade de cadastros, edições, listagem e visualização dos filmes.


## Instalação

1. clone o repositório `git clone git@github.com:RenanRB/curso-angular.git`
2. Entre no projeto e instale as dependencias `npm install`

## Ambiente Local

Execute `ng serve` para que o projeto suba localmente. Acesse a url `http://localhost:4200/`. O projeto já está com reload automático conforme as alterações que você realizar no código

## Simulando o Back-end

Execute `npm install -g json-server` para instalar globalmente o servidor json. Após a instalação entre na pasta do projeto e execute `json-server --watch db.json`, com isso um servidor será inicializado na url `http://localhost:3000/`, após a inicialização sera possível realizar requisições http.

## Gerando componente

Execute `ng generate component nome-do-componente` para criar um novo componente. Você também pode usuar `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Execute `ng build` para gerar o compilado do projeto. O projeto vai ser criado dentro do diretório `dist/`. Adicionar `--prod` junto comando de build para gerar minificado e pronto para o ambiente de produção.

## Bibliotecas necessárias 

Angular Material 
Json Server 
NGX-Infinite-Scroll
RxJs


## Angular Material 

Implementação oficial para o angular do material DEsign a especificação de designs para interfaces interativas do google e cobre desde pequenos elementos 
como icones e cores até elementos maiores como nagevação, cards imagens e mais 

ng new nome_projeto -> cria um novo projeto em angular 
npm install 
ng add @angular/material


### RxJs 

É uma biblioteca para programação reativa usando Observables , para facilitar a composição de código assincrono ou baseado em retorno de chamada 


## json server 

json-server --watch db.json


# estrutura do projeto 

rota base topo -> rota filmes -> rota filho cadastro , listar 
o que se declara no appmodule você pode usar em toda a aplicação 

o arquivo tslint permite dizer que todos nossos componentes utilizam a tag 
com a palavra dio  (padronizam os componentes que f oram nossa criacao)
```JS
{
    "extends": "../tslint.json",
    "rules": {
        "directive-selector": [
            true,
            "attribute",
            "dio",
            "camelCase"
        ],
        "component-selector": [
            true,
            "element",
            "dio",
            "kebab-case"
        ]
    }
}
```
# cirando um formulario reativo 

material moduloe -> validator 

```Js 
  private criarFormulario(filme: Filme): void {
    this.cadastro = this.fb.group({
      titulo: [filme.titulo, [Validators.required, Validators.minLength(2), Validators.maxLength(256)]],
      urlFoto: [filme.urlFoto, [Validators.minLength(10)]],
      dtLancamento: [filme.dtLancamento, [Validators.required]],
      descricao: [filme.descricao],
      nota: [filme.nota, [Validators.required, Validators.min(0), Validators.max(10)]],
      urlIMDb: [filme.urlIMDb, [Validators.minLength(10)]],
      genero: [filme.genero, [Validators.required]]
    });
  }
```

formGroup bom para criar vários formularios semelhantes 




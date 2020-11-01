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


```HTML
<mat-toolbar class="app-title">Cadastrar Filme</mat-toolbar>
<div class="main-div">
  <mat-card class="center width50" *ngIf="cadastro" >
    <form autocomplete="off" novalidate [formGroup]="cadastro" (ngSubmit)="submit()" (ngReset)="reiniciarForm()">
      <mat-card-content>
        <dio-input-text titulo="Título *" controlName="titulo" [formGroup]="cadastro"></dio-input-text>
        <dio-input-text titulo="Link Foto" controlName="urlFoto" [formGroup]="cadastro"></dio-input-text>
        <dio-input-date titulo="Data de Lançamento *" controlName="dtLancamento" [formGroup]="cadastro"></dio-input-date>
        <dio-input-textarea titulo="Descrição" controlName="descricao" [formGroup]="cadastro"></dio-input-textarea>
        <dio-input-number titulo="Nota IMDb *" controlName="nota" step="0.1" [formGroup]="cadastro"></dio-input-number>
        <dio-input-text titulo="Link IMDb" controlName="urlIMDb" [formGroup]="cadastro"></dio-input-text>
        <dio-input-select titulo="Gênero *" [opcoes]="generos" controlName="genero" [formGroup]="cadastro"></dio-input-select>
      </mat-card-content>
      <mat-card-actions>
        <button type="submit" color="accent" mat-raised-button>Salvar</button>
        <button type="reset" color="warn" mat-raised-button>Cancelar</button>
      </mat-card-actions>
    </form>
  </mat-card>
</div>

```

ngReset (reiniciar form)

Atenção ! Métodos são por padrão publicos 


### calendario 

- dar uma olhada no componente shared componetes campos input date 


 <dio-input-date titulo="Data de Lançamento *" controlName="dtLancamento" [formGroup]="cadastro"></dio-input-date>


mat-error : Componente responsável pelos erros no material ui 

ex: 
<mat-error *ngIf="validacao.hasErrorValidar(formControl, 'minlength')">
      Campo precisa ter no mínimo {{validacao.lengthValidar(formControl, 'minlength')}} caracteres
    </mat-error>


``` JS 
  hasErrorValidar(control: AbstractControl, errorName: string): boolean {
    if ((control.dirty || control.touched) && this.hasError(control, errorName)) {
      return true;
    }
    return false;
  }

  ``` 
  cadastro touched é quando já tiver sido tocado 
  cadastro dirty eh quando jah apresentou o erro 
  this.hasError é um metodo que criamos generico para apresentar erros 


 faz que quando houver cadastro , todos os campos sejam marcados como clicados 

   this.cadastro.markAllAsTouched();

## Elvis operator (navegação segura)


verificar se tem erros e depois verifica a validação de um campo de um form
Elvis Operator ou operador de navegação segura serve para garantir que se a variável no HTML estiver null ou undefined o Angular não tente acessar o valor dela.


em angular para controlar o form primeiro precisa estourar um erro para que 
posteriormente ocorra a validação 

uma forma de simplificar esse processo é usar : 

f.titulo.errors?.required 
f.titulo.errors?.minlength 

se houver erros verifique o required  senao retorne falso 

## serviço para validação de erros 

- evitando a replicação de codigos 
- vamos criar um service para centralizar toda verificação de errors
- npm install @schematics/angular@7.0.7 --save-dev  (dependencia em desenvolvimento so existe enquanto estiver desenvolvimento, não é isntalada junto com o aplicativo em producao )
- ng g s shared/components/campos/validarCampos
- jah vem com injectable no root , ou seja qquer lugar do sistema tera acesso a esse servico 

```JS
import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidarCamposService {

  constructor() { }

  hasErrorValidar(control: AbstractControl, errorName: string): boolean {
    if ((control.dirty || control.touched) && this.hasError(control, errorName)) {
      return true;
    }
    return false;
  }

  hasError(control: AbstractControl, errorName: string): boolean {
    return control.hasError(errorName);
  }

  lengthValidar(control: AbstractControl, errorName: string): number {
    const error = control.errors[errorName];
    return error.requiredLength || error.min || error.max || 0;
  }
}

```


## componentizando inputs

- ng g c shared/components/campos/input-text --nospec problemas ( nao há modulo ! )
- ng g m shared/components/campos --nospec  (modulo criado )
- ng g c shared/components/campos/input-text --nospec problemas ( criado sem problemas  )
- se o modulo nao conseguir identificar o modulo faça --module caminho_do_modulo
- erro - os componentes deve ter dio na frente do componente pedimos isso no tslint
- 

- criamos input date, input-number, input-select , input-textarea

identificados pelo modulo src\app\shared\components\campos\campos.module.ts

para que o componente seja visivel em outros locais precisamos exporta-los com exports

``` JS
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextComponent } from './input-text/input-text.component';
import { InputNumberComponent } from './input-number/input-number.component';
import { InputDateComponent } from './input-date/input-date.component';
import { InputTextareaComponent } from './input-textarea/input-textarea.component';
import { InputSelectComponent } from './input-select/input-select.component';
import { MaterialModule } from '../../material/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    InputTextComponent,
    InputNumberComponent,
    InputDateComponent,
    InputTextareaComponent,
    InputSelectComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    InputTextComponent,
    InputNumberComponent,
    InputDateComponent,
    InputTextareaComponent,
    InputSelectComponent
  ]
})
export class CamposModule { }
```

cuidado ! o angula reclama se vc precisar passar uma string e ao inves disso vc passa um databind
 <dio-input-text titulo="Link Foto" controlName="urlFoto" [formGroup]="cadastro"></dio-input-text>
 
 <dio-input-text titulo="Link Foto" [controlName]="urlFoto" [formGroup]="cadastro"></dio-input-text> daria erro 
            
Error -> incorretly implements interface OnInit ( não estamos usando on init podemos tirar )

### deixando as mensagens de erros dinamicas 

Deixando as mensagens personalizadas 

``` JS
<div [formGroup]="formGroup">
  <mat-form-field class="full-width">
    <input  matInput
            type="number"
            [min]="minimo"
            [max]="maximo"
            [step]="step"
            [placeholder]="titulo"
            [name]="controlName"
            [formControlName]="controlName">
    <mat-error *ngIf="validacao.hasErrorValidar(formControl, 'required')">Campo obrigatório</mat-error>
    <mat-error *ngIf="validacao.hasErrorValidar(formControl, 'min')">
      Campo precisa ter no mínimo o valor {{validacao.lengthValidar(formControl, 'min')}}
    </mat-error>
    <mat-error *ngIf="validacao.hasErrorValidar(formControl, 'max')">
      Campo pode ter no máximo o valor {{validacao.lengthValidar(formControl, 'max')}}
    </mat-error>
  </mat-form-field>
</div>
```
 

 ### passando um array com os valores para o nosso componente 

 ``` JS
 <mat-toolbar class="app-title">Cadastrar Filme</mat-toolbar>
<div class="main-div">
  <mat-card class="center width50" *ngIf="cadastro" >
    /// desligamos o autocomplete e o dizemos que o html nao deve validar o html   autocomplete="off" novalidate [formGroup]="cadastro"  pois a validacao esta sendo feita pelo angular 

    <form autocomplete="off" novalidate [formGroup]="cadastro" (ngSubmit)="submit()" (ngReset)="reiniciarForm()">
      <mat-card-content>
        <dio-input-text titulo="Título *" controlName="titulo" [formGroup]="cadastro"></dio-input-text>
        <dio-input-text titulo="Link Foto" controlName="urlFoto" [formGroup]="cadastro"></dio-input-text>
        <dio-input-date titulo="Data de Lançamento *" controlName="dtLancamento" [formGroup]="cadastro"></dio-input-date>
        <dio-input-textarea titulo="Descrição" controlName="descricao" [formGroup]="cadastro"></dio-input-textarea>
        <dio-input-number titulo="Nota IMDb *" controlName="nota" step="0.1" [formGroup]="cadastro"></dio-input-number>
        <dio-input-text titulo="Link IMDb" controlName="urlIMDb" [formGroup]="cadastro"></dio-input-text>
        <dio-input-select titulo="Gênero *" [opcoes]="generos" controlName="genero" [formGroup]="cadastro"></dio-input-select>
      </mat-card-content>
      <mat-card-actions>
        <button type="submit" color="accent" mat-raised-button>Salvar</button>
        <button type="reset" color="warn" mat-raised-button>Cancelar</button>
      </mat-card-actions>
    </form>
  </mat-card>
</div>

 ```

as opções agora vem por array 

 ``` JS 
 <div [formGroup]="formGroup">
  <mat-form-field class="full-width">
    <mat-select [placeholder]="titulo" [formControlName]="controlName">
      <mat-option *ngFor="let opcao of opcoes" [value]="opcao">{{opcao}}</mat-option>
    </mat-select>
    <mat-error *ngIf="validacao.hasErrorValidar(formControl, 'required')">Campo obrigatório</mat-error>
  </mat-form-field>
</div>

 ```

 criamos tambem o  cadastro por generos 


 ``` Js 

 import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { ValidarCamposService } from 'src/app/shared/components/campos/validar-campos.service';
import { Filme } from 'src/app/shared/models/filme';
import { FilmesService } from 'src/app/core/filmes.service';
import { AlertaComponent } from 'src/app/shared/components/alerta/alerta.component';
import { Alerta } from 'src/app/shared/models/alerta';

@Component({
  selector: 'dio-cadastro-filmes',
  templateUrl: './cadastro-filmes.component.html',
  styleUrls: ['./cadastro-filmes.component.scss']
})
export class CadastroFilmesComponent implements OnInit {

  id: number;
  cadastro: FormGroup;
  generos: Array<string>;

  constructor(public validacao: ValidarCamposService,
              public dialog: MatDialog,
              private fb: FormBuilder,
              private filmeService: FilmesService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  get f() {
    return this.cadastro.controls;
  }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    if (this.id) {
      this.filmeService.visualizar(this.id)
        .subscribe((filme: Filme) => this.criarFormulario(filme));
    } else {
      this.criarFormulario(this.criarFilmeEmBranco());
    }
  /// vetor de generos 
    this.generos = ['Ação', 'Romance', 'Aventura', 'Terror', 'Ficção cientifica', 'Comédia', 'Aventura', 'Drama'];

  }

  submit(): void {
    this.cadastro.markAllAsTouched();
    if (this.cadastro.invalid) {
      return;
    }

    const filme = this.cadastro.getRawValue() as Filme;
    if (this.id) {
      filme.id = this.id;
      this.editar(filme);
    } else {
      this.salvar(filme);
    }
  }

  reiniciarForm(): void {
    this.cadastro.reset();
  }

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

  private criarFilmeEmBranco(): Filme {
    return {
      id: null,
      titulo: null,
      dtLancamento: null,
      urlFoto: null,
      descricao: null,
      nota: null,
      urlImdb: null,
      genero: null
    } as Filme;
  }

  private salvar(filme: Filme): void {
    this.filmeService.salvar(filme).subscribe(() => {
      const config = {
        data: {
          btnSucesso: 'Ir para a listagem',
          btnCancelar: 'Cadastrar um novo filme',
          corBtnCancelar: 'primary',
          possuirBtnFechar: true
        } as Alerta
      };
      const dialogRef = this.dialog.open(AlertaComponent, config);
      dialogRef.afterClosed().subscribe((opcao: boolean) => {
        if (opcao) {
          this.router.navigateByUrl('filmes');
        } else {
          this.reiniciarForm();
        }
      });
    },
    () => {
      const config = {
        data: {
          titulo: 'Erro ao salvar o registro!',
          descricao: 'Não conseguimos salvar seu registro, favor tentar novamente mais tarde',
          corBtnSucesso: 'warn',
          btnSucesso: 'Fechar'
        } as Alerta
      };
      this.dialog.open(AlertaComponent, config);
    });
  }

  private editar(filme: Filme): void {
    this.filmeService.editar(filme).subscribe(() => {
      const config = {
        data: {
          descricao: 'Seu registro foi atualizado com sucesso!',
          btnSucesso: 'Ir para a listagem',
        } as Alerta
      };
      const dialogRef = this.dialog.open(AlertaComponent, config);
      dialogRef.afterClosed().subscribe(() => this.router.navigateByUrl('filmes'));
    },
    () => {
      const config = {
        data: {
          titulo: 'Erro ao editar o registro!',
          descricao: 'Não conseguimos editar seu registro, favor tentar novamente mais tarde',
          corBtnSucesso: 'warn',
          btnSucesso: 'Fechar'
        } as Alerta
      };
      this.dialog.open(AlertaComponent, config);
    });
  }

}


 ```


import { Component, inject, OnInit } from '@angular/core';
import { ReclamacaoCardComponent } from '../reclamacao-card/reclamacao-card.component';
import { NotFoundComponent } from '../../Common/not-found/not-found.component';
import { Reclamacao } from '../../models/reclamacao';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserService } from '../../Services/user.service';
import { IUser } from '../../models/user.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-reclamacao-usuarios',
  standalone: true,
  imports: [ReclamacaoCardComponent,NotFoundComponent,CommonModule, ReactiveFormsModule],
  templateUrl: './reclamacao-usuarios.component.html',
  styleUrl: './reclamacao-usuarios.component.css'
})
export class ReclamacaoUsuariosComponent implements OnInit {
  private userService = inject(UserService);
  private router = inject(Router);
  private reclamacaoSubject =new BehaviorSubject<Reclamacao[]>([] as any);
  protected data$:Observable<Reclamacao[]> = this.reclamacaoSubject.asObservable();
  protected user : IUser | null = this.userService.getCurrentUser();
  protected vazio: boolean = true;
  protected erro : string = "";
  TagSelect : FormGroup;
  reclamacoes: Reclamacao [] = [
    {
      idReclamacao: 1,
      tituloReclamao: "Falta de abastecimento de água",
      descricaoReclamacao: "Há três dias o bairro está sem água, afetando diversas famílias. A situação está insustentável, pois as pessoas não conseguem realizar atividades básicas como cozinhar, tomar banho ou lavar roupas. Entramos em contato com a companhia de saneamento, mas até agora não houve retorno sobre o motivo da interrupção ou previsão de normalização.",
      dataReclamacao: "2024-11-28",
      objTag: "Abastecimento",
      objImagem : "img/paginas/reclamacoes/user1.jpg",
      objUsuario :{
        id: 1,
        nome: 'Matheus',
        email: 'gueff@gmail.com',
        senha: 'math',
        endereco:{
          cep: '18075718',
          bairro : 'Jardim Brasilândia',
          logradouro : 'Rua Alonco Muchon',
          cidade : 'Sorocaba'
        }
      }
    },
    {
      idReclamacao: 2,
      tituloReclamao: "Vazamento de esgoto na rua",
      descricaoReclamacao: "Esgoto está vazando na rua há mais de uma semana e ninguém resolve. O odor é insuportável, e a situação está causando transtornos aos moradores e comerciantes da região. Além disso, o esgoto acumulado atrai insetos e representa um grave risco à saúde pública, especialmente para crianças que brincam no local.",
      dataReclamacao: "2024-11-27",
      objTag: "Esgoto",
      objImagem : "img/paginas/reclamacoes/user2.jpg",
      objUsuario:{
        id: 2,
        nome: 'Davy',
        email: 'davy@gmail.com',
        senha: 'davy',
        endereco:{
          cep: '17571802',
          bairro : 'Jardim Europa',
          logradouro : 'Rua Rock',
          cidade : 'Votorantim'
        }
      }
    },
    {
      idReclamacao: 3,
      tituloReclamao: "Falta de coleta de lixo",
      descricaoReclamacao: "A coleta de lixo não foi realizada no bairro nos últimos cinco dias, acumulando sacos de lixo nas ruas. Isso tem atraído animais como ratos e baratas, gerando um risco à saúde pública. Diversos moradores já entraram em contato com a prefeitura, mas ainda não há previsão para regularizar o serviço.",
      dataReclamacao: "2024-11-26",
      objTag: "Lixo",
      objImagem : "img/paginas/reclamacoes/user3.jpg",
      objUsuario:{
        id: 3,
        nome: 'Adryann',
        email: 'adryann@gmail.com',
        senha: 'adry',
        endereco:{
          cep: '11111111',
          bairro : 'Bairro tal',
          logradouro : 'Rua tal',
          cidade : 'Sorocaba'
        }
      }
    },
    {
      idReclamacao: 4,
      tituloReclamao: "Água contaminada",
      descricaoReclamacao: "A água fornecida pelo sistema público está com um odor forte e coloração amarelada. Diversos moradores já relataram problemas gastrointestinais após o consumo, mesmo depois de ferver a água. Não houve qualquer comunicado oficial sobre a causa do problema, e isso está gerando preocupação generalizada no bairro.",
      dataReclamacao: "2024-11-25",
      objTag: "Qualidade da Água",
      objImagem : "img/paginas/reclamacoes/user4.jpg",
      objUsuario:{
        id: 2,
        nome: 'Davy',
        email: 'davy@gmail.com',
        senha: 'davy',
        endereco:{
          cep: '17571802',
          bairro : 'Jardim Europa',
          logradouro : 'Rua Rock',
          cidade : 'Votorantim'
        }
      }
    },
    {
      idReclamacao: 5,
      tituloReclamao: "Erosão em área de drenagem",
      descricaoReclamacao: "A má manutenção do sistema de drenagem causou erosões no terreno, colocando em risco casas próximas. A água da chuva não está sendo drenada adequadamente, resultando em enchentes frequentes e agravando os danos. Os moradores estão preocupados com a possibilidade de deslizamentos.",
      dataReclamacao: "2024-11-24",
      objTag: "Drenagem",
      objImagem : "img/paginas/reclamacoes/user5.jpg",
      objUsuario: {
        id: 4,
        nome: 'Ryan',
        email: 'ryan@gmail.com',
        senha: 'ryan',
        endereco:{
          cep: '11111111',
          bairro : 'Bairro tal',
          logradouro : 'Rua tal',
          cidade : 'Sorocaba'
        }
      }
    },
  ];

  constructor(private fb:FormBuilder){
    this.TagSelect = this.fb.group({
      tagForm: ['Todos']
    })
  }

  ngOnInit(): void {
    
    this.user =
    {
      id: 2,
      nome: 'Davy',
      email: 'davy@gmail.com',
      senha: 'davy',
      endereco:{
        cep: '17571802',
        bairro : 'Jardim Europa',
        logradouro : 'Rua Rock',
        cidade : 'Votorantim'
      }
    }

    this.thisIsUser(this.user);

    this.TagSelect.valueChanges.subscribe(()=>{
      console.log("Esta funcionando");
    })
    let lista : Reclamacao [];
    lista = this.reclamacoes.filter((reclamacao) =>{
      return (reclamacao.objUsuario.id === this.user?.id)
    })
    if(lista.length > 0 ){
      this.vazio = false;
      this.reclamacaoSubject.next(lista);
    }
    else{
      this.vazio = true;
      this.erro = "Nenhuma Reclamação encontrada";
    }
  }
 private thisIsUser(user : IUser | null ) : void{
    if(!user){
      this.router.navigate(['']);
    }
  }
}

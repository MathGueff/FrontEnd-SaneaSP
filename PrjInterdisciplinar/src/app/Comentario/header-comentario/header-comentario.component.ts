import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Reclamacao } from '../../models/reclamacao';
import { Input } from '@angular/core';
import { Comentario } from '../../models/comentario';
import { IUser } from '../../models/user.model';
// import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header-comentario',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './header-comentario.component.html',
  styleUrl: './header-comentario.component.css'
})
export class HeaderComentarioComponent {
  private users: IUser[] = [];
  private i: number = 0;
  @Input() reclamacao: Reclamacao = new Reclamacao();

  reclamacoes: Reclamacao [] = [
    {
      idReclamacao: 1,
      tituloReclamao: "Falta de abastecimento de água",
      descricaoReclamacao: "Há três dias o bairro está sem água, afetando diversas famílias. A situação está insustentável, pois as pessoas não conseguem realizar atividades básicas como cozinhar, tomar banho ou lavar roupas. Entramos em contato com a companhia de saneamento, mas até agora não houve retorno sobre o motivo da interrupção ou previsão de normalização.",
      dataReclamacao: "2024-11-28",
      objTag: "Abastecimento",
      objImagem : "img/paginas/reclamacoes/user1.jpg"
    },
    {
      idReclamacao: 2,
      tituloReclamao: "Vazamento de esgoto na rua",
      descricaoReclamacao: "Esgoto está vazando na rua há mais de uma semana e ninguém resolve. O odor é insuportável, e a situação está causando transtornos aos moradores e comerciantes da região. Além disso, o esgoto acumulado atrai insetos e representa um grave risco à saúde pública, especialmente para crianças que brincam no local.",
      dataReclamacao: "2024-11-27",
      objTag: "Esgoto",
      objImagem : "img/paginas/reclamacoes/user2.jpg"
    },
    {
      idReclamacao: 3,
      tituloReclamao: "Falta de coleta de lixo",
      descricaoReclamacao: "A coleta de lixo não foi realizada no bairro nos últimos cinco dias, acumulando sacos de lixo nas ruas. Isso tem atraído animais como ratos e baratas, gerando um risco à saúde pública. Diversos moradores já entraram em contato com a prefeitura, mas ainda não há previsão para regularizar o serviço.",
      dataReclamacao: "2024-11-26",
      objTag: "Lixo",
      objImagem : "img/paginas/reclamacoes/user3.jpg"
    },
    {
      idReclamacao: 4,
      tituloReclamao: "Água contaminada",
      descricaoReclamacao: "A água fornecida pelo sistema público está com um odor forte e coloração amarelada. Diversos moradores já relataram problemas gastrointestinais após o consumo, mesmo depois de ferver a água. Não houve qualquer comunicado oficial sobre a causa do problema, e isso está gerando preocupação generalizada no bairro.",
      dataReclamacao: "2024-11-25",
      objTag: "Qualidade da Água",
      objImagem : "img/paginas/reclamacoes/user4.jpg"
    },
    {
      idReclamacao: 5,
      tituloReclamao: "Erosão em área de drenagem",
      descricaoReclamacao: "A má manutenção do sistema de drenagem causou erosões no terreno, colocando em risco casas próximas. A água da chuva não está sendo drenada adequadamente, resultando em enchentes frequentes e agravando os danos. Os moradores estão preocupados com a possibilidade de deslizamentos.",
      dataReclamacao: "2024-11-24",
      objTag: "Drenagem",
      objImagem : "img/paginas/reclamacoes/user5.jpg"
    }
  ];

  comentarios: Comentario [] = [
    {
      id: 1,
      descricaoComentario: "Obrigado pela ajuda, estamos resolvendo o problema",
      dataComentario: "2024-11-27",
      objAdmin: "admin",
      objReclamacao: this.reclamacoes[0],
      objUsuario: this.users[0],
    },
  ];
}

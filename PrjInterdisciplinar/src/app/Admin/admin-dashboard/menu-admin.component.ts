import { Component } from '@angular/core';
import { MenuAdminDashOpcoesLink, MenuAdminSidebarLink } from '../../models/menu-admin';
import { CommonModule } from '@angular/common';
import { OpcoesMenuAdmin } from '../OpcoesMenuAdmin.enum';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-menu-admin',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './menu-admin.component.html',
  styleUrl: './menu-admin.component.css',
})
export class MenuAdminComponent {
  //#region Links Sidebar
  //Array de Objetos de links da sidebar do Menu de Admin
  linksSidebar: MenuAdminSidebarLink[] = [
    {
      nome: 'Gerenciar Reclamações',
      img: 'assets/icones/icon_white_reclamacao.svg',
      opcao: OpcoesMenuAdmin.Reclamacao,
    },
    {
      nome: 'Gerenciar notícias do site',
      img: 'assets/icones/icon_white_noticia.svg',
      opcao: OpcoesMenuAdmin.Noticia,
    },
    {
      nome: 'Gerenciar doenças do site',
      img: 'assets/icones/icon_white_doenca.svg',
      opcao: OpcoesMenuAdmin.Doenca,
    },
    {
      nome: 'Responsável pelo saneamento',
      img: 'assets/icones/icon_white_responsavel.svg',
      opcao: OpcoesMenuAdmin.Responsaveis,
    },
    {
      nome: 'Log',
      img: 'assets/icones/icon_relatorio_white.svg',
      opcao: OpcoesMenuAdmin.Log,
    },
  ];

  //#endregion
 
  //Variável para guardar a opção atual selecionada no sidebar 
    // (para mostrar os links corretos ao lado)
  opcaoAtual : OpcoesMenuAdmin = OpcoesMenuAdmin.Reclamacao;

  //Todos os links relacionados a opção de Notícias
  noticia : MenuAdminDashOpcoesLink[] = [
    {
      path: '/noticia-form',
      nome: 'Cadastrar uma nova notícia',
      img: 'assets/icones/icon_plus_white.svg',
    },
    {
      path: '/up-noticia',
      nome: 'Editar uma notícia',
      img: 'assets/icones/icon_edit_white.svg',
    },
    {
      path: '/dell-noticia',
      nome: 'Excluir uma notícia',
      img: 'assets/icones/icon_delete_white.svg',
    },
    {
      path: '/noticia-inicial',
      nome: 'Visualizar suas notícias criadas',
      img: 'assets/icones/icon_view_white.svg',
    },
    {
      path: '/noticia-inicial',
      nome: 'Visualizar todas notícias',
      img: 'assets/icones/icon_view_white.svg',
    },
  ]
  //Todos os links relacionados a opção de Doenças
  doenca : MenuAdminDashOpcoesLink[] = [
    {
      path: '/doenca-form',
      nome: 'Cadastrar uma nova doença',
      img: 'assets/icones/icon_plus_white.svg',
    },
    {
      path: '/doenca-form',
      nome: 'Editar uma doença',
      img: 'assets/icones/icon_edit_white.svg',
    },
    {
      path: '/doenca-form',
      nome: 'Excluir uma doença',
      img: 'assets/icones/icon_delete_white.svg',
    },
    {
      path: '/doenca-inicial',
      nome: 'Visualizar suas doenças cadastradas',
      img: 'assets/icones/icon_view_white.svg',
    },
    {
      path: '/doenca-inicial',
      nome: 'Visualizar todas doenças',
      img: 'assets/icones/icon_view_white.svg',
    },
  ]

  //Todos os links relacionados a opção de Reclamação
  reclamacao : MenuAdminDashOpcoesLink[] = [
    {
      path: '/reclamacao',
      nome: 'Visualizar todas reclamações',
      img: 'assets/icones/icon_view_white.svg',
    },
    {
      path: '/reclamacao',
      nome: 'Seus comentários',
      img: 'assets/icones/icon_view_white.svg',
    },
    {
      path: '/reclamacao',
      nome: 'Excluir uma reclamação',
      img: 'assets/icones/icon_delete_white.svg',
    },
    {
      path: '/',
      nome: 'Criar nova tag para os usuários',
      img: 'assets/icones/icon_plus_white.svg',
    },
    {
      path: '/',
      nome: 'Editar uma tag para os usuários',
      img: 'assets/icones/icon_edit_white.svg',
    },
    {
      path: '/',
      nome: 'Excluir uma tag para os usuários',
      img: 'assets/icones/icon_delete_white.svg',
    },
    {
      path: '/',
      nome: 'Gerar relatório de reclamação',
      img: 'assets/icones/icon_relatorio_white.svg',
    },
    {
      path: '/',
      nome: 'Visualizar filtragem geográfica',
      img: 'assets/icones/icon_map_white.svg',
    },
  ]

  responsavel : MenuAdminDashOpcoesLink[] = [
    {
      path: '/responsaveis',
      nome: 'Visualizar página dos responsáveis pelo saneamento básico',
      img: 'assets/icones/icon_white_responsavel.svg',
    },
  ]

  log : MenuAdminDashOpcoesLink[] = [
    {
      path: '/',
      nome: 'Visualizar log de comentários',
      img: 'assets/icones/icon_relatorio_white.svg',
    },
  ]

  opcoes: MenuAdminDashOpcoesLink[] = this.reclamacao;

  mudarOpcaoAtual(opcao: OpcoesMenuAdmin) {
    this.opcaoAtual = opcao;
    switch (opcao) {
      case OpcoesMenuAdmin.Doenca:
        this.opcoes = this.doenca;
        break;
      case OpcoesMenuAdmin.Noticia:
        this.opcoes = this.noticia
        break;
      case OpcoesMenuAdmin.Reclamacao:
        this.opcoes = this.reclamacao;
        break;
      case OpcoesMenuAdmin.Responsaveis:
        this.opcoes = this.responsavel;
        break;
      case OpcoesMenuAdmin.Log:
        this.opcoes = this.log;
        break;
      default:
          this.opcoes = [];
    }
  }
}